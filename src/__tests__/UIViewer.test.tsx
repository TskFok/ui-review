import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UIViewer, buildIframeSrc } from '../components/UIViewer';
import type { UIMeta } from '../types/ui';

const item: UIMeta = {
  id: 'login-minimal',
  name: '登录页',
  description: '简洁登录',
  style: ['极简'],
  entry: 'index.html',
  theme: 'light',
  industry: 'auth',
  density: 'comfortable',
  recommendedFor: ['注册转化'],
};

describe('buildIframeSrc', () => {
  it('根据 id 和 entry 拼接路径', () => {
    expect(buildIframeSrc(item)).toBe('/ui-samples/login-minimal/index.html');
  });

  it('entry 缺省时回退到 index.html', () => {
    const fallback = { ...item, entry: '' };
    expect(buildIframeSrc(fallback)).toBe('/ui-samples/login-minimal/index.html');
  });
});

describe('UIViewer', () => {
  it('item 为空时渲染占位', () => {
    render(<UIViewer item={null} />);
    expect(screen.getByTestId('ui-viewer-empty')).toBeInTheDocument();
  });

  it('渲染 iframe 并设置正确 src 与 title', () => {
    render(<UIViewer item={item} />);
    const iframe = screen.getByTestId('ui-viewer-iframe') as HTMLIFrameElement;
    expect(iframe).toBeInTheDocument();
    expect(iframe.getAttribute('src')).toBe('/ui-samples/login-minimal/index.html');
    expect(iframe.getAttribute('title')).toBe('登录页');
  });

  it('渲染标题、描述和新窗口打开链接', () => {
    render(<UIViewer item={item} />);
    expect(screen.getByText('登录页')).toBeInTheDocument();
    expect(screen.getByText('简洁登录')).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /新窗口打开/ });
    expect(link).toHaveAttribute('href', '/ui-samples/login-minimal/index.html');
    expect(link).toHaveAttribute('target', '_blank');
  });
});
