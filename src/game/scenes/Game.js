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

    this.statsBg = this.add.rectangle(110, 50, 220, 100, 0x000000, 0.4);

    this.stats = this.add
      .text(135, 5, 
        this.game.config.initData.mcAttack + "\n" +
        this.game.config.initData.mcDefence + "\n" +
        this.game.config.initData.mcDodge*100 + "%",{
        fontFamily: "Marcellus",
        fontSize: 18,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
        align: "left",
      })
      .setOrigin(0,0);
    
    this.statsText = this.add
      .text(5, 5, 
        "Attack:  " + "\n" +
        "Defence: " + "\n" +
        "Dodge Chance: ",{
        fontFamily: "Marcellus",
        fontSize: 18,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
        align: "left",
      })
      .setOrigin(0,0);
    
      this.roundText = this.add
      .text(960, 160, "ROUND", {
        fontFamily: "Marcellus",
        fontSize: 18,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
        align: "center",
      })
      .setOrigin(0.5);

    this.round = this.add
      .text(960, 120, this.game.config.initData.currentRound, {
        fontFamily: "Marcellus",
        fontSize: 50,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 6,
        align: "center",
      })
      .setOrigin(0.5);

    // MC CREATION
    this.add
      .text(445, 500, this.game.config.initData.mcName, {
        fontFamily: "Marcellus",
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
    this.mc.setDepth(0.5)

    this.add.rectangle(450, 700, 150, 20).setStrokeStyle(4, 0x000000);
    this.mcBar = this.add.rectangle(450 - 150 / 2 + 2, 700, 0, 16, 0xff0000);
    this.mcBar.width = this.game.config.initData.mcHp*(146/this.game.config.initData.mcMaxHp)

    this.mcBarText = this.add
      .text(450, 700, this.game.config.initData.mcHp + "/" + this.game.config.initData.mcMaxHp, {
        fontFamily: "Marcellus",
        fontSize: 16,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
        align: "center",
      })
      .setOrigin(0.5);

    this.mcDamageIndicatorImage = this.add.image(565, 565, "AttackIcon")
    this.mcDamageIndicatorImage.scale = 1.2
    this.mcDamageIndicatorText = this.add
      .text(548, 565, this.game.config.initData.mcDamage, {
        fontFamily: "Marcellus",
        fontSize: 25,
        color: "#ffffff",
        stroke: "#3d0700",
        strokeThickness: 6,
        align: "left",
      })
      .setOrigin(1, 0.5);

      this.mcShieldIndicatorImage = this.add.image(565, 610, "ShieldIcon")
      this.mcShieldIndicatorImage.scale = 1.2
      this.mcShieldIndicatorText = this.add
        .text(548, 610, this.game.config.initData.mcShield, {
          fontFamily: "Marcellus",
          fontSize: 25,
          color: "#ffffff",
          stroke: "#00353d",
          strokeThickness: 6,
          align: "left",
        })
        .setOrigin(1, 0.5);

      this.mcDodgeIndicatorImage = this.add.image(565, 655, "DodgeIcon")
      this.mcDodgeIndicatorImage.scale = 1.2
      this.mcDodgeIndicatorText = this.add
        .text(548, 655, this.game.config.initData.mcDodgeTimer, {
          fontFamily: "Marcellus",
          fontSize: 25,
          color: "#ffffff",
          stroke: "#093d00",
          strokeThickness: 6,
          align: "center",
        })
        .setOrigin(1, 0.5);

    // ENEMY CREATION
    this.enemyDamagePotential = this.add
      .text(1470, 500, 
        (this.game.config.initData.enemyAttack - Math.round(this.game.config.initData.enemyAttack*this.game.config.initData.enemyDamageSpread))
        + " - " + (this.game.config.initData.enemyAttack + Math.round(this.game.config.initData.enemyAttack*this.game.config.initData.enemyDamageSpread)), {
        fontFamily: "Marcellus",
        fontSize: 25,
        color: "#ffffff",
        stroke: "#3d0700",
        strokeThickness: 6,
        align: "center",
      })
      .setOrigin(0.5);

    this.enemy = this.add.sprite(1470, 600, this.game.config.initData.enemyKey)
    this.enemy.scale = 5;

    this.enemy.play(this.game.config.initData.enemyKey + "AnimationIdle")

    this.enemyName = this.add
      .text(1470, 695, this.game.config.initData.enemyName, {
        fontFamily: "Marcellus",
        fontSize: 20,
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
        fontFamily: "Marcellus",
        fontSize: 16,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
        align: "center",
      })
      .setOrigin(0.5);

    this.enemyDamageIndicatorImage = this.add.image(1325, 565, "AttackIcon")
    this.enemyDamageIndicatorImage.scale = 1.2
    this.enemyDamageIndicatorImage.flipX=true
    this.enemyDamageIndicatorText = this.add
      .text(1342, 565, this.game.config.initData.enemyDamage, {
        fontFamily: "Marcellus",
        fontSize: 25,
        color: "#ffffff",
        stroke: "#3d0700",
        strokeThickness: 6,
        align: "right",
      })
      .setOrigin(0, 0.5);
    
    this.enemyJoke = this.add.text(990, 500, "", {
      fontFamily: "Marcellus",
        fontSize: 18,
        color: "#ffffff",
        stroke: "#3d0700",
        strokeThickness: 7,
        align: "left",
    }).setVisible(false)
    this.enemyJoke.setOrigin(0, 0);
    this.enemyJoke.setTint(0xFFFFFF);
    this.enemyJoke.setWordWrapWidth(300);
    this.enemyJoke.setDepth(1)
    
    this.cam = this.cameras.main;
    this.targetScene = this.scene.get("Modal"); // sleeping
    this.targetCam = this.targetScene.cameras.main;
    this.defaultWidth = this.cameras.default.width;

    // BUS
    EventBus.emit("current-scene-ready", this);
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
          this.enemy.anims.pause()
          this.enemy.setTint(0xff0000, 0xffff00, 0xff0000, 0xff0000)
          this.enemy.x = 1470 + 10
          this.enemy.y = 600 - 1
        }
      },
      {
        at: 700,
        run: () => {
          this.enemy.setTint(0xffffff, 0xffffff, 0xffffff, 0xffffff)
          this.enemy.x = 1470
          this.enemy.y = 600
          this.enemy.anims.resume()
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
        at: 600,
        run: () => {
          this.mcShieldIndicatorText.setText(props.mcShield)
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
          this.mc.play("mcAnimationDodge")
          this.mc.chain("mcAnimationIdle")
        }
      },
      {
        at: 1450,
        run: () => {
          this.mcDodgeIndicatorText.setText(props.mcDodgeTimer)
        }
      },
      {
        at: 1500,
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
            this.tweens.add({
              targets: this.enemyJoke,
              x: -300,
              duration: 1000,
              repeat: 0,
              repeatDelay: 500,
              ease: 'Expo.easeIn',
          });
            }
        },
        {
          at: 1350,
          run: () => {
            if (props.mcDodgeRoll > props.mcDodge){
              if(props.mcShield > 0){
                this.mc.anims.pause()
                this.mc.setTint(0xffffff, 0x00f0ff, 0xffffff, 0x00f0ff)
                this.mcShieldIndicatorText.setText(props.mcShield)
              }
              else{
                this.mcBar.width = props.mcHp*(146/props.mcMaxHp)
                this.mcBarText.setText(props.mcHp + "/" + props.mcMaxHp)
                this.mcShieldIndicatorText.setText(props.mcShield)
                this.mc.anims.pause()
                this.mc.setTint(0xff0000, 0xffff00, 0xff0000, 0xff0000)
                this.mc.x = 450 - 10
                this.mc.y = 600 - 1
              }
            }
            else{
              this.mc.anims.pause()
              this.mc.scale = 4
              this.mc.setTint(0x00ff1f, 0xafffb8, 0xafffb8, 0xffffff)
              this.mc.x = 450 - 15
              this.mc.y = 600 - 15
            }
          }
        },
        {
          at: 1550,
          run: () => {
            this.mc.anims.resume()
            this.mc.setTint(0xffffff, 0xffffff, 0xffffff, 0xffffff)
            this.mc.x = 450
            this.mc.y = 600
            this.mc.scale = 5
          }
        },
        {
          at: 1600,
          run: () => {
            this.enemyJoke.setVisible(false)
            this.enemyJoke.x = 990
            this.enemyJoke.y = 500
            if (props.mcAlive) {
              props.setCombatState(0)
            }
            else{
              this.mc.play("mcAnimationDead")
              this.mc.once('animationcomplete', ()=>{ 
                props.setCombatState(-1)
                window.location.hash = "#/gameover";
              })
            }
          }
        },
      ]);
      this.enemyJoke.setText("")
      this.enemyJoke.setVisible(true)
      const initialDelay = 1000;
      const delay = 35;
      const iStartValue = -Math.round(initialDelay/delay);
      const length = props.jokePromiseState.data.length;
      let i = iStartValue
      this.time.addEvent({
          callback: () => {
          if(i>=0){
            this.enemyJoke.text += props.jokePromiseState.data[i];
          }
          ++i
          if(i==length){
            responseTimeline.play()
          }
          },
          repeat: length - (1+iStartValue),
          delay: delay
        });
  }

  updateSceneTurn(props){
    this.stats.setText(
      props.mcAttack + "\n" +
      props.mcDefence + "\n" +
      Math.round(props.mcDodge*100) + "%"
    )
    this.enemyDamageIndicatorText.setVisible(true)
    this.enemyDamageIndicatorImage.setVisible(true)
    this.enemyDamageIndicatorText.setText(props.enemyDamage)
    this.mcDamageIndicatorText.setText(props.mcDamage)
    this.mcShieldIndicatorText.setText(props.mcShield)
    this.mcDodgeIndicatorText.setText(props.mcDodgeTimer)

    if(props.mcConfidence){
      this.mcDamageIndicatorImage.scale = 1.5
      this.mcDamageIndicatorText.scale = 1.18
      this.mcDamageIndicatorText.setColor("#ffff9a")
      this.mcDamageIndicatorImage.setTint(0xffffff, 0xffff00, 0xffffff, 0xffffff)
    }
    else{
      this.mcDamageIndicatorImage.scale = 1.2
      this.mcDamageIndicatorText.scale = 1
      this.mcDamageIndicatorText.setColor("#ffffff")
      this.mcDamageIndicatorImage.setTint(0xffffff, 0xffffff, 0xffffff, 0xffffff)
    }
  }
  
  showNewEnemy(props){
    this.enemyBar.width = props.enemyHp*(146/props.enemyMaxHp)
    this.enemyBarText.setText(props.enemyHp + "/" + props.enemyMaxHp)
    this.enemy.setTexture(props.enemyKey)
    this.enemy.play(props.enemyKey + "AnimationIdle")
    this.enemyName.setText(props.enemyName)
    this.enemyDamagePotential.setText((props.enemyAttack - Math.round(props.enemyAttack*props.enemyDamageSpread))
    + " - " + (props.enemyAttack + Math.round(props.enemyAttack*props.enemyDamageSpread)))
    this.enemyDamageIndicatorText.setVisible(false)
    this.enemyDamageIndicatorImage.setVisible(false)
  }

  updateSceneRound(props){
    this.round.setText(props.currentRound)
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

