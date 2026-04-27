import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const samplesDir = join(rootDir, 'public', 'ui-samples');
const sourceUrl = 'https://github.com/nextlevelbuilder/ui-ux-pro-max-skill#available-styles-67';

const styles = [
  ['general', 'Minimalism & Swiss Style', 'Enterprise apps, dashboards, documentation', '极简瑞士风'],
  ['general', 'Neumorphism', 'Health/wellness apps, meditation platforms', '新拟态'],
  ['general', 'Glassmorphism', 'Modern SaaS, financial dashboards', '玻璃拟态'],
  ['general', 'Brutalism', 'Design portfolios, artistic projects', '粗野主义'],
  ['general', '3D & Hyperrealism', 'Gaming, product showcase, immersive', '三维超写实'],
  ['general', 'Vibrant & Block-based', 'Startups, creative agencies, gaming', '高饱和块面'],
  ['general', 'Dark Mode (OLED)', 'Night-mode apps, coding platforms', 'OLED 深色'],
  ['general', 'Accessible & Ethical', 'Government, healthcare, education', '可访问与伦理设计'],
  ['general', 'Claymorphism', "Educational apps, children's apps, SaaS", '黏土拟态'],
  ['general', 'Aurora UI', 'Modern SaaS, creative agencies', '极光界面'],
  ['general', 'Retro-Futurism', 'Gaming, entertainment, music platforms', '复古未来主义'],
  ['general', 'Flat Design', 'Web apps, mobile apps, startup MVPs', '扁平化设计'],
  ['general', 'Skeuomorphism', 'Legacy apps, gaming, premium products', '拟物化'],
  ['general', 'Liquid Glass', 'Premium SaaS, high-end e-commerce', '液态玻璃'],
  ['general', 'Motion-Driven', 'Portfolio sites, storytelling platforms', '动效叙事'],
  ['general', 'Micro-interactions', 'Mobile apps, touchscreen UIs', '微交互'],
  ['general', 'Inclusive Design', 'Public services, education, healthcare', '包容性设计'],
  ['general', 'Zero Interface', 'Voice assistants, AI platforms', '零界面'],
  ['general', 'Soft UI Evolution', 'Modern enterprise apps, SaaS', '柔和 UI 演进'],
  ['general', 'Neubrutalism', 'Gen Z brands, startups, Figma-style', '新粗野主义'],
  ['general', 'Bento Box Grid', 'Dashboards, product pages, portfolios', '便当盒网格'],
  ['general', 'Y2K Aesthetic', 'Fashion brands, music, Gen Z', 'Y2K 美学'],
  ['general', 'Cyberpunk UI', 'Gaming, tech products, crypto apps', '赛博朋克'],
  ['general', 'Organic Biophilic', 'Wellness apps, sustainability brands', '亲自然有机'],
  ['general', 'AI-Native UI', 'AI products, chatbots, copilots', 'AI 原生界面'],
  ['general', 'Memphis Design', 'Creative agencies, music, youth brands', '孟菲斯设计'],
  ['general', 'Vaporwave', 'Music platforms, gaming, portfolios', '蒸汽波'],
  ['general', 'Dimensional Layering', 'Dashboards, card layouts, modals', '维度分层'],
  ['general', 'Exaggerated Minimalism', 'Fashion, architecture, portfolios', '夸张极简'],
  ['general', 'Kinetic Typography', 'Hero sections, marketing sites', '动态字体'],
  ['general', 'Parallax Storytelling', 'Brand storytelling, product launches', '视差叙事'],
  ['general', 'Swiss Modernism 2.0', 'Corporate sites, architecture, editorial', '瑞士现代主义 2.0'],
  ['general', 'HUD / Sci-Fi FUI', 'Sci-fi games, space tech, cybersecurity', '科幻 HUD'],
  ['general', 'Pixel Art', 'Indie games, retro tools, creative', '像素艺术'],
  ['general', 'Bento Grids', 'Product features, dashboards, personal', '便当网格'],
  ['general', 'Spatial UI (VisionOS)', 'Spatial computing apps, VR/AR', '空间界面'],
  ['general', 'E-Ink / Paper', 'Reading apps, digital newspapers', '电子墨水纸张'],
  ['general', 'Gen Z Chaos / Maximalism', 'Gen Z lifestyle, music artists', 'Z 世代极繁'],
  ['general', 'Biomimetic / Organic 2.0', 'Sustainability tech, biotech, health', '仿生有机 2.0'],
  ['general', 'Anti-Polish / Raw Aesthetic', 'Creative portfolios, artist sites', '反精致原生美学'],
  ['general', 'Tactile Digital / Deformable UI', 'Modern mobile apps, playful brands', '触感数字界面'],
  ['general', 'Nature Distilled', 'Wellness brands, sustainable products', '自然萃取'],
  ['general', 'Interactive Cursor Design', 'Creative portfolios, interactive', '交互式光标'],
  ['general', 'Voice-First Multimodal', 'Voice assistants, accessibility apps', '语音优先多模态'],
  ['general', '3D Product Preview', 'E-commerce, furniture, fashion', '三维商品预览'],
  ['general', 'Gradient Mesh / Aurora Evolved', 'Hero sections, backgrounds, creative', '渐变网格极光'],
  ['general', 'Editorial Grid / Magazine', 'News sites, blogs, magazines', '杂志编辑网格'],
  ['general', 'Chromatic Aberration / RGB Split', 'Music platforms, gaming, tech', 'RGB 色差分离'],
  ['general', 'Vintage Analog / Retro Film', 'Photography, music/vinyl brands', '复古胶片'],
  ['landing', 'Hero-Centric Design', 'Products with strong visual identity', '英雄区中心'],
  ['landing', 'Conversion-Optimized', 'Lead generation, sales pages', '转化优化'],
  ['landing', 'Feature-Rich Showcase', 'SaaS, complex products', '功能展示'],
  ['landing', 'Minimal & Direct', 'Simple products, apps', '极简直达'],
  ['landing', 'Social Proof-Focused', 'Services, B2C products', '社会证明'],
  ['landing', 'Interactive Product Demo', 'Software, tools', '交互产品演示'],
  ['landing', 'Trust & Authority', 'B2B, enterprise, consulting', '信任权威'],
  ['landing', 'Storytelling-Driven', 'Brands, agencies, nonprofits', '故事驱动'],
  ['dashboard', 'Data-Dense Dashboard', 'Complex data analysis', '高密度数据看板'],
  ['dashboard', 'Heat Map & Heatmap Style', 'Geographic/behavior data', '热力图看板'],
  ['dashboard', 'Executive Dashboard', 'C-suite summaries', '高管看板'],
  ['dashboard', 'Real-Time Monitoring', 'Operations, DevOps', '实时监控'],
  ['dashboard', 'Drill-Down Analytics', 'Detailed exploration', '下钻分析'],
  ['dashboard', 'Comparative Analysis Dashboard', 'Side-by-side comparisons', '对比分析看板'],
  ['dashboard', 'Predictive Analytics', 'Forecasting, ML insights', '预测分析'],
  ['dashboard', 'User Behavior Analytics', 'UX research, product analytics', '用户行为分析'],
  ['dashboard', 'Financial Dashboard', 'Finance, accounting', '金融看板'],
  ['dashboard', 'Sales Intelligence Dashboard', 'Sales teams, CRM', '销售智能看板'],
].map(([type, name, bestFor, zhName], index) => ({ index: index + 1, type, name, bestFor, zhName }));

const palettes = [
  ['#2563eb', '#14b8a6', '#f59e0b'],
  ['#7c3aed', '#06b6d4', '#f43f5e'],
  ['#0f766e', '#84cc16', '#eab308'],
  ['#dc2626', '#2563eb', '#facc15'],
  ['#0891b2', '#6366f1', '#ec4899'],
  ['#16a34a', '#0ea5e9', '#f97316'],
];

const archetypeRules = [
  ['dashboard', /dashboard|analytics|monitoring|heatmap|sales|financial|executive|predictive|behavior/i],
  ['landing', /hero-centric|conversion|showcase|minimal & direct|social proof|product demo|trust|storytelling-driven/i],
  ['glass', /glass|liquid|aurora|gradient mesh/i],
  ['soft', /neumorphism|soft ui|clay|tactile/i],
  ['raw', /brutal|anti-polish|raw/i],
  ['immersive', /3d|hyperrealism|skeuomorphism|spatial|product preview/i],
  ['expressive', /vibrant|y2k|memphis|vaporwave|gen z|chromatic|rgb|vintage/i],
  ['terminal', /dark mode|cyberpunk|hud|sci-fi|pixel|retro-futurism/i],
  ['organic', /organic|biophilic|nature|biomimetic/i],
  ['voice', /zero interface|voice|ai-native/i],
  ['editorial', /editorial|magazine|e-ink|paper|swiss|minimalism|exaggerated minimalism/i],
  ['motion', /motion|micro-interactions|kinetic|parallax|interactive cursor|dimensional|bento/i],
];

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/\+/g, 'plus')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function archetypeFor(style) {
  if (style.type === 'dashboard') return 'dashboard';
  if (style.type === 'landing') return 'landing';
  const match = archetypeRules.find(([, pattern]) => pattern.test(style.name));
  return match ? match[0] : 'editorial';
}

function tokens(style, theme) {
  const [primary, secondary, accent] = palettes[(style.index - 1) % palettes.length];
  const light = theme === 'light';
  const lower = style.name.toLowerCase();
  const archetype = archetypeFor(style);
  const radius = archetype === 'raw' || lower.includes('swiss') ? '0px' : archetype === 'soft' || archetype === 'organic' ? '26px' : archetype === 'immersive' ? '18px' : '10px';
  const border = archetype === 'raw' ? '3px solid var(--ink)' : archetype === 'terminal' ? '1px solid color-mix(in srgb, var(--primary) 42%, transparent)' : '1px solid var(--line)';
  const shadow = archetype === 'raw'
    ? '8px 8px 0 var(--ink)'
    : archetype === 'soft'
      ? (light ? '10px 10px 24px #cbd5e1, -10px -10px 24px #ffffff' : '10px 10px 24px #020617, -10px -10px 24px #1e293b')
      : archetype === 'glass'
        ? '0 24px 80px rgba(15, 23, 42, 0.24)'
        : archetype === 'terminal'
          ? `0 0 0 1px color-mix(in srgb, ${primary} 18%, transparent), 0 0 34px color-mix(in srgb, ${primary} 28%, transparent)`
          : '0 18px 50px rgba(15, 23, 42, 0.14)';
  return {
    primary,
    secondary,
    accent,
    archetype,
    radius,
    border,
    shadow,
    bg: archetype === 'terminal' ? (light ? '#f4f7fb' : '#020409') : light ? '#f7f8fb' : '#080b12',
    surface: archetype === 'glass' ? (light ? 'rgba(255, 255, 255, 0.48)' : 'rgba(15, 23, 42, 0.48)') : light ? 'rgba(255, 255, 255, 0.90)' : 'rgba(18, 24, 38, 0.88)',
    surfaceStrong: light ? '#ffffff' : '#111827',
    ink: light ? '#111827' : '#f8fafc',
    muted: light ? '#526071' : '#a8b3c7',
    line: light ? 'rgba(15, 23, 42, 0.12)' : 'rgba(226, 232, 240, 0.16)',
  };
}

function densityFor(type) {
  if (type === 'dashboard') return 'compact';
  if (type === 'landing') return 'spacious';
  return 'comfortable';
}

function industryFor(type) {
  if (type === 'dashboard') return 'bi-analytics';
  if (type === 'landing') return 'landing-page';
  return 'cross-industry';
}

function visualSpans(style) {
  const archetype = archetypeFor(style);
  const labels = {
    dashboard: ['KPI', 'Trend', 'Map', 'Alert', 'Flow', 'Ratio'],
    landing: ['Hero', 'CTA', 'Proof', 'Demo'],
    glass: ['Glass', 'Layer', 'Light', 'Blur'],
    soft: ['Press', 'Inset', 'Lift', 'Calm'],
    raw: ['RAW', 'GRID', 'TYPE', 'CTA'],
    immersive: ['Depth', 'Object', 'Light', 'Orbit'],
    expressive: ['Pop', 'Noise', 'Color', 'Beat'],
    terminal: ['SYS', 'SCAN', 'NODE', 'PING'],
    organic: ['Seed', 'Leaf', 'Flow', 'Air'],
    voice: ['Listen', 'Think', 'Speak', 'Act'],
    editorial: ['Lead', 'Quote', 'Column', 'Index'],
    motion: ['Move', 'Hover', 'Shift', 'Focus'],
  }[archetype];
  return labels.map((label) => `<span>${escapeHtml(label)}</span>`).join('');
}

function html(style, theme) {
  const title = `${style.zhName} ${theme === 'light' ? '浅色' : '深色'}`;
  const safeName = escapeHtml(style.name);
  const safeBestFor = escapeHtml(style.bestFor);
  const archetype = archetypeFor(style);
  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <link rel="stylesheet" href="./style.css" />
  </head>
  <body class="archetype-${archetype}">
    <main class="sample-shell" aria-label="${escapeHtml(title)}样式示例">
      <section class="hero-panel">
        <div class="eyebrow">Available Styles ${String(style.index).padStart(2, '0')} / ${escapeHtml(style.type)}</div>
        <h1>${escapeHtml(style.zhName)}</h1>
        <p>${safeName} 的${theme === 'light' ? '浅色' : '深色'}界面样张，适用于 ${safeBestFor}。</p>
        <div class="actions">
          <a class="primary-action" href="#preview">查看组件</a>
          <a class="secondary-action" href="#metrics">评估指标</a>
        </div>
      </section>
      <section class="preview-grid" id="preview">
        <article class="feature-card large">
          <div class="card-head">
            <span>风格特征</span>
            <strong>${safeName}</strong>
          </div>
          <div class="visual-stage" aria-hidden="true">
            ${visualSpans(style)}
          </div>
        </article>
        <article class="feature-card">
          <span class="metric-label">适配场景</span>
          <strong>${safeBestFor}</strong>
          <p>色彩、层级和动效均按当前样式收敛，便于快速比较。</p>
        </article>
        <article class="feature-card" id="metrics">
          <span class="metric-label">体验约束</span>
          <strong>AA 对比度 / 44px 触达 / 200ms 反馈</strong>
          <p>浅色与深色版本分别调校文本、边框和交互状态。</p>
        </article>
      </section>
    </main>
  </body>
</html>
`;
}

function archetypeCss(archetype) {
  const blocks = {
    editorial: `
.archetype-editorial .sample-shell { max-width: 1180px; grid-template-columns: 0.9fr 1.1fr; align-items: stretch; }
.archetype-editorial .hero-panel { border-left: 8px solid var(--ink); box-shadow: none; }
.archetype-editorial h1 { font-family: Georgia, "Songti SC", serif; font-size: clamp(3.2rem, 9vw, 8rem); }
.archetype-editorial .preview-grid { grid-template-columns: 1fr; }
.archetype-editorial .visual-stage { grid-template-columns: 1.5fr 1fr; align-items: stretch; }
.archetype-editorial .visual-stage span { min-height: 94px; border-radius: 0; background: var(--surface-strong); color: var(--ink); border-top: 6px solid var(--primary); }
`,
    glass: `
.archetype-glass body, body.archetype-glass { background: radial-gradient(circle at 16% 18%, color-mix(in srgb, var(--primary) 42%, transparent), transparent 30%), radial-gradient(circle at 88% 20%, color-mix(in srgb, var(--secondary) 38%, transparent), transparent 26%), linear-gradient(135deg, var(--bg), color-mix(in srgb, var(--accent) 18%, var(--bg))); }
.archetype-glass .hero-panel, .archetype-glass .feature-card { backdrop-filter: blur(22px) saturate(165%); -webkit-backdrop-filter: blur(22px) saturate(165%); }
.archetype-glass .hero-panel::after { opacity: 0.48; filter: blur(18px); }
.archetype-glass .visual-stage { place-items: center; perspective: 900px; }
.archetype-glass .visual-stage span { width: 100%; min-height: 210px; background: linear-gradient(145deg, rgba(255,255,255,.34), rgba(255,255,255,.08)); transform: rotateX(12deg) rotateY(-16deg); box-shadow: inset 0 1px 0 rgba(255,255,255,.55), 0 30px 80px rgba(0,0,0,.18); }
`,
    soft: `
.archetype-soft .hero-panel, .archetype-soft .feature-card, .archetype-soft .primary-action, .archetype-soft .secondary-action { border: 0; }
.archetype-soft .hero-panel { border-radius: 36px; }
.archetype-soft .visual-stage { grid-template-columns: repeat(2, minmax(120px, 1fr)); align-items: stretch; }
.archetype-soft .visual-stage span { min-height: 130px; border: 0; border-radius: 30px; background: var(--surface); box-shadow: inset 8px 8px 18px color-mix(in srgb, var(--ink) 10%, transparent), inset -8px -8px 18px color-mix(in srgb, #fff 50%, transparent); color: var(--primary); }
`,
    raw: `
.archetype-raw .sample-shell { width: min(1180px, calc(100% - 24px)); gap: 12px; }
.archetype-raw .hero-panel, .archetype-raw .feature-card { background: var(--surface-strong); border: 4px solid var(--ink); border-radius: 0; box-shadow: 10px 10px 0 var(--accent); }
.archetype-raw h1 { font-size: clamp(3rem, 10vw, 8rem); text-transform: uppercase; }
.archetype-raw .primary-action { background: var(--accent); color: #111827; border: 3px solid var(--ink); border-radius: 0; }
.archetype-raw .secondary-action { border: 3px solid var(--ink); border-radius: 0; }
.archetype-raw .visual-stage { grid-template-columns: repeat(2, 1fr); gap: 0; border: 4px solid var(--ink); }
.archetype-raw .visual-stage span { min-height: 140px; border: 3px solid var(--ink); border-radius: 0; color: #111827; font-size: 1.5rem; font-weight: 900; }
`,
    immersive: `
.archetype-immersive .sample-shell { perspective: 1200px; }
.archetype-immersive .hero-panel { transform: rotateX(3deg); background: linear-gradient(145deg, var(--surface), color-mix(in srgb, var(--primary) 12%, var(--surface))); }
.archetype-immersive .visual-stage { min-height: 360px; display: flex; align-items: center; justify-content: center; perspective: 900px; }
.archetype-immersive .visual-stage span { width: 150px; min-height: 150px; border-radius: 24px; transform: rotateX(58deg) rotateZ(45deg); margin-left: -72px; box-shadow: 28px 28px 50px rgba(0,0,0,.26); }
.archetype-immersive .visual-stage span:first-child { margin-left: 0; }
`,
    expressive: `
.archetype-expressive body, body.archetype-expressive { background: repeating-linear-gradient(45deg, color-mix(in srgb, var(--primary) 20%, var(--bg)) 0 18px, var(--bg) 18px 36px); }
.archetype-expressive .hero-panel { background: linear-gradient(135deg, var(--accent), var(--primary)); color: #fff; border: 3px solid var(--ink); }
.archetype-expressive .hero-panel p, .archetype-expressive .hero-panel .eyebrow { color: #fff; }
.archetype-expressive h1 { font-weight: 900; text-transform: uppercase; }
.archetype-expressive .preview-grid { grid-template-columns: repeat(3, 1fr); }
.archetype-expressive .feature-card.large { grid-column: span 2; }
.archetype-expressive .visual-stage { grid-template-columns: repeat(4, 1fr); transform: rotate(-2deg); }
.archetype-expressive .visual-stage span { border-radius: 999px 999px 18px 18px; color: #fff; font-weight: 900; }
`,
    terminal: `
.archetype-terminal body, body.archetype-terminal { background: linear-gradient(180deg, #020409, var(--bg)); }
.archetype-terminal .hero-panel, .archetype-terminal .feature-card { background: color-mix(in srgb, var(--surface) 86%, transparent); box-shadow: var(--shadow); }
.archetype-terminal .hero-panel::before, .archetype-terminal .feature-card::before { content: ""; position: absolute; inset: 0; pointer-events: none; background: repeating-linear-gradient(180deg, transparent 0 10px, color-mix(in srgb, var(--primary) 12%, transparent) 10px 11px); opacity: .5; }
.archetype-terminal .hero-panel, .archetype-terminal .feature-card { position: relative; overflow: hidden; }
.archetype-terminal h1 { font-family: "SFMono-Regular", Consolas, monospace; text-shadow: 0 0 18px color-mix(in srgb, var(--primary) 55%, transparent); }
.archetype-terminal .visual-stage { grid-template-columns: repeat(4, 1fr); align-items: stretch; }
.archetype-terminal .visual-stage span { min-height: 220px; border-radius: 0; background: linear-gradient(180deg, transparent, color-mix(in srgb, var(--primary) 26%, transparent)); color: var(--primary); font-family: "SFMono-Regular", Consolas, monospace; }
`,
    organic: `
.archetype-organic body, body.archetype-organic { background: radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--secondary) 30%, transparent), transparent 32%), linear-gradient(145deg, color-mix(in srgb, var(--accent) 10%, var(--bg)), var(--bg)); }
.archetype-organic .hero-panel, .archetype-organic .feature-card { border-radius: 44px 18px 44px 18px; }
.archetype-organic h1 { font-family: Georgia, "Songti SC", serif; }
.archetype-organic .visual-stage { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; }
.archetype-organic .visual-stage span { width: clamp(110px, 18vw, 190px); min-height: clamp(110px, 18vw, 190px); border-radius: 60% 40% 55% 45%; }
`,
    voice: `
.archetype-voice .sample-shell { width: min(920px, calc(100% - 32px)); text-align: center; }
.archetype-voice .hero-panel { min-height: 420px; place-items: center; border-radius: 34px; }
.archetype-voice .actions { justify-content: center; }
.archetype-voice .preview-grid { grid-template-columns: 1fr 1fr; text-align: left; }
.archetype-voice .visual-stage { display: flex; align-items: center; justify-content: center; gap: 10px; min-height: 260px; }
.archetype-voice .visual-stage span { width: 22px; min-height: 80px; border-radius: 999px; animation: voicebar 1.4s ease-in-out infinite alternate; }
.archetype-voice .visual-stage span:nth-child(2) { min-height: 180px; }
.archetype-voice .visual-stage span:nth-child(3) { min-height: 130px; }
.archetype-voice .visual-stage span:nth-child(4) { min-height: 220px; }
@keyframes voicebar { from { transform: scaleY(.72); } to { transform: scaleY(1.08); } }
`,
    motion: `
.archetype-motion .hero-panel { overflow: hidden; }
.archetype-motion .preview-grid { grid-template-columns: repeat(4, 1fr); }
.archetype-motion .feature-card.large { grid-column: span 3; grid-row: auto; }
.archetype-motion .visual-stage { grid-template-columns: repeat(4, 1fr); align-items: center; }
.archetype-motion .visual-stage span { min-height: 180px; animation: float 2.4s cubic-bezier(.2,.8,.2,1) infinite alternate; }
.archetype-motion .visual-stage span:nth-child(even) { transform: translateY(34px); animation-delay: 180ms; }
`,
    landing: `
.archetype-landing .sample-shell { width: min(1180px, calc(100% - 32px)); grid-template-columns: 1.05fr .95fr; align-items: center; }
.archetype-landing .hero-panel { min-height: 620px; justify-content: center; }
.archetype-landing .preview-grid { grid-template-columns: 1fr; }
.archetype-landing .feature-card.large { grid-row: auto; }
.archetype-landing .visual-stage { grid-template-columns: 1fr; align-items: stretch; }
.archetype-landing .visual-stage span { min-height: 72px; border-radius: 14px; }
.archetype-landing .visual-stage span:first-child { min-height: 180px; }
`,
    dashboard: `
.archetype-dashboard .sample-shell { width: min(1240px, calc(100% - 24px)); align-content: start; }
.archetype-dashboard .hero-panel { padding: 28px; grid-template-columns: 1fr auto; align-items: end; }
.archetype-dashboard h1 { font-size: clamp(2rem, 4vw, 4rem); }
.archetype-dashboard .preview-grid { grid-template-columns: 1.4fr .8fr .8fr; }
.archetype-dashboard .feature-card { min-height: 150px; }
.archetype-dashboard .feature-card.large { grid-column: span 1; grid-row: span 2; }
.archetype-dashboard .visual-stage { grid-template-columns: repeat(6, 1fr); gap: 8px; align-items: end; min-height: 330px; }
.archetype-dashboard .visual-stage span { min-height: 60px; border-radius: 6px 6px 0 0; font-size: .75rem; }
`,
  };
  return blocks[archetype] ?? blocks.editorial;
}

function css(style, theme) {
  const t = tokens(style, theme);
  const archetype = archetypeFor(style);
  const pattern = archetype === 'editorial' ? '' : 'radial-gradient(circle at 20% 20%, color-mix(in srgb, var(--primary) 22%, transparent), transparent 30%),';
  const motion = /motion|kinetic|parallax|cursor|micro|real-time/i.test(style.name) ? 'float 5s ease-in-out infinite alternate' : 'none';
  return `:root {
  color-scheme: ${theme};
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif;
  --bg: ${t.bg};
  --surface: ${t.surface};
  --surface-strong: ${t.surfaceStrong};
  --ink: ${t.ink};
  --muted: ${t.muted};
  --line: ${t.line};
  --primary: ${t.primary};
  --secondary: ${t.secondary};
  --accent: ${t.accent};
  --radius: ${t.radius};
  --border: ${t.border};
  --shadow: ${t.shadow};
  --archetype: ${archetype};
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  background:
    ${pattern}
    linear-gradient(135deg, color-mix(in srgb, var(--primary) 18%, var(--bg)), var(--bg) 42%, color-mix(in srgb, var(--secondary) 18%, var(--bg)));
  color: var(--ink);
}

a {
  color: inherit;
  text-decoration: none;
}

.sample-shell {
  width: min(1120px, calc(100% - 32px));
  min-height: 100vh;
  margin: 0 auto;
  padding: 32px 0;
  display: grid;
  gap: 18px;
  align-content: center;
}

.hero-panel,
.feature-card {
  background: var(--surface);
  border: var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.hero-panel {
  padding: clamp(28px, 6vw, 72px);
  display: grid;
  gap: 18px;
  overflow: hidden;
  position: relative;
}

.hero-panel::after {
  content: "";
  position: absolute;
  width: 260px;
  aspect-ratio: 1;
  right: -96px;
  top: -72px;
  border-radius: 999px;
  background: conic-gradient(from 120deg, var(--primary), var(--secondary), var(--accent), var(--primary));
  opacity: 0.24;
  filter: blur(2px);
}

.eyebrow,
.metric-label {
  color: var(--primary);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0;
  text-transform: uppercase;
}

h1 {
  max-width: 820px;
  margin: 0;
  font-size: clamp(2.4rem, 7vw, 5.8rem);
  line-height: 0.94;
  letter-spacing: 0;
}

p {
  max-width: 720px;
  margin: 0;
  color: var(--muted);
  font-size: 1rem;
  line-height: 1.7;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;
}

.primary-action,
.secondary-action {
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: calc(var(--radius) * 0.75);
  padding: 0 18px;
  font-weight: 800;
  transition: transform 180ms ease, background-color 180ms ease, border-color 180ms ease;
}

.primary-action {
  background: var(--primary);
  color: #ffffff;
  border: 1px solid color-mix(in srgb, var(--primary) 80%, #000000);
}

.secondary-action {
  background: var(--surface-strong);
  border: 1px solid var(--line);
}

.primary-action:hover,
.secondary-action:hover {
  transform: translateY(-2px);
}

.primary-action:focus-visible,
.secondary-action:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 3px;
}

.preview-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(220px, 0.75fr);
  gap: 18px;
}

.feature-card {
  min-height: 180px;
  padding: 20px;
  display: grid;
  gap: 14px;
}

.feature-card.large {
  grid-row: span 2;
}

.card-head {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  color: var(--muted);
}

.card-head strong,
.feature-card strong {
  color: var(--ink);
}

.visual-stage {
  min-height: 280px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  align-items: end;
}

.visual-stage span {
  display: grid;
  place-items: center;
  min-height: 80px;
  border-radius: calc(var(--radius) * 0.85);
  border: 1px solid var(--line);
  background: linear-gradient(180deg, color-mix(in srgb, var(--primary) 72%, #ffffff), color-mix(in srgb, var(--secondary) 72%, #000000));
  color: #ffffff;
  font-size: 0.82rem;
  font-weight: 800;
  animation: ${motion};
}

.visual-stage span:nth-child(2) {
  min-height: 180px;
  background: linear-gradient(180deg, var(--secondary), var(--accent));
  animation-delay: 180ms;
}

.visual-stage span:nth-child(3) {
  min-height: 132px;
  background: linear-gradient(180deg, var(--accent), var(--primary));
  animation-delay: 360ms;
}

.visual-stage span:nth-child(4) {
  min-height: 230px;
  background: linear-gradient(180deg, var(--ink), var(--primary));
  animation-delay: 540ms;
}

@keyframes float {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-14px);
  }
}

${archetypeCss(archetype)}

@media (max-width: 760px) {
  .sample-shell {
    width: min(100% - 24px, 560px);
    padding: 20px 0;
    align-content: start;
  }

  .hero-panel {
    padding: 28px;
  }

  .preview-grid {
    grid-template-columns: 1fr;
  }

  .feature-card.large {
    grid-row: auto;
  }

  .visual-stage {
    min-height: 220px;
  }

  .archetype-editorial .sample-shell,
  .archetype-landing .sample-shell,
  .archetype-dashboard .hero-panel,
  .archetype-dashboard .preview-grid,
  .archetype-expressive .preview-grid,
  .archetype-motion .preview-grid,
  .archetype-voice .preview-grid {
    grid-template-columns: 1fr;
  }

  .archetype-dashboard .feature-card.large,
  .archetype-expressive .feature-card.large,
  .archetype-motion .feature-card.large {
    grid-column: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.001ms !important;
  }
}
`;
}

for (const style of styles) {
  for (const theme of ['light', 'dark']) {
    const id = `uupm-${String(style.index).padStart(2, '0')}-${slugify(style.name)}-${theme}`;
    const dir = join(samplesDir, id);
    mkdirSync(dir, { recursive: true });
    const meta = {
      id,
      name: `${style.zhName}（${theme === 'light' ? '浅色' : '深色'}）`,
      description: `基于 UI UX Pro Max Available Styles 的 ${style.name} ${theme === 'light' ? '浅色' : '深色'}样式示例。`,
      style: [style.name, style.type, 'Available Styles', theme === 'light' ? 'Light' : 'Dark'],
      entry: 'index.html',
      theme,
      industry: industryFor(style.type),
      density: densityFor(style.type),
      recommendedFor: style.bestFor.split(',').map((item) => item.trim()).filter(Boolean),
      source: sourceUrl,
    };
    writeFileSync(join(dir, 'meta.json'), `${JSON.stringify(meta, null, 2)}\n`);
    writeFileSync(join(dir, 'index.html'), html(style, theme));
    writeFileSync(join(dir, 'style.css'), css(style, theme));
  }
}

console.log(`Generated ${styles.length * 2} UI samples in ${samplesDir}`);
