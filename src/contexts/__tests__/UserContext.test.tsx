import { vi } from 'vitest';
import { mockAuthUser } from '../../test/mockData';
import '../../test/mocks';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useUser } from '../UserContext';
import { TestWrapper } from '../../test/test-utils';

describe('UserContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('provides current user from mock data', async () => {
    const { result } = renderHook(() => useUser(), { wrapper: TestWrapper });
    
    await waitFor(() => {
      expect(result.current.currentUser).toEqual(mockAuthUser);
    });
  });

  it('handles logout', async () => {
    const { result } = renderHook(() => useUser(), { wrapper: TestWrapper });
    
    await waitFor(() => {
      expect(result.current.currentUser).toEqual(mockAuthUser);
    });

    await act(async () => {
      await result.current.logout();
    });

    expect(result.current.currentUser).toBeNull();
  });

  it('updates user data', async () => {
    const { result } = renderHook(() => useUser(), { wrapper: TestWrapper });
    
    await waitFor(() => {
      expect(result.current.currentUser).toEqual(mockAuthUser);
    });

    const updatedUser = { ...mockAuthUser, name: 'Updated Name' };
    await act(async () => {
      await result.current.setCurrentUser(updatedUser);
    });

    expect(result.current.currentUser).toEqual(updatedUser);
  });
}); 