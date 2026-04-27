import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import type { RawUIMeta } from '../types/ui';

const SAMPLES_DIR = resolve(process.cwd(), 'public/ui-samples');
const brutalismIds = ['brutalism-portfolio-dark', 'brutalism-portfolio-light'];

function readMeta(id: string): RawUIMeta {
  const file = join(SAMPLES_DIR, id, 'meta.json');
  return JSON.parse(readFileSync(file, 'utf-8')) as RawUIMeta;
}

describe('Brutalism portfolio samples metadata', () => {
  it('深浅两套风格目录均存在并含 meta.json', () => {
    for (const id of brutalismIds) {
      const dir = join(SAMPLES_DIR, id);
      expect(existsSync(dir)).toBe(true);
      expect(existsSync(join(dir, 'meta.json'))).toBe(true);
    }
  });

  it('meta 字段符合 design portfolio 样式约束', () => {
    for (const id of brutalismIds) {
      const meta = readMeta(id);
      expect(meta.id).toBe(id);
      expect(meta.entry).toBe('index.html');
      expect(meta.industry).toBe('design-portfolio');
      expect(meta.style).toContain('Brutalism');
      expect(meta.style).toContain('作品集');
      expect(Array.isArray(meta.recommendedFor)).toBe(true);
      expect(meta.recommendedFor?.length).toBeGreaterThan(0);
      if (id.endsWith('dark')) {
        expect(meta.theme).toBe('dark');
      } else {
        expect(meta.theme).toBe('light');
      }
    }
  });
});
