//CatTreat prefab
class CatTreat extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        //add object to existing scene
        scene.add.existing(this);

        //create a custom property for the rocket
        this.isFiring = false; //creating a boolean; checking the Rocket's firing status

        this.sfxRocket = scene.sound.add('sfx_rocket'); //add rocket sfx

    }

    update(){
        //left/right moevement
        if(!this.isFiring) { //if the player is not firing and holding left key
            if(keyLEFT.isDown && this.x >= 47) {
                this.x -= 2;
            }else if(keyRIGHT.isDown && this.x <=578){
                this.x +=2;
            }
        }
        //fire button
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) { //JustDown= is button down compared to last frame?
            this.isFiring = true;
            this.sfxRocket.play(); //play sfx
        }
        //if fired, move up
        if(this.isFiring && this.y >= 108) {
            this.y -= 2;
        }
        //reset on miss
        if(this.y <= 108) {
            this.isFiring = false;
            this.y = 431;
        }
    }

    //reset rocket to the "ground"
    reset() {
        this.isFiring = false;
        this.y = 431;
    }

}