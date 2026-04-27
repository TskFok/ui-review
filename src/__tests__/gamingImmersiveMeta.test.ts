import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import type { RawUIMeta } from '../types/ui';

const SAMPLES_DIR = resolve(process.cwd(), 'public/ui-samples');
const ids = ['gaming-immersive-3d', 'gaming-immersive-hyperrealism'];

function readMeta(id: string): RawUIMeta {
  const file = join(SAMPLES_DIR, id, 'meta.json');
  return JSON.parse(readFileSync(file, 'utf-8')) as RawUIMeta;
}

describe('Gaming immersive styles metadata', () => {
  it('3D 与 Hyperrealism 两个目录存在且包含入口文件', () => {
    for (const id of ids) {
      const dir = join(SAMPLES_DIR, id);
      expect(existsSync(dir)).toBe(true);
      expect(existsSync(join(dir, 'meta.json'))).toBe(true);
      expect(existsSync(join(dir, 'index.html'))).toBe(true);
      expect(existsSync(join(dir, 'style.css'))).toBe(true);
    }
  });

  it('meta 字段满足 gaming showcase 约束', () => {
    for (const id of ids) {
      const meta = readMeta(id);
      expect(meta.id).toBe(id);
      expect(meta.entry).toBe('index.html');
      expect(meta.industry).toBe('gaming-showcase');
      expect(meta.theme).toBe('dark-light');
      expect(meta.density).toBe('comfortable');
      expect(meta.style).toContain('Gaming');
      expect(meta.style).toContain('Product Showcase');
      expect(meta.style).toContain('Immersive');
      expect(Array.isArray(meta.recommendedFor)).toBe(true);
      expect(meta.recommendedFor?.length).toBeGreaterThan(0);
    }
  });
});
