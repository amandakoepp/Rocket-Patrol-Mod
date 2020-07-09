//creating a Menu scene 
class Menu extends  Phaser.Scene {
    constructor(){
        super("menuScene")
    }
    
    preload() {
        //load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');

        //background 
        this.load.image('kitchen', './assets/Kitchen scroller bg.PNG');
        this.load.spritesheet('cat', './assets/CatWalkSeq.PNG', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 3});
    }

    create() {
        //menu display
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#ceffa6',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'kitchen').setOrigin(0, 0);

        //show menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        this.add.text(centerX, centerY- textSpacer, 'CAT PATROL', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY, 'Use <--> arrows to move & (F) to Feed', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#d7a6ff';
        menuConfig.color = '#000';
        this.add.text(centerX, centerY + textSpacer, 'Press <- for Easy or -> for Hard', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer+ textSpacer, 'Move mouse to control where Treat goes', menuConfig).setOrigin(0.5);



        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            //easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000,
                kittenSpeed: 6
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            //hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000,
                kittenSpeed: 10
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
    }

    //this.scene.start("playScene");

}