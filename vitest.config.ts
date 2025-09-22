import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'v8',
      reportsDirectory: 'coverage',
      exclude: [
        'src/App.tsx',
        'src/Main.tsx',
        '**.config.{js,ts,tsx,jsx}',
        'src/vite-env.d.ts',
        'src/types',
        'dist',
        'src/components/pages/index.tsx',
        'src/routes',
        'src/libs',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
