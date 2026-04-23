import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './fonts.css';

// Обработка глобальных ошибок
window.addEventListener('error', (event) => {
  console.error('[Global Error]', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('[Unhandled Promise Rejection]', event.reason);
});

// Создаем style элемент заранее для styled-components
if (typeof document !== 'undefined') {
  // Проверяем, нет ли уже такого элемента
  if (!document.querySelector('style[data-styled="active"]')) {
    const styleElement = document.createElement('style');
    styleElement.setAttribute('data-styled', 'active');
    document.head.appendChild(styleElement);
  }
}

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element not found!');
  }

  const root = ReactDOM.createRoot(rootElement);
  
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error('[index.tsx] Ошибка запуска приложения:', error);
}
