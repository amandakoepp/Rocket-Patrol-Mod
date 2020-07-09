/* Point Breakdown:
    + Create a new spaceship type (w/ new artwork) that's smaller,
        moves faster, and is worth more points (25)
    + Create a new scrolling tile sprite for the background (10)
    + Allow the player to control the Rocket after it's fired (10)
        [this is done using the mouse]
    + Replace UI borders with new artwork (15)
    + Create a new Title Screen (15)
    + Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (25) 

*/

//create game configuration object
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ],
};

//create main game object
let game = new Phaser.Game(config);
//define game settings
game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000,
    kittenSpeed: 6
}

//reserve some keyboard bindings
let keyF, keyLEFT, keyRIGHT;