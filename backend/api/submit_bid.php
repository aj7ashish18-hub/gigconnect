<?php

include_once "../config/db.php";
require_once __DIR__ . "/cors.php";

$headers = getallheaders();
$authHeader = $headers["Authorization"] ?? '';

if (!$authHeader || !str_starts_with($authHeader, "Bearer ")) {
    http_response_code(403);
    echo json_encode(["error" => "Access denied - no token"]);
    exit;
}

$token = trim(str_replace("Bearer", "", $authHeader));

$database = new Database();
$conn = $database->getConnection();

// Authenticate gigconnect from token
$user = null;
$query = "SELECT id, role FROM users";
$stmt = $conn->prepare($query);
$stmt->execute();

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    if (str_ends_with($token, $row["id"]) && $row["role"] === "gigconnect") {
        $user = $row;
        break;
    }
}

if (!$user) {
    http_response_code(403);
    echo json_encode(["error" => "Access denied"]);
    exit;
}

// Parse input
$data = json_decode(file_get_contents("php://input"), true);
$jobId        = $data["job_id"]        ?? null;
$amount       = $data["amount"]        ?? null;
$description  = $data["description"]  ?? "";
$durationValue = $data["duration_value"] ?? null;
$durationType  = $data["duration_type"]  ?? "days";

// Validate required fields
if (!$jobId || !$amount) {
    http_response_code(400);
    echo json_encode(["error" => "Missing job_id or amount"]);
    exit;
}

if (!$description) {
    http_response_code(400);
    echo json_encode(["error" => "Please write a cover letter / description"]);
    exit;
}

if (!$durationValue) {
    http_response_code(400);
    echo json_encode(["error" => "Please provide project duration"]);
    exit;
}

// Validate duration type
$allowedTypes = ["hours", "days", "weeks", "months"];
if (!in_array($durationType, $allowedTypes)) {
    $durationType = "days";
}

// Check if gigconnect already applied to this job
$check = $conn->prepare("SELECT id FROM bids WHERE gigconnect_id = ? AND job_id = ?");
$check->execute([$user["id"], $jobId]);

if ($check->fetch()) {
    http_response_code(409);
    echo json_encode(["error" => "You have already applied to this job."]);
    exit;
}

// Insert application with all fields
$insert = $conn->prepare("
    INSERT INTO bids (gigconnect_id, job_id, amount, description, duration_value, duration_type, status) 
    VALUES (?, ?, ?, ?, ?, ?, 'pending')
");

$success = $insert->execute([
    $user["id"],
    $jobId,
    $amount,
    $description,
    $durationValue,
    $durationType
]);

if ($success) {
    echo json_encode(["message" => "Application submitted successfully!"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to submit application."]);
}
?>