import React from 'react';
import ReactDOM from 'react-dom/client';
import PomdoroTimerApp from './PomdoroTimerApp';
import reportWebVitals from './reportWebVitals';
import './css/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PomdoroTimerApp />
  </React.StrictMode>
);

reportWebVitals();
