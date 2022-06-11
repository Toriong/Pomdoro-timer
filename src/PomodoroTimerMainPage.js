import "./css/index.css";
import Navbar from "./components/navbar/Navbar";
import TimerTypeButtons from "./components/TimerTypeButtons";
import TimerContainer from "./components/timer/TimerContainer";
import { useState } from "react";

const PomodoroTimerMainPage = () => {
  const [isFocusTimerOn, setIsFocusTimerOn] = useState(true);
  const _isFocusTimerOn = [isFocusTimerOn, setIsFocusTimerOn];
  const [didTimerStart, setDidTimerStart] = useState(false);
  const _didTimerStart = [didTimerStart, setDidTimerStart];

  return (
    <div className="pomodoroTimerPage">
      <Navbar _didTimerStart={_didTimerStart} />
      <TimerTypeButtons _isFocusTimerOn={_isFocusTimerOn} />
      <TimerContainer _isFocusTimerOn={_isFocusTimerOn} _didTimerStart={_didTimerStart} />
    </div>
  );
};

export default PomodoroTimerMainPage;
