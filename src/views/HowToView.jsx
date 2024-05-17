export function HowToView(props) {
    function GoToMenu() {
        window.location.hash = "#/menu";
    }

    return (
        <>
            <button className="pausebutton" onClick={GoToMenu}>
                Back to Menu
            </button>
            <div className="howToPlay">
                <h1>HOW TO PLAY ENDLESS STRUGGLE</h1>
                <img src="../../public/howToImage.png" className="howToImage"/>
                <p>
                    1. YOUR ATTACK STAT - <span>YOUR DAMAGE IS CALCULATED FROM THIS.</span>
                    <br />
                    <br />
                    2. YOUR DEFENCE STAT - <span>YOUR SHILEDING IS CALCULATED FROM THIS.</span>
                    <br />
                    <br />
                    3. YOUR DODGE STAT - <span>YOUR CHANCE TO DODGE AN ENEMY ATTACK.</span>
                    <br />
                    <br />
                    4. YOUR CURRENT DAMAGE -{" "}
                    <span>
                        THE DAMAGE YOU WILL DEAL TO THE ENEMY. <br />
                        DAMAGE IS DEALT WHEN ATTACKING.
                    </span>
                    <br />
                    <br />
                    5. YOUR CURRENT SHEILD AMOUNT -{" "}
                    <span>
                        THE DAMAGE YOU WILL BE ABLE TO BLOCK WHEN ATTACKED. <br />
                        INCREASES WHEN SHIELDING.
                    </span>
                    <br />
                    <br />
                    6. YOUR CURRENT DODGE TIMER -{" "}
                    <span>
                        HOW MANY TURNS YOU WILL BE ABLE TO DODGE.
                        <br />
                        IF ZERO, YOU WILL NOT BE ABLE DODGE. INCREASES WHEN DODGEING.
                    </span>
                    <br />
                    <br />
                    7. YOUR HITPOINTS.
                    <br />
                    <br />
                    8. THE RANGE OF DAMAGE THE ENEMY CAN DEAL.
                    <br />
                    <br />
                    9. THE CURRENT DAMAGE OF THE ENEMY.
                    <br />
                    <br />
                    10. THE ENEMY HITPOINTS.
                    <br />
                    <br />
                    11. THE CURRENT ROUND
                    <br />
                    <br />
                    <br />
                    TIPS: <br/>THE ENEMIES GROW STRONGER EVERY ROUND.
                    <br />
                    IF YOU ARE SHIELDED AT THE BEGINNING OF YOUR TURN YOU WILL GAIN CONFIDENCE.
                </p>
            </div>
        </>
    );
}
