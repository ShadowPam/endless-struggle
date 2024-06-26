import { GameView } from "../views/GameView";
import { ModalView } from "../views/ModalView";
import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import { PhaserGame } from "../game/PhaserGame";
import { EventBus } from "../game/EventBus";
const Game = observer(function GameRender(props) {
    const phaserRef = useRef();

    //right now we get an error that is not a problem but annoying can be fixed with the following however
    //only if you are logged in, if you are logged out this breaks the game, i currently dont know why
    /* useEffect(() => {
        props.model.initializeModel();
    }, []) */
    
    props.model.initializeModel();

    function onMenuACB() {
        props.model.loadStateSnapshot();
        props.model.setZeroOnReady(true);
        props.model.setCombatState(-1); // -1 = on another url
    }

    function onAttackACB() {
        props.model.declareActionIntent("attack");
        props.model.setCombatState(1);
    }

    function onShieldACB() {
        props.model.declareActionIntent("shield");
        props.model.setCombatState(1);
    }

    function onDodgeACB() {
        props.model.declareActionIntent("dodge");
        props.model.setCombatState(1);
    }

    function onLeftACB() {
        props.model.declareRewardIntent(0); // 0 = left
        props.model.setCombatState(6);
    }

    function onMiddleACB() {
        props.model.declareRewardIntent(1); // 1 = middle
        props.model.setCombatState(6);
    }

    function onRightACB() {
        props.model.declareRewardIntent(2); // 2 = right
        props.model.setCombatState(6);
    }

    function mouseOnLeftACB() {
        const scene = phaserRef.current.scene;
        scene.rewards[0].list[0].alpha = 1;
    }

    function mouseOffLeftACB() {
        const scene = phaserRef.current.scene;
        scene.rewards[0].list[0].alpha = 0.4;
    }

    function mouseOnMiddleACB() {
        const scene = phaserRef.current.scene;
        scene.rewards[1].list[0].alpha = 1;
    }

    function mouseOffMiddleACB() {
        const scene = phaserRef.current.scene;
        scene.rewards[1].list[0].alpha = 0.4;
    }

    function mouseOnRightACB() {
        const scene = phaserRef.current.scene;
        scene.rewards[2].list[0].alpha = 1;
    }

    function mouseOffRightACB() {
        const scene = phaserRef.current.scene;
        scene.rewards[2].list[0].alpha = 0.4;
    }

    // progress combat state when joke is aquired
    useEffect(() => {
        if (props.model.jokePromiseState.data != null && props.model.combatState === 1) {
            props.model.setCombatState(2);
        }
    }, [props.model.jokePromiseState.data]);

    // do actions based on the combat state
    useEffect(() => {
        const scene = phaserRef.current.scene;
        if (scene != null) {

            // 0 - you can declare your action intent
            if (props.model.combatState == 0) {
                props.model.takeStateSnapshot();
                props.model.progressDodgeTimer();
                props.model.setMcDamage();
                props.model.setEnemyDamage();
                // randomize enemy attack
                scene.updateSceneTurn(props.model);
            }

            // 1 - you have made your choice and request a joke
            if (props.model.combatState == 1) {
                props.model.getJoke(
                    ["Any"],
                    ["nsfw", "religious", "political", "racist", "sexist", "explicit"],
                    true
                );
            }

            // 2 - you have gotten your joke and will perform your declared action
            if (props.model.combatState == 2) {
                if (props.model.actionIntent == "attack") {
                    props.model.doAttack();
                    scene.doAttackAnimate(props.model); // combatState is updated at the end of animation -> 3 || 4
                }
                if (props.model.actionIntent == "shield") {
                    props.model.doShield();
                    scene.doShieldAnimate(props.model); // combatState is updated at the end of animation -> 3
                }
                if (props.model.actionIntent == "dodge") {
                    props.model.doDodge();
                    scene.doDodgeAnimate(props.model); // combatState is updated at the end of animation -> 3
                }
            }

            // 3 - you have performed your action, now the enemy will attack
            if (props.model.combatState == 3) {
                props.model.getAttacked();
                scene.getAttackedAnimate(props.model); // combatState is updated at the end of animation -> 0 || -1
            }

            // 4 - you have performed your action and the enemy was defeated
            if (props.model.combatState == 4) {
                // choose reward method
                props.model.getRewards();
                scene.changeToRewardScreen(props.model); // combatState is updated at the end of animation -> 5
                scene.changeScene();
            }

            // 5 - enemy died and you can now choose one of three rewards on screen.
            if (props.model.combatState == 5) {
                scene.showRewards(props.model.currentRewards, true);
            }

            // 6 - Reward has been chosen and the scene changes
            if (props.model.combatState == 6) {
                props.model.collectReward();
                scene.showRewards(props.model.currentRewards, false);
                props.model.getEnemy();
                scene.targetScene.showNewEnemy(props.model);
                scene.changeToCombatScreen(props.model); // combatState is updated at the end of animation -> 7
                scene.changeScene();
            }

            // 7 - a new round is prepared
            if (props.model.combatState == 7) {
                props.model.progressRound();
                props.model.setNewSeed();
                props.model.setNewPRNGs();
                scene.updateSceneRound(props.model); // things that happen once per round
                props.model.setCombatState(0);
            }
        }
    }, [props.model.combatState]);

    function showPromiseState(promiseState) {
        if (promiseState.promise && !promiseState.data && !promiseState.error) {
            return { src: "/assets/LoadingGif.gif", alt: "loadingImage" };
        }
        if (promiseState.promise && !promiseState.data && promiseState.error) {
            return { src: "/assets/errorImage.png", alt: "ErrorImage" };
        }
        return { src: "/assets/transparentBox.png", alt: "NoData" };
    }
    if (props.model.combatState == 5) {
        return (
            <>
                <PhaserGame ref={phaserRef} />
                <ModalView
                    onMenu={onMenuACB}
                    mouseOnLeft={mouseOnLeftACB}
                    mouseOffLeft={mouseOffLeftACB}
                    mouseOnMiddle={mouseOnMiddleACB}
                    mouseOffMiddle={mouseOffMiddleACB}
                    mouseOnRight={mouseOnRightACB}
                    mouseOffRight={mouseOffRightACB}
                    onLeft={onLeftACB}
                    onMiddle={onMiddleACB}
                    onRight={onRightACB}
                />
            </>
        );
    } else {
        // kan nog trimmas ned
        const initData = {
            mcName: props.model.mcName,
            mcMaxHp: props.model.mcMaxHp,
            mcHp: props.model.mcHp,
            mcAttack: props.model.mcAttack,
            mcDamage: props.model.mcDamage,
            mcShield: props.model.mcShield,
            mcDefence: props.model.mcDefence,
            mcDodge: props.model.mcDodge,
            mcDodgeTimer: props.model.mcDodgeTimer,
            enemyName: props.model.enemyName,
            enemyKey: props.model.enemyKey,
            enemyMaxHp: props.model.enemyMaxHp,
            enemyHp: props.model.enemyHp,
            enemyDamage: props.model.enemyDamage,
            enemyAttack: props.model.enemyAttack,
            enemyDamageSpread: props.model.enemyDamageSpread,
            currentRound: props.model.currentRound,
        };
        // är det valid passa funktioner utan att göra en ACB, och istället skicka hela props.model
        return (
            <>
                <PhaserGame ref={phaserRef} initData={initData} model={props.model} />
                <GameView
                    combatState={props.model.combatState}
                    onAttack={onAttackACB}
                    onShield={onShieldACB}
                    onDodge={onDodgeACB}
                    onMenu={onMenuACB}
                    jokeStatus={showPromiseState(props.model.jokePromiseState)}
                />
            </>
        );
    }
});

export { Game };
