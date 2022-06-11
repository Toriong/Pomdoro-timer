import React from "react";
import "../css/timerType/timerTypeBtnsAndContainer.css";

const TimerTypeButtons = ({ _isFocusTimerOn }) => {
  const [isFocusTimerOn, setIsFocusTimerOn] = _isFocusTimerOn;

  const handleFocusBtnClick = () => {
    setIsFocusTimerOn(true);
  };

  const handleBreakBtnClick = () => { setIsFocusTimerOn(false); };

  return (
    <div id="timerTypeButtonContainer">
      <button
        disabled={isFocusTimerOn}
        onClick={handleFocusBtnClick}
        style={{ backgroundColor: !isFocusTimerOn && "var(--backgroundColor)" }}
      >
        FOCUS!
      </button>
      <button
        disabled={!isFocusTimerOn}
        onClick={handleBreakBtnClick}
        style={{ backgroundColor: isFocusTimerOn && "var(--backgroundColor)" }}
      >
        Break
      </button>
    </div>
  );
};

export default TimerTypeButtons;
