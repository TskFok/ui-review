import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UIList } from '../components/UIList';
import type { UIMeta } from '../types/ui';

const items: UIMeta[] = [
  {
    id: 'login',
    name: '登录页',
    description: '简洁登录',
    style: ['极简', '白色'],
    entry: 'index.html',
    theme: 'light',
    industry: 'auth',
    density: 'comfortable',
    recommendedFor: ['注册转化'],
  },
  {
    id: 'dash',
    name: '看板',
    description: '数据看板',
    style: ['深色'],
    entry: 'index.html',
    theme: 'dark',
    industry: 'financial-saas',
    density: 'dense',
    recommendedFor: ['管理层周报'],
  },
];

describe('UIList', () => {
  it('空列表时显示空态提示', () => {
    render(
      <UIList
        items={[]}
        selectedId={null}
        onSelect={() => {}}
        filters={{ themes: [], industries: [], densities: [], recommendedForKeyword: '' }}
        options={{ themes: [], industries: [], densities: [] }}
        onToggleTheme={() => {}}
        onToggleIndustry={() => {}}
        onToggleDensity={() => {}}
        onKeywordChange={() => {}}
      />
    );
    expect(screen.getByTestId('ui-list-empty')).toBeInTheDocument();
    expect(screen.getByText('0 个 UI')).toBeInTheDocument();
  });

  it('渲染每个 UI 的名称、简介和风格标签', () => {
    render(
      <UIList
        items={items}
        selectedId={null}
        onSelect={() => {}}
        filters={{ themes: [], industries: [], densities: [], recommendedForKeyword: '' }}
        options={{
          themes: ['light', 'dark'],
          industries: ['auth', 'financial-saas'],
          densities: ['comfortable', 'dense'],
        }}
        onToggleTheme={() => {}}
        onToggleIndustry={() => {}}
        onToggleDensity={() => {}}
        onKeywordChange={() => {}}
      />
    );
    expect(screen.getByText('登录页')).toBeInTheDocument();
    expect(screen.getByText('简洁登录')).toBeInTheDocument();
    expect(screen.getByText('极简')).toBeInTheDocument();
    expect(screen.getByText('白色')).toBeInTheDocument();
    expect(screen.getByText('2 个 UI')).toBeInTheDocument();
  });

  it('点击列表项触发 onSelect', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <UIList
        items={items}
        selectedId={null}
        onSelect={onSelect}
        filters={{ themes: [], industries: [], densities: [], recommendedForKeyword: '' }}
        options={{
          themes: ['light', 'dark'],
          industries: ['auth', 'financial-saas'],
          densities: ['comfortable', 'dense'],
        }}
        onToggleTheme={() => {}}
        onToggleIndustry={() => {}}
        onToggleDensity={() => {}}
        onKeywordChange={() => {}}
      />
    );
    await user.click(screen.getByTestId('ui-item-dash'));
    expect(onSelect).toHaveBeenCalledWith('dash');
  });

  it('selectedId 对应的项带有 aria-pressed=true', () => {
    render(
      <UIList
        items={items}
        selectedId="login"
        onSelect={() => {}}
        filters={{ themes: [], industries: [], densities: [], recommendedForKeyword: '' }}
        options={{
          themes: ['light', 'dark'],
          industries: ['auth', 'financial-saas'],
          densities: ['comfortable', 'dense'],
        }}
        onToggleTheme={() => {}}
        onToggleIndustry={() => {}}
        onToggleDensity={() => {}}
        onKeywordChange={() => {}}
      />
    );
    const btn = screen.getByTestId('ui-item-login');
    expect(btn).toHaveAttribute('aria-pressed', 'true');
    const other = screen.getByTestId('ui-item-dash');
    expect(other).toHaveAttribute('aria-pressed', 'false');
  });

  it('渲染筛选器并触发关键词回调', async () => {
    const user = userEvent.setup();
    const onKeywordChange = vi.fn();
    render(
      <UIList
        items={items}
        selectedId={null}
        onSelect={() => {}}
        filters={{ themes: ['light'], industries: [], densities: [], recommendedForKeyword: '' }}
        options={{
          themes: ['light', 'dark'],
          industries: ['auth', 'financial-saas'],
          densities: ['comfortable', 'dense'],
        }}
        onToggleTheme={() => {}}
        onToggleIndustry={() => {}}
        onToggleDensity={() => {}}
        onKeywordChange={onKeywordChange}
      />
    );
    expect(screen.getByTestId('filter-theme-options')).toBeInTheDocument();
    expect(screen.getByTestId('filter-industry-options')).toBeInTheDocument();
    expect(screen.getByTestId('filter-density-options')).toBeInTheDocument();
    await user.type(screen.getByTestId('filter-recommendedfor-input'), '管理层');
    expect(onKeywordChange).toHaveBeenCalled();
  });
});
