export function MainMenuView() {


    function GoToGame() {
        window.location.hash="#/game"
    }
    function GoToSettings() {
        window.location.hash="#/settings"
    }
    function GoToLeaderboard() {
        window.location.hash="#/leaderboard"
    }
    function GoToLogin() {
        window.location.hash="#/login"
    }

    return(
        <div>
            <b className="menulogo">LOGO</b>
            <button className="menulogin" onClick={GoToLogin}>LOGIN</button>
            <div className="menu">
                <button className="menubutton" onClick={GoToGame}>START</button>
                <button className="menubutton" onClick={GoToSettings}>SETTINGS</button>
                <button className="menubutton" onClick={GoToLeaderboard}>LEADERBOARD</button>
            </div>
        </div>
    )
};