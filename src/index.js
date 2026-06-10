import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Suppress TensorFlow Lite WASM debug logs
if (typeof window !== 'undefined') {
  const originalWarn = console.warn;
  const originalLog = console.log;
  
  console.warn = function(...args) {
    // Filter out TensorFlow and Vision WASM logs
    if (
      args[0]?.includes?.('TensorFlow') ||
      args[0]?.includes?.('XNNPACK') ||
      args[0]?.includes?.('WASM')
    ) {
      return;
    }
    originalWarn.apply(console, args);
  };
  
  console.log = function(...args) {
    // Filter out TensorFlow INFO messages
    if (
      args[0]?.includes?.('INFO: Created') ||
      args[0]?.includes?.('TensorFlow') ||
      args[0]?.includes?.('XNNPACK')
    ) {
      return;
    }
    originalLog.apply(console, args);
  };
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
