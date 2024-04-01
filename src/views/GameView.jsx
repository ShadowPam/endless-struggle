export function GameView(props) {
  function GoToMenu() {
    window.location.hash = "#/menu";
  }

  function AttackACB(event) {
    props.onAttack();
  }

  return (
    <div id="app">
      <button className="pausebutton" onClick={GoToMenu}>
        Pause
      </button>
      <div id="buttons">
        <button className="button" onClick={AttackACB}>
          ATTACK
        </button>
        <button className="button">SHIELD</button>
        <button className="button">DODGE</button>
      </div>
    </div>
  );
}
