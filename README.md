# UI Review

集中展示与切换预览多套 UI 设计稿的 Web 应用。每个 UI 以独立静态页面（HTML/CSS/JS）的形式存在，主项目自动扫描、生成列表并通过 iframe 内嵌预览。

## 技术栈

- React 18 + TypeScript
- Vite 5
- Vitest + @testing-library/react（单元测试）

## 快速开始

```bash
npm install
npm run dev      # 启动开发服务器 http://localhost:5173
npm run build    # 生产构建
npm test         # 运行单元测试
```

## 新增一个 UI

1. 在 `public/ui-samples/` 下新建目录，目录名即 UI 的唯一 id（小写、短横线分隔），例如 `profile-card/`。
2. 在目录内创建 `meta.json` 和 UI 入口文件（默认为 `index.html`）：

```
public/ui-samples/profile-card/
├── meta.json
├── index.html
├── style.css
└── script.js
```

3. `meta.json` 规范：

```json
{
  "id": "profile-card",
  "name": "个人名片",
  "description": "紧凑的个人信息卡片，适合作为联系人入口。",
  "style": ["紧凑", "圆角", "品牌色"],
  "entry": "index.html"
}
```

字段说明：

| 字段          | 必填 | 说明                                     |
| ------------- | ---- | ---------------------------------------- |
| `id`          | 否   | 省略时使用目录名兜底                     |
| `name`        | 是   | 在列表中展示的标题                       |
| `description` | 否   | 一两句话的功能简介                       |
| `style`       | 否   | 风格标签数组，如 `["深色", "卡片"]`      |
| `entry`       | 否   | 入口文件名，默认 `index.html`            |

4. 保存后 Vite 会自动热重载，新 UI 出现在左侧列表中，点击即可在右侧预览。

## 目录结构

```
ui-review/
├── public/
│   └── ui-samples/            # 所有 UI 示例（自动扫描）
│       ├── login-minimal/
│       └── dashboard-dark/
├── src/
│   ├── components/            # UIList / UIViewer
│   ├── hooks/                 # useUISamples
│   ├── types/                 # UIMeta 类型
│   └── __tests__/             # 单元测试
├── vite.config.ts             # 含自动扫描插件（virtual:ui-samples）
└── vitest.config.ts
```

## 工作原理

- `vite.config.ts` 中的自定义插件会在启动/构建时扫描 `public/ui-samples/*/meta.json`，并通过虚拟模块 `virtual:ui-samples` 向前端暴露列表数据。
- `public/ui-samples/*` 作为 Vite 静态资源可以直接被浏览器以 `/ui-samples/<id>/<entry>` 的路径访问，因此 iframe 可以直接加载任意 UI。
- 选中的 UI id 会同步到 URL 的 `?ui=xxx` 查询参数，方便分享与刷新保留。

## 测试

```bash
npm test        # 一次运行
npm run test:watch
```

覆盖范围：

- `parseUISamples`：字段归一化、空项过滤、排序
- `UIList`：渲染、点击、选中高亮、空态
- `UIViewer` / `buildIframeSrc`：iframe src 构造、空态、标题描述渲染

## 仓库

```bash
git clone git@github.com:TskFok/ui-review.git
cd ui-review
```
