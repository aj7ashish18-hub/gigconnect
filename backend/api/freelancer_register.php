<?php
require_once __DIR__ . "/cors.php";
require_once __DIR__ . "/../config/db.php";

$headers = getallheaders();
$token = str_replace("Bearer ", "", $headers["Authorization"] ?? "");
$parts = explode(":", $token);
$user_id = intval(end($parts));

if (!$user_id) {
    http_response_code(401);
    echo json_encode(["error" => "Unauthorized"]);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);
$domain          = trim($input["domain"] ?? "");
$rate_type       = trim($input["rate_type"] ?? "hourly");
$rate            = trim($input["rate"] ?? "");
$city            = trim($input["city"] ?? "");
$experience_years = trim($input["experience_years"] ?? "");
$experience_desc = trim($input["experience_desc"] ?? "");
$portfolio_link  = trim($input["portfolio_link"] ?? "");
$bio             = trim($input["bio"] ?? "");

if (!$domain || !$rate || !$city || !$experience_years || !$bio) {
    http_response_code(400);
    echo json_encode(["error" => "Missing required fields"]);
    exit;
}

try {
    $database = new Database();
    $conn = $database->getConnection();

    $userStmt = $conn->prepare("SELECT name, email FROM users WHERE id = :id LIMIT 1");
    $userStmt->execute([":id" => $user_id]);
    $user = $userStmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        http_response_code(404);
        echo json_encode(["error" => "User not found"]);
        exit;
    }

    $conn->exec("
        CREATE TABLE IF NOT EXISTS gigconnect_profiles (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            domain VARCHAR(100),
            rate_type VARCHAR(20),
            rate DECIMAL(10,2),
            city VARCHAR(100),
            experience_years VARCHAR(20),
            experience_desc TEXT,
            portfolio_link VARCHAR(255),
            bio TEXT,
            status VARCHAR(20) DEFAULT 'pending',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    ");

    $existCheck = $conn->prepare("SELECT id FROM gigconnect_profiles WHERE user_id = :user_id");
    $existCheck->execute([":user_id" => $user_id]);
    $existing = $existCheck->fetch();

    if ($existing) {
        $stmt = $conn->prepare("
            UPDATE gigconnect_profiles SET
                domain = :domain, rate_type = :rate_type, rate = :rate,
                city = :city, experience_years = :experience_years,
                experience_desc = :experience_desc, portfolio_link = :portfolio_link,
                bio = :bio, status = 'pending'
            WHERE user_id = :user_id
        ");
    } else {
        $stmt = $conn->prepare("
            INSERT INTO gigconnect_profiles 
            (user_id, domain, rate_type, rate, city, experience_years, experience_desc, portfolio_link, bio, status)
            VALUES (:user_id, :domain, :rate_type, :rate, :city, :experience_years, :experience_desc, :portfolio_link, :bio, 'pending')
        ");
    }

    $stmt->execute([
        ":user_id"          => $user_id,
        ":domain"           => $domain,
        ":rate_type"        => $rate_type,
        ":rate"             => $rate,
        ":city"             => $city,
        ":experience_years" => $experience_years,
        ":experience_desc"  => $experience_desc,
        ":portfolio_link"   => $portfolio_link,
        ":bio"              => $bio,
    ]);

    echo json_encode([
        "message" => "Profile submitted successfully! Admin will review within 24-48 hours.",
        "status" => "pending"
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Server error", "details" => $e->getMessage()]);
}
?>