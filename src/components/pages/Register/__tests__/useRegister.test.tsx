/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable sonarjs/no-duplicate-string */
import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useRegister } from '@/components/pages/Register/useRegister';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

const mockMutateAsync = vi.fn();
vi.mock('@/services/auth.service', () => ({
  registerRequest: () => ({
    mutateAsync: mockMutateAsync,
    isPending: false,
  }),
}));

const mockRegister = vi.fn();
const mockHandleSubmit = vi.fn((callback) => {
  return (data: any) => callback(data);
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

const mockAlert = vi.fn();
global.alert = mockAlert;

describe('useRegister', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return form methods and state', () => {
    const { result } = renderHook(() => useRegister());

    expect(result.current.register).toBe(mockRegister);
    expect(result.current.handleSubmit).toBeDefined();
    expect(result.current.errors).toBe(mockErrors);
    expect(result.current.isSubmitting).toBe(false);
  });

  it('should handle successful registration', async () => {
    mockMutateAsync.mockResolvedValue({
      data: {
        message: 'Registration successful',
      },
    });

    const { result } = renderHook(() => useRegister());

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

    expect(mockAlert).toHaveBeenCalledWith('Registration successful!');
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('should handle registration failure', async () => {
    const mockError = new Error('Registration failed');
    mockMutateAsync.mockRejectedValue(mockError);

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => useRegister());

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

    expect(consoleSpy).toHaveBeenCalledWith('Registration error:', mockError);
    expect(mockAlert).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
