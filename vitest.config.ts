/**
 * Configuration Vitest pour Guillaume Farré
 *
 * @author Lalou
 * @date 2025-11-08
 */

import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  // Next impose « jsx: preserve » dans tsconfig.json : les composants que les tests rendent
  // (lib/__tests__/presse-page.test.ts) se compilent donc ici avec le runtime automatique de React
  oxc: {
    jsx: { runtime: 'automatic', importSource: 'react' },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    exclude: ['node_modules/**', '.next/**', 'e2e/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        '.next/',
        'e2e/',
        'vitest.config.ts',
        'vitest.setup.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
