import React from 'react';
import './App.css';
import AppFrame from './components/AppFrame';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from './contexts/UserContext';
import UserSwitcher from './components/UserSwitcher';
import config from './config';
import { ClerkProvider, SignIn, SignUp } from '@clerk/clerk-react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <ClerkProvider publishableKey={config.clerkPublishableKey}>
      <UserProvider>
        <div className="App" data-testid="app-container">
          <BrowserRouter>
            <Routes>
              {/* Auth routes */}
              <Route 
                path="/sign-in" 
                element={
                  <div className="min-h-screen flex items-center justify-center bg-[#F7F5F2]">
                    <div className="w-full max-w-md">
                      <SignIn routing="path" path="/sign-in" afterSignInUrl="/project/550e8400-e29b-41d4-a716-446655440000/dashboard" />
                    </div>
                  </div>
                } 
              />
              <Route 
                path="/sign-up" 
                element={
                  <div className="min-h-screen flex items-center justify-center bg-[#F7F5F2]">
                    <div className="w-full max-w-md">
                      <SignUp routing="path" path="/sign-up" afterSignUpUrl="/project/550e8400-e29b-41d4-a716-446655440000/dashboard" />
                    </div>
                  </div>
                } 
              />
              <Route path="/login" element={<Navigate to="/sign-in" replace />} />
              
              {/* Protected routes */}
              <Route path="/project/*" element={<AppFrame />} />
              <Route path="/" element={<Navigate to="/project/550e8400-e29b-41d4-a716-446655440000/dashboard" replace />} />
              
              {/* Catch all route - redirect to sign in */}
              <Route path="*" element={<Navigate to="/sign-in" replace />} />
            </Routes>
            <Toaster position="top-right" />
            {/* Only show UserSwitcher in development mode */}
            {config.environment === 'development' && <UserSwitcher />}
          </BrowserRouter>
        </div>
      </UserProvider>
    </ClerkProvider>
  );
}

export default App;

