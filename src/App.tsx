import React from 'react';
import './App.css';
import AppFrame from './components/AppFrame'; // Adjust this based on your file path
import { Toaster } from 'react-hot-toast';
import { UserProvider } from './contexts/UserContext';
import UserSwitcher from './components/UserSwitcher';
import config from './config';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <AppFrame />
        <Toaster position="top-right" />
        {/* Only show UserSwitcher in development mode */}
        {config.environment === 'development' && <UserSwitcher />}
      </div>
    </UserProvider>
  );
}

export default App;

