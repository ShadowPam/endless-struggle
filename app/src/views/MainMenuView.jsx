export function MainMenuView() {


    function GoToGame() {
        window.location.hash="#/game"
    }
    function GoToSettings() {
        window.location.hash="#/Settings"
    }
    function GoToLeaderboard() {
        window.location.hash="#/Leaderboard"
    }

    return(
        <div className="menu">
            <button className="menubutton" onClick={GoToGame}>START</button>
            <button className="menubutton" onClick={GoToSettings}>SETTINGS</button>
            <button className="menubutton" onClick={GoToLeaderboard}>LEADERBOARD</button>
        </div>
    )
};