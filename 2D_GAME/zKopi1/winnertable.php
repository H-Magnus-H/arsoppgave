<?php
require_once 'includes/dbh.inc.php';

// Prepare and execute the query with ordering
$query = "SELECT username, score FROM fishscore WHERE score > 0 ORDER BY score DESC";
$stmt = $pdo->query($query);

// Display the results
echo "<h2>Usernames and Scores with a Score Higher than 0:</h2>";
echo "<ul>";
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    echo "<li>{$row['username']} - Score: {$row['score']}</li>";
}
echo "</ul>";
