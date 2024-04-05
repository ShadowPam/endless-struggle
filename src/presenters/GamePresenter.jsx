import { GameView } from "../views/GameView";
import { observer } from "mobx-react-lite";
import { useRef } from "react";
import { PhaserGame } from "../game/PhaserGame";
import { EventBus } from "../game/EventBus";

const Game = observer(
  function GameRender(props){
    const phaserRef = useRef();
    if(props.model.joke.data != null){
      EventBus.emit("continueAttack",{joke:props.model.joke.data})
      props.model.joke.data = null
    }
    function onAttackACB() {
      props.model.combatToggle()
      props.model.getJoke(["Any"],["nsfw","religious","political","racist","sexist","explicit"],true)
      props.model.doAttack()
      if (props.model.enemyAlive){
        props.model.getAttacked()
      }

      EventBus.emit("initAttack", {  // emit attack results to game, mchp, mcdef, enemyhp, jokedata, enemyalive, mcalive
        mcMaxHp: props.model.mcMaxHp,
        mcHp: props.model.mcHp,
        mcDefence: props.model.mcDefence,
        enemyMaxHp: props.model.enemyMaxHp,
        enemyHp: props.model.enemyHp,
        joke: props.model.joke.data,
        enemyAlive: props.model.enemyAlive,
        mcAlive: props.model.mcAlive
      });
    }
      EventBus.removeAllListeners("endAttack") // a listener is created every time the observer reacts to model update, we only want 1
      EventBus.on("endAttack", (data) => {
        props.model.combatToggle()
      })



    return (
      <>
        <PhaserGame ref={phaserRef} />
        <GameView inCombat={props.model.inCombat} onAttack={onAttackACB} />
      </>
    );
  }
);

export { Game };
