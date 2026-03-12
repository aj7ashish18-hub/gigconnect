<?php
require_once __DIR__ . "/cors.php";
require_once __DIR__ . "/../config/db.php";

// Get token from header
$headers = getallheaders();
$token = str_replace("Bearer ", "", $headers["Authorization"] ?? "");

if (!$token) {
    http_response_code(401);
    echo json_encode(["error" => "Unauthorized"]);
    exit;
}

// Extract user ID from token (format: randomhex:user_id)
$parts = explode(":", $token);
$user_id = intval(end($parts));

if (!$user_id) {
    http_response_code(401);
    echo json_encode(["error" => "Invalid token"]);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);
$gigconnect_id = intval($input["gigconnect_id"] ?? 0);
$rating = intval($input["rating"] ?? 0);
$comment = trim($input["comment"] ?? "");
$job_id = intval($input["job_id"] ?? 0);

if (!$gigconnect_id || !$rating || !$comment) {
    http_response_code(400);
    echo json_encode(["error" => "Missing required fields"]);
    exit;
}

if ($rating < 1 || $rating > 5) {
    http_response_code(400);
    echo json_encode(["error" => "Rating must be between 1 and 5"]);
    exit;
}

try {
    $database = new Database();
    $conn = $database->getConnection();

    // Get client name
    $userStmt = $conn->prepare("SELECT name FROM users WHERE id = :id LIMIT 1");
    $userStmt->execute([":id" => $user_id]);
    $user = $userStmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        http_response_code(404);
        echo json_encode(["error" => "User not found"]);
        exit;
    }

    // Insert review
    $stmt = $conn->prepare("
        INSERT INTO reviews (client_id, gigconnect_id, job_id, rating, comment, created_at)
        VALUES (:client_id, :gigconnect_id, :job_id, :rating, :comment, NOW())
    ");

    $stmt->execute([
        ":client_id"     => $user_id,
        ":gigconnect_id" => $gigconnect_id,
        ":job_id"        => $job_id ?: null,
        ":rating"        => $rating,
        ":comment"       => $comment,
    ]);

    echo json_encode(["message" => "Review submitted successfully"]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Server error", "details" => $e->getMessage()]);
}
?>
