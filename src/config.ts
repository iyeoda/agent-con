interface Config {
  useMockData: boolean;
  apiBaseUrl: string;
  environment: 'development' | 'production' | 'test';
}

// Default configuration
const config: Config = {
  useMockData: process.env.REACT_APP_USE_MOCK_DATA === 'true' || process.env.NODE_ENV === 'development',
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api',
  environment: (process.env.NODE_ENV as 'development' | 'production' | 'test') || 'development'
};

export default config; 