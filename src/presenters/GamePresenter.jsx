import { GameView } from "../views/GameView";
import { observer } from "mobx-react-lite";
import { useRef } from "react";
import { PhaserGame } from "../game/PhaserGame";
import { EventBus } from "../game/EventBus";

const Game = observer(function GameRender() {
  const phaserRef = useRef();

  function onAttackACB() {
    EventBus.emit("hello", { hello: "Erik" });
  }

  return (
    <>
      <PhaserGame ref={phaserRef} />
      <GameView onAttack={onAttackACB} />
    </>
  );
});

export { Game };
