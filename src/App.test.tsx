import { vi } from 'vitest';
import './test/mocks';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { TestWrapper } from './test/test-utils';

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', async () => {
    render(<App />, { wrapper: TestWrapper });
    
    await waitFor(() => {
      expect(screen.getByTestId('app-container')).toBeInTheDocument();
    });
  });
}); 