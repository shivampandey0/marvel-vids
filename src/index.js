import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './utils/utils.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, DataProvider } from './context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <DataProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </DataProvider>
    </BrowserRouter>
  </React.StrictMode>
);
