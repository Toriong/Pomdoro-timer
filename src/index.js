import React from 'react';
import ReactDOM from 'react-dom/client';
import PomodoroTimerApp from './PomodoroTimerApp';
import reportWebVitals from './reportWebVitals';
import './css/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PomodoroTimerApp />
  </React.StrictMode>
);

reportWebVitals();
