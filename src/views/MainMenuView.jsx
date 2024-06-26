
import { signOut } from "firebase/auth";
import { auth } from "../firebaseModel";

export function MainMenuView(props) {
    function GoToGame() {
        window.location.hash = "#/game";
    }
    function GoToHowTo() {
        window.location.hash = "#/how-to";
    }
    function GoToLeaderboard() {
        window.location.hash = "#/leaderboard";
    }
    function GoToLogin() {
        window.location.hash = "#/login";
    }

    return (
        <div>
            <b className="menulogo"><img src="../../gameicon_upscaled.png" border="0" width="100" height="100" /></b>
            {!props.user ? (
                <button className="menulogin" onClick={GoToLogin}>
                    LOGIN
                </button>
            ) : (
                <button className="menulogin" onClick={() => {
                    signOut(auth).then(() => {
                        props.model.resetModel();
                    });
                    }}>
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
                <button className="menubutton" onClick={GoToHowTo}>
                    HOW TO PLAY
                </button>
                <button className="menubutton" onClick={GoToLeaderboard}>
                    LEADERBOARD
                </button>
            </div>
        </div>
    );
}
