export function GameView(props) {
    function GoToMenu() {
        props.onMenu();
        window.location.hash = "#/menu";
    }

    function AttackACB(event) {
        props.onAttack();
    }

    function ShieldACB(event) {
        props.onShield();
    }

    function DodgeACB(event) {
        props.onDodge();
    }

    return (
        <div>
            <button className="pausebutton" onClick={GoToMenu}>
                Pause
            </button>
            <img className="jokestatus" src={props.jokeStatus.src} alt={props.jokeStatus.alt}></img>
            <div id="buttons">
                <button
                    disabled={props.combatState !== 0}
                    className="button attackbutton"
                    onClick={AttackACB}
                >
                    <img src="public\assets\AttackIcon.png"></img>
                    <br></br>
                    ATTACK
                </button>
                <button
                    disabled={props.combatState !== 0}
                    className="button shieldbutton"
                    onClick={ShieldACB}
                >
                    <img src="public\assets\ShieldIcon.png"></img>
                    <br></br>
                    SHIELD
                </button>
                <button
                    disabled={props.combatState !== 0}
                    className="button dodgebutton"
                    onClick={DodgeACB}
                >
                    <img src="public\assets\DodgeIcon.png"></img>
                    <br></br>
                    DODGE
                </button>
            </div>
        </div>
    );
}
