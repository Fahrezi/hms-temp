import { describe, expect, it, vi } from 'vitest';

import { decryptData, encryptData } from '@/utils/secureAuth';
import { ENVIRONMENT } from '@/constants/envs';
import { AuthState } from '@/types/auth';

vi.mock('./env', async () => {
  const actual = await vi.importActual('./env');
  return {
    ...actual,
    default: (key: keyof typeof ENVIRONMENT) => {
      if (key === 'SECRET_KEY') return 'mysecret';
      throw new Error(`${key} is not defined in the environment variables`);
    },
  };
});

describe('encryptData & decryptData', () => {
  const sampleData: AuthState = {
    user: {
      email: 'test@mail.com',
      id: '1',
      name: 'test',
      roles: ['admin'],
    },
    isAuthenticated: true,
    isLoading: false,
    token: 'test123',
  };

  it('should encrypt and decrypt data correctly', () => {
    const encrypted = encryptData(sampleData);
    expect(encrypted).toBeDefined();

    const decrypted = decryptData(encrypted);
    expect(decrypted).toEqual(sampleData);
  });

  it('should return null on invalid decryption', () => {
    const result = decryptData('invalid_data');
    expect(result).toBeNull();
  });
});
