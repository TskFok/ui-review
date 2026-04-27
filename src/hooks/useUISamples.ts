import { useMemo } from 'react';
import samplesData from 'virtual:ui-samples';
import type { RawUIMeta, UIMeta } from '../types/ui';

export function parseUISamples(raws: RawUIMeta[]): UIMeta[] {
  const list: UIMeta[] = [];

  for (const raw of raws) {
    if (!raw || !raw.id || !raw.name) continue;
    list.push({
      id: raw.id,
      name: raw.name,
      description: raw.description ?? '',
      style: Array.isArray(raw.style) ? raw.style : [],
      entry: raw.entry || 'index.html',
      theme: raw.theme ?? '',
      industry: raw.industry ?? '',
      density: raw.density ?? '',
      recommendedFor: Array.isArray(raw.recommendedFor) ? raw.recommendedFor : [],
    });
  }

  return list.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
}

export function useUISamples(): UIMeta[] {
  return useMemo(() => parseUISamples(samplesData as RawUIMeta[]), []);
}
