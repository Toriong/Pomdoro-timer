import React, { useState, createContext } from 'react'


export const TimerContext = createContext();


export const TimerProvider = props => {
    const [intervalTimer, setIntervalTimer] = useState(null);

    return (
        <TimerContext.Provider
            value={{ _intervalTimer: [intervalTimer, setIntervalTimer] }}
        >
            {props.children}
        </TimerContext.Provider>
    )
}