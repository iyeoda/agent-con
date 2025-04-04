import React from 'react';
import './App.css';
import AppFrame from './components/AppFrame'; // Adjust this based on your file path
import { Toaster } from 'react-hot-toast';
import { UserProvider } from './contexts/UserContext';
import UserSwitcher from './components/UserSwitcher';
import config from './config';
import { ClerkProvider } from '@clerk/clerk-react';

function App() {
  return (
    <ClerkProvider publishableKey={config.clerkPublishableKey}>
      <UserProvider>
        <div className="App">
          <AppFrame />
          <Toaster position="top-right" />
          {/* Only show UserSwitcher in development mode */}
          {config.environment === 'development' && <UserSwitcher />}
        </div>
      </UserProvider>
    </ClerkProvider>
  );
}

export default App;

