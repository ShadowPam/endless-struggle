import { GameOverView } from "../views/GameOverView";
import { observer } from "mobx-react-lite";

const GameOver = observer(function GameOverRender(props) {
    return <GameOverView model={props.model} />;
});

export { GameOver };
