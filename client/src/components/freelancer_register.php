<?php
require_once __DIR__ . "/cors.php";
require_once __DIR__ . "/../config/db.php";

// Get token
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

    // Get user info
    $userStmt = $conn->prepare("SELECT name, email FROM users WHERE id = :id LIMIT 1");
    $userStmt->execute([":id" => $user_id]);
    $user = $userStmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        http_response_code(404);
        echo json_encode(["error" => "User not found"]);
        exit;
    }

    // Save gigconnect profile
    // First check if gigconnect_profiles table exists, if not create it
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

    // Check if profile already exists
    $existCheck = $conn->prepare("SELECT id FROM gigconnect_profiles WHERE user_id = :user_id");
    $existCheck->execute([":user_id" => $user_id]);
    $existing = $existCheck->fetch();

    if ($existing) {
        // Update existing profile
        $stmt = $conn->prepare("
            UPDATE gigconnect_profiles SET
                domain = :domain, rate_type = :rate_type, rate = :rate,
                city = :city, experience_years = :experience_years,
                experience_desc = :experience_desc, portfolio_link = :portfolio_link,
                bio = :bio, status = 'pending'
            WHERE user_id = :user_id
        ");
    } else {
        // Insert new profile
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

    // Send email to admin using PHP mail()
    $adminEmail = "aj7ashish18@gmail.com"; // 🔴 CHANGE THIS to your Gmail
    $subject = "New gigconnect Registration - $domain - {$user['name']}";
    $message = "
New gigconnect Registration Request
====================================

Name: {$user['name']}
Email: {$user['email']}
Domain: $domain
Rate: ₹$rate / $rate_type
City: $city
Experience: $experience_years years

Bio:
$bio

Experience Description:
$experience_desc

Portfolio: $portfolio_link

Status: Pending Approval
====================================
Login to admin panel to approve or reject this profile.
    ";

    $headers_mail = "From: noreply@gigconnecthub.in\r\n";
    $headers_mail .= "Reply-To: {$user['email']}\r\n";
    $headers_mail .= "Content-Type: text/plain; charset=UTF-8\r\n";

    mail($adminEmail, $subject, $message, $headers_mail);

    echo json_encode([
        "message" => "Profile submitted successfully! Admin will review within 24-48 hours.",
        "status" => "pending"
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Server error", "details" => $e->getMessage()]);
}
?>
