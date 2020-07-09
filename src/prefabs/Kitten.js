//Kiteen prefab
class Kitten extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);

        //add object to existing scene
        scene.add.existing(this);

        //store pointValue
        this.points = pointValue;
    }

    update(){
        //move Kitten moves left
        this.x -= game.settings.kittenSpeed;
        //wraparound from left to the right edge
        if(this.x <= 0 - this.width) {
            this.x = game.config.width;
        }

    }

    reset() {
        this.x = game.config.width;
    }

} 