import { useEffect, useState } from 'react';
import type { UIMeta } from '../types/ui';
import styles from './UIViewer.module.css';

interface UIViewerProps {
  item: UIMeta | null;
}

/** 与 Vite `base` 拼接，使 GitHub Pages 子路径下 iframe/链接可访问 public/ui-samples。 */
export function buildUiSamplePath(item: UIMeta, basePath: string): string {
  const normalized = basePath.endsWith('/') ? basePath : `${basePath}/`;
  const entry = item.entry || 'index.html';
  return `${normalized}ui-samples/${item.id}/${entry}`;
}

export function buildIframeSrc(item: UIMeta): string {
  return buildUiSamplePath(item, import.meta.env.BASE_URL);
}

export function UIViewer({ item }: UIViewerProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (item) setLoading(true);
  }, [item?.id]);

  if (!item) {
    return (
      <main className={styles.viewer} data-testid="ui-viewer-empty">
        <div className={styles.placeholder}>
          <h2>选择一个 UI 开始预览</h2>
          <p>从左侧列表中点击任意 UI 卡片</p>
        </div>
      </main>
    );
  }

  const src = buildIframeSrc(item);

  return (
    <main className={styles.viewer}>
      <header className={styles.topbar}>
        <div>
          <h2 className={styles.title}>{item.name}</h2>
          <p className={styles.desc}>{item.description}</p>
        </div>
        <a
          className={styles.openLink}
          href={src}
          target="_blank"
          rel="noreferrer"
        >
          <span>新窗口打开</span>
          <span className={styles.openIcon} aria-hidden="true" />
        </a>
      </header>
      <div className={styles.frameWrap}>
        {loading && (
          <div className={styles.loading} data-testid="ui-viewer-loading">
            加载中…
          </div>
        )}
        <iframe
          key={item.id}
          className={styles.frame}
          src={src}
          title={item.name}
          data-testid="ui-viewer-iframe"
          onLoad={() => setLoading(false)}
        />
      </div>
    </main>
  );
}
