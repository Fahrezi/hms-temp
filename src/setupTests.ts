import { vi } from 'vitest';
import '@testing-library/jest-dom';

class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn();
  root = null;
  rootMargin = '';
  thresholds = [0];
}

global.IntersectionObserver = MockIntersectionObserver;
