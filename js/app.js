// Global variables
var Score = 0;
var max = 400;
var min = 200;

// Class for Enemies our player must avoid
var Enemy = function(x, y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = this.randomSpeed();
};

// To get a random speed for the Enemy sprites
Enemy.prototype.randomSpeed = function(){
    return Math.floor(Math.random()*(max - min + 1) + min);
};

// To update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < 500) {
      this.x += this.speed*dt;
    }
    else {
      this.x = -100;
      this.speed = this.randomSpeed();
    }
};

// To draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Class for the Player
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

// Updates the Player's position, on collision with the Enemy sprite
Player.prototype.update = function(){
  for(var i =0; i< allEnemies.length;i++){
    if((this.y == allEnemies[i].y) && (this.x < allEnemies[i].x + 35) && (this.x > allEnemies[i].x - 20)){
      this.reset();
    }
  }
};

// To draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// To reset the player's position on collision with Enemy or on reaching water
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

// To handle keyboard inputs for moving the player on the canvas
// make sure player is within boundaries of canvas
// make player move with appropriate keyboard key pressed
Player.prototype.handleInput = function(key) {
    if(key == 'left') {
      if(this.x > 0) {
        this.x -= 100;
      }
    }
    else if(key == 'right') {
      if(this.x < 400) {
        this.x += 100;
      }
    }
    else if(key == 'up') {
      if(this.y > 40){
         this.y -= 90;
      }
      else {
        Score += 1;
        $('#score').text(Score);
        this.reset();
      }
    }
    else if(key == 'down') {
      if(this.y < 400){
        this.y += 90;
      }
    }
};

// Instantiating objects.

// Placing all enemy objects in an array called allEnemies
var allEnemies = [
  new Enemy(0, 40),
  new Enemy(0, 130),
  new Enemy(0, 220)
];

// Placing the player object in a variable called player
var player = new Player(200, 400);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
