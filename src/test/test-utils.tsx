import React from 'react';
import { render } from '@testing-library/react';
import { UserProvider } from '../contexts/UserContext';
import { BrowserRouter } from 'react-router-dom';

// Simple wrapper that provides all necessary context
export const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <BrowserRouter>
    <UserProvider>
      {children}
    </UserProvider>
  </BrowserRouter>
);

// Helper function to render components with all necessary providers
export const renderWithProviders = (ui: React.ReactElement) => {
  return render(ui, { wrapper: TestWrapper });
}; 