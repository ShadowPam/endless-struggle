import { Boot } from './scenes/Boot';
import { MainMenu } from './scenes/Game';
import Phaser from 'phaser';
import { Preloader } from './scenes/Preloader';

// Find out more information about the Game Config at:
// https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#000000',
    scene: [
        Boot,
        Preloader,
        MainMenu,
    ]
};

const StartGame = (parent) => {

    return new Phaser.Game({...config, parent: parent});

}

export default StartGame;
