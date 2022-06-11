import React, { useContext } from "react";
import "../css/timerType/timerTypeBtnsAndContainer.css";
import { TimerContext } from "../providers/TimerProvider";

const TimerTypeButtons = ({ _isFocusTimerOn }) => {
  const { _intervalTimer } = useContext(TimerContext);
  const [isFocusTimerOn, setIsFocusTimerOn] = _isFocusTimerOn;
  const [intervalTimer, setIntervalTimer] = _intervalTimer;

  const handleFocusBtnClick = () => {
    if (intervalTimer) {
      clearInterval(intervalTimer)
      setIntervalTimer(null);
      console.log('Break timer has stopped.')
    };
    setIsFocusTimerOn(true);
  };

  const handleBreakBtnClick = () => {
    if (intervalTimer) {
      clearInterval(intervalTimer)
      setIntervalTimer(null);
      console.log('Focus timer has stopped.')
    };
    setIsFocusTimerOn(false);
  };

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
