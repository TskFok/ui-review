import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import type { RawUIMeta } from '../types/ui';

const SAMPLES_DIR = resolve(process.cwd(), 'public/ui-samples');
const ids = ['retro-futurism-gaming-dark', 'retro-futurism-gaming-light'];

function readMeta(id: string): RawUIMeta {
  const file = join(SAMPLES_DIR, id, 'meta.json');
  return JSON.parse(readFileSync(file, 'utf-8')) as RawUIMeta;
}

describe('Retro-Futurism gaming entertainment music samples metadata', () => {
  it('深浅两套目录存在且包含基础文件', () => {
    for (const id of ids) {
      const dir = join(SAMPLES_DIR, id);
      expect(existsSync(dir)).toBe(true);
      expect(existsSync(join(dir, 'meta.json'))).toBe(true);
      expect(existsSync(join(dir, 'index.html'))).toBe(true);
      expect(existsSync(join(dir, 'style.css'))).toBe(true);
    }
  });

  it('meta 字段符合 Retro-Futurism 娱乐平台约束', () => {
    for (const id of ids) {
      const meta = readMeta(id);
      expect(meta.id).toBe(id);
      expect(meta.entry).toBe('index.html');
      expect(meta.industry).toBe('gaming-entertainment-music');
      expect(meta.density).toBe('immersive');
      expect(meta.style).toContain('Retro-Futurism');
      expect(meta.style).toContain('Gaming');
      expect(meta.style).toContain('Entertainment');
      expect(meta.style).toContain('Music Platforms');
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
