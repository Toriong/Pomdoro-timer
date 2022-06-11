import React from 'react'
import PomodoroTimerMainPage from './PomodoroTimerMainPage'
import { SettingsProvider } from './providers/SettingsProvider'

const PomdoroTimerApp = () => (
    <>
        <SettingsProvider>
            <PomodoroTimerMainPage />
        </SettingsProvider>
    </>
)

export default PomdoroTimerApp