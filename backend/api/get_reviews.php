<?php
require_once __DIR__ . "/../cors.php";
require_once __DIR__ . "/../../config/db.php";

try {
    $database = new Database();
    $conn = $database->getConnection();

    $headers = getallheaders();
    $authHeader = $headers["Authorization"] ?? $headers["authorization"] ?? "";
    $token = str_replace("Bearer ", "", $authHeader);

    if (!$token) {
        http_response_code(401);
        echo json_encode(["error" => "Unauthorized"]);
        exit;
    }

    require_once __DIR__ . "/../../config/jwt.php";
    $decoded = JWT::decode($token);
    $user_id = $decoded->user_id ?? null;

    if (!$user_id) {
        http_response_code(401);
        echo json_encode(["error" => "Invalid token"]);
        exit;
    }

    $body = json_decode(file_get_contents("php://input"), true);

    $job_type         = $body["job_type"] ?? null;
    $location         = $body["location"] ?? null;
    $is_remote        = isset($body["is_remote"]) ? intval($body["is_remote"]) : 0;
    $experience_level = $body["experience_level"] ?? null;
    $industry         = $body["industry"] ?? null;
    $skills           = $body["skills"] ?? null;

    $stmt = $conn->prepare("
        INSERT INTO user_profile_domain 
            (user_id, job_type, location, is_remote, experience_level, industry, skills)
        VALUES 
            (:user_id, :job_type, :location, :is_remote, :experience_level, :industry, :skills)
        ON DUPLICATE KEY UPDATE
            job_type = VALUES(job_type),
            location = VALUES(location),
            is_remote = VALUES(is_remote),
            experience_level = VALUES(experience_level),
            industry = VALUES(industry),
            skills = VALUES(skills),
            updated_at = CURRENT_TIMESTAMP
    ");

    $stmt->execute([
        ":user_id"          => $user_id,
        ":job_type"         => $job_type,
        ":location"         => $location,
        ":is_remote"        => $is_remote,
        ":experience_level" => $experience_level,
        ":industry"         => $industry,
        ":skills"           => $skills,
    ]);

    echo json_encode(["success" => true, "message" => "Profile saved successfully"]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Server error", "details" => $e->getMessage()]);
}
?>