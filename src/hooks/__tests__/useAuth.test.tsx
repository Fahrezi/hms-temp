import { renderHook } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';

import { useAuth } from '@/hooks/useAuth';

import { UserRole } from '@/types/auth';

import AuthContext from '@/contexts/AuthContext';

describe('useAuth', () => {
  it('should return the auth context when used within AuthProvider', () => {
    const mockAuthContext = {
      user: {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        roles: ['user' as UserRole],
      },
      token: 'mockToken123',
      isAuthenticated: true,
      isLoading: false,
      login: vi.fn(),
      logout: vi.fn(),
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthContext.Provider value={mockAuthContext}>{children}</AuthContext.Provider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current).toEqual(mockAuthContext);
  });

  it('should throw an error when used outside AuthProvider', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => renderHook(() => useAuth())).toThrow('useAuth must be used within an AuthProvider');

    consoleErrorSpy.mockRestore();
  });
});
