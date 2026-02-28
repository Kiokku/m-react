# M-React

这是一个 React 源码的教学项目，旨在通过手写 React 核心功能来深入理解 React 的实现原理。

## 项目结构

```
m-react/
├── packages/
│   ├── react/          # 实现类 React 框架核心功能
│   └── shared/         # 共享类型定义和工具
├── .husky/             # Git hooks 配置
├── .commitlintrc.json  # 提交信息规范
├── eslint.config.mjs   # ESLint 配置
├── .prettierrc.json    # Prettier 配置
└── tsconfig.json       # TypeScript 配置
```

## 技术栈

- **语言**: TypeScript
- **构建工具**: Rollup
- **代码规范**: ESLint + Prettier
- **包管理**: pnpm (monorepo)
- **Git 规范**: Husky + Commitlint

## 学习进展记录

1. [实现 JSX](./docs/01-implement-jsx/README.md) - 2026-02-27

## 开发指南

### 安装依赖

```bash
pnpm install
```

### 构建项目

```bash
pnpm build
```

### 代码规范检查

```bash
pnpm lint
```

## 学习目标

- [ ] 实现 JSX 转换 ✅
- [ ] 实现 Reconciler（协调器）
- [ ] 实现 Fiber 架构
- [ ] 实现 Hooks 系统
- [ ] 实现事件系统
- [ ] 实现 Diff 算法
- [ ] 实现调度器（Scheduler）

## 参考资料

- [React 官方文档](https://react.dev/)
- [React 源码仓库](https://github.com/facebook/react)

## 许可证

本项目仅用于学习目的。
