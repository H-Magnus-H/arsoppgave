<?php
// Include database connection
include 'dbh.inc.php';

// Get score data from the AJAX request
$data = json_decode(file_get_contents("php://input"), true);

// Check if JSON data is valid
if ($data && isset($data['score']) && isset($data['username'])) {
    $score = $data['score'];
    $username = $data['username'];

    // Check if the new score is higher than the existing high score
    $sqlSelect = "SELECT score FROM fishscore WHERE username = :username";
    $stmtSelect = $pdo->prepare($sqlSelect);
    $stmtSelect->execute(['username' => $username]);
    $existingScore = $stmtSelect->fetchColumn();

    if ($existingScore === false || $score > $existingScore) {
        // New score is higher or user doesn't have an existing score
        // Update the database with the new high score
        $sqlUpdate = "UPDATE fishscore SET score = :score WHERE username = :username";
        $stmtUpdate = $pdo->prepare($sqlUpdate);
        $stmtUpdate->execute(['score' => $score, 'username' => $username]);
        echo "New high score saved successfully";
    } else {
        // New score is not higher than the existing high score
        echo "Score not higher than existing high score";
    }
} else {
    // Invalid or missing JSON data
    echo "Invalid or missing data";
}
?>
