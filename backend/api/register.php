<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// DB config — update these!
$host = "127.0.0.1";
$db   = "gigconnect";
$user = "root";
$pass = "";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "DB connection failed: " . $e->getMessage()]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

$name     = trim($data['name'] ?? '');
$email    = trim($data['email'] ?? '');
$password = $data['password'] ?? '';
$role     = $data['role'] ?? 'gigconnect'; // 'client' or 'gigconnect'

// Validate
if (!$name || !$email || !$password) {
    http_response_code(400);
    echo json_encode(["error" => "All fields are required"]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid email address"]);
    exit();
}

// Check duplicate email
$stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
$stmt->execute([$email]);

if ($stmt->fetch()) {
    http_response_code(409); // Conflict — not 500!
    echo json_encode(["error" => "Email already registered"]);
    exit();
}

// Insert new user
$hashed = password_hash($password, PASSWORD_BCRYPT);
$stmt = $pdo->prepare(
    "INSERT INTO users (name, email, password, role, created_at)
     VALUES (?, ?, ?, ?, NOW())"
);

try {
    $stmt->execute([$name, $email, $hashed, $role]);
    http_response_code(201);
    echo json_encode(["message" => "Account created successfully", "role" => $role]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Registration failed: " . $e->getMessage()]);
}