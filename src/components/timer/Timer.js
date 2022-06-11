import React from "react";


const Timer = ({ countDownTime, isTimerPaused, currentTimerTime }) => {

  const convertMillisToMinutesAndSeconds = (millis) => {
    const minutes = Math.floor(millis / 60_000);
    const seconds = ((millis % 60_000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  const timerTime = isTimerPaused ? convertMillisToMinutesAndSeconds(currentTimerTime) : convertMillisToMinutesAndSeconds(countDownTime);

  return (
    <section>
      <span>{timerTime}</span>
    </section>
  );
};

export default Timer;
