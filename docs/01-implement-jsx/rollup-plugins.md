# Rollup 插件介绍

本文档介绍项目中使用的 Rollup 插件及其作用。

## rimraf

**用途**: 删除文件和目录

**使用场景**: 在构建前清理 `dist` 目录，确保每次构建都是干净的。

```bash
rimraf dist && rollup --config ...
```

**特点**:
- 跨平台的 `rm -rf` 命令替代方案
- 支持 glob 模式匹配
- 在 Windows 和 Unix 系统上都能正常工作

---

## rollup-plugin-typescript2

**用途**: 将 TypeScript 编译为 JavaScript

**使用场景**: 编译 `packages/` 目录下的 `.ts` 文件。

```js
import ts from 'rollup-plugin-typescript2';

plugins: [ts({ tsconfig: './tsconfig.json' })]
```

**特点**:
- 基于 TypeScript 官方编译器
- 支持类型检查
- 支持增量编译，提升构建速度
- 可自定义 TypeScript 配置

---

## @rollup/plugin-commonjs

**用途**: 将 CommonJS 模块转换为 ES6 模块

**使用场景**: 处理依赖中的 CommonJS 格式模块（如 npm 包）。

```js
import cjs from '@rollup/plugin-commonjs';

plugins: [cjs()]
```

**特点**:
- 支持 `require()` 语法
- 支持 `module.exports` 导出
- 智能处理循环依赖
- 是 Rollup 官方维护的插件

---

## rollup-plugin-generate-package-json

**用途**: 自动生成 `package.json` 文件

**使用场景**: 为打包产物目录生成对应的 `package.json`，便于发布到 npm。

```js
import generatePackageJson from 'rollup-plugin-generate-package-json';

plugins: [
  generatePackageJson({
    baseContents: (pkg) => ({
      name: pkg.name,
      version: pkg.version,
      main: './index.js'
    })
  })
]
```

**特点**:
- 基于原 `package.json` 生成
- 可自定义输出字段
- 自动处理依赖关系
- 简化多包仓库的打包流程

---

## 插件执行顺序

Rollup 插件按照数组顺序执行，推荐的顺序：

1. **rimraf** - 先清理（在 Rollup 外部执行）
2. **@rollup/plugin-commonjs** - 转换 CommonJS
3. **rollup-plugin-typescript2** - 编译 TypeScript
4. **rollup-plugin-generate-package-json** - 生成 package.json

## 参考链接

- [rimraf - npm](https://www.npmjs.com/package/rimraf)
- [rollup-plugin-typescript2 - npm](https://www.npmjs.com/package/rollup-plugin-typescript2)
- [@rollup/plugin-commonjs - npm](https://www.npmjs.com/package/@rollup/plugin-commonjs)
- [rollup-plugin-generate-package-json - npm](https://www.npmjs.com/package/rollup-plugin-generate-package-json)
