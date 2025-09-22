import { AxiosError, AxiosHeaders, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { describe, expect, it, vi } from 'vitest';

import { loginRequest, registerRequest } from '@/services/auth.service';

import { Mutation } from '@/libs/query';

vi.mock('@/libs/query', () => ({
  Mutation: vi.fn(),
}));

describe('authRequests', () => {
  const mockConfig: InternalAxiosRequestConfig<unknown> = {
    headers: new AxiosHeaders(),
    method: 'post',
    url: '',
  };

  const mockResponse: AxiosResponse = {
    data: { token: 'fake-token' },
    status: 200,
    statusText: 'OK',
    headers: new AxiosHeaders(),
    config: mockConfig,
  };
  const failedString = 'Request failed';

  const mockError: AxiosError = new AxiosError(failedString, 'ERR_BAD_REQUEST', mockConfig);

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('loginRequest should return login mutation', () => {
    (Mutation as jest.Mock).mockImplementation(({ onSuccess }) => {
      return {
        mutate: () => onSuccess && onSuccess(mockResponse),
      };
    });

    const mutation = loginRequest();
    expect(mutation).toBeDefined();
    expect(mutation.mutate).toBeDefined();

    mutation.mutate({ email: 'test@mail.com', password: 'password' });
    expect(Mutation).toHaveBeenCalledWith({
      key: 'login',
      method: 'post',
      url: '/auth/login',
    });
  });

  it('registerRequest should return register mutation', () => {
    (Mutation as jest.Mock).mockImplementation(({ onSuccess }) => {
      return {
        mutate: () => onSuccess && onSuccess(mockResponse),
      };
    });

    const mutation = registerRequest();
    expect(mutation).toBeDefined();
    expect(mutation.mutate).toBeDefined();

    mutation.mutate({ email: 'newUser@mail.com', password: 'newPassword' });
    expect(Mutation).toHaveBeenCalledWith(
      expect.objectContaining({
        key: 'register',
        method: 'post',
        url: '/auth/register',
      }),
      expect.any(Function),
      expect.any(Function),
    );
  });

  it('loginRequest should handle errors', () => {
    (Mutation as jest.Mock).mockImplementation(({ onError }) => {
      return {
        mutate: () => {
          if (onError) onError(mockError);
          else throw mockError;
        },
      };
    });

    const mutation = loginRequest();

    expect(() => {
      mutation.mutate({ email: 'test@mail.com', password: 'wrong' });
    }).toThrow(failedString);
  });

  it('registerRequest should handle errors', () => {
    (Mutation as jest.Mock).mockImplementation(({ onError }) => {
      return {
        mutate: () => {
          if (onError) onError(mockError);
          else throw mockError;
        },
      };
    });

    const mutation = registerRequest();

    expect(() => {
      mutation.mutate({ email: 'newUser@mail.com', password: 'weak' });
    }).toThrow(failedString);
  });
});
