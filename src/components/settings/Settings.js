import React from 'react'
import SettingsInputs from './SettingsInputs';
import '../../css/settings/settings.css'

const Settings = ({ setIsSettingsOn, didTimerStart }) => {
    const inputSectionCss = didTimerStart ? 'inputSection timerOn' : 'inputSection'

    return (
        <div
            className='settingsMenu'
        >
            <header>
                <h3>Settings</h3>
            </header>
            <section className={inputSectionCss}>
                {didTimerStart ?
                    <span>Timer is running. Stop timer to edit settings.</span>
                    :
                    <form>
                        <SettingsInputs setIsSettingsOn={setIsSettingsOn} />
                    </form>
                }
            </section>
        </div>
    )
}

export default Settings