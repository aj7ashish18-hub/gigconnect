<?php
// require_once "./config/db.php";

// $db = new Database();
// $conn = $db->getConnection();

// if ($conn) {
//     echo "Connection successful!";
// } else {
//     echo "Connection failed.";
// }

require_once __DIR__ . '/config/db.php';

$db = new Database();
$conn = $db->getConnection();

if ($conn) {
    echo "✅ Successfully connected to AWS RDS!";
} else {
    echo "❌ Failed to connect.";
}


?>
