import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import type { RawUIMeta } from '../types/ui';

const SAMPLES_DIR = resolve(process.cwd(), 'public/ui-samples');
const sampleGroups = [
  { industry: 'government', ids: ['government-accessible-ethical-light', 'government-accessible-ethical-dark'] },
  { industry: 'healthcare', ids: ['healthcare-accessible-ethical-light', 'healthcare-accessible-ethical-dark'] },
  { industry: 'education', ids: ['education-accessible-ethical-light', 'education-accessible-ethical-dark'] },
];

function readMeta(id: string): RawUIMeta {
  const file = join(SAMPLES_DIR, id, 'meta.json');
  return JSON.parse(readFileSync(file, 'utf-8')) as RawUIMeta;
}

describe('Accessible & Ethical public samples metadata', () => {
  it('三类行业深浅色目录都存在且包含完整文件', () => {
    for (const group of sampleGroups) {
      for (const id of group.ids) {
        const dir = join(SAMPLES_DIR, id);
        expect(existsSync(dir)).toBe(true);
        expect(existsSync(join(dir, 'meta.json'))).toBe(true);
        expect(existsSync(join(dir, 'index.html'))).toBe(true);
        expect(existsSync(join(dir, 'style.css'))).toBe(true);
      }
    }
  });

  it('meta 符合 Accessible & Ethical 样式约束', () => {
    for (const group of sampleGroups) {
      for (const id of group.ids) {
        const meta = readMeta(id);
        expect(meta.id).toBe(id);
        expect(meta.entry).toBe('index.html');
        expect(meta.industry).toBe(group.industry);
        expect(meta.density).toBe('comfortable');
        expect(meta.style).toContain('Accessible & Ethical');
        expect(Array.isArray(meta.recommendedFor)).toBe(true);
        expect(meta.recommendedFor?.length).toBeGreaterThan(0);
        if (id.endsWith('-dark')) {
          expect(meta.theme).toBe('dark');
        } else {
          expect(meta.theme).toBe('light');
        }
      }
    }
  });
});
