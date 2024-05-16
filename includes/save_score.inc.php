<?php
// Check if score data is sent via POST request
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Decode the JSON data sent from JavaScript
    $data = json_decode(file_get_contents("php://input"));

    // Check if the score data and username are valid
    if (isset($data->score) && isset($data->username)) {
        $score = $data->score;
        $username = $data->username;

        require 'dbh.inc.php';

        // Prepare SQL statement to select the user's existing score
        $stmt = $pdo->prepare("SELECT score FROM fishscore WHERE username = ?");
        if ($stmt->execute([$username])) {
            // Fetch the existing score
            $existingScore = $stmt->fetchColumn();

            // Check if the user has an existing score
            if ($existingScore !== false) {
                // If the existing score is lower than the new score, update the score
                if ($existingScore < $score) {
                    // Prepare SQL statement to update the user's score
                    $updateStmt = $pdo->prepare("UPDATE fishscore SET score = ? WHERE username = ?");
                    if ($updateStmt->execute([$score, $username])) {
                        echo "Score updated successfully";
                    } else {
                        echo "Error updating score: " . $updateStmt->errorInfo()[2];
                    }
                } else {
                    echo "Existing score is higher or equal, no need to update";
                }
            } else {
                // If the user does not have an existing score, insert the new score
                // Prepare SQL statement to insert the score into the database
                $insertStmt = $pdo->prepare("INSERT INTO fishscore (username, score) VALUES (?, ?)");
                if ($insertStmt->execute([$username, $score])) {
                    echo "Score saved successfully";
                } else {
                    echo "Error saving score: " . $insertStmt->errorInfo()[2];
                }
            }
        } else {
            echo "Error fetching existing score: " . $stmt->errorInfo()[2];
        }
    } else {
        echo "Error: Score data or username is missing";
    }
} else {
    echo "Error: Invalid request method";
}