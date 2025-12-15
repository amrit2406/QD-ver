// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { QuoteProvider } from './context/QuoteContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <QuoteProvider>
        <App />
      </QuoteProvider>
    </BrowserRouter>
  </React.StrictMode>
);
