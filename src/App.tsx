import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { UIList } from './components/UIList';
import { UIViewer } from './components/UIViewer';
import { useUISamples } from './hooks/useUISamples';
import type { UIMeta } from './types/ui';
import styles from './App.module.css';

const SELECTED_UI_STORAGE_KEY = 'ui-review:selected-ui-id';

function readInitialId(): string | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const queryId = params.get('ui');
  if (queryId) return queryId;
  try {
    return window.localStorage.getItem(SELECTED_UI_STORAGE_KEY);
  } catch {
    return null;
  }
}

type ShellEffect =
  | 'minimal'
  | 'soft'
  | 'glass'
  | 'brutal'
  | 'hyper'
  | 'block'
  | 'oled'
  | 'inclusive'
  | 'clay'
  | 'aurora'
  | 'retro'
  | 'flat'
  | 'motion'
  | 'zero'
  | 'bento'
  | 'vapor'
  | 'cyber'
  | 'organic'
  | 'ai'
  | 'memphis'
  | 'layer'
  | 'type'
  | 'spatial'
  | 'pixel'
  | 'raw'
  | 'tactile'
  | 'cursor'
  | 'voice'
  | 'editorial'
  | 'rgb'
  | 'landing'
  | 'trust'
  | 'dashboard'
  | 'heatmap'
  | 'monitoring'
  | 'finance'
  | 'sales';

type ShellStyle = CSSProperties & Record<`--${string}`, string>;

interface StyleRecipe {
  hue: number;
  accent: number;
  effect: ShellEffect;
  border: 'fine' | 'medium' | 'bold' | 'none' | 'glow';
  shadow: 'none' | 'soft' | 'hard' | 'glow' | 'layered';
  radius: string;
  saturation?: number;
}

interface ShellTheme {
  className: string;
  effect: ShellEffect;
  family: string;
  style: ShellStyle;
}

const STYLE_RECIPES: Record<string, StyleRecipe> = {
  'minimalism-and-swiss-style': { hue: 220, accent: 220, effect: 'minimal', border: 'fine', shadow: 'none', radius: '2px', saturation: 8 },
  neumorphism: { hue: 220, accent: 210, effect: 'soft', border: 'none', shadow: 'soft', radius: '24px', saturation: 18 },
  glassmorphism: { hue: 204, accent: 263, effect: 'glass', border: 'fine', shadow: 'glow', radius: '18px', saturation: 52 },
  brutalism: { hue: 48, accent: 2, effect: 'brutal', border: 'bold', shadow: 'hard', radius: '0px', saturation: 94 },
  '3d-and-hyperrealism': { hue: 258, accent: 190, effect: 'hyper', border: 'medium', shadow: 'layered', radius: '18px', saturation: 72 },
  'vibrant-and-block-based': { hue: 195, accent: 325, effect: 'block', border: 'bold', shadow: 'hard', radius: '6px', saturation: 94 },
  'dark-mode-oled': { hue: 222, accent: 196, effect: 'oled', border: 'fine', shadow: 'glow', radius: '12px', saturation: 58 },
  'accessible-and-ethical': { hue: 215, accent: 162, effect: 'inclusive', border: 'medium', shadow: 'soft', radius: '10px', saturation: 42 },
  claymorphism: { hue: 346, accent: 278, effect: 'clay', border: 'fine', shadow: 'soft', radius: '24px', saturation: 62 },
  'aurora-ui': { hue: 190, accent: 280, effect: 'aurora', border: 'fine', shadow: 'glow', radius: '18px', saturation: 84 },
  'retro-futurism': { hue: 272, accent: 32, effect: 'retro', border: 'medium', shadow: 'glow', radius: '10px', saturation: 78 },
  'flat-design': { hue: 212, accent: 8, effect: 'flat', border: 'medium', shadow: 'none', radius: '4px', saturation: 72 },
  skeuomorphism: { hue: 28, accent: 206, effect: 'retro', border: 'medium', shadow: 'layered', radius: '16px', saturation: 36 },
  'liquid-glass': { hue: 197, accent: 268, effect: 'glass', border: 'fine', shadow: 'glow', radius: '28px', saturation: 62 },
  'motion-driven': { hue: 249, accent: 18, effect: 'motion', border: 'medium', shadow: 'layered', radius: '14px', saturation: 82 },
  'micro-interactions': { hue: 162, accent: 225, effect: 'motion', border: 'medium', shadow: 'hard', radius: '12px', saturation: 68 },
  'inclusive-design': { hue: 208, accent: 142, effect: 'inclusive', border: 'medium', shadow: 'soft', radius: '14px', saturation: 44 },
  'zero-interface': { hue: 228, accent: 210, effect: 'zero', border: 'fine', shadow: 'none', radius: '20px', saturation: 22 },
  'soft-ui-evolution': { hue: 252, accent: 320, effect: 'soft', border: 'none', shadow: 'soft', radius: '22px', saturation: 38 },
  neubrutalism: { hue: 52, accent: 214, effect: 'brutal', border: 'bold', shadow: 'hard', radius: '2px', saturation: 96 },
  'bento-box-grid': { hue: 218, accent: 34, effect: 'bento', border: 'medium', shadow: 'soft', radius: '12px', saturation: 46 },
  'y2k-aesthetic': { hue: 306, accent: 178, effect: 'vapor', border: 'bold', shadow: 'glow', radius: '16px', saturation: 92 },
  'cyberpunk-ui': { hue: 192, accent: 304, effect: 'cyber', border: 'glow', shadow: 'glow', radius: '2px', saturation: 94 },
  'organic-biophilic': { hue: 112, accent: 28, effect: 'organic', border: 'medium', shadow: 'soft', radius: '24px', saturation: 42 },
  'ai-native-ui': { hue: 232, accent: 170, effect: 'ai', border: 'fine', shadow: 'glow', radius: '16px', saturation: 64 },
  'memphis-design': { hue: 318, accent: 48, effect: 'memphis', border: 'bold', shadow: 'hard', radius: '8px', saturation: 92 },
  vaporwave: { hue: 294, accent: 176, effect: 'vapor', border: 'bold', shadow: 'layered', radius: '6px', saturation: 96 },
  'dimensional-layering': { hue: 238, accent: 42, effect: 'layer', border: 'medium', shadow: 'layered', radius: '14px', saturation: 62 },
  'exaggerated-minimalism': { hue: 34, accent: 220, effect: 'minimal', border: 'bold', shadow: 'hard', radius: '0px', saturation: 26 },
  'kinetic-typography': { hue: 12, accent: 246, effect: 'type', border: 'bold', shadow: 'hard', radius: '4px', saturation: 88 },
  'parallax-storytelling': { hue: 250, accent: 28, effect: 'motion', border: 'fine', shadow: 'layered', radius: '18px', saturation: 54 },
  'swiss-modernism-2-0': { hue: 214, accent: 352, effect: 'minimal', border: 'medium', shadow: 'none', radius: '0px', saturation: 18 },
  'hud-sci-fi-fui': { hue: 184, accent: 118, effect: 'cyber', border: 'glow', shadow: 'glow', radius: '0px', saturation: 84 },
  'pixel-art': { hue: 42, accent: 330, effect: 'pixel', border: 'bold', shadow: 'hard', radius: '0px', saturation: 86 },
  'bento-grids': { hue: 210, accent: 172, effect: 'bento', border: 'medium', shadow: 'soft', radius: '14px', saturation: 42 },
  'spatial-ui-visionos': { hue: 226, accent: 190, effect: 'spatial', border: 'fine', shadow: 'glow', radius: '26px', saturation: 42 },
  'e-ink-paper': { hue: 42, accent: 210, effect: 'minimal', border: 'fine', shadow: 'none', radius: '3px', saturation: 8 },
  'gen-z-chaos-maximalism': { hue: 316, accent: 74, effect: 'memphis', border: 'bold', shadow: 'layered', radius: '10px', saturation: 98 },
  'biomimetic-organic-2-0': { hue: 136, accent: 248, effect: 'organic', border: 'fine', shadow: 'soft', radius: '32px', saturation: 48 },
  'anti-polish-raw-aesthetic': { hue: 24, accent: 210, effect: 'raw', border: 'bold', shadow: 'hard', radius: '0px', saturation: 38 },
  'tactile-digital-deformable-ui': { hue: 284, accent: 164, effect: 'tactile', border: 'medium', shadow: 'soft', radius: '28px', saturation: 62 },
  'nature-distilled': { hue: 92, accent: 34, effect: 'organic', border: 'fine', shadow: 'soft', radius: '18px', saturation: 32 },
  'interactive-cursor-design': { hue: 198, accent: 16, effect: 'cursor', border: 'bold', shadow: 'hard', radius: '999px', saturation: 84 },
  'voice-first-multimodal': { hue: 248, accent: 184, effect: 'voice', border: 'fine', shadow: 'glow', radius: '24px', saturation: 56 },
  '3d-product-preview': { hue: 218, accent: 30, effect: 'hyper', border: 'medium', shadow: 'layered', radius: '18px', saturation: 62 },
  'gradient-mesh-aurora-evolved': { hue: 205, accent: 302, effect: 'aurora', border: 'fine', shadow: 'glow', radius: '22px', saturation: 88 },
  'editorial-grid-magazine': { hue: 36, accent: 352, effect: 'editorial', border: 'fine', shadow: 'none', radius: '0px', saturation: 24 },
  'chromatic-aberration-rgb-split': { hue: 202, accent: 336, effect: 'rgb', border: 'glow', shadow: 'layered', radius: '4px', saturation: 98 },
  'vintage-analog-retro-film': { hue: 30, accent: 170, effect: 'retro', border: 'medium', shadow: 'soft', radius: '14px', saturation: 30 },
  'hero-centric-design': { hue: 258, accent: 32, effect: 'landing', border: 'medium', shadow: 'layered', radius: '18px', saturation: 64 },
  'conversion-optimized': { hue: 214, accent: 24, effect: 'landing', border: 'bold', shadow: 'hard', radius: '10px', saturation: 74 },
  'feature-rich-showcase': { hue: 264, accent: 154, effect: 'bento', border: 'medium', shadow: 'layered', radius: '16px', saturation: 58 },
  'minimal-and-direct': { hue: 220, accent: 220, effect: 'minimal', border: 'fine', shadow: 'none', radius: '0px', saturation: 10 },
  'social-proof-focused': { hue: 276, accent: 42, effect: 'trust', border: 'medium', shadow: 'soft', radius: '16px', saturation: 52 },
  'interactive-product-demo': { hue: 202, accent: 14, effect: 'cursor', border: 'medium', shadow: 'hard', radius: '14px', saturation: 78 },
  'trust-and-authority': { hue: 218, accent: 42, effect: 'trust', border: 'medium', shadow: 'soft', radius: '8px', saturation: 34 },
  'storytelling-driven': { hue: 20, accent: 248, effect: 'editorial', border: 'fine', shadow: 'layered', radius: '12px', saturation: 44 },
  'data-dense-dashboard': { hue: 215, accent: 162, effect: 'dashboard', border: 'fine', shadow: 'soft', radius: '8px', saturation: 42 },
  'heat-map-and-heatmap-style': { hue: 18, accent: 215, effect: 'heatmap', border: 'medium', shadow: 'glow', radius: '8px', saturation: 88 },
  'executive-dashboard': { hue: 226, accent: 36, effect: 'dashboard', border: 'fine', shadow: 'soft', radius: '12px', saturation: 34 },
  'real-time-monitoring': { hue: 186, accent: 116, effect: 'monitoring', border: 'glow', shadow: 'glow', radius: '8px', saturation: 78 },
  'drill-down-analytics': { hue: 250, accent: 175, effect: 'dashboard', border: 'medium', shadow: 'soft', radius: '10px', saturation: 54 },
  'comparative-analysis-dashboard': { hue: 205, accent: 28, effect: 'dashboard', border: 'medium', shadow: 'soft', radius: '8px', saturation: 46 },
  'predictive-analytics': { hue: 270, accent: 154, effect: 'ai', border: 'fine', shadow: 'glow', radius: '14px', saturation: 64 },
  'user-behavior-analytics': { hue: 318, accent: 196, effect: 'heatmap', border: 'fine', shadow: 'soft', radius: '12px', saturation: 62 },
  'financial-dashboard': { hue: 220, accent: 144, effect: 'finance', border: 'fine', shadow: 'soft', radius: '8px', saturation: 38 },
  'sales-intelligence-dashboard': { hue: 24, accent: 214, effect: 'sales', border: 'medium', shadow: 'hard', radius: '10px', saturation: 72 },
};

function extractStyleFamily(item: UIMeta | null): string {
  if (!item) return 'memphis-design';
  const match = item.id.match(/^uupm-\d+-(.*?)-(dark|light)$/);
  if (match?.[1]) return match[1];
  const styleName = item.style[0] ?? item.name;
  return styleName
    .toLocaleLowerCase('zh-CN')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function hsl(hue: number, saturation: number, lightness: number): string {
  return `hsl(${Math.round(hue % 360)} ${Math.round(saturation)}% ${Math.round(lightness)}%)`;
}

function hashHue(value: string): number {
  let hash = 0;
  for (const char of value) hash = (hash * 31 + char.charCodeAt(0)) % 360;
  return hash;
}

function buildBorder(recipe: StyleRecipe, ink: string, accent: string): string {
  if (recipe.border === 'none') return '1px solid transparent';
  if (recipe.border === 'fine') return `1px solid color-mix(in srgb, ${ink} 34%, transparent)`;
  if (recipe.border === 'bold') return `4px solid ${ink}`;
  if (recipe.border === 'glow') return `2px solid ${accent}`;
  return `2px solid color-mix(in srgb, ${ink} 62%, transparent)`;
}

function buildShadow(recipe: StyleRecipe, ink: string, accent: string, secondary: string): string {
  if (recipe.shadow === 'none') return 'none';
  if (recipe.shadow === 'soft') {
    return `10px 14px 0 color-mix(in srgb, ${ink} 14%, transparent), 0 18px 42px color-mix(in srgb, ${accent} 16%, transparent)`;
  }
  if (recipe.shadow === 'glow') {
    return `0 0 0 1px color-mix(in srgb, ${accent} 54%, transparent), 0 18px 48px color-mix(in srgb, ${accent} 32%, transparent)`;
  }
  if (recipe.shadow === 'layered') {
    return `7px 7px 0 ${secondary}, 13px 13px 0 color-mix(in srgb, ${accent} 76%, transparent)`;
  }
  return `8px 8px 0 ${ink}`;
}

function buildShellBackground(
  recipe: StyleRecipe,
  dark: boolean,
  paper: string,
  ink: string,
  accent: string,
  secondary: string,
  pop: string
): string {
  const base = dark
    ? `linear-gradient(135deg, ${paper}, color-mix(in srgb, ${paper} 74%, black))`
    : `linear-gradient(135deg, ${paper}, color-mix(in srgb, ${paper} 74%, white))`;

  switch (recipe.effect) {
    case 'glass':
    case 'spatial':
      return `radial-gradient(circle at 18% 12%, color-mix(in srgb, ${secondary} 52%, transparent), transparent 28%), radial-gradient(circle at 78% 18%, color-mix(in srgb, ${accent} 42%, transparent), transparent 32%), ${base}`;
    case 'cyber':
    case 'monitoring':
      return `repeating-linear-gradient(0deg, color-mix(in srgb, ${secondary} 18%, transparent) 0 2px, transparent 2px 18px), radial-gradient(circle at 84% 18%, color-mix(in srgb, ${accent} 34%, transparent), transparent 30%), ${base}`;
    case 'brutal':
    case 'raw':
      return `linear-gradient(90deg, transparent 0 47%, color-mix(in srgb, ${ink} 16%, transparent) 47% 53%, transparent 53%), linear-gradient(0deg, transparent 0 72%, color-mix(in srgb, ${pop} 34%, transparent) 72% 100%), ${base}`;
    case 'clay':
    case 'soft':
    case 'tactile':
      return `radial-gradient(circle at 20% 20%, color-mix(in srgb, ${accent} 36%, transparent), transparent 28%), radial-gradient(circle at 84% 70%, color-mix(in srgb, ${secondary} 28%, transparent), transparent 34%), ${base}`;
    case 'vapor':
    case 'rgb':
      return `linear-gradient(0deg, color-mix(in srgb, ${ink} 18%, transparent) 0 2px, transparent 2px 32px), linear-gradient(135deg, color-mix(in srgb, ${accent} 55%, ${paper}), color-mix(in srgb, ${secondary} 52%, ${paper}) 50%, color-mix(in srgb, ${pop} 44%, ${paper}))`;
    case 'pixel':
      return `linear-gradient(45deg, color-mix(in srgb, ${ink} 14%, transparent) 25%, transparent 25% 75%, color-mix(in srgb, ${ink} 14%, transparent) 75%), ${base}`;
    case 'organic':
      return `radial-gradient(ellipse at 18% 24%, color-mix(in srgb, ${secondary} 36%, transparent), transparent 34%), radial-gradient(ellipse at 82% 74%, color-mix(in srgb, ${pop} 24%, transparent), transparent 30%), ${base}`;
    case 'dashboard':
    case 'finance':
    case 'sales':
      return `linear-gradient(90deg, color-mix(in srgb, ${secondary} 12%, transparent) 0 1px, transparent 1px 72px), linear-gradient(0deg, color-mix(in srgb, ${secondary} 12%, transparent) 0 1px, transparent 1px 72px), ${base}`;
    case 'heatmap':
      return `radial-gradient(circle at 24% 24%, color-mix(in srgb, ${accent} 42%, transparent), transparent 18%), radial-gradient(circle at 68% 44%, color-mix(in srgb, ${pop} 36%, transparent), transparent 20%), radial-gradient(circle at 42% 78%, color-mix(in srgb, ${secondary} 34%, transparent), transparent 22%), ${base}`;
    case 'editorial':
      return `linear-gradient(90deg, color-mix(in srgb, ${ink} 10%, transparent) 0 1px, transparent 1px 88px), ${base}`;
    case 'zero':
      return `radial-gradient(circle at 50% 28%, color-mix(in srgb, ${secondary} 18%, transparent), transparent 26%), ${base}`;
    case 'memphis':
      return `linear-gradient(90deg, color-mix(in srgb, ${pop} 46%, transparent) 0 10px, transparent 10px 28px), radial-gradient(circle at 16px 16px, color-mix(in srgb, ${accent} 65%, transparent) 0 5px, transparent 6px), ${base}`;
    default:
      return `linear-gradient(120deg, color-mix(in srgb, ${accent} 16%, transparent), transparent 42%), linear-gradient(90deg, color-mix(in srgb, ${pop} 18%, transparent) 0 8px, transparent 8px 28px), ${base}`;
  }
}

export function getShellTheme(item: UIMeta | null): ShellTheme {
  const family = extractStyleFamily(item);
  const fallbackHue = hashHue(family);
  const recipe = STYLE_RECIPES[family] ?? {
    hue: fallbackHue,
    accent: (fallbackHue + 128) % 360,
    effect: 'memphis' as ShellEffect,
    border: 'bold' as const,
    shadow: 'hard' as const,
    radius: '8px',
    saturation: 76,
  };
  const dark = item?.theme === 'dark';
  const saturation = recipe.saturation ?? 68;
  const paper = dark
    ? hsl(recipe.hue, Math.max(18, saturation * 0.42), 8)
    : hsl(recipe.hue, Math.max(12, saturation * 0.5), recipe.effect === 'oled' ? 10 : 96);
  const ink = dark ? hsl(recipe.hue, 24, 92) : hsl(recipe.hue, 34, 11);
  const primary = hsl(recipe.accent, Math.min(98, saturation + 12), dark ? 62 : 46);
  const accent = hsl(recipe.accent, Math.min(98, saturation + 16), dark ? 64 : 55);
  const secondary = hsl((recipe.hue + 72) % 360, Math.min(96, saturation + 4), dark ? 60 : 56);
  const pop = hsl((recipe.accent + 86) % 360, Math.min(98, saturation + 20), dark ? 70 : 66);
  const onPrimary = dark && ['cyber', 'vapor', 'heatmap', 'monitoring', 'oled'].includes(recipe.effect)
    ? hsl(recipe.hue, 34, 8)
    : '#ffffff';
  const onPop = hsl(recipe.hue, 34, dark ? 8 : 11);
  const border = buildBorder(recipe, ink, accent);
  const shadow = buildShadow(recipe, ink, accent, secondary);
  const shellBg = buildShellBackground(recipe, dark, paper, ink, accent, secondary, pop);

  return {
    className: styles.themeDynamic,
    effect: recipe.effect,
    family,
    style: {
      '--memphis-ink': ink,
      '--memphis-paper': paper,
      '--memphis-pink': accent,
      '--memphis-yellow': pop,
      '--memphis-teal': secondary,
      '--memphis-purple': primary,
      '--memphis-blue': primary,
      '--memphis-mint': hsl((recipe.hue + 118) % 360, Math.min(92, saturation + 8), dark ? 66 : 72),
      '--memphis-red': hsl(358, 84, dark ? 66 : 54),
      '--memphis-on-accent': '#ffffff',
      '--memphis-on-primary': onPrimary,
      '--memphis-on-pop': onPop,
      '--memphis-card-text': recipe.effect === 'cyber' && dark ? hsl(recipe.hue, 34, 8) : ink,
      '--memphis-border': border,
      '--memphis-shadow': shadow,
      '--memphis-shadow-sm': shadow === 'none' ? 'none' : buildShadow({ ...recipe, shadow: recipe.shadow === 'layered' ? 'hard' : recipe.shadow }, ink, accent, secondary),
      '--memphis-radius': recipe.radius,
      '--shell-bg': shellBg,
      '--shell-sidebar-bg': shellBg,
      '--shell-filter': recipe.effect === 'retro' ? 'sepia(0.16) saturate(0.9)' : recipe.effect === 'vapor' ? 'saturate(1.35)' : recipe.effect === 'cyber' ? 'saturate(1.25) contrast(1.04)' : 'saturate(1)',
    },
  };
}

export function getShellThemeClass(item: UIMeta | null): string {
  return getShellTheme(item).className;
}

export default function App() {
  const items = useUISamples();
  const [themeFilters, setThemeFilters] = useState<string[]>([]);
  const [industryFilters, setIndustryFilters] = useState<string[]>([]);
  const [densityFilters, setDensityFilters] = useState<string[]>([]);
  const [recommendedForKeyword, setRecommendedForKeyword] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(readInitialId);

  const filterOptions = useMemo(() => {
    const themes = new Set<string>();
    const industries = new Set<string>();
    const densities = new Set<string>();
    for (const item of items) {
      if (item.theme) themes.add(item.theme);
      if (item.industry) industries.add(item.industry);
      if (item.density) densities.add(item.density);
    }
    return {
      themes: Array.from(themes).sort(),
      industries: Array.from(industries).sort(),
      densities: Array.from(densities).sort(),
    };
  }, [items]);

  const filteredItems = useMemo(() => {
    const keyword = recommendedForKeyword.trim().toLocaleLowerCase('zh-CN');
    return items.filter((item) => {
      if (themeFilters.length > 0 && !themeFilters.includes(item.theme)) return false;
      if (industryFilters.length > 0 && !industryFilters.includes(item.industry)) return false;
      if (densityFilters.length > 0 && !densityFilters.includes(item.density)) return false;
      if (keyword) {
        const hit = item.recommendedFor.some((text) =>
          text.toLocaleLowerCase('zh-CN').includes(keyword)
        );
        if (!hit) return false;
      }
      return true;
    });
  }, [items, themeFilters, industryFilters, densityFilters, recommendedForKeyword]);

  useEffect(() => {
    if (!selectedId && filteredItems.length > 0) {
      setSelectedId(filteredItems[0].id);
      return;
    }
    if (selectedId && !filteredItems.some((item) => item.id === selectedId)) {
      setSelectedId(filteredItems[0]?.id ?? null);
    }
  }, [filteredItems, selectedId]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    if (selectedId) {
      url.searchParams.set('ui', selectedId);
      try {
        window.localStorage.setItem(SELECTED_UI_STORAGE_KEY, selectedId);
      } catch {
        // Storage can be unavailable in private modes; URL state still preserves selection.
      }
    } else {
      url.searchParams.delete('ui');
      try {
        window.localStorage.removeItem(SELECTED_UI_STORAGE_KEY);
      } catch {
        // Ignore storage failures; rendering should not depend on persistence.
      }
    }
    window.history.replaceState(null, '', url.toString());
  }, [selectedId]);

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const toggleFilter = useCallback((value: string, set: Dispatch<SetStateAction<string[]>>) => {
    set((prev) => (prev.includes(value) ? prev.filter((it) => it !== value) : [...prev, value]));
  }, []);

  const handleToggleTheme = useCallback((value: string) => {
    toggleFilter(value, setThemeFilters);
  }, [toggleFilter]);

  const handleToggleIndustry = useCallback((value: string) => {
    toggleFilter(value, setIndustryFilters);
  }, [toggleFilter]);

  const handleToggleDensity = useCallback((value: string) => {
    toggleFilter(value, setDensityFilters);
  }, [toggleFilter]);

  const current = filteredItems.find((it) => it.id === selectedId) ?? null;
  const shellTheme = useMemo(() => getShellTheme(current), [current]);

  return (
    <div
      className={`${styles.layout} ${shellTheme.className}`}
      data-shell-effect={shellTheme.effect}
      data-shell-family={shellTheme.family}
      style={shellTheme.style}
    >
      <UIList
        items={filteredItems}
        selectedId={selectedId}
        onSelect={handleSelect}
        filters={{
          themes: themeFilters,
          industries: industryFilters,
          densities: densityFilters,
          recommendedForKeyword,
        }}
        options={filterOptions}
        onToggleTheme={handleToggleTheme}
        onToggleIndustry={handleToggleIndustry}
        onToggleDensity={handleToggleDensity}
        onKeywordChange={setRecommendedForKeyword}
      />
      <UIViewer item={current} />
    </div>
  );
}
