import { EventBus } from "../EventBus";
import { Scene } from "phaser";

export class Game extends Scene {
  logoTween;

  constructor() {
    super("Game");
  }

  init() {    
  }

  create() {

    // SCENE CREATION
    this.cameras.main.fadeIn(500, 0, 0, 0);
    this.bg = this.add.image(960, 330, "background");
    this.bg.scale = 0.315;
    this.bg.setAlpha(1);

    this.add
      .text(300, 100, "Stats", {
        fontFamily: "Arial Black",
        fontSize: 18,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
        align: "center",
      })
      .setOrigin(0.5);

    this.add
      .text(1620, 100, "Current round", {
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
      .text(450, 500, "Player name", {
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
    this.mcBar.width = 146;

    this.mcBarText = this.add
      .text(450, 700, "100/100", {
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
      .text(1420, 500, "DMG", {
        fontFamily: "Arial Black",
        fontSize: 18,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
        align: "center",
      })
      .setOrigin(0.5);

    this.enemy = this.add.sprite(1470, 600, "enemy")
    this.enemy.scale = 5;
    this.enemy.hasDied = false

    this.enemy.play("enemyAnimationIdle")

    this.add
      .text(1470, 695, "Enemy name", {
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
    this.enemyBar.width = 146;

    this.enemyBarText = this.add
      .text(1470, 725, "100/100", {
        fontFamily: "Arial Black",
        fontSize: 14,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
        align: "center",
      })
      .setOrigin(0.5);

    this.enemyAttack = this.add.text(1000, 600, "").setVisible(false)
    this.enemyAttack.setTint(0xFFFFFF);

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

    this.enemyAlive = props.enemyAlive
    this.mcMaxHp = props.mcMaxHp
    this.mcHp = props.mcHp
    attackTimeline.play()
  }

  getAttackedAnimate(props){
    const responseTimeline = this.add.timeline([
        {
          at: 500,
          run: () => {
            this.enemyAttack.setText(props.jokePromiseState.data)
            this.enemyAttack.setVisible(true)
            }
        },
        {
          at: 1000,
          run: () => {
            this.mcBar.width = this.mcHp*(146/this.mcMaxHp)
            this.mcBarText.setText(this.mcHp + "/" + this.mcMaxHp)
          }
        },
        {
          at: 3200,
          run: () => {
            this.enemyAttack.setVisible(false)
            props.setCombatState(0)
          }
        },
      ]);
    responseTimeline.play()
  }
  
  // changeScene() {
  //   if (this.logoTween) {
  //     this.logoTween.stop();
  //     this.logoTween = null;
  //   }

  //   this.scene.start("idk");
  // }
}
