import { MainMenuView } from "../views/MainMenuView.jsx";
import { observer } from "mobx-react-lite";

const MainMenu = observer(             // needed for the presenter to update (its view) when relevant parts of the model change
    function MenuRender(props){
        return <MainMenuView user={props.model.user} initialized={props.model.initialized}/>;
    }
);

export { MainMenu };