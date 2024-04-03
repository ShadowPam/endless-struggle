import { EventBus } from "../EventBus";
import { Scene } from "phaser";

export class Game extends Scene {
  logoTween;

  constructor() {
    super("Game");
  }

  init() {    
    EventBus.removeListener("initAttack")
  }

  create() {

    // SCENE CREATION
    this.cameras.main.fadeIn(500, 0, 0, 0);
    var bg = this.add.image(960, 330, "background");
    bg.scale = 0.315;
    bg.setAlpha(1);

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

    var mc = this.add.sprite(450, 600)
    mc.scale = 5;

    mc.play("mcAnimationIdle")

    this.add.rectangle(450, 700, 150, 20).setStrokeStyle(4, 0x000000);
    var mcBar = this.add.rectangle(450 - 150 / 2 + 2, 700, 0, 16, 0xff0000);
    mcBar.width = 146;

    var mcBarText = this.add
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
    this.add
      .text(1420, 500, "DMG", {
        fontFamily: "Arial Black",
        fontSize: 18,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
        align: "center",
      })
      .setOrigin(0.5);

    var enemy = this.add.sprite(1470, 600, "enemy")
    enemy.scale = 5;

    enemy.play("eAnimation")

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
    var enemyBar = this.add.rectangle(1470 - 150 / 2 + 2, 725, 0, 16, 0xff0000);
    enemyBar.width = 146;

    var enemyBarText = this.add
      .text(1470, 725, "100/100", {
        fontFamily: "Arial Black",
        fontSize: 14,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
        align: "center",
      })
      .setOrigin(0.5);

    // BUS
    EventBus.emit("current-scene-ready", this);

    // EVENTS
    EventBus.on("initAttack", (data) => {
      console.log(data)
      mc.play("mcAnimationAttack")
      mc.chain("mcAnimationIdle")
      console.log(mc.anims.getFrameName())
      enemyBar.width = data.enemyHp*(146/data.enemyMaxHp)
      enemyBarText.setText(data.enemyHp + "/" + data.enemyMaxHp)

      mc.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        console.log(data)
        mcBar.width = data.mcHp*(146/data.mcMaxHp)
        mcBarText.setText(data.mcHp + "/" + data.mcMaxHp)
      })
    });

  }

  changeScene() {
    if (this.logoTween) {
      this.logoTween.stop();
      this.logoTween = null;
    }

    this.scene.start("idk");
  }
}
