import { PhaserGame } from "../game/PhaserGame";
import { useRef } from "react";

export function Game(props) {
  function GoToMenu() {
    window.location.hash = "#/menu";
  }
  const phaserRef = useRef();

  return (
    <div id="app">
      <button className="pausebutton" onClick={GoToMenu}>
        Pause
      </button>
      <PhaserGame ref={phaserRef} />
      <div id="buttons">
        <button className="button">ATTACK</button>
        <button className="button">SHIELD</button>
        <button className="button">DODGE</button>
      </div>
    </div>
  );
}
