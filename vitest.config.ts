import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import type { Plugin } from 'vite';

const VIRTUAL_ID = 'virtual:ui-samples';
const RESOLVED_ID = '\0' + VIRTUAL_ID;

function uiSamplesStubPlugin(): Plugin {
  return {
    name: 'vite-plugin-ui-samples-stub',
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
      return null;
    },
    load(id) {
      if (id === RESOLVED_ID) return 'export default [];';
      return null;
    },
  };
}

export default defineConfig({
  define: {
    'import.meta.env.BASE_URL': JSON.stringify('/'),
  },
  plugins: [react(), uiSamplesStubPlugin()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.ts'],
    css: true,
  },
});
