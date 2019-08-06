// First, we set the properties of the game: the width and height of the game area
var properties = {
    width: 640,
    height: 480
};

// Initialize the game as an instance of the Phaser.Game object established in the framework
var game = new Phaser.Game(properties.width, properties.height, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });


// All assets will be loaded in here
function preload() {

}

var oneUpKey;
var oneDownKey;
var twoUpKey;
var twoDownKey;

// Initialization of all the sprites, sounds, levels, text, etc.
function create() {
	//Initialize the graphics
	graphics = game.add.graphics(0, 0);

	//Initialize the controls
	oneUpKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    oneDownKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    twoUpKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    twoDownKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

	//Initialize the players
	playerSpeed = 4;
	
	
	playerOne = {
		x: 32,
		y: properties.height/2,
		height: 64,
		score: 0,
	}

	playerTwo = {
		x: properties.width - 32,
		y: properties.height/2,
		height: 64,
		score: 0,
	}

	defaultBall = {
		x: properties.width/2,
		y: properties.height/2,
		height: 12,
		hSpeed: playerSpeed * Math.cos(Math.random()*2*Math.PI),
		vSpeed: playerSpeed * Math.sin(Math.random()*2*Math.PI)
	}

	ball = defaultBall;

}

// This is the main game loop. This function is run every frame. (The initial FPS is 60)
function update() {
	//Clear the graphics
	graphics.clear();

	//Player Controls, doesn't allow them to go off screen.
	if (oneUpKey.isDown && playerOne.y > playerOne.height/2) playerOne.y -= playerSpeed;
	if (oneDownKey.isDown && playerOne.y < properties.height - playerOne.height/2) playerOne.y += playerSpeed;
	if (twoUpKey.isDown && playerTwo.y > playerTwo.height/2) playerTwo.y -= playerSpeed;
	if (twoDownKey.isDown && playerTwo.y < properties.height - playerTwo.height/2) playerTwo.y += playerSpeed;

	//Ball Motion
	ball.x += ball.hSpeed;
	ball.y -= ball.vSpeed;

	//Ball Wall Collision (Make the ball respawn if it goes out of bounds)
	if (ball.x <= -ball.height || ball.x >= properties.width + ball.height) {
		ball.x = properties.width/2;
		ball.y = properties.height/2;
		ball.hSpeed = playerSpeed * Math.cos(Math.random()*2*Math.PI);
		ball.vSpeed = playerSpeed * Math.sin(Math.random()*2*Math.PI);
	} 
	if (ball.y <= 0 || ball.y >= properties.height) ball.vSpeed = -ball.vSpeed;

	//Ball Player One Collision
	if (ball.x < playerOne.x + 6 && ball.x > playerOne.x - 6) {
		if (ball.y >= playerOne.y - playerOne.height/2 && ball.y <= playerOne.y + playerOne.height/2) {
			ball.hSpeed = (Math.abs(ball.hSpeed) * 1.05);
		}
	}

	//Ball Player Two Collision
	if (ball.x < playerTwo.x + 6 && ball.x > playerTwo.x - 6) {
		if (ball.y >= playerTwo.y - playerTwo.height/2 && ball.y <= playerTwo.y + playerTwo.height/2) {
			ball.hSpeed = (-Math.abs(ball.hSpeed) * 1.05);
		}
	}

	//Draw Player One
	graphics.lineStyle(12, 0xFFFFFF);
	graphics.moveTo(playerOne.x, playerOne.y - playerOne.height/2);
	graphics.lineTo(playerOne.x, playerOne.y + playerOne.height/2);

	//Draw Player Two
	graphics.moveTo(playerTwo.x, playerTwo.y - playerTwo.height/2);
	graphics.lineTo(playerTwo.x, playerTwo.y + playerTwo.height/2);

	//Draw Ball
	graphics.moveTo(ball.x, ball.y - ball.height/2);
	graphics.lineTo(ball.x, ball.y + ball.height/2);

	//Set the game window to our view
	window.graphics = graphics;
}