import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './fonts.css';

// Создаем style элемент заранее для styled-components
if (typeof document !== 'undefined') {
  // Проверяем, нет ли уже такого элемента
  if (!document.querySelector('style[data-styled="active"]')) {
    const styleElement = document.createElement('style');
    styleElement.setAttribute('data-styled', 'active');
    document.head.appendChild(styleElement);
  }
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
