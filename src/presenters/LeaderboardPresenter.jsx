import { LeaderboardView } from "../views/LeaderboardView";
import { observer } from "mobx-react-lite";


const LeaderboardOwn = observer(function LeaderboardRender(props) {

    return <LeaderboardView leaderboard={props.globalModel.leaderboard} paginated={props.globalModel.paginated} />
});

export {LeaderboardOwn};