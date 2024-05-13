window.addEventListener('load', function () {
    // canvas setup
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1500;
    canvas.height = 500;

    const startGameButton = this.document.getElementById('startGameButton');

    startGameButton.addEventListener('click', function() {
        startScreen.style.display = 'none';
        class InputHandler {
        constructor(game) {
            this.game = game;
            this.shootKeyPressed = false; // Flag to track if shoot key is pressed
            window.addEventListener('keydown', e => {
                console.log("Key pressed: " + e.key); // Log the key that was pressed
                // w = 87 & s = 83
                if ((e.key === 'w' || e.key === 's') && this.game.keys.indexOf(e.key) === -1) {
                    this.game.keys.push(e.key);
                } else if (e.key === ' ') {
                    this.shootKeyPressed = true; // Set shoot key flag to true
                } else if (e.key === 'd') {
                    this.game.debug = !this.game.debug;
                }
            });
            window.addEventListener('keyup', e => {
                if (this.game.keys.indexOf(e.key) > -1) {
                    this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
                } else if (e.key === ' ') {
                    this.shootKeyPressed = false; // Set shoot key flag to false
                }
            });
        }

        handleInput() {
            if (!this.game.gameOver && this.shootKeyPressed) {
                this.game.player.shootTop(); // Execute shootTop() if shoot key is pressed
            }
        }
    }
    class Projectile {
        constructor(game, x, y) {
            this.game = game;
            this.x = x;
            this.y = y;
            this.width = 10;
            this.height = 5;
            this.speed = 3;
            this.markedForDeletion = false;
            this.image = document.getElementById('projectile');
        }
        update() {
            this.x += this.speed;
            if (this.x > this.game.width * 0.8) this.markedForDeletion = true;
        }
        draw(context) {
            context.drawImage(this.image, this.x, this.y);
        }
    }
    class Particle {
        constructor(game, x, y){
            this.game = game;
            this.x = x;
            this.y = y;
            this.image = document.getElementById('gears');
            this.frameX = Math.floor(Math.random() * 3);
            this.frameY = Math.floor(Math.random() * 3);
            this.spriteSize = 50;
            this.sizeModifier = (Math.random() * 0.5 + 0.5).toFixed(1);
            this.size = this.spriteSize * this.sizeModifier;
            this.speedX = Math.random() * 6 - 3;
            this.speedY = Math.random() * -15;
            this.gravity = 0.5;
            this.markedForDeletion = false;
            this.angle = 0;
            this.va = Math.random() * 0.2 - 0.1;
            this.bounced = 0;
            this.bottomBounceBoundary = Math.random() * 100 + 60;
        }
        update(deltaTime){
            this.angle += this.va;
            this.speedY += this.gravity;
            this.x -= this.speedX + this.game.speed;
            this.y += this.speedY;
            if (this.y > game.height + this.size || this.x < 0 - this.size){
                this.markedForDeletion = true;
            }
            if (this.y > this.game.height - this.bottomBounceBoundary && this.bounced < 2){
                this.bounced++;
                this.speedY *= -0.5;
            }
        }
        draw(context){
            context.save();
            context.translate(this.x, this.y);
            context.rotate(this.angle);
            context.drawImage(this.image, this.frameX * this.spriteSize, this.frameY * this.spriteSize, this.spriteSize, this.spriteSize, this.size * -0.5, this.size * -0.5, this.size, this.size);
            context.restore();
        }
    }
    class Player {
        constructor(game) {
            this.game = game;
            this.width = 120; //changes depending on sprite size
            this.height = 190; //changes depending on sprite size
            this.x = 20;
            this.y = 100;
            this.frameX = 0;
            this.frameY = 0;
            this.maxFrame = 37;
            this.speedY = 0;
            this.maxSpeed = 3;
            this.projectiles = [];
            this. image = document.getElementById('player');
            this.powerUp = false;
            this.powerUpTimer = 0;
            this.powerUpLimit = 10000;
            this.playerLife = 5;
        }
        update(deltaTime) {
            if (this.game.keys.includes('w')) {
                this.speedY = -this.maxSpeed;
            } else if (this.game.keys.includes('s')) {
                this.speedY = this.maxSpeed;
            } else {
                this.speedY = 0;
            }
            this.y += this.speedY;
            // vertical boundarieues 
            if (this.y > this.game.height - this.height * 0.5) this.y = this.game.height - this.height * 0.5;
            else if (this.y < -this.height * 0.5) this.y = -this.height * 0.5;
            // Handle projectiles
            this.projectiles.forEach(projectile => {
                projectile.update();
            });
            this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion);
    
            // Animation 
            if (this.frameX < this.maxFrame) {
                this.frameX++;
            } else {
                this.frameX = 0;
            }
    
            // Power-up
            if (this.powerUp) {
                if (this.powerUpTimer > this.powerUpLimit) {
                    this.powerUpTimer = 0;
                    this.powerUp = false;
                    this.frameY = 0;
                } else {
                    this.powerUpTimer += deltaTime;
                    this.frameY = 1;
                    // Cap ammo at maxAmmo
                    if (this.game.ammo < this.game.maxAmmo) {
                        this.game.ammo += 0.1;
                    }
                }
            }

            //enemises
            if (this.playerLife <= 0) {
                // Remove all enemies from the game
                game.enemies = [];
            }
        }
        draw(context) {
            if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
            this.projectiles.forEach(projectile => {
                projectile.draw(context);
            });
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
            
        }
        shootTop() {
            if (this.game.ammo > 0) {
                this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 30)); //add or decrese nuber to mach the spawnpoint of the laser, after addin sprites

                //console.log(this.projectiles);//Removed
                this.game.ammo--;
                if (this.powerUp) this.shootBottom();
            }
        }
        shootBottom(){
            if (this.game.ammo > 0) {
                this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 175)); //add or decrese nuber to mach the spawnpoint of the laser, after addin sprites
                this.game.ammo--;
            }
        }
        enterPowerUp(){
            this.powerUpTimer = 0;
            this.powerUp = true;
            if (this.game.ammo < this.game.maxAmmo) this.game.ammo = this.game.maxAmmo;
        }
    }
    class Enemy {
        constructor(game) {
            this.game = game;
            this.x = this.game.width;
            this.speedX = Math.random() * -1.5 - 0.5;
            this.markedForDeletion = false;
            
            this.frameX = 0;
            this.frameY = 0;
            this.maxFrame = 37;
        }
        update() {
            this.x += this.speedX - this.game.speed;
            if (this.x + this.width < 0) this.markedForDeletion = true;
            // animation 
            if (this.frameX < this.maxFrame){
                this.frameX++
            } else this.frameX = 0;
        }
        draw(context) {
            if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
            context.font = '20px Helvetica';
            if (this.game.debug) context.fillText(this.lives, this.x, this.y);
        }
    }
    class Angler1 extends Enemy {
        constructor(game) {
            super(game);
            this.width = 228; //sprite can change this
            this.height = 169; //sprite can change this
            this.y = Math.random() * (this.game.height * 0.95 - this.height);
            this.image = document.getElementById('angler1');
            this.frameY = Math.floor(Math.random() * 3);
            this.lives = 2;
            this.score = this.lives;
        }
    }
    class Angler2 extends Enemy {
        constructor(game) {
            super(game);
            this.width = 213; //sprite can change this
            this.height = 165; //sprite can change this
            this.y = Math.random() * (this.game.height * 0.95 - this.height);
            this.image = document.getElementById('angler2');
            this.frameY = Math.floor(Math.random() * 2);
            this.lives = 3;
            this.score = this.lives;
        }
    }
    class LuckyFish extends Enemy {
        constructor(game) {
            super(game);
            this.width = 99; //sprite can change this
            this.height = 95; //sprite can change this
            this.y = Math.random() * (this.game.height * 0.95 - this.height);
            this.image = document.getElementById('lucky');
            this.frameY = Math.floor(Math.random() * 2);
            this.lives = 3;
            this.score = 15;
            this.type = 'lucky';
        }
    }
    class HiveWhale extends Enemy{
        constructor(game) {
            super(game);
            this.width = 400; //sprite can change this
            this.height = 227; //sprite can change this
            this.y = Math.random() * (this.game.height * 0.95 - this.height);
            this.image = document.getElementById('hivewhale');
            this.frameY = 0;
            this.lives = 15;
            this.score = this.lives;
            this.type = 'hive';
            this.speedX = Math.random() * -1.2 - 0.2;
        }
    }
    class Drone extends Enemy{
        constructor(game, x, y) {
            super(game);
            this.width = 115; //sprite can change this
            this.height = 95; //sprite can change this
            this.x = x;
            this.y = y;
            this.image = document.getElementById('drone');
            this.frameY = Math.floor(Math.random() * 2);
            this.lives = 3;
            this.score = this.lives;
            this.type = 'drone';
            this.speedX = Math.random() * -4.2 - 0.5;
        }
    }

    class Layer {
        constructor(game, image, speedModifier){
            this.game = game;
            this.image = image;
            this.speedModifier = speedModifier;
            this.width = 1768;
            this.height = 500;
            this.x = 0;
            this.y = 0;
        }
        update(){
            if (this.x <= -this.width) this.x = 0;
            else this.x -= this.game.speed * this.speedModifier;// if stuter remove else
        }
        draw(context){
            context.drawImage(this.image, this.x, this.y);
            context.drawImage(this.image, this.x + this.width, this.y);
        }
    }
    class Background {
        constructor(game){
            this.game = game;
            this.image1 = document.getElementById('layer1');
            this.image2 = document.getElementById('layer2');
            this.image3 = document.getElementById('layer3');
            this.image4 = document.getElementById('layer4');
            this.layer1 = new Layer(this.game, this.image1, 0.2);
            this.layer2 = new Layer(this.game, this.image2, 0.4);
            this.layer3 = new Layer(this.game, this.image3, 1);
            this.layer4 = new Layer(this.game, this.image4, 1.5);
            this.layers = [this.layer1, this.layer2, this.layer3];
        }
        update(){
            this.layers.forEach(layer => layer.update());
        }
        draw(context){
            this.layers.forEach(layer => layer.draw(context));
        }
    }
    class UI {
        constructor(game) {
            this.game = game;
            this.playerLife = game.player.playerLife;
            this.fontSize = 25;
            this.fontFamily = "Sixtyfour";
            this.color = "black";
        }
        draw(context) {
            context.save();
            context.fillStyle = this.color;
            context.shadowOfSetX = 2;
            context.shadowOfSety = 2;
            context.shadowColor = 'black';
            context.font = this.fontSize + 'px ' + this.fontFamily;
            //socre
            context.fillText('Score:' + this.game.score, 20, 40);
            //ammo
            if (this.game.player.powerUp) context.fillStyle = 'yellow';

            for (let i = 0; i < this.game.ammo; i++) {
                context.fillRect(20 + 8 * i, 50, 3, 20);
            }
            // timer
            context.fillStyle = this.color;
            context.fillText('Life left: ' + this.game.player.playerLife, 20, 100);
            // game over messages
            
            if (this.game.gameOver){
                context.textAlign = 'center';
                
                let message1;
                let message2;
                let message3;
                let message4;

                // if (this.game.score > this.game.winningScore){
                //     message1 = 'Congratulations!';
                //     message2 = 'Your triumph stands as a testament to the gears of your ';
                //     message3 = 'determination and the steam of your unwavering spirit.!';
                //     message4 = 'Your score' //. $score was incredible Well done, adventurer of the steam age!
                // } else {
                    message1 = 'You died';
                    message2 = 'Despite thy valiant efforts and gears of determination,';
                    message3 = 'the wheels of fortune have decreed otherwise.!';
                    message4 = 'Your score'; //. $score was good thy shod try to reach furderded into the deeps of the sea;
                //}
                
                context.font = '50px ' + this.fontFamily;
                context.color = 'yellow'
                context.fillText(message1, this.game.width * 0.5, this.game.height * 0.5 -80);
                context.font = '25px ' + this.fontFamily;
                context.fillText(message2, this.game.width * 0.5, this.game.height * 0.5 + -40);
                context.font = '25px ' + this.fontFamily;
                context.fillText(message3, this.game.width * 0.5, this.game.height * 0.5 + 1);
                context.font = '25px ' + this.fontFamily;
                context.fillText(message4, this.game.width * 0.5, this.game.height * 0.5 + 40);
                
                endScreen.style.display = 'block';
                finalScore.textContent = score;

            
                
            }
            context.restore();
            
        }
    }
    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.ui = new UI(this);
            this.keys = [];
            this.enemies = [];
            this.particles = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000; //how many enymies 
            this.ammo = 20;
            this.maxAmmo = 50;
            this.ammoTimer = 0;
            this.ammoInterval = 200; //how much ammo regain
            this.gameOver = false;
            this.score = 0;
            //this.winningScore = 400;
            this.gameTime = 0;
            this.timeLimit = 150000; //might whant to remove timer for game and vining score d
            this.speed = 1;
            this.debug = false;
            this.playerLife = this.player.playerLife;
        }
        update(deltaTime) {
            if (!this.gameOver) this.gameTime += deltaTime;
            if (this.gameTime > this.timeLimit) this.gameOver = true;//remove timer ????
            
            if (this.player.playerLife <= 0) {
                this.gameOver = true;
            }

            this.background.update();
            this.background.layer4.update();
            this.player.update(deltaTime);
            this.input.handleInput();
            const cappeddeltaTime = Math.min(deltaTime, this.ammoInterval);
            if (this.ammoTimer > this.ammoInterval) {
                if (this.ammo < this.maxAmmo) this.ammo++;
                this.ammoTimer = 0;
            } else {
                this.ammoTimer += cappeddeltaTime;
            }
            this.particles.forEach(particle => particle.update());
            this.particles = this.particles.filter(particle => !particle.markedForDeletion);
            this.enemies.forEach(enemy => {
                enemy.update();
                if (this.checkCollision(this.player, enemy)) {
                    enemy.markedForDeletion = true;
                    for (let i = 0; i < 8; i++){
                        this.particles.push(new Particle(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
                    }
                    if (enemy.type === 'lucky') this.player.enterPowerUp();
                    else this.player.playerLife--; //change this to player healt for a survival type game in sted of a lv game
                    
                }
                this.player.projectiles.forEach(projectile => {
                    if (this.checkCollision(projectile, enemy)) {
                        enemy.lives--;
                        projectile.markedForDeletion = true;                            
                        this.particles.push(new Particle(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
                        if (enemy.lives <= 0) {
                            for (let i = 0; i < 8; i++){
                                this.particles.push(new Particle(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
                            }
                            enemy.markedForDeletion = true;
                            if (enemy.type === 'hive') {
                                for (let i = 0; i < 3; i++){
                                    this.enemies.push(new Drone(this, enemy.x + Math.random() * enemy.width, enemy.y + Math.random() * enemy.height));
                                }
                            }
                            if (!this.gameOver) this.score += enemy.score;
                            //if (this.score > this.winningScore) this.gameOver = true; //remove for bigger sorce like dino run??? 
                        }
                    }
                });
            });
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
            if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }

            if (this.player.playerLife <= 0 && this.gameOver) {//is this.Gameover needed 
                // Remove all enemies from the game
                this.enemies = [];
            }
        }
        draw(context) {
            this.background.draw(context);
            this.player.draw(context);
            this.particles.forEach(particle => particle.draw(context));
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
            this.background.layer4.draw(context);
            this.ui.draw(context);
        }
        addEnemy() {
            const randomize = Math.random();
            if (randomize < 0.3) this.enemies.push(new Angler1(this));
            else if (randomize < 0.6) this.enemies.push(new Angler2(this));
            else if (randomize < 0.8) this.enemies.push(new HiveWhale(this));

            else this.enemies.push(new LuckyFish(this));
        }
        checkCollision(rect1, rect2) {
            return (
                rect1.x < rect2.x + rect2.width &&
                rect1.x + rect1.width > rect2.x &&
                rect1.y < rect2.y + rect2.height &&
                rect1.height + rect1.y > rect2.y
            );
        }
    }

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;
    const maxDeltaTime = 20;
    // animation loop
    function animate(timeStamp) {
        const deltaTime = Math.min(timeStamp - lastTime, maxDeltaTime);
        //console.log(deltaTime);//?????? 
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate(0);
    

    const saveButton = document.getElementById('saveButton');

    saveButton.addEventListener('click', function() {
        saveScore();
    });

    function saveScore() {
        console.log('button works');
        const scoreData = { score: this.score };             
            // Send score data to PHP script
            fetch('includes/save_score.inc.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(scoreData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to send score data');
                }
                // Handle successful response if needed
            })
            .catch(error => {
                console.error('Error sending score data:', error);
            }); 
            window.location.href = 'includes/save_score.inc.php';
        }

    const startOverButton = document.getElementById('startOverButton');

    // Event listener for the "Start Over" button
    startOverButton.addEventListener('click', function() {
        // Reset the game
        resetGame();
    });
    

    // Function to reset the game
    function resetGame() {
        // Reset any game variables, player life, scores, etc.
        game.player.playerLife = 5; // Reset player life to initial value
        game.score = 0; // Reset score to 0
        game.gameOver = false; // Reset gameOver flag
        game.speed = 1;
    
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        // Remove event listeners
        window.removeEventListener('keydown', game.input.handleInput);
        window.removeEventListener('keyup', game.input.handleInput);
    
        // Restart the game loop
        animate(0);
    }
    
    })

  
});

