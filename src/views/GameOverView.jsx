export function GameOverView(props) {
    function GoToMenu() {
        //reset model on back to main menu
        window.location.hash = "#/menu";
        props.model.resetModel();
    }

    function saveToLeaderboardACB() {
        //Check if user logged in, if not trigger login request (done at a later stage)
        //for now only show save to leaderboard button if user logged in
        // one solution use a model variable to tell loginview that we are coming from gameover to login

        //If user logged in save score to leaderboard with name
        //Reset model after saving
        props.saveScore();
        window.location.hash = "#/menu";
    }

    return (
        <div className="gameOver">
            <h1>GAME OVER (you died)</h1>
            <h3>Good job you made it to round: {props.model.currentRound}</h3>

            {/*perhaps show a summary here of users collected item/number of monster slain(would have to add this to model) */}

            {props.model.user ? (
                <>
                    <label htmlFor="leaderboard">
                        Want to save your current round score to leaderboard?
                    </label><br/>
                    <button onClick={saveToLeaderboardACB} name="leaderboard">
                        Save To Leaderboard
                    </button><br/><br />
                </>
            ) : (
                ""
            )}

            <button onClick={GoToMenu}>Back To Menu</button>
        </div>
    );
}
