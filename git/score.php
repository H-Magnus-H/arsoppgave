<?php
require 'includes/dbh.inc.php';

session_start();

// Check if the user is logged in
if (isset($_SESSION['user_username'])) {
    // Get the logged-in user's ID
    $loggedInUserId = $_SESSION['user_username'];

    // Get the score from the POST request
    $score = $_POST['score'];

    try {
        // Prepare SQL statement to select the user's existing score
        $stmt = $pdo->prepare("SELECT score FROM fishscore WHERE username = ?");
        $stmt->execute([$loggedInUserId]);
        $currentScore = $stmt->fetchColumn();

        // Check if the new score is higher than the current score
        if ($score > $currentScore) {
            // Prepare SQL statement to update the score in the database
            $stmt = $pdo->prepare("UPDATE fishscore SET score = ? WHERE username = ?");
            $stmt->execute([$score, $loggedInUserId]);
            echo "Score updated successfully";
        } else {
            echo "New score is not higher than the current score";
        }
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
} else {
    echo "User not logged in";
}

$pdo = null; // Close the PDO connection

