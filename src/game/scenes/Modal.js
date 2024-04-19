import { EventBus } from "../EventBus";
import { Scene } from "phaser";

export class Modal extends Scene {

  constructor() {
    super("Modal");
  }

  init() {    
  }

  create() {

    // SCENE CREATION
    this.bg = this.add.image(960, 384, "ModalBackground");
    this.bg.setAlpha(1);

    this.basicRewards = [{},{},{}]
    function createBasicRewardsCB(object, index) {
      let xPos
      if(index === 0){
        xPos = 380
      } else if(index === 1){
        xPos = 960
      } else if(index === 2){
        xPos = 1530
      }
      const bg = this.add.rectangle(xPos, 360, 330, 420, 0xffffff);
      bg.alpha = 0.4
      const outerBorder = this.add.rectangle(xPos, 360, 330, 420).setStrokeStyle(15, 0x4d2f00);
      const innerBorder = this.add.rectangle(xPos, 360, 320, 410).setStrokeStyle(8, 0x301d00);
      const image = this.add.image(xPos, 300, "")
      image.scale = 1;
      const text = this.add
        .text(xPos, 480, "", {
          fontFamily: "Marcellus",
          fontSize: 50,
          color: "#000000",
          stroke: "#828282",
          strokeThickness: 2,
          align: "center",  
        })
        .setOrigin(0.5);
      return this.add.container(0,0,[bg,outerBorder,innerBorder,image,text]).setVisible(false)
    }
    this.basicRewards = this.basicRewards.map(createBasicRewardsCB, this)

    this.cam = this.cameras.main;
    this.targetScene = this.scene.get("Game"); // sleeping
    this.targetCam = this.targetScene.cameras.main;
    this.defaultWidth = this.cameras.default.width;
   
    // BUS
    EventBus.emit("current-scene-ready", this);

    // EVENTS
  }

  updateBasicRewardsCB(rewards, index){
    this.basicRewards[index].list[3].setTexture(rewards.image)
    this.basicRewards[index].list[4].setText(rewards.statText)
    // reset hoover effect
    this.basicRewards[index].list[0].alpha = 0.4
  }

  showRewards(props,bool){
    props.map(this.updateBasicRewardsCB, this)
    this.basicRewards[0].setVisible(bool)
    this.basicRewards[1].setVisible(bool)
    this.basicRewards[2].setVisible(bool)
    console.log("hide")
  }

  changeScene(props){
    EventBus.emit("current-scene-ready", this.targetScene);
  }

  changeToCombatScreen(props) {
    this.scene.transition({
      target: "Game",
      sleep: true,
      duration: 2000,
      onUpdate: function (progress) {
        const t = Phaser.Math.Easing.Quadratic.InOut(progress);

        this.cam.setViewport(
          t * this.defaultWidth,
          0,
          (1 - t) * this.defaultWidth,
          this.cam.height
        );
        this.targetCam.setViewport(
          0,
          0,
          t * this.defaultWidth,
          this.targetCam.height
        );
        this.targetCam.setScroll((1 - t) * this.defaultWidth, 0);

        if(progress==1){
          props.setCombatState(0)
        }
      }
    });
  }
}
