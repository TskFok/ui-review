import { describe, it, expect } from 'vitest';
import { parseUISamples } from '../hooks/useUISamples';
import type { RawUIMeta } from '../types/ui';

describe('parseUISamples', () => {
  it('返回规范化的 UIMeta 列表并按名称排序', () => {
    const raws: RawUIMeta[] = [
      { id: 'b', name: 'B 看板', description: 'desc-b', style: ['深色'], theme: 'dark' },
      { id: 'a', name: 'A 登录页', description: 'desc-a', style: ['极简'], theme: 'light' },
    ];
    const result = parseUISamples(raws);
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('a');
    expect(result[1].id).toBe('b');
    expect(result[0].entry).toBe('index.html');
    expect(result[0].theme).toBe('light');
  });

  it('缺少 id 或 name 的项会被忽略', () => {
    const raws = [
      { id: '', name: 'no id' },
      { id: 'x', name: '' },
      { id: 'ok', name: '有效项' },
    ] as RawUIMeta[];
    const result = parseUISamples(raws);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('ok');
  });

  it('使用自定义 entry 并为扩展字段提供默认值', () => {
    const raws: RawUIMeta[] = [
      { id: 'c', name: 'C', entry: 'custom.html' },
    ];
    const result = parseUISamples(raws);
    expect(result[0].entry).toBe('custom.html');
    expect(result[0].style).toEqual([]);
    expect(result[0].description).toBe('');
    expect(result[0].theme).toBe('');
    expect(result[0].industry).toBe('');
    expect(result[0].density).toBe('');
    expect(result[0].recommendedFor).toEqual([]);
  });

  it('空输入返回空列表', () => {
    expect(parseUISamples([])).toEqual([]);
  });
});
