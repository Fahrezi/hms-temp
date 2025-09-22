/* eslint-disable @typescript-eslint/ban-ts-comment */
import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';

import useSmallContainer from '@/hooks/useSmallContainer';

import getEnvValue from '@/utils/env';

vi.mock('@/utils/env');

const SMALL_CONTAINER_CLASS = 'small-container';

describe('useSmallContainer', () => {
  afterEach(() => {
    document.body.classList.remove(SMALL_CONTAINER_CLASS);
    vi.clearAllMocks();
  });

  it('should add small-container class when ENABLE_SMALL_CONTAINER is true', () => {
    // @ts-ignore
    (getEnvValue as vi.Mock).mockReturnValue('true');

    renderHook(() => useSmallContainer());

    expect(document.body.classList.contains(SMALL_CONTAINER_CLASS)).toBe(true);
  });

  it('should not add small-container class when ENABLE_SMALL_CONTAINER is false', () => {
    // @ts-ignore
    (getEnvValue as vi.Mock).mockReturnValue('false');

    renderHook(() => useSmallContainer());

    expect(document.body.classList.contains(SMALL_CONTAINER_CLASS)).toBe(false);
  });

  it('should remove small-container class on unmount', () => {
    // @ts-ignore
    (getEnvValue as vi.Mock).mockReturnValue('true');

    const { unmount } = renderHook(() => useSmallContainer());
    expect(document.body.classList.contains(SMALL_CONTAINER_CLASS)).toBe(true);

    unmount();
    expect(document.body.classList.contains(SMALL_CONTAINER_CLASS)).toBe(false);
  });
});
