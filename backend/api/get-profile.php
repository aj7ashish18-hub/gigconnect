<?php

include "config/Database.php";

$db = new Database();
$conn = $db->getConnection();

$user_id = $_GET['user_id'];

$query = "SELECT
name,
email,
phone_verified,
email_verified,
id_verified,
skills_verified,
profile_completed
FROM users
WHERE id = ?";

$stmt = $conn->prepare($query);
$stmt->execute([$user_id]);

$user = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode($user);

?>