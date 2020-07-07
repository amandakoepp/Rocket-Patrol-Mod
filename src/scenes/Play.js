//creating Play
class Play extends  Phaser.Scene {
    constructor(){
        super("playScene")
    }

    preload() {
        //load images/tile sprites
        this.load.image('cat_treat', './assets/Cat Treat1.png');
        this.load.image('kitchen', './assets/Kitchen scroller bg.png');

        //load spritesheet
        this.load.spritesheet('explosion', './assets/Heartshield.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 9});
        this.load.spritesheet('cat', './assets/CatWalkSeq.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 4});
    }

    create() {
        // place tile sprite bg
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'kitchen').setOrigin(0, 0);

        //white rectangle borders
        this.add.rectangle(5, 5, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 443, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(603, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);

        //green UI background
        this.add.rectangle(37, 42, 566, 64, 0x00FF00).setOrigin(0, 0);

        //add Rocket (p1)
        this.p1Rocket = new CatTreat(this, game.config.width/2, 431, 'cat_treat', 0).setScale(0.5, 0.5).setOrigin(0,0);

        //add spaceships (x3)
        this.ship01 = new Cat(this, game.config.width + 192, 132, 'cat', 0, 30).setOrigin(0,0);
        this.ship02 = new Cat(this, game.config.width + 96, 196, 'cat', 0, 20).setOrigin(0,0);
        this.ship03 = new Cat(this, game.config.width, 260, 'cat', 0, 10).setOrigin(0,0);


        //defining the keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.anims.create({
            key: 'catwalk',
            frames: this.anims.generateFrameNumbers('cat', {start: 0, end: 4, first: 0}),
            frameRate: 30
        });

        //animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        });


        //score
        this.p1Score = 0;

        //score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);

        //game over flag
        this.gameOver = false;

        //60-second play cock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)eed to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        //check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.restart(this.p1Score);
        }

        this.starfield.tilePositionX -= 4;
        if (!this.gameOver) {
            //update rocket
            this.p1Rocket.update(); //this update isn't the same as the one above, this one is bound to the rocket

            //update spaceships 
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        //check collisions (just calling the function)
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }

    }

    checkCollision(rocket, ship) {
        //checking as if the rocket were a rectangle and ships are rectangles and see if they collide
        //simple AABB checking
        if( rocket.x < ship.x + ship.width &&
            rocket.x +rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        ship.alpha = 0;                     //temporarily hide ship
        //create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');         //play explode animation
        boom.on('animationcomplete', () => {        //callback after animation completes
            ship.reset();                   //reset ship position
            ship.alpha = 1;                 //make ship visible again
            boom.destroy();                 //remove explosion sprute
        });

        //score increment and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        this.sound.play('sfx_explosion');
    }
}