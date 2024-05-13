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
    <title>Document</title>
    <!-- Include Tailwind CSS -->
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>

<body class="bg-gray-100">

    <?php
        echo '<h3 class="text-xl font-bold mb-4">'.output_username().'</h3>'
    ?>

    <h3 class="text-xl font-bold mb-4">Login</h3>

    <form action="includes/login.inc.php" method="post" class="mb-8">
        <div class="flex mb-4">
            <input type="text" name="username" placeholder="Username"
                   class="px-3 py-2 w-64 border rounded-md focus:outline-none focus:border-blue-500">
        </div> 
        <div class="flex mb-4">
            <input type="password" name="pwd" placeholder="Password"
                   class="px-3 py-2 w-64 border rounded-md focus:outline-none focus:border-blue-500">
        </div>
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Login</button>
    </form>

    <?php
        echo "<p class='text-red-500'>".check_login_errors()."</p>";    
    ?>

    <h3 class="text-xl font-bold mb-4">Signup</h3>

    <form action="includes/signup.inc.php" method="post" class="mb-8">
        <?php
        signup_inputs();
        ?>
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Signup</button>
    </form>

    <?php
    echo "<p class='text-red-500'>".check_signup_errors()."</p>";
    ?>

    <h3 class="text-xl font-bold mb-4">Logout</h3>

    <form action="includes/logout.inc.php" method="post" class="mb-8">
        <button class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Logout</button>
    </form>


</body>

</html>
