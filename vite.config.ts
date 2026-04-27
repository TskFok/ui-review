import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const SAMPLES_DIR = resolve(__dirname, 'public/ui-samples');
const VIRTUAL_ID = 'virtual:ui-samples';
const RESOLVED_ID = '\0' + VIRTUAL_ID;

function scanSamples(): unknown[] {
  if (!existsSync(SAMPLES_DIR)) return [];
  const entries: unknown[] = [];
  for (const name of readdirSync(SAMPLES_DIR)) {
    const dir = join(SAMPLES_DIR, name);
    if (!statSync(dir).isDirectory()) continue;
    const metaPath = join(dir, 'meta.json');
    if (!existsSync(metaPath)) continue;
    try {
      const raw = JSON.parse(readFileSync(metaPath, 'utf-8'));
      entries.push({ ...raw, id: raw.id || name });
    } catch {
      // 忽略损坏的 meta.json
    }
  }
  return entries;
}

function uiSamplesPlugin(): Plugin {
  return {
    name: 'vite-plugin-ui-samples',
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
      return null;
    },
    load(id) {
      if (id === RESOLVED_ID) {
        const data = scanSamples();
        return `export default ${JSON.stringify(data)};`;
      }
      return null;
    },
    configureServer(server) {
      const watcher = server.watcher;
      watcher.add(SAMPLES_DIR);
      const reload = (file: string) => {
        if (!file.includes('ui-samples')) return;
        if (!file.endsWith('meta.json')) return;
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: 'full-reload' });
      };
      watcher.on('add', reload);
      watcher.on('change', reload);
      watcher.on('unlink', reload);
    },
  };
}

export default defineConfig({
  plugins: [react(), uiSamplesPlugin()],
  server: {
    port: 5173,
  },
});
