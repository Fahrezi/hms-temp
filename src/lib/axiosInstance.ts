import axios from 'axios';

// import getEnvValue from '@/utils/env';
import { decryptData } from '@/utils/secureAuth';
import { getLocalStorage, removeLocalStorage } from '@/utils/storage';
// import { ENVIRONMENT } from '@/constants/envs';
import { AuthState } from '@/types/auth';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache',
  Expires: '0',
};

const instance = axios.create({
  baseURL: 'localhost:8080/api',
  headers,
  timeout: 60000,
});

instance.interceptors.request.use(
  (request) => {
    const storedData = getLocalStorage<string>('auth');
    if (storedData) {
      try {
        const parsedData = decryptData(storedData) as AuthState;
        if (parsedData?.token) {
          request.headers.Authorization = `Bearer ${parsedData?.token}`;
        }
      } catch (error) {
        console.error('Failed to parse auth data:', error);
      }
    }
    return request;
  },
  (error) => {
    if (error instanceof Error) {
      return Promise.reject(error);
    }
    const message = typeof error === 'string' ? error : JSON.stringify(error);
    return Promise.reject(new Error(message));
  },
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response) {
      const { response } = error;

      // Handle unauthorized
      if (response.status === 401 && response.data?.message === 'Unauthorized') {
        console.warn('Session expired. Redirecting to login...');
        removeLocalStorage('auth');
        window.location.href = '/login'; // Redirect to login
      }
    }

    if (error instanceof Error) {
      return Promise.reject(error);
    }

    const message = typeof error === 'string' ? error : JSON.stringify(error);
    return Promise.reject(new Error(message));
  },
);

export default instance;
