import { signOut } from "firebase/auth";
import { auth } from "../firebaseModel";

export function MainMenuView(props) {
    function GoToGame() {
        window.location.hash = "#/game";
    }
    function GoToSettings() {
        window.location.hash = "#/settings";
    }
    function GoToLeaderboard() {
        window.location.hash = "#/leaderboard";
    }
    function GoToLogin() {
        window.location.hash = "#/login";
    }

    return (
        <div>
            <b className="menulogo">LOGO</b>
            {!props.user ? (
                <button className="menulogin" onClick={GoToLogin}>
                    LOGIN
                </button>
            ) : (
                <button className="menulogin" onClick={() => signOut(auth)}>
                    Sign Out
                </button>
            )}

            <div className="menu">
                {!props.initialized ? (
                    <button className="menubutton" onClick={GoToGame}>
                        START
                    </button>
                ) : (
                    <button className="menubutton" onClick={GoToGame}>
                        CONTINUE
                    </button>
                )}
                <button className="menubutton" onClick={GoToSettings}>
                    SETTINGS
                </button>
                <button className="menubutton" onClick={GoToLeaderboard}>
                    LEADERBOARD
                </button>
            </div>
        </div>
    );
}
