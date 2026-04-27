import type { UIMeta } from '../types/ui';
import styles from './UIList.module.css';

interface UIFilters {
  themes: string[];
  industries: string[];
  densities: string[];
  recommendedForKeyword: string;
}

interface UIListProps {
  items: UIMeta[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  filters: UIFilters;
  options: {
    themes: string[];
    industries: string[];
    densities: string[];
  };
  onToggleTheme: (value: string) => void;
  onToggleIndustry: (value: string) => void;
  onToggleDensity: (value: string) => void;
  onKeywordChange: (value: string) => void;
}

export function UIList({
  items,
  selectedId,
  onSelect,
  filters,
  options,
  onToggleTheme,
  onToggleIndustry,
  onToggleDensity,
  onKeywordChange,
}: UIListProps) {
  const renderMultiSelect = (
    title: string,
    values: string[],
    selected: string[],
    onToggle: (value: string) => void,
    dataTestId: string
  ) => (
    <div className={styles.filterGroup}>
      <div className={styles.filterTitle}>{title}</div>
      <div className={styles.checkboxList} data-testid={dataTestId}>
        {values.map((value) => {
          const active = selected.includes(value);
          return (
            <label key={value} className={styles.checkboxItem}>
              <input type="checkbox" checked={active} onChange={() => onToggle(value)} />
              <span>{value}</span>
            </label>
          );
        })}
      </div>
    </div>
  );

  if (items.length === 0) {
    return (
      <aside className={styles.sidebar} aria-label="UI 列表">
        <div className={styles.header}>
          <h1 className={styles.title}>UI 展示</h1>
          <p className={styles.subtitle}>0 个 UI</p>
        </div>
        <div className={styles.empty} data-testid="ui-list-empty">
          <p>还没有 UI 示例</p>
          <small>在 public/ui-samples/ 下新建目录并添加 meta.json</small>
        </div>
      </aside>
    );
  }

  return (
    <aside className={styles.sidebar} aria-label="UI 列表">
      <div className={styles.header}>
        <h1 className={styles.title}>UI 展示</h1>
        <p className={styles.subtitle}>{items.length} 个 UI</p>
      </div>
      <div className={styles.filters}>
        {renderMultiSelect(
          'Theme',
          options.themes,
          filters.themes,
          onToggleTheme,
          'filter-theme-options'
        )}
        {renderMultiSelect(
          'Industry',
          options.industries,
          filters.industries,
          onToggleIndustry,
          'filter-industry-options'
        )}
        {renderMultiSelect(
          'Density',
          options.densities,
          filters.densities,
          onToggleDensity,
          'filter-density-options'
        )}
        <div className={styles.filterGroup}>
          <label htmlFor="recommendedForKeyword" className={styles.filterTitle}>
            RecommendedFor 关键词
          </label>
          <input
            id="recommendedForKeyword"
            className={styles.keywordInput}
            value={filters.recommendedForKeyword}
            onChange={(event) => onKeywordChange(event.target.value)}
            placeholder="例如：管理层 / 资金 / 投资"
            data-testid="filter-recommendedfor-input"
          />
        </div>
      </div>
      <ul className={styles.list} role="list">
        {items.map((item) => {
          const active = item.id === selectedId;
          return (
            <li key={item.id}>
              <button
                type="button"
                className={`${styles.card} ${active ? styles.active : ''}`}
                onClick={() => onSelect(item.id)}
                aria-pressed={active}
                data-testid={`ui-item-${item.id}`}
              >
                <div className={styles.cardTitle}>{item.name}</div>
                <div className={styles.cardDesc}>{item.description}</div>
                {item.style.length > 0 && (
                  <div className={styles.tags}>
                    {item.style.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
