import { EventBus } from "../EventBus";
import { Scene } from "phaser";

export class Modal extends Scene {
    constructor() {
        super("Modal");
    }

    init() {}

    create() {
        // SCENE CREATION
        this.bg = this.add.image(960, 384, "ModalBackground");
        this.bg.setAlpha(1);

        this.basicRewards = [{}, {}, {}];
        this.rareRewards = [{}, {}, {}];
        
        function createRewardsCB(object, index) {
            let xPos;
            if (index === 0) {
                xPos = 380;
            } else if (index === 1) {
                xPos = 960;
            } else if (index === 2) {
                xPos = 1530;
            }
            const bg = this.add.rectangle(xPos, 360, 330, 420, this.colors.background);
            bg.alpha = 0.4;
            const outerBorder = this.add
                .rectangle(xPos, 360, 330, 420)
                .setStrokeStyle(15, this.colors.outerBorder);
            const innerBorder = this.add.rectangle(xPos, 360, 320, 410).setStrokeStyle(8, this.colors.innerBorder);
            const image = this.add.image(xPos, 300, "");
            image.scale = 1;
            const text = this.add
                .text(xPos, 480, "", {
                    fontFamily: "Marcellus",
                    fontSize: 50,
                    color: this.colors.innerTextColor,
                    stroke: this.colors.outerTextColor,
                    strokeThickness: 2,
                    align: "center",
                })
                .setOrigin(0.5);
            return this.add
                .container(0, 0, [bg, outerBorder, innerBorder, image, text])
                .setVisible(false);
        }
        // basic colors
        this.colors = {
            background: 0xffffff,
            outerBorder: 0x4d2f00,
            innerBorder: 0x301d00,
            innerTextColor: "#000000",
            outerTextColor: "#828282"
        }
        this.basicRewards = this.basicRewards.map(createRewardsCB, this);
        // rare colors
        this.colors = {
            background: 0xffda73,
            outerBorder: 0x4d4d4d,
            innerBorder: 0x292929,
            innerTextColor: "#000000",
            outerTextColor: "#828282"
        }
        this.rareRewards = this.rareRewards.map(createRewardsCB, this);

        this.cam = this.cameras.main;
        this.targetScene = this.scene.get("Game"); // sleeping
        this.targetCam = this.targetScene.cameras.main;
        this.defaultWidth = this.cameras.default.width;

        // BUS
        EventBus.emit("current-scene-ready", this);

        // EVENTS
    }

    updateRewardsCB(rewards, index) {
            this.rewards[index].list[3].setTexture(rewards.image);
            this.rewards[index].list[4].setText(rewards.statText);
            // reset hoover effect
            this.rewards[index].list[0].alpha = 0.4;
    }

    showRewards(props, bool) {
        this.keepRewardsUpdated(props)
        props.map(this.updateRewardsCB, this);
            this.rewards[0].setVisible(bool);
            this.rewards[1].setVisible(bool);
            this.rewards[2].setVisible(bool);
    }

    changeScene(props) {
        EventBus.emit("current-scene-ready", this.targetScene);
    }

    keepRewardsUpdated(props){
        if(props[0].tier == "basic"){
            this.rewards = this.basicRewards
        }
        if(props[0].tier == "rare"){
            this.rewards = this.rareRewards
        }
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
                this.targetCam.setViewport(0, 0, t * this.defaultWidth, this.targetCam.height);
                this.targetCam.setScroll((1 - t) * this.defaultWidth, 0);

                if (progress == 1) {
                    props.setCombatState(7);
                }
            },
        });
    }
}
