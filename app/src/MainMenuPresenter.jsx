import { MainMenuView } from "./views/MainMenuView.jsx";
import { observer } from "mobx-react-lite";

//från lab kod
const MainMenu = observer(             // needed for the presenter to update (its view) when relevant parts of the model change
    function MenuRender(){
        return <MainMenuView/>;
    }
);

export { MainMenu };