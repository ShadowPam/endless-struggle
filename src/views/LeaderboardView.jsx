import { useEffect } from "react";
import Leaderboard from "react-leaderboard";

export function LeaderboardView(props) {
    function GoToMenu() {
        window.location.hash = "#/menu";
    }

    const userList = props.leaderboard;
    const paginated = props.paginated;

    return (
        <>
            <button className="pausebutton" onClick={GoToMenu}>
                Back to Menu
            </button>
            <div className="leaderboard">
                <Leaderboard users={userList} paginate={paginated} />
            </div>
        </>
    );
}
