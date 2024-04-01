export function GameView(props) {
  function GoToMenu() {
    window.location.hash = "#/menu";
  }

  function AttackACB(event) {
    props.onAttack();
  }
// <button className="pausebutton" onClick={GoToMenu}>Pause</button>
  return (
    <div>
      <button className="pausebutton" onClick={GoToMenu}>Pause</button>
      <div id="buttons">
        <button className="button attackbutton" onClick={AttackACB}>ATTACK</button>
        <button className="button shieldbutton">SHIELD</button>
        <button className="button dodgebutton">DODGE</button>
      </div>
    </div>
  );
}
