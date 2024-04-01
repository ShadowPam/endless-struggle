import { EventBus } from "../EventBus";
import { Scene } from "phaser";

export class MainMenu extends Scene {
  logoTween;

  constructor() {
    super("MainMenu");
  }

  create() {
    this.cameras.main.fadeIn(500, 0, 0, 0);
    const bg = this.add.image(960, 330, "background");
    bg.scale = 0.315;
    bg.setAlpha(1);

    EventBus.on("hello", (data) => {
      mc.play("mcAnimationAttack");
      mc.play("mcAnimationIdle");
    });

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

    // MC
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

    const mcConfigIdle = {
      key: "mcAnimationIdle",
      frames: this.anims.generateFrameNumbers("mc", { frames: [0, 1] }),
      frameRate: 5,
      repeat: -1,
    };

    const mcConfigAttack= {
      key: "mcAnimationAttack",
      frames: this.anims.generateFrameNumbers("mc", { frames: [64,65,66,67,68,69,70,71] }),
      frameRate: 20,
      repeat: 1,
    };
    this.anims.create(mcConfigIdle);
    this.anims.create(mcConfigAttack);


    const mc = this.add.sprite(450, 600, "mc").play("mcAnimationIdle");
    mc.scale = 5;

    this.add.rectangle(450, 700, 150, 20).setStrokeStyle(4, 0x000000);
    const mcbar = this.add.rectangle(450 - 150 / 2 + 2, 700, 0, 16, 0xff0000);
    mcbar.width = 130;

    this.add
      .text(450, 700, "89/100", {
        fontFamily: "Arial Black",
        fontSize: 14,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
        align: "center",
      })
      .setOrigin(0.5);

    // ENEMY
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

    const enemyConfig = {
      key: "eAnimation",
      frames: this.anims.generateFrameNumbers("enemy", {
        frames: [6, 6, 7, 7],
      }),
      frameRate: 5,
      repeat: -1,
    };
    this.anims.create(enemyConfig);
    const enemy = this.add.sprite(1470, 600, "enemy").play("eAnimation");
    enemy.scale = 5;

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
    const enemybar = this.add.rectangle(
      1470 - 150 / 2 + 2,
      725,
      0,
      16,
      0xff0000
    );
    enemybar.width = 70;

    this.add
      .text(1470, 725, "48/100", {
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
  }

  changeScene() {
    if (this.logoTween) {
      this.logoTween.stop();
      this.logoTween = null;
    }

    this.scene.start("Game");
  }
}
