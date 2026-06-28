import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext'; // 1. यहाँ इम्पोर्ट किया

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. यहाँ ऐप को रैप कर दिया */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);