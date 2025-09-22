import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import useUserDetail from '@/components/pages/Detail/useUserDetail';

let userId: string | undefined = '1';
vi.mock('react-router-dom', () => ({
  useParams: () => ({ user_id: userId }),
}));

const mockGetUserById = vi.fn();
vi.mock('@/services/user.service', () => ({
  getUserById: (id: number) => mockGetUserById(id),
}));

describe('useUserDetail', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    userId = '1';
  });

  it('should fetch user with the correct ID from URL params', () => {
    userId = '42';
    mockGetUserById.mockReturnValue({
      data: {
        data: {
          user: { id: 42, name: 'John Doe' },
        },
      },
      isLoading: false,
      error: null,
    });

    renderHook(() => useUserDetail());

    expect(mockGetUserById).toHaveBeenCalledWith(42);
  });

  it('should default to ID 0 if no user_id in URL params', () => {
    userId = undefined;
    mockGetUserById.mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });

    renderHook(() => useUserDetail());

    expect(mockGetUserById).toHaveBeenCalledWith(0);
  });

  it('should return the correct user data', () => {
    const mockUser = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://example.com/avatar.jpg',
    };

    mockGetUserById.mockReturnValue({
      data: {
        data: {
          user: mockUser,
        },
      },
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useUserDetail());

    expect(result.current.userData).toEqual(mockUser);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle loading state correctly', () => {
    mockGetUserById.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    const { result } = renderHook(() => useUserDetail());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.userData).toBeUndefined();
    expect(result.current.error).toBeNull();
  });

  it('should handle error state correctly', () => {
    const mockError = new Error('Failed to fetch user');
    mockGetUserById.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: mockError,
    });

    const { result } = renderHook(() => useUserDetail());

    expect(result.current.error).toBe(mockError);
    expect(result.current.userData).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle missing user data in response', () => {
    mockGetUserById.mockReturnValue({
      data: {
        data: {},
      },
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useUserDetail());

    expect(result.current.userData).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle null response data', () => {
    mockGetUserById.mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useUserDetail());

    expect(result.current.userData).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });
});
