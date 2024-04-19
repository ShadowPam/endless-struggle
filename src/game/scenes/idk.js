/* global Phaser, PhaserSceneWatcherPlugin */

class BootScene extends Phaser.Scene {
    preload() {
      this.load.image("face", "assets/pics/bw-face.png");
      this.load.image("arrow", "assets/sprites/longarrow.png");
      this.load.image("bg", "assets/tests/grave/background.png");
      this.load.spritesheet("mummy", "assets/animations/mummy37x45.png", {
        frameWidth: 37,
        frameHeight: 45
      });
    }
  
    create() {
      this.anims.create({
        key: "walk",
        frames: this.anims.generateFrameNumbers("mummy"),
        frameRate: 12,
        repeat: -1
      });
  
      this.scene.stop();
      this.scene.launch("SceneA");
      this.scene.launch("SceneB").sleep("SceneB");
    }
  }
  
  class SceneA extends Phaser.Scene {
    create() {
      this.face = this.add.image(0, 0, "face").setOrigin(0);
      this.arrow = this.add.image(400, 300, "arrow").setOrigin(0, 0.5);
  
      var cam = this.cameras.main;
      var targetScene = this.scene.get("SceneB"); // sleeping
      var targetCam = targetScene.cameras.main;
      var defaultWidth = this.cameras.default.width;
      
      cam.setName("A");
  
      this.input.on(
        "pointerdown",
        function () {
          this.scene.transition({
            target: "SceneB",
            sleep: true,
            duration: 2000,
            onUpdate: function (progress) {
              const t = Phaser.Math.Easing.Quadratic.InOut(progress);
  
              cam.setViewport(
                t * defaultWidth,
                0,
                (1 - t) * defaultWidth,
                cam.height
              );
              targetCam.setViewport(
                0,
                0,
                t * defaultWidth,
                targetCam.height
              );
              targetCam.setScroll((1 - t) * defaultWidth, 0);
              
              // console.debug("progress", progress);
              // Just checking
              console.assert(cam.width > 0, "Camera %s width should be positive", cam.name);
              console.assert(targetCam.width > 0, "Camera %s width should be positive", targetCam.name);
            }
          });
        },
        this
      );
    }
  
    update(time, delta) {
      this.arrow.angle += 0.12 * delta;
    }
  }
  
  class SceneB extends Phaser.Scene {
    create() {
      this.add.image(400, 300, "bg");
  
      var mummy = this.add.sprite(0, 450, "mummy").play("walk");
  
      this.add.tween({
        targets: mummy,
        props: { x: 800 },
        duration: 18000,
        loop: -1
      });
  
      var cam = this.cameras.main;
      var targetScene = this.scene.get("SceneA"); // sleeping
      var targetCam = targetScene.cameras.main;
      var defaultWidth = this.cameras.default.width;
  
      cam.setBackgroundColor(colors.hexColors.red);
      cam.setName("B");
  
      this.input.on(
        "pointerdown",
        function () {
          this.scene.transition({
            target: "SceneA",
            sleep: true,
            duration: 2000,
            onUpdate: function (progress) {
              const t = Phaser.Math.Easing.Quadratic.InOut(progress);
  
              cam.setViewport(0, 0, (1 - t) * defaultWidth, cam.height);
              cam.setScroll(t * defaultWidth, 0);
              targetCam.setViewport(
                (1 - t) * defaultWidth,
                0,
                t * defaultWidth,
                targetCam.height
              );
              
              // console.debug("progress", progress);
              // Just checking
              console.assert(cam.width > 0, "Camera %s width should be positive", cam.name);
              console.assert(targetCam.width > 0, "Camera %s width should be positive", targetCam.name);
            }
          });
        },
        this
      );
    }
  }
  
  document.getElementById("version").textContent = "Phaser v" + Phaser.VERSION;
  
  var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "phaser-example",
    scene: [new BootScene("Boot"), new SceneA("SceneA"), new SceneB("SceneB")],
    plugins: {
      global: [
        { key: "SceneWatcher", plugin: PhaserSceneWatcherPlugin, start: true }
      ]
    },
    loader: {
      baseURL: "https://labs.phaser.io",
      crossOrigin: "anonymous"
    }
  };
  
  var game = new Phaser.Game(config);