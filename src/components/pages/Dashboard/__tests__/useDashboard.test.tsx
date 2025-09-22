import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import useDashboard from '@/components/pages/Dashboard/useDashboard';

// Mock react-router-dom
let searchValue = '?page=1';
vi.mock('react-router-dom', () => ({
  useLocation: () => ({ search: searchValue }),
}));

// Mock the getUsers service
const mockGetUsers = vi.fn();
vi.mock('@/services/user.service', () => ({
  getUsers: (page: number) => mockGetUsers(page),
}));

describe('useDashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    searchValue = '?page=1';
  });

  it('should fetch users with the correct page from URL', () => {
    // Set URL to have page=3
    searchValue = '?page=3';

    // Mock the getUsers response
    mockGetUsers.mockReturnValue({
      data: {
        data: {
          data: [{ id: 1, name: 'John Doe' }],
          total_pages: 5,
        },
      },
      isFetching: false,
    });

    // Render the hook
    renderHook(() => useDashboard());

    // Verify getUsers was called with the correct page
    expect(mockGetUsers).toHaveBeenCalledWith(3);
  });

  it('should default to page 0 if no page in URL', () => {
    // Set URL to have no page parameter
    searchValue = '';

    // Mock the getUsers response
    mockGetUsers.mockReturnValue({
      data: {
        data: {
          data: [],
          total_pages: 0,
        },
      },
      isFetching: false,
    });

    // Render the hook
    renderHook(() => useDashboard());

    // Verify getUsers was called with 0 (NaN coerced to 0)
    expect(mockGetUsers).toHaveBeenCalledWith(0);
  });

  it('should return the correct users data and total pages', () => {
    // Mock user data
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    ];

    mockGetUsers.mockReturnValue({
      data: {
        data: {
          data: mockUsers,
          total_pages: 10,
        },
      },
      isFetching: false,
    });

    // Render the hook
    const { result } = renderHook(() => useDashboard());

    // Verify the returned data
    expect(result.current.usersData).toEqual(mockUsers);
    expect(result.current.totalPages).toBe(10);
    expect(result.current.isFetching).toBe(false);
  });

  it('should handle loading state correctly', () => {
    // Mock loading state
    mockGetUsers.mockReturnValue({
      data: undefined,
      isFetching: true,
    });

    // Render the hook
    const { result } = renderHook(() => useDashboard());

    // Verify loading state
    expect(result.current.isFetching).toBe(true);
    expect(result.current.usersData).toEqual([]);
    expect(result.current.totalPages).toBe(0);
  });

  it('should handle empty response data', () => {
    // Mock empty response
    mockGetUsers.mockReturnValue({
      data: null,
      isFetching: false,
    });

    // Render the hook
    const { result } = renderHook(() => useDashboard());

    // Verify default values are used
    expect(result.current.usersData).toEqual([]);
    expect(result.current.totalPages).toBe(0);
    expect(result.current.isFetching).toBe(false);
  });

  it('should handle partial response data', () => {
    // Mock partial response (missing data property)
    mockGetUsers.mockReturnValue({
      data: {
        data: null,
      },
      isFetching: false,
    });

    // Render the hook
    const { result } = renderHook(() => useDashboard());

    // Verify default values are used
    expect(result.current.usersData).toEqual([]);
    expect(result.current.totalPages).toBe(0);
  });
});
