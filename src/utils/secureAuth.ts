// import { ENVIRONMENT } from '@/constants/envs';
import { AuthState } from '@/types/auth';
import { DataDemoState } from '@/types/demo';

// import getEnvValue from './env';

// const SECRET_KEY = getEnvValue(ENVIRONMENT.SECRET_KEY);
const SECRET_KEY = 'CyhNv3XqwfOyp/8qcyhdly96gndLoytDUg6aXdo6+pE=';

const encryptData = (data: AuthState | DataDemoState): string => {
  const json = JSON.stringify(data);
  return btoa(
    [...json]
      .map((char, i) => String.fromCharCode(char.charCodeAt(0) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length)))
      .join(''),
  );
};

const decryptData = (data: string): AuthState | DataDemoState | null => {
  try {
    const decoded = [...atob(data)]
      .map((char, i) => String.fromCharCode(char.charCodeAt(0) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length)))
      .join('');
    return JSON.parse(decoded) as AuthState | DataDemoState;
  } catch {
    return null;
  }
};

export { encryptData, decryptData };
