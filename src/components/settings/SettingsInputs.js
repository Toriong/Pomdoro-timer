import React from "react";
import { useState } from "react";
import { useLayoutEffect } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { BiCheckbox, BiCheckboxChecked } from "react-icons/bi";
import { SettingsContext } from "../../providers/SettingsProvider";

const SettingsInputs = ({ setIsSettingsOn }) => {
  const { _breakTime, _focusTime, _isAlarmOn } = useContext(SettingsContext);
  const [breakTimeConfirmed, setBreakTimeConfirmed] = _breakTime;
  const [focusTimeConfirmed, setFocusTimeConfirmed] = _focusTime;
  const [isAlarmOnConfirmed, setIsAlarmOnConfirmed] = _isAlarmOn;
  // convert miliSeconds to minutes in order to display minutes onto the UI
  const breakTimeMinutes = breakTimeConfirmed / 60_000;
  const focusTimeMinutes = focusTimeConfirmed / 60_000;
  const [isAlarmOn, setIsAlarmOn] = useState(isAlarmOnConfirmed);
  const [breakTimeMinsNew, setBreakTimeMinsNew] = useState(breakTimeMinutes);
  const [focusTimeMinsNew, setFocusTimeMinsNew] = useState(focusTimeMinutes);
  const [willSaveChanges, setWillSaveChanges] = useState(false);

  const handleFocusTimeOnChange = (event) => {
    setFocusTimeMinsNew(event.target.value);
  };

  const handleKeyDown = event => {
    console.log('event: ', event.keyCode);
    const keyCodes = [190, 189];
    keyCodes.includes(event.keyCode) && event.preventDefault();
  }

  const handleBreakTimeOnChange = (event) => {
    setBreakTimeMinsNew(event.target.value);
  };

  const handleIsAlarmOnBtnClick = (event) => {
    event.preventDefault();
    setIsAlarmOn((isAlarmOn) => !isAlarmOn);
  };

  const convertMinutesToMiliSeconds = (mins) => mins * 60_000;

  const handleSaveBtnClick = (event) => {
    event.preventDefault();
    const isBreakTimeOver4hrs = breakTimeMinsNew > 240;
    const isFocusTimeOver4hrs = focusTimeMinsNew > 240;
    const isBreakTimeOver0 = breakTimeMinsNew > 0;
    const isFocusTimeOver0 = focusTimeMinsNew > 0;
    console.log('focusTimeMinsNew: ', focusTimeMinsNew);
    if (isFocusTimeOver4hrs || isBreakTimeOver4hrs) {
      alert("Timer cannot be over 4hrs.")
      return;
    };
    if (!isBreakTimeOver0) {
      alert('Break time cannot be zero.');
      return;
    };
    if (!isFocusTimeOver0) {
      alert('Focus time cannot be zero.')
      return;
    }
    if (breakTimeMinsNew !== breakTimeMinutes) {
      setBreakTimeConfirmed(convertMinutesToMiliSeconds(breakTimeMinsNew));
    }
    if (focusTimeMinsNew !== focusTimeMinutes) {
      setFocusTimeConfirmed(convertMinutesToMiliSeconds(focusTimeMinsNew));
    }
    if (isAlarmOn !== isAlarmOnConfirmed) {
      setIsAlarmOnConfirmed(isAlarmOn);
    }
    setWillSaveChanges(true);
  };


  useEffect(() => {
    if (willSaveChanges) {
      localStorage.setItem("breakTime", JSON.stringify(breakTimeConfirmed));
      localStorage.setItem("focusTime", JSON.stringify(focusTimeConfirmed));
      localStorage.setItem("isAlarmOn", JSON.stringify(isAlarmOn));
      setIsSettingsOn(false);
      setWillSaveChanges(false);
    }
  }, [willSaveChanges]);

  useLayoutEffect(() => {
    const _breakTime = localStorage.getItem("breakTime");
    const _focusTime = localStorage.getItem("focusTime");
    const _isAlarmOn = localStorage.getItem("isAlarmOn");

    if (_isAlarmOn) {
      setIsAlarmOn(JSON.parse(_isAlarmOn));
    }

    if (_breakTime) {
      const __breakTime = JSON.parse(localStorage.getItem("breakTime"));
      const breakTimeMinutes = __breakTime / 60_000;
      setBreakTimeMinsNew(breakTimeMinutes);
    }

    if (_focusTime) {
      const __focusTime = JSON.parse(localStorage.getItem("focusTime"));
      const focusTimeMinutes = __focusTime / 60_000;
      setFocusTimeMinsNew(focusTimeMinutes);
    }
  }, []);

  return (
    <>
      <div className="settingsOptionsContainer">
        <div>
          <label htmlFor="pomodoro">Pomodoro {"(Focus)"}</label>
          <input
            id="pomodoro"
            type="number"
            value={focusTimeMinsNew}
            onChange={(event) => {
              handleFocusTimeOnChange(event);
            }}
            onKeyDown={event => { handleKeyDown(event) }}
          />
        </div>
        <div>
          <label htmlFor="break">Break</label>
          <input
            id="break"
            type="number"
            value={breakTimeMinsNew}
            onChange={(event) => {
              handleBreakTimeOnChange(event);
            }}
            onKeyDown={event => { handleKeyDown(event) }}
          />
        </div>
        <div id="alarmInputContainer">
          <label htmlFor="alarm">Alarm</label>
          <button
            value={isAlarmOn}
            onClick={(event) => {
              handleIsAlarmOnBtnClick(event);
            }}
          >
            {isAlarmOn ? <BiCheckboxChecked /> : <BiCheckbox />}
          </button>
        </div>
      </div>
      <div>
        <button
          onClick={(event) => {
            handleSaveBtnClick(event);
          }}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default SettingsInputs;
