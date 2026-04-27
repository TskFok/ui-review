import { describe, it, expect } from 'vitest';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import type { RawUIMeta } from '../types/ui';

const SAMPLES_DIR = resolve(process.cwd(), 'public/ui-samples');
const requiredIds = [
  'saas-fin-glass-aurora',
  'saas-fin-glass-grid',
  'saas-fin-glass-focus',
  'saas-fin-glass-light-ivory',
  'saas-fin-glass-light-mint',
  'saas-fin-glass-light-sky',
];

function readMeta(id: string): RawUIMeta {
  const file = join(SAMPLES_DIR, id, 'meta.json');
  return JSON.parse(readFileSync(file, 'utf-8')) as RawUIMeta;
}

describe('Glassmorphism financial samples metadata', () => {
  it('新增样式目录都存在且包含 meta.json', () => {
    expect(existsSync(SAMPLES_DIR)).toBe(true);
    for (const id of requiredIds) {
      const dir = join(SAMPLES_DIR, id);
      expect(existsSync(dir)).toBe(true);
      expect(statSync(dir).isDirectory()).toBe(true);
      expect(existsSync(join(dir, 'meta.json'))).toBe(true);
    }
  });

  it('新增样式 meta 字段完整且符合预期', () => {
    for (const id of requiredIds) {
      const meta = readMeta(id);
      expect(meta.id).toBe(id);
      expect(meta.name).toBeTruthy();
      expect(meta.description).toBeTruthy();
      expect(meta.entry).toBe('index.html');
      expect(Array.isArray(meta.style)).toBe(true);
      expect(meta.style?.length).toBeGreaterThan(0);
      expect(meta.style).toContain('Glassmorphism');
      expect(meta.style).toContain('金融');
      expect(meta.theme).toBeTruthy();
      expect(meta.industry).toBe('financial-saas');
      expect(meta.density).toBeTruthy();
      expect(Array.isArray(meta.recommendedFor)).toBe(true);
      expect(meta.recommendedFor?.length).toBeGreaterThan(0);
    }
  });

  it('样式目录保持唯一 id，避免列表重复', () => {
    const ids = readdirSync(SAMPLES_DIR)
      .map((dir) => join(SAMPLES_DIR, dir, 'meta.json'))
      .filter((metaPath) => existsSync(metaPath))
      .map((metaPath) => JSON.parse(readFileSync(metaPath, 'utf-8')) as RawUIMeta)
      .map((meta) => meta.id)
      .filter((id): id is string => Boolean(id));

    const idSet = new Set(ids);
    expect(idSet.size).toBe(ids.length);
  });
});
