/* eslint-disable @typescript-eslint/ban-ts-comment */
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import getEnvValue from '@/utils/env';

// Mocking import.meta.env
const originalEnv = { ...import.meta.env };

describe('getEnvValue', () => {
  beforeEach(() => {
    // @ts-expect-error
    import.meta.env = { ...originalEnv };
  });

  afterEach(() => {
    // @ts-expect-error
    import.meta.env = { ...originalEnv };
  });

  it('should return the correct environment value', () => {
    import.meta.env['VITE_TEST_KEY'] = 'test_value';
    const value = getEnvValue('API_URL');
    expect(value).toBe(originalEnv.VITE_API_URL);
  });

  it('should throw an error if the environment variable is not defined', () => {
    // @ts-expect-error
    expect(() => getEnvValue('NON_EXISTENT_KEY')).toThrow(
      'NON_EXISTENT_KEY is not defined in the environment variables',
    );
  });
});
