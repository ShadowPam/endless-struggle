import { GameView } from "../views/GameView";
import { ModalView } from "../views/ModalView";
import { observer } from "mobx-react-lite";
import { useEffect, useRef} from "react";
import { PhaserGame } from "../game/PhaserGame";
import { EventBus } from "../game/EventBus";

const Game = observer(
  function GameRender(props){

    const phaserRef = useRef();

    // if scene.scene.key == "game"
    function onAttackACB() {
      props.model.declareActionIntent("attack")
      props.model.setCombatState(1)
    }

    function onShieldACB() {
      props.model.declareActionIntent("shield")
      props.model.setCombatState(1)
    }

    function onDodgeACB() {
      props.model.declareActionIntent("dodge")
      props.model.setCombatState(1)
    }

    function onLeftACB() {
      props.model.declareRewardIntent(0) // 0 = left
      props.model.setCombatState(6)
    }

    function onMiddleACB() {
      props.model.declareRewardIntent(1) // 1 = middle
      props.model.setCombatState(6)
    }

    function onRightACB() {
      props.model.declareRewardIntent(2) // 2 = right
      props.model.setCombatState(6)
    }

    function mouseOnLeftACB(){
      const scene = phaserRef.current.scene
      scene.basicRewards[0].list[0].alpha = 1
    }

    function mouseOffLeftACB(){
      const scene = phaserRef.current.scene
      scene.basicRewards[0].list[0].alpha = 0.4
    }

    function mouseOnMiddleACB(){
      const scene = phaserRef.current.scene
      scene.basicRewards[1].list[0].alpha = 1
    }

    function mouseOffMiddleACB(){
      const scene = phaserRef.current.scene
      scene.basicRewards[1].list[0].alpha = 0.4
    }

    function mouseOnRightACB(){
      const scene = phaserRef.current.scene
      scene.basicRewards[2].list[0].alpha = 1
    }

    function mouseOffRightACB(){
      const scene = phaserRef.current.scene
      scene.basicRewards[2].list[0].alpha = 0.4
    }

    // progress combat state when joke is aquired
    useEffect(() => {
      if(props.model.jokePromiseState.data != null && props.model.combatState === 1){
        props.model.setCombatState(2)
      }
    }, [props.model.jokePromiseState.data]);


    // do actions based on the combat state
    useEffect(() => {
      const scene = phaserRef.current.scene
      if(scene != null){
      console.log(props.model.combatState)

      // 0 - you can declare your action intent
      if(props.model.combatState == 0){
        props.model.progressTurn()
        scene.updateSceneTurn(props.model)
      }

      // 1 - you have made your choice and request a joke
      if(props.model.combatState == 1){
        props.model.getJoke(["Any"], ["nsfw","religious","political","racist","sexist","explicit"], true)
      }

      // 2 - you have gotten your joke and will perform your declared action
      if(props.model.combatState == 2){
        if (props.model.actionIntent == "attack"){
          console.log("dwa")
          props.model.doAttack()
          scene.doAttackAnimate(props.model) // combatState is updated at the end of animation -> 3 || 4
        }
        if (props.model.actionIntent == "shield"){
          props.model.doShield()
          scene.doShieldAnimate(props.model) // combatState is updated at the end of animation -> 3
        }
        if (props.model.actionIntent == "dodge"){
          props.model.doDodge()
          scene.doDodgeAnimate(props.model) // combatState is updated at the end of animation -> 3
        }
      }

      // 3 - you have performed your action, now the enemy will attack
      if(props.model.combatState == 3){
        props.model.getAttacked()
        scene.getAttackedAnimate(props.model) // combatState is updated at the end of animation -> 0 (senare till game over)
      }

      // 4 - you have performed your action and the enemy was defeated
      if(props.model.combatState == 4){
        // choose reward method
        scene.changeToRewardScreen(props.model) // combatState is updated at the end of animation -> 5
        scene.changeScene()
      }

      // 5 - enemy died and you can now choose one of three rewards on screen.
      if(props.model.combatState == 5){
        props.model.getBasicRewards()
        scene.showRewards(props.model.currentRewards, true)
      }

      // 6 - Reward has been chosen and the scene changes back and a new round is prepared
      if(props.model.combatState == 6){
        props.model.collectReward()
        scene.showRewards(props.model.currentRewards, false)
        scene.changeToCombatScreen(props.model) // combatState is updated at the end of animation -> 0
        scene.changeScene()
        props.model.getEnemy()
        props.model.progressRound()
        scene.targetScene.updateSceneRound(props.model)
      }
    }
    }, [props.model.combatState]);


    function showPromiseState(promiseState){
      if (promiseState.promise
          && !promiseState.data
          && !promiseState.error){
          return({src:"/assets/LoadingGif.gif",alt:"loadingImage"})
      }
      if (promiseState.promise
          && !promiseState.data
          && promiseState.error){
          return({src:"/assets/errorImage.png", alt:"ErrorImage"})
      }
      return({src:"/assets/transparentBox.png", alt:"NoData"})
  }
    if(props.model.combatState==5){
      return (
        <>
          <PhaserGame ref={phaserRef}/>
          <ModalView 
          mouseOnLeft={mouseOnLeftACB} mouseOffLeft={mouseOffLeftACB}
          mouseOnMiddle={mouseOnMiddleACB} mouseOffMiddle={mouseOffMiddleACB}
          mouseOnRight={mouseOnRightACB} mouseOffRight={mouseOffRightACB}
          onLeft={onLeftACB} onMiddle={onMiddleACB} onRight={onRightACB}/>
        </>
      );
    }
    else{
      const initData = {
        mcName:props.model.mcName,mcMaxHp:props.model.mcMaxHp,mcHp:props.model.mcHp,mcAttack:props.model.mcAttack,
        mcShield:props.model.mcShield,mcDefence:props.model.mcDefence,mcDodge:props.model.mcDodge,mcDodgeTimer:props.model.mcDodgeTimer,
        enemyName:props.model.enemyName,enemyKey:props.model.enemyKey,enemyMaxHp:props.model.enemyMaxHp,enemyHp:props.model.enemyHp,enemyAttack:props.model.enemyAttack,
        currentRound:props.model.currentRound}

      return (
        <>
          <PhaserGame ref={phaserRef} initData={initData}/>
          <GameView combatState={props.model.combatState}
          onAttack={onAttackACB} onShield={onShieldACB} onDodge={onDodgeACB}
          jokeStatus={showPromiseState(props.model.jokePromiseState)}/>
        </>
      );
    }
  }
);

export { Game };
