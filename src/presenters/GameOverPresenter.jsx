import { GameOverView } from "../views/GameOverView";
import { observer } from "mobx-react-lite";
import { toJS } from 'mobx';

const GameOver = observer(function GameOverRender(props) {

    function saveScoreToLeaderboardACB(){
        props.globalModel.leaderboard = [...props.globalModel.leaderboard, {name: props.model.mcName, score: props.model.currentRound}];
        props.model.resetModel();
    }

    return <GameOverView model={props.model} saveScore={saveScoreToLeaderboardACB} />;
});

export { GameOver };
