import { ENVIRONMENT } from '@/constants/envs';

const getEnvValue = (env: keyof typeof ENVIRONMENT): string => {
  const value = import.meta.env[`VITE_${env}`] as string | undefined;

  if (!value) {
    throw new Error(`${env} is not defined in the environment variables`);
  }

  return value;
};

export default getEnvValue;
