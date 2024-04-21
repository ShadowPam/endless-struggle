import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        // const bg = this.add.image(960, 330, 'background');
        // bg.scale = 0.315
        // bg.setAlpha(0.9)

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(960, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(960-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');
        this.load.spritesheet({
        key: "mc",
        url: "spritesheetMC.png",
        frameConfig: {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 71,
            }
        });
        this.load.spritesheet({
        key: "enemy1",
        url: "spritesheetEnemy1.png",
        frameConfig: {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 72,
            }
        });
        this.load.spritesheet({
          key: "enemy2",
          url: "spritesheetEnemy2.png",
          frameConfig: {
              frameWidth: 32,
              frameHeight: 32,
              startFrame: 0,
              endFrame: 8,
              }
          });
        this.load.spritesheet({
          key: "enemy3",
          url: "spritesheetEnemy3.png",
          frameConfig: {
              frameWidth: 32,
              frameHeight: 32,
              startFrame: 0,
              endFrame: 6,
              }
          });
        
        this.load.image('background', 'background.png');
        this.load.image('ModalBackground', 'ModalBackground.png');
        this.load.image('AttackIcon', 'AttackIconScaled.png');
        this.load.image('ShieldIcon', 'ShieldIconScaled.png');
        this.load.image('DodgeIcon', 'DodgeIconScaled.png');
    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.
        this.anims.create({
            key: "mcAnimationIdle",
            frames: this.anims.generateFrameNumbers("mc", { frames: [0, 1] }),
            frameRate: 5,
            repeat: -1,
          });
      
        this.anims.create({
            key: "mcAnimationAttack",
            frames: this.anims.generateFrameNumbers("mc", { frames: [64,65,66,67,68,69,70,71] }),
            frameRate: 15,
            repeat: 0,
          });

        this.anims.create({
            key: "enemy1AnimationIdle",
            frames: this.anims.generateFrameNumbers("enemy1", {
              frames: [6, 6, 7, 7],
            }),
            frameRate: 5,
            repeat: -1,
          });

        this.anims.create({
            key: "enemy1AnimationDead",
            frames: this.anims.generateFrameNumbers("enemy1", {
              frames: [63,62,61,60,59,58,58,58,58],
            }),
            frameRate: 7,
            repeat: 0,
          });
        this.anims.create({
            key: "enemy2AnimationIdle",
            frames: this.anims.generateFrameNumbers("enemy2", {
              frames: [0,0,0,1,1,2,3,2,1],
            }),
            frameRate: 10,
            repeat: -1,
          });
        this.anims.create({
            key: "enemy2AnimationDead",
            frames: this.anims.generateFrameNumbers("enemy2", {
              frames: [1,0,4,5,6,7],
            }),
            frameRate: 3,
            repeat: 0,
          });
          this.anims.create({
            key: "enemy3AnimationIdle",
            frames: this.anims.generateFrameNumbers("enemy3", {
              frames: [0,0,0,0,1,1,1,0,1,1,1],
            }),
            frameRate: 5,
            repeat: -1,
          });
          this.anims.create({
            key: "enemy3AnimationDead",
            frames: this.anims.generateFrameNumbers("enemy3", {
              frames: [0,0,1,2,3,4,5],
            }),
            frameRate: 3,
            repeat: 0,
          });
        
        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        
        this.scene.start('Game');
    }
}
