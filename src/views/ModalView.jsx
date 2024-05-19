export function ModalView(props) {
    function GoToMenu() {
        props.onMenu();
        window.location.hash = "#/menu";
    }
    
    function chooseLeftACB(event) {
        props.onLeft();
    }

    function chooseMiddleACB(event) {
        props.onMiddle();
    }

    function chooseRightACB(event) {
        props.onRight();
    }

    function enterLeftACB(event) {
        props.mouseOnLeft();
    }

    function leaveLeftACB(event) {
        props.mouseOffLeft();
    }

    function enterMiddleACB(event) {
        props.mouseOnMiddle();
    }

    function leaveMiddleACB(event) {
        props.mouseOffMiddle();
    }

    function enterRightACB(event) {
        props.mouseOnRight();
    }

    function leaveRightACB(event) {
        props.mouseOffRight();
    }

    return (
        <div>
            <button className="pausebutton" onClick={GoToMenu}>
                Pause
            </button>
            <div id="buttons">
            <button
                onClick={chooseLeftACB}
                onMouseEnter={enterLeftACB}
                onMouseLeave={leaveLeftACB}
                className="button modalbutton"
            >
                LEFT
            </button>
            <button
                onClick={chooseMiddleACB}
                onMouseEnter={enterMiddleACB}
                onMouseLeave={leaveMiddleACB}
                className="button modalbutton"
            >
                MIDDLE
            </button>
            <button
                onClick={chooseRightACB}
                onMouseEnter={enterRightACB}
                onMouseLeave={leaveRightACB}
                className="button modalbutton"
            >
                RIGHT
            </button>
        </div>
        </div>
        
    );
}
