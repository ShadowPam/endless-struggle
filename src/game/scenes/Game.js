import { EventBus } from "../EventBus";
import { Scene } from "phaser";

export class Game extends Scene {

  constructor() {
    super("Game");
  }

  init() {  
  }

  create() {
    // SCENE CREATION
    this.cameras.main.fadeIn(500, 0, 0, 0);
    this.bg = this.add.image(960, 330, "background");
    this.bg.setAlpha(1);

    this.stats = this.add
      .text(300, 100, 
        "Attack:  " + this.game.config.initData.mcAttack + "\n" +
        "Defence: " + this.game.config.initData.mcDefence + "\n" +
        "Shield: " + this.game.config.initData.mcShield + "\n" +
        "Dodge: " + this.game.config.initData.mcDodge*100 + "% | " + this.game.config.initData.mcDodgeTimer ,{
        fontFamily: "Arial Black",
        fontSize: 18,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
        align: "left",
      })
      .setOrigin(0.5);

    this.round = this.add
      .text(1620, 100, this.game.config.initData.currentRound, {
        fontFamily: "Arial Black",
        fontSize: 18,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
        align: "center",
      })
      .setOrigin(0.5);

    // MC CREATION
    this.add
      .text(445, 500, this.game.config.initData.mcName, {
        fontFamily: "Arial Black",
        fontSize: 18,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
        align: "center",
      })
      .setOrigin(0.5);

    this.mc = this.add.sprite(450, 600)
    this.mc.scale = 5;
    this.mc.play("mcAnimationIdle")

    this.add.rectangle(450, 700, 150, 20).setStrokeStyle(4, 0x000000);
    this.mcBar = this.add.rectangle(450 - 150 / 2 + 2, 700, 0, 16, 0xff0000);
    this.mcBar.width = this.game.config.initData.mcHp*(146/this.game.config.initData.mcMaxHp)

    this.mcBarText = this.add
      .text(450, 700, this.game.config.initData.mcHp + "/" + this.game.config.initData.mcMaxHp, {
        fontFamily: "Arial Black",
        fontSize: 14,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
        align: "center",
      })
      .setOrigin(0.5);

    // ENEMY CREATION
    this.enemyAttack = this.add
      .text(1420, 500, this.game.config.initData.enemyAttack, {
        fontFamily: "Arial Black",
        fontSize: 18,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
        align: "center",
      })
      .setOrigin(0.5);

    this.enemy = this.add.sprite(1470, 600, this.game.config.initData.enemyKey)
    this.enemy.scale = 5;

    this.enemy.play(this.game.config.initData.enemyKey + "AnimationIdle")

    this.enemyName = this.add
      .text(1470, 695, this.game.config.initData.enemyName, {
        fontFamily: "Arial Black",
        fontSize: 18,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
        align: "center",
      })
      .setOrigin(0.5);

    this.add.rectangle(1470, 725, 150, 20).setStrokeStyle(4, 0x000000);
    this.enemyBar = this.add.rectangle(1470 - 150 / 2 + 2, 725, 0, 16, 0xff0000);
    this.enemyBar.width = this.game.config.initData.enemyHp*(146/this.game.config.initData.enemyMaxHp)

    this.enemyBarText = this.add
      .text(1470, 725, this.game.config.initData.enemyHp + "/" + this.game.config.initData.enemyMaxHp, {
        fontFamily: "Arial Black",
        fontSize: 14,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
        align: "center",
      })
      .setOrigin(0.5);

    this.enemyJoke = this.add.text(1000, 600, "").setVisible(false)
    this.enemyJoke.setTint(0xFFFFFF);
    
    // function typewriteText(text)
    // {
    //   const length = text.length
    //   let i = 0
    //   this.Clock.addEvent({
    //     callback: () => {
    //       this.label.text += text[i]
    //       ++i
    //     },
    //     repeat: length - 1,
    //     delay: 200
    //   })
    // }
    this.cam = this.cameras.main;
    this.targetScene = this.scene.get("Modal"); // sleeping
    this.targetCam = this.targetScene.cameras.main;
    this.defaultWidth = this.cameras.default.width;
    // BUS
    EventBus.emit("current-scene-ready", this);

    // EVENTS
  }

  doAttackAnimate(props){
    const attackTimeline = this.add.timeline([
      {
        at: 0,
        run: () => {
          this.mc.x = 1350
          this.mc.y = 610
        }
      },
      {
        at: 100,
        run: () => {
          this.mc.play("mcAnimationAttack")
          this.mc.chain("mcAnimationIdle")
        }
      },
      {
        at: 500,
        run: () => {
          this.enemyBar.width = props.enemyHp*(146/props.enemyMaxHp)
          this.enemyBarText.setText(props.enemyHp + "/" + props.enemyMaxHp)
        }
      },
      {
        at: 900,
        run: () => {
          this.mc.x = 450
          this.mc.y = 600
          if(props.enemyAlive){
            props.setCombatState(3)
          }
          else{
            props.setCombatState(4)
          }
        }
      },
    ]);

    attackTimeline.play()
  }

  doShieldAnimate(props){
    const shieldTimeline = this.add.timeline([
      {
        at: 0,
        run: () => {

        }
      },
      {
        at: 100,
        run: () => {
          this.mc.play("mcAnimationAttack")
          this.mc.chain("mcAnimationIdle")
        }
      },
      {
        at: 500,
        run: () => {

        }
      },
      {
        at: 900,
        run: () => {
          props.setCombatState(3)
          }
      },
    ]);

    shieldTimeline.play()
  }

  doDodgeAnimate(props){
    const dodgeTimeline = this.add.timeline([
      {
        at: 0,
        run: () => {

        }
      },
      {
        at: 100,
        run: () => {
          this.mc.play("enemy1AnimationDead")
          this.mc.chain("mcAnimationIdle")
        }
      },
      {
        at: 500,
        run: () => {

        }
      },
      {
        at: 900,
        run: () => {
          props.setCombatState(3)
          }
      },
    ]);

    dodgeTimeline.play()
  }

  getAttackedAnimate(props){
    const responseTimeline = this.add.timeline([
        {
          at: 500,
          run: () => {
            this.enemyJoke.setText(props.jokePromiseState.data)
            this.enemyJoke.setVisible(true)
            }
        },
        {
          at: 1000,
          run: () => {
            this.mcBar.width = props.mcHp*(146/props.mcMaxHp)
            this.mcBarText.setText(props.mcHp + "/" + props.mcMaxHp)
          }
        },
        {
          at: 3200,
          run: () => {
            this.enemyJoke.setVisible(false)
            props.setCombatState(0)
          }
        },
      ]);
    responseTimeline.play()
  }

  updateSceneTurn(props){
    this.stats.setText(
      "Attack:  " + props.mcAttack + "\n" +
      "Defence: " + props.mcDefence + "\n" +
      "Shield: " + props.mcShield + "\n" +
      "Dodge: " + props.mcDodge*100 + "% | " + props.mcDodgeTimer
    )
  }
  
  showEnemy(props){
    this.enemyBar.width = props.enemyHp*(146/props.enemyMaxHp)
    this.enemyBarText.setText(props.enemyHp + "/" + props.enemyMaxHp)
    this.enemyAttack.setText(props.enemyAttack)
    this.enemy.setTexture(props.enemyKey)
    this.enemy.play(props.enemyKey + "AnimationIdle")
    this.enemyName.setText(props.enemyName)
  }

  updateSceneRound(props){
    this.round.setText(props.currentRound)
    this.stats.setText(
      "Attack:  " + props.mcAttack + "\n" +
      "Defence: " + props.mcDefence + "\n" +
      "Shield: " + props.mcShield + "\n" +
      "Dodge: " + props.mcDodge*100 + "% | " + props.mcDodgeTimer
    )
  }

  // changeScene() {
  //   this.cameras.main.fadeOut(1000, 0, 0, 0, (camera, progress) => {
  //     if(progress === 1){
  //       this.scene.start("Modal");
  //     }
  //   });
  // }
  changeScene(props){
    EventBus.emit("current-scene-ready", this.targetScene);
  }
  
  changeToRewardScreen(props) {
    this.enemy.play(props.enemyKey+"AnimationDead")
    this.enemy.once('animationcomplete', ()=>{ 
      this.scene.transition({
        target: "Modal",
        sleep: true,
        duration: 2500,
        onUpdate: function (progress) {
          const t = Phaser.Math.Easing.Expo.InOut(progress);
  
          this.cam.setViewport(0, 0, (1 - t) * this.defaultWidth, this.cam.height);
          this.cam.setScroll(t * this.defaultWidth, 0);
          this.targetCam.setViewport(
            (1 - t) * this.defaultWidth,
            0,
            t * this.defaultWidth,
            this.targetCam.height
          );
          if(progress==1){
            props.setCombatState(5)
          }
        }
      });
    });
  }
}

