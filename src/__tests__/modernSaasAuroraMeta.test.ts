import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import type { RawUIMeta } from '../types/ui';

const SAMPLES_DIR = resolve(process.cwd(), 'public/ui-samples');
const ids = ['modern-saas-aurora-dark', 'modern-saas-aurora-light'] as const;

function readMeta(id: string): RawUIMeta {
  const file = join(SAMPLES_DIR, id, 'meta.json');
  return JSON.parse(readFileSync(file, 'utf-8')) as RawUIMeta;
}

describe('Modern SaaS Aurora samples metadata', () => {
  it('深浅色目录都存在且包含完整文件', () => {
    for (const id of ids) {
      const dir = join(SAMPLES_DIR, id);
      expect(existsSync(dir)).toBe(true);
      expect(existsSync(join(dir, 'meta.json'))).toBe(true);
      expect(existsSync(join(dir, 'index.html'))).toBe(true);
      expect(existsSync(join(dir, 'style.css'))).toBe(true);
    }
  });

  it('meta 字段符合 modern saas aurora 规范', () => {
    for (const id of ids) {
      const meta = readMeta(id);
      expect(meta.id).toBe(id);
      expect(meta.entry).toBe('index.html');
      expect(meta.industry).toBe('saas');
      expect(meta.density).toBe('balanced');
      expect(meta.style).toContain('Modern SaaS');
      expect(meta.style).toContain('Aurora');
      expect(Array.isArray(meta.recommendedFor)).toBe(true);
      expect(meta.recommendedFor?.length).toBeGreaterThan(0);
      if (id.endsWith('-dark')) {
        expect(meta.theme).toBe('dark');
      } else {
        expect(meta.theme).toBe('light');
      }
    }
  });
});
