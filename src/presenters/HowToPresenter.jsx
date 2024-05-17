import { HowToView } from "../views/HowToView";
import { observer } from "mobx-react-lite";


const HowTo = observer(function HowToRender(props) {
    return <HowToView />;
});

export { HowTo };
