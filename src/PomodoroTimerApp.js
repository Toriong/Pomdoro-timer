import React from 'react'
import PomodoroTimerMainPage from './PomodoroTimerMainPage'
import { SettingsProvider } from './providers/SettingsProvider'
import { TimerProvider } from './providers/TimerProvider'

const PomodoroTimerApp = () => (
    <>
        <TimerProvider>
            <SettingsProvider>
                <PomodoroTimerMainPage />
            </SettingsProvider>
        </TimerProvider>
    </>
)

export default PomodoroTimerApp