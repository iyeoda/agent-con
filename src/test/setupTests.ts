import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { mockAuthUser } from './mockData';

vi.mock('../config', () => ({
  default: {
    environment: 'test',
    useMockData: true,
    clerkPublishableKey: 'pk_test_ZmxlZW5OLWJsdNViaXJkLTY2'
  }
}));

vi.mock('../services/auth-service', () => ({
  authService: {
    getCurrentUser: vi.fn().mockResolvedValue(mockAuthUser),
    setClerkUser: vi.fn(),
    setMockUser: vi.fn(),
    logout: vi.fn().mockResolvedValue(undefined)
  }
})); 