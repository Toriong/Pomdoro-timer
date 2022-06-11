import React from 'react'
import Footer from './components/Footer'
import PomodoroTimerMainPage from './PomodoroTimerMainPage'
import { SettingsProvider } from './providers/SettingsProvider'
import { TimerProvider } from './providers/TimerProvider'

const PomodoroTimerApp = () => (
    <>
        <TimerProvider>
            <SettingsProvider>
                <PomodoroTimerMainPage />
                <Footer />
            </SettingsProvider>
        </TimerProvider>
    </>
)

export default PomodoroTimerApp