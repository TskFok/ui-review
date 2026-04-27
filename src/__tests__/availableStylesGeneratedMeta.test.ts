import { describe, expect, it } from 'vitest';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import type { RawUIMeta } from '../types/ui';

const SAMPLES_DIR = resolve(process.cwd(), 'public/ui-samples');
const STYLE_COUNT = 67;

function readMeta(id: string): RawUIMeta {
  return JSON.parse(readFileSync(join(SAMPLES_DIR, id, 'meta.json'), 'utf-8')) as RawUIMeta;
}

describe('UI UX Pro Max Available Styles generated samples', () => {
  it('为 67 个 Available Styles 生成浅色和深色两套目录', () => {
    const ids = readdirSync(SAMPLES_DIR).filter((id) => /^uupm-\d{2}-/.test(id));

    expect(ids).toHaveLength(STYLE_COUNT * 2);
    for (const id of ids) {
      expect(existsSync(join(SAMPLES_DIR, id, 'meta.json'))).toBe(true);
      expect(existsSync(join(SAMPLES_DIR, id, 'index.html'))).toBe(true);
      expect(existsSync(join(SAMPLES_DIR, id, 'style.css'))).toBe(true);
    }
  });

  it('每个 Available Style 同时包含 light 和 dark meta', () => {
    for (let index = 1; index <= STYLE_COUNT; index += 1) {
      const prefix = `uupm-${String(index).padStart(2, '0')}-`;
      const ids = readdirSync(SAMPLES_DIR).filter((id) => id.startsWith(prefix));
      const light = ids.find((id) => id.endsWith('-light'));
      const dark = ids.find((id) => id.endsWith('-dark'));

      expect(light).toBeTruthy();
      expect(dark).toBeTruthy();

      for (const id of [light, dark]) {
        const meta = readMeta(id as string);
        expect(meta.id).toBe(id);
        expect(meta.entry).toBe('index.html');
        expect(meta.style).toContain('Available Styles');
        expect(meta.theme).toMatch(/^(light|dark)$/);
        expect(meta.industry).toBeTruthy();
        expect(meta.density).toBeTruthy();
        expect(meta.recommendedFor?.length).toBeGreaterThan(0);
      }
    }
  });
});
