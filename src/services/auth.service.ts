import type { AxiosError, AxiosResponse } from 'axios';

import { AUTH_SERVICE } from '@/constants/services';
import { AuthRequest, LoginRequest, LoginResponse } from '@/types/auth';

import { Mutation } from '@/libs/query';

const loginRequest = () => {
  const loginMutation = Mutation<LoginResponse, LoginRequest>({
    url: AUTH_SERVICE.LOGIN,
    key: 'login',
    method: 'post',
  });

  return loginMutation;
};

const registerRequest = () => {
  const registerMutation = Mutation<AxiosResponse, AuthRequest>(
    {
      url: AUTH_SERVICE.REGISTER,
      key: 'register',
      method: 'post',
    },
    (response: AxiosResponse) => {
      return response.data as AxiosResponse;
    },
    (error: unknown) => {
      const axiosError = error as AxiosError<{ message?: string }>;
      if (axiosError) throw axiosError;
    },
  );

  return registerMutation;
};

export { loginRequest, registerRequest };
