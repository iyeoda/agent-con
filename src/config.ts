interface Config {
  useMockData: boolean;
  apiBaseUrl: string;
  environment: 'development' | 'production' | 'test';
  clerkPublishableKey: string;
}

// Default configuration
const config: Config = {
  useMockData: process.env.REACT_APP_USE_MOCK_DATA === 'true' || process.env.NODE_ENV === 'development',
  apiBaseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  environment: (process.env.NODE_ENV as 'development' | 'production' | 'test') || 'development',
  clerkPublishableKey: process.env.REACT_APP_CLERK_PUBLISHABLE_KEY || ''
};

export default config; 