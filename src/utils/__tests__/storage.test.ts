/* eslint-disable @typescript-eslint/no-dynamic-delete */
import { beforeEach, describe, expect, it } from 'vitest';

import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@/utils/storage';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => (store[key] = value),
    removeItem: (key: string) => delete store[key],
    clear: () => (store = {}),
  };
})();

Object.defineProperty(global, 'localStorage', { value: localStorageMock });

describe('localStorage utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should set and get localStorage data correctly', () => {
    const key = 'testKey';
    const value = { user: 'test', authenticated: true };

    setLocalStorage(key, value);
    const result = getLocalStorage<typeof value>(key);

    expect(result).toEqual(value);
  });

  it('should return null for non-existent key', () => {
    const result = getLocalStorage('nonExistentKey');
    expect(result).toBeNull();
  });

  it('should handle parsing errors and return null', () => {
    localStorage.setItem('invalidKey', 'invalid JSON');
    const result = getLocalStorage('invalidKey');
    expect(result).toBeNull();
  });

  it('should remove localStorage item', () => {
    const key = 'testKey';
    setLocalStorage(key, { data: 'test' });

    removeLocalStorage(key);
    const result = getLocalStorage(key);
    expect(result).toBeNull();
  });
});
