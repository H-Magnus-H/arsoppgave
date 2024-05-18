<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fish Scoreboard</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Sixtyfour&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>

<body class="padding">

    <div class="max-w-md w-full bg-gray-800 p-8 rounded-lg">

        <?php
        require_once 'includes/dbh.inc.php';

        // Prepare and execute the query with ordering
        $query = "SELECT username, score FROM fishscore WHERE score > 0 ORDER BY score DESC";
        $stmt = $pdo->query($query);

        // Display the results
        echo "<div class='scoreboard'>";
        ?>
        <a href="spill.php"><button class="steampunk-button">Spill</button></a>
        <?php
        echo "<h2 class='text-2xl font-bold mb-4 text-yellow-500'>Top players:</h2>";
        echo "<table class='w-full mb-4'>";
        echo "<tr><th class='py-2'>Username</th><th class='py-2'>Score</th></tr>";
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            echo "<tr><td class='py-2'>{$row['username']}</td><td class='py-2'>{$row['score']}</td></tr>";
        }
        echo "</table>";
        echo "</div>";
        ?>
    </div>

</body>

</html>
