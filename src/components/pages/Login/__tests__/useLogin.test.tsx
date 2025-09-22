/* eslint-disable sonarjs/no-duplicate-string */
import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useLogin } from '@/components/pages/Login/useLogin';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

const mockLogin = vi.fn();
vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    login: mockLogin,
  }),
}));

const mockMutateAsync = vi.fn();
vi.mock('@/services/auth.service', () => ({
  loginRequest: () => ({
    mutateAsync: mockMutateAsync,
    isPending: false,
  }),
}));

const mockRegister = vi.fn();
const mockHandleSubmit = vi.fn((callback) => {
  return (data: unknown) => callback(data);
});
const mockErrors = {};
const mockIsSubmitting = false;

vi.mock('react-hook-form', () => ({
  useForm: () => ({
    register: mockRegister,
    handleSubmit: mockHandleSubmit,
    formState: {
      errors: mockErrors,
      isSubmitting: mockIsSubmitting,
    },
  }),
}));

describe('useLogin', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return form methods and state', () => {
    const { result } = renderHook(() => useLogin());

    expect(result.current.register).toBe(mockRegister);
    expect(result.current.handleSubmit).toBeDefined();
    expect(result.current.errors).toBe(mockErrors);
    expect(result.current.isSubmitting).toBe(false);
  });

  it('should handle successful login', async () => {
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      roles: [],
    };

    mockMutateAsync.mockResolvedValue({
      data: {
        ...mockUser,
      },
    });

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.onSubmit({
        email: 'john@example.com',
        password: 'password123',
      });
    });

    expect(mockMutateAsync).toHaveBeenCalledWith({
      email: 'john@example.com',
      password: 'password123',
    });

    expect(mockLogin).toHaveBeenCalledWith({ ...mockUser, roles: ['admin'] }, 'xxxxxxxxxxxxx');

    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  it('should handle login failure', async () => {
    const mockError = new Error('Login failed');
    mockMutateAsync.mockRejectedValue(mockError);

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.onSubmit({
        email: 'john@example.com',
        password: 'password123',
      });
    });

    expect(mockMutateAsync).toHaveBeenCalledWith({
      email: 'john@example.com',
      password: 'password123',
    });

    expect(consoleSpy).toHaveBeenCalledWith('Login error:', mockError);

    expect(mockLogin).not.toHaveBeenCalled();

    expect(mockNavigate).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('should handle missing user in response', async () => {
    mockMutateAsync.mockResolvedValue({
      data: null,
    });

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.onSubmit({
        email: 'john@example.com',
        password: 'password123',
      });
    });

    expect(mockMutateAsync).toHaveBeenCalled();

    expect(mockLogin).not.toHaveBeenCalled();

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
