export function ModalView(props) {

  function chooseLeftACB(event){
    props.onLeft();
  }

  function enterLeftACB(event){
    props.mouseOnLeft();
  }

  function leaveLeftACB(event){
    props.mouseOffLeft();
  }

  function enterMiddleACB(event){
    props.mouseOnMiddle();
  }

  function leaveMiddleACB(event){
    props.mouseOffMiddle();
  }

  function enterRightACB(event){
    props.mouseOnRight();
  }

  function leaveRightACB(event){
    props.mouseOffRight();
  }

  return (
      <div id="buttons">
        <button onClick={chooseLeftACB} onMouseEnter={enterLeftACB} onMouseLeave={leaveLeftACB} className="button modalbutton">LEFT</button>
        <button onMouseEnter={enterMiddleACB} onMouseLeave={leaveMiddleACB} className="button modalbutton">MIDDLE</button>
        <button onMouseEnter={enterRightACB} onMouseLeave={leaveRightACB} className="button modalbutton">RIGHT</button>
      </div>
  );
}
