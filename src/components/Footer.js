import React from 'react'
import '../css/footer.css'

const getTimeOfLocation = () => {
    const options = {
        timeZone: 'America/Chicago',
        year: 'numeric',
    }

    let formatter = new Intl.DateTimeFormat([], options);

    return formatter.format(new Date())
};


const Footer = () => {
    const currentYear = getTimeOfLocation();
    return (
        <footer id='footer'>
            <div>
                <span>Copyright {currentYear} Gabriel Torion | All rights reserved</span>
            </div>
        </footer>
    )
}

export default Footer