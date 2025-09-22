import { ENVIRONMENT } from '@/constants/envs';
import { AuthState } from '@/types/auth';

import getEnvValue from './env';

const SECRET_KEY = getEnvValue(ENVIRONMENT.SECRET_KEY);

const encryptData = (data: AuthState): string => {
  const json = JSON.stringify(data);
  return btoa(
    [...json]
      .map((char, i) => String.fromCharCode(char.charCodeAt(0) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length)))
      .join(''),
  );
};

const decryptData = (data: string): AuthState | null => {
  try {
    const decoded = [...atob(data)]
      .map((char, i) => String.fromCharCode(char.charCodeAt(0) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length)))
      .join('');
    return JSON.parse(decoded) as AuthState;
  } catch {
    return null;
  }
};

export { encryptData, decryptData };
