/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AxiosHeaders, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { getUserById, getUsers } from '@/services/user.service';

import { GetData, GetDataById } from '@/libs/query';

vi.mock('@/libs/query', () => ({
  GetData: vi.fn(),
  GetDataById: vi.fn(),
}));

describe('userRequests', () => {
  const mockConfig: InternalAxiosRequestConfig<unknown> = {
    headers: new AxiosHeaders(),
    method: 'post',
    url: '',
  };

  const mockResponse: AxiosResponse = {
    data: { users: [{ id: 1, name: 'John Doe' }] },
    status: 200,
    statusText: 'OK',
    headers: new AxiosHeaders(),
    config: mockConfig,
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('getUsers should call GetData with correct options', () => {
    // @ts-ignore
    (GetData as vi.Mock).mockReturnValue(mockResponse);

    const result = getUsers(2);

    expect(GetData).toHaveBeenCalledWith({
      url: '/users',
      key: 'get-users',
      params: { page: 2 },
      enabled: true,
    });
    expect(result).toEqual(mockResponse);
  });

  it('getUsers should not call GetData if page is <= 0', () => {
    getUsers(0);
    expect(GetData).toHaveBeenCalledWith({
      url: '/users',
      key: 'get-users',
      params: { page: 0 },
      enabled: false,
    });
  });

  it('getUserById should call GetDataById with correct options', () => {
    // @ts-ignore
    (GetDataById as vi.Mock).mockReturnValue(mockResponse);

    const result = getUserById(1);

    expect(GetDataById).toHaveBeenCalledWith(1, {
      url: '/users',
      key: 'get-user',
    });
    expect(result).toEqual(mockResponse);
  });
});
