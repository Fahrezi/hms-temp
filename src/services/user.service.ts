import type { UseQueryResult } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

import { USER_SERVICE } from '@/constants/services';
import type { UserResponse, UsersResponse } from '@/types/user';

import { GetData, GetDataById } from '@/libs/query';

export const getUsers = (page = 1): UseQueryResult<AxiosResponse<UsersResponse>> => {
  const option = {
    url: `${USER_SERVICE.BASE}`,
    key: 'get-users',
    params: { page },
    enabled: page > 0,
  };

  return GetData<UsersResponse>(option);
};

export const getUserById = (id: string | number): UseQueryResult<AxiosResponse<UserResponse>> => {
  const option = {
    url: USER_SERVICE.BASE,
    key: 'get-user',
  };

  return GetDataById<UserResponse>(id, option);
};
