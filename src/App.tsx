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
  // If in development mode and no Clerk key, bypass auth
  if (config.environment === 'development' && !config.clerkPublishableKey) {
    return (
      <BrowserRouter>
        <UserProvider>
          <div className="App" data-testid="app-container">
            <AppFrame />
            <Toaster position="top-right" />
            <UserSwitcher />
          </div>
        </UserProvider>
      </BrowserRouter>
    );
  }

  // Production mode or development with Clerk key
  return (
    <ClerkProvider 
      publishableKey={config.clerkPublishableKey}
      appearance={{
        layout: {
          socialButtonsPlacement: "bottom"
        },
        elements: {
          formButtonPrimary: "bg-[#D15F36] hover:bg-[#B54E2B]",
          card: "bg-white shadow-sm border border-[#A7CEBC]",
          headerTitle: "text-[#3A366E]",
          headerSubtitle: "text-[#4C5760]"
        }
      }}
    >
      <BrowserRouter>
        <UserProvider>
          <div className="App" data-testid="app-container">
            <Routes>
              <Route path="/sign-in/*" element={
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                  <div className="bg-white p-8 rounded-lg shadow-sm border border-[#A7CEBC] w-full max-w-md">
                    <SignIn routing="path" path="/sign-in" afterSignInUrl="/dashboard" />
                  </div>
                </div>
              } />
              <Route path="/sign-up/*" element={
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                  <div className="bg-white p-8 rounded-lg shadow-sm border border-[#A7CEBC] w-full max-w-md">
                    <SignUp routing="path" path="/sign-up" afterSignInUrl="/dashboard" />
                  </div>
                </div>
              } />
              <Route path="/*" element={<AppFrame />} />
            </Routes>
            <Toaster position="top-right" />
            {config.environment === 'development' && <UserSwitcher />}
          </div>
        </UserProvider>
      </BrowserRouter>
    </ClerkProvider>
  );
}

export default App;

