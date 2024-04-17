import { GameView } from "../views/GameView";
import { observer } from "mobx-react-lite";
import { useEffect, useRef} from "react";
import { PhaserGame } from "../game/PhaserGame";
import { EventBus } from "../game/EventBus";

const Game = observer(
  function GameRender(props){

    const phaserRef = useRef();


    // if scene.scene.key == "game"
    function onAttackACB() {
      props.model.setCombatState(1)
      props.model.declareActionIntent("attack")
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
        // maybe upate scene here
      }

      // 1 - you have made your choice and request a joke
      if(props.model.combatState == 1){
        props.model.getJoke(["Any"], ["nsfw","religious","political","racist","sexist","explicit"], true)
      }

      // 2 - you have gotten your joke and will perform your declared action
      if(props.model.combatState == 2){
        props.model.doAttack()
        scene.doAttackAnimate(props.model) // combatState is updated at the end of animation -> 3 || 4
      }

      // 3 - you have performed your action, now the enemy will attack
      if(props.model.combatState == 3){
        props.model.getAttacked()
        scene.getAttackedAnimate(props.model) // combatState is updated at the end of animation -> 0
      }

      // 4 - you have performed your action and the enemy was defeated
      if(props.model.combatState == 4){
        scene.enemy.play("enemyAnimationDead")
        console.log("VICTORY!")
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

    return (
      <>
        <PhaserGame ref={phaserRef}  />
        <GameView combatState={props.model.combatState} onAttack={onAttackACB} jokeStatus={showPromiseState(props.model.jokePromiseState)}
        />
      </>
    );
  }
);

export { Game };
