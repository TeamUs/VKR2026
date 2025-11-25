import React from 'react';
import ReactDOM from 'react-dom/client';
import { StyleSheetManager } from 'styled-components';
import App from './App';
import './fonts.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Create a stylesheet element for styled-components
let styleSheet: HTMLStyleElement | null = null;
if (typeof document !== 'undefined') {
  styleSheet = document.createElement('style');
  styleSheet.setAttribute('data-styled', 'active');
  document.head.appendChild(styleSheet);
}

root.render(
  <React.StrictMode>
    {styleSheet ? (
      <StyleSheetManager sheet={styleSheet.sheet as any}>
        <App />
      </StyleSheetManager>
    ) : (
      <App />
    )}
  </React.StrictMode>
);
