import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { SettingsContext } from "../../providers/SettingsProvider";
import Timer from "./Timer";
import "../../css/timer/timerContainer.css";
import { TimerContext } from "../../providers/TimerProvider";


const bell = new Audio('http://soundbible.com/mp3/Store_Door_Chime-Mike_Koenig-570742973.mp3');


const TimerContainer = ({ _isFocusTimerOn, _didTimerStart }) => {
  const { _focusTime, _breakTime, _isAlarmOn } = useContext(SettingsContext);
  const { _intervalTimer } = useContext(TimerContext);
  const [focusTime,] = _focusTime;
  const [breakTime,] = _breakTime;
  const [isAlarmOn, setIsAlarmOn] = _isAlarmOn;
  const [intervalTimer, setIntervalTimer] = _intervalTimer;
  const [didTimerStart, setDidTimerStart] = _didTimerStart;
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [isFocusTimerOn, setIsFocusTimerOn] = _isFocusTimerOn;
  const __focusTime = localStorage.getItem("focusTime")
    ? JSON.parse(localStorage.getItem("focusTime"))
    : focusTime;
  const __breakTime = localStorage.getItem("breakTime")
    ? JSON.parse(localStorage.getItem("breakTime"))
    : _breakTime;
  const _countDownTime = isFocusTimerOn ? __focusTime : __breakTime;
  const [countDownTime, setCountDownTime] = useState(_countDownTime);
  const [currentTime, setCurrentTime] = useState(_countDownTime);
  const [didFirstRenderOccur, setDidFirstRenderOccur] = useState(false);
  const [willResumePausedCount, setWillResumePausedCount] = useState(false);

  useEffect(() => {
    if (!didFirstRenderOccur) {
      setDidFirstRenderOccur(true);
    } else {
      const __focusTime = localStorage.getItem("focusTime")
        ? JSON.parse(localStorage.getItem("focusTime"))
        : focusTime;
      const __breakTime = localStorage.getItem("breakTime")
        ? JSON.parse(localStorage.getItem("breakTime"))
        : breakTime;
      const _isAlarmOn = localStorage.getItem("isAlarmOn")
        ? JSON.parse(localStorage.getItem("isAlarmOn"))
        : isAlarmOn;
      const _countDownTime = isFocusTimerOn ? __focusTime : __breakTime;
      if (didTimerStart) {
        clearInterval(intervalTimer);
        setDidTimerStart(false);
        isTimerPaused && setIsTimerPaused(false);
      };
      setIsAlarmOn(_isAlarmOn);
      setCountDownTime(_countDownTime);
      setCurrentTime(_countDownTime);
    }
  }, [isFocusTimerOn, breakTime, focusTime, isAlarmOn]);

  const handleStartBtnClick = () => {
    setDidTimerStart(true);
  };

  const handlePauseBtnClick = () => {
    clearInterval(intervalTimer);
    setIsTimerPaused(true);
  };

  const [resumeCountToggled, setResumeCountToggled] = useState(false);

  useEffect(() => {
    if (didTimerStart) {
      let time = willResumePausedCount
        ? JSON.parse(JSON.stringify(currentTime))
        : JSON.parse(JSON.stringify(_countDownTime));

      let interval = setInterval(() => {
        time = time - 1000;
        setCurrentTime(time);
        console.log('I am running')
        setCountDownTime(time);
        if (time === -1000 || time < 0) {
          const message = isFocusTimerOn
            ? "Focus time is up. Good job, take a break!"
            : "Break time is up. Let's get back to work!";
          isAlarmOn && bell.play();
          alert(message);
          setCountDownTime(_countDownTime);
          setCurrentTime(_countDownTime);
          clearInterval(interval);
          setIsFocusTimerOn((isFocusTimerOn) => !isFocusTimerOn);
          setDidTimerStart(false);
          willResumePausedCount && setWillResumePausedCount(false);
        }
      }, 1000);
      setIntervalTimer(interval);
    }
  }, [didTimerStart, resumeCountToggled]);

  const handleResumeBtnClick = () => {
    setResumeCountToggled((resumeCountToggled) => !resumeCountToggled);
    setIsTimerPaused(false);
    setWillResumePausedCount(true);
  };

  const handleResetBtnClick = () => {
    clearInterval(intervalTimer);
    setDidTimerStart(false);
    setCountDownTime(_countDownTime);
    isTimerPaused && setIsTimerPaused(false);
  };


  return (
    <div className="timerContainer">
      <Timer
        countDownTime={countDownTime}
        currentTimerTime={currentTime}
        isTimerPaused={isTimerPaused}
      />
      <section>
        {!didTimerStart ? (
          <button onClick={handleStartBtnClick}>Start</button>
        ) : (
          <>
            <button
              id="pauseAndResumeBtn"
              onClick={() => {
                isTimerPaused ? handleResumeBtnClick() : handlePauseBtnClick();
              }}
            >
              {isTimerPaused ? "Resume" : "Pause"}
            </button>
            <button id="resetBtn" onClick={handleResetBtnClick}>
              Reset
            </button>
          </>
        )}
      </section>
    </div>
  );
};

export default TimerContainer;
