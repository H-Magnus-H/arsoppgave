<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Spill</title>
    <link rel="stylesheet" href="style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Sixtyfour&display=swap" rel="stylesheet">
</head>
<body>
    <div class="container">
    <?php
    session_start();

        //Sjekk om brukeren er logget inn 
        if(isset($_SESSION['user_username'])) {
            $loggedInUsername = $_SESSION['user_username']; // Hent brukernavnet til den innloggede brukeren fra sesjonen

            require_once 'includes/dbh.inc.php';

            //Spørring for å velge poengsummen for den innloggede brukeren
            $query = "SELECT score FROM fishscore WHERE username = '$loggedInUsername'";//burde ha brukt user_id siden jeg ikke har et kontroll for unikt bruker navn(prøvde se PHP_Course)
            $stmt = $pdo->prepare($query);
            $stmt->execute();
            
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            //return $result;

            //Sjekk om spørringen var vellykket
            if ($result) {
                //Vis poengsummen
                echo "<h1>Highscore for $loggedInUsername: " . $result["score"]."</h1>";
            } else {
                echo "Ingen resultater funnet for brukernavn: $loggedInUsername";
            }

            $pdo = null;//Lukk tilkoblingen
            
        } else {
            //Videresend til innloggingssiden hvis brukeren ikke er logget inn
            echo '<h1>Du er ikke logget inn</h1>';
            echo '<h1>Trykk</h1><a herf="index.php">her</a><h1>for å logge inn</h1>';
            exit();
        }
    ?> 
    <div id="startScreen" class="overlay">
        <button id="startGameButton" class="steampunk-button">Start Game</button>
        <a href="winnertable.php"><button id="Winner_table" class="steampunk-button">Se Winner tabel</button></a>
    </div>

    <div id="endScreen" class="overlay" style="display: none;">
        <p>Your Score: <span id="finalScore">0</span></p>
        <button id="startOverButton" class="steampunk-button">Start new game</button>
        <button id="saveButton" class="steampunk-button">Save score</button>
        <a href="winnertable.php"><button id="Winner_table" class="steampunk-button">Se Winner tabel</button></a>
    </div>

    <canvas id="canvas1"></canvas>
        
    <!--characters-->
    <img id="player" src="assets/player.png">
    <img id="angler1" src="assets/angler1.png">
    <img id="angler2" src="assets/angler2.png">
    <img id="lucky" src="assets/lucky.png">
    <img id="hivewhale" src="assets/hivewhale.png">
    <img id="drone" src="assets/drone.png">

    <!--props-->
    <img id="projectile" src="assets/projectile.png">
    <img id="gears" src="assets/gears.png">

    <!--environment-->
    <img id="layer1" src="assets/layer1.png">
    <img id="layer2" src="assets/layer2.png">
    <img id="layer3" src="assets/layer3.png">
    <img id="layer4" src="assets/layer4.png">
    <script src="script.js"></script>
    </div>
</body>
</html>