import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import type { RawUIMeta } from '../types/ui';

const SAMPLES_DIR = resolve(process.cwd(), 'public/ui-samples');
const ids = ['vibrant-block-startup-dark', 'vibrant-block-startup-light'];

function readMeta(id: string): RawUIMeta {
  const file = join(SAMPLES_DIR, id, 'meta.json');
  return JSON.parse(readFileSync(file, 'utf-8')) as RawUIMeta;
}

describe('Vibrant block startup samples metadata', () => {
  it('深浅两套目录存在且包含基础文件', () => {
    for (const id of ids) {
      const dir = join(SAMPLES_DIR, id);
      expect(existsSync(dir)).toBe(true);
      expect(existsSync(join(dir, 'meta.json'))).toBe(true);
      expect(existsSync(join(dir, 'index.html'))).toBe(true);
      expect(existsSync(join(dir, 'style.css'))).toBe(true);
    }
  });

  it('meta 字段符合 Vibrant & Block-based 约束', () => {
    for (const id of ids) {
      const meta = readMeta(id);
      expect(meta.id).toBe(id);
      expect(meta.entry).toBe('index.html');
      expect(meta.industry).toBe('startup-creative-gaming');
      expect(meta.density).toBe('bold');
      expect(meta.style).toContain('Vibrant');
      expect(meta.style).toContain('Block-based');
      expect(meta.style).toContain('Startups');
      expect(meta.style).toContain('Creative Agencies');
      expect(meta.style).toContain('Gaming');
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
