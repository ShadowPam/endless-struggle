export function GameView(props) {
  function GoToMenu() {
    window.location.hash = "#/menu";
  }

  function AttackACB(event) {
    props.onAttack();
  }
  return (
    <div>
      <button className="pausebutton" onClick={GoToMenu}>Pause</button>
      <div id="buttons">
        <button disabled={props.inCombat} className="button attackbutton" onClick={AttackACB}>ATTACK</button>
        <button disabled={props.inCombat} className="button shieldbutton">SHIELD</button>
        <button disabled={props.inCombat} className="button dodgebutton">DODGE</button>
      </div>
    </div>
  );
}
