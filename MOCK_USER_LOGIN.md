# Mock User Login System

This document describes the mock user login system implemented for development purposes.

## Overview

The mock user login system allows developers to quickly switch between different user types during development without needing to create actual user accounts or authenticate with a backend server. This is particularly useful for testing different permission levels and user experiences.

## Available User Types

The system provides the following user types:

1. **Organization Admin** - Has full administrative access to the organization
2. **Billing Admin** - Has access to billing and payment features
3. **Standard User** - Regular organization member with basic permissions
4. **Project User** - User who is not part of the organization but has access to specific projects
5. **Contact Person** - User who is not signed up to the app but is in the project contact list

## How to Use

### In Development Mode

When running the application in development mode, a user switcher will appear in the bottom-right corner of the screen. Click on it to:

1. See the current user's information
2. Switch to a different user type
3. Logout

### Programmatically

You can also access the user context in your components:

```tsx
import { useUser } from '../contexts/UserContext';

const MyComponent = () => {
  const { 
    currentUser, 
    isLoggedIn, 
    loginAsUser, 
    logout, 
    currentUserType 
  } = useUser();

  // Use the user context in your component
  return (
    <div>
      {isLoggedIn ? (
        <p>Welcome, {currentUser?.name}</p>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
};
```

## Implementation Details

The mock user login system consists of the following components:

1. **Mock Authentication Service** (`src/services/mock-auth.ts`) - Handles the logic for switching between user types
2. **User Context** (`src/contexts/UserContext.tsx`) - Provides the current user state throughout the application
3. **User Switcher Component** (`src/components/UserSwitcher.tsx`) - UI for switching between user types
4. **Updated Avatar Dropdown** (`src/components/AvatarDropdown.tsx`) - Uses the user context to display the current user's information

## Production Mode

In production mode, the mock user login system is completely disabled. The UserSwitcher component will not be rendered, and the mock authentication service will not be exported.

## Persistence

The selected user type is persisted in localStorage, so it will be remembered between page refreshes. This allows developers to continue working with the same user type without having to switch every time they reload the page. 