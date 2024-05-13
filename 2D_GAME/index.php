<?php
    require_once 'includes/config_session.inc.php';
    require_once 'includes/signup_view.inc.php';
    require_once 'includes/login_view.inc.php';
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Steampunk Theme</title>
    <!-- Include Tailwind CSS -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Sixtyfour&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>

<body class="bg-gray-900 text-white flex justify-center items-center h-screen">

    <div class="max-w-4xl w-full bg-gray-800 p-8 rounded-lg">
        <div class="top-right">
            <h1 class="text-3xl font-bold mb-4 text-yellow-500">FishWar</h1>
            <h2><a href="FAQ.php">FAQ</a></h2>
        </div>
        <?php
           // echo '<h3 class="text-3xl font-bold mb-4 text-yellow-500">'.output_username().'</h3>';
        ?>

        <div class="grid grid-cols-2 gap-8">
            <div>
                <h3 class="text-2xl font-bold mb-4 text-yellow-500">Login</h3>

                <form action="includes/login.inc.php" method="post" class="mb-8">
                    <div class="mb-4">
                        <input type="text" name="username" placeholder="Username or Email"
                               class="px-4 py-3 w-full bg-gray-700 text-white rounded-md focus:outline-none focus:border-blue-500">
                    </div> 
                    <div class="mb-4">
                        <input type="password" name="pwd" placeholder="Password"
                               class="px-4 py-3 w-full bg-gray-700 text-white rounded-md focus:outline-none focus:border-blue-500">
                    </div>
                    <button type="submit" class="steampunk-button">Login</button>
                </form>

                <?php
                    echo "<p class='text-red-500'>".check_login_errors()."</p>";    
                ?>
            </div>
            
            <div>
                <h3 class="text-2xl font-bold mb-4 text-yellow-500">Signup</h3>

                <form action="includes/signup.inc.php" method="post" class="mb-8">
                    <div class="mb-4">
                        <input type="text" name="username" placeholder="Username"
                               class="px-4 py-3 w-full bg-gray-700 text-white rounded-md focus:outline-none focus:border-blue-500">
                    </div>
                    <div class="mb-4">
                        <input type="email" name="email" placeholder="Email"
                               class="px-4 py-3 w-full bg-gray-700 text-white rounded-md focus:outline-none focus:border-blue-500">
                    </div> 
                    <div class="mb-4">
                        <input type="password" name="pwd" placeholder="Password"
                               class="px-4 py-3 w-full bg-gray-700 text-white rounded-md focus:outline-none focus:border-blue-500">
                    </div>
                    <button type="submit" class="steampunk-button">Signup</button>
                </form>

                <?php
                echo "<p class='text-red-500'>".check_signup_errors()."</p>";
                ?>
            </div>
        </div>

    </div>

</body>

</html>
