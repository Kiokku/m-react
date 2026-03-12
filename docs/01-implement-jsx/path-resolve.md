# path.resolve 方法详解

## 基本定义

`path.resolve` 是 Node.js `path` 模块的核心方法，用于将多个路径片段解析为**绝对路径**。

```javascript
const path = require('path');

path.resolve('/a', 'b', 'c');      // /a/b/c
path.resolve('/a', '/b', 'c');     // /b/c  (绝对路径覆盖前面)
path.resolve('a', 'b', 'c');       // /当前工作目录/a/b/c
```

## 核心规则

| 规则 | 说明 | 示例 |
|------|------|------|
| **从右向左处理** | 依次拼接，直到形成绝对路径 | `resolve('/a', '/b')` → `/b` |
| **绝对路径截断** | 遇到绝对路径，前面全部丢弃 | `resolve('/a', '/b', 'c')` → `/b/c` |
| **无绝对路径时** | 以 `process.cwd()` 为前缀 | `resolve('a')` → `/cwd/a` |
| **空参数** | 返回当前工作目录 | `resolve()` → `/cwd` |

## 与 `path.join` 的区别

```javascript
path.join('/a', 'b', '..', 'c');    // /a/c    (纯拼接+规范化)
path.resolve('/a', 'b', '..', 'c');  // /a/c    (解析为绝对路径)

// 关键区别：相对路径处理
path.join('a', 'b');                // a/b      (相对路径)
path.resolve('a', 'b');             // /cwd/a/b (绝对路径)
```

## 与字符串拼接的区别

| 场景 | `path.resolve(distDir, name)` | `` `${distDir}/${name}` `` |
|------|------------------------------|---------------------------|
| `distDir="/a/b"`, `name="c.js"` | `/a/b/c.js` | `/a/b/c.js` ✅ 一致 |
| `distDir="/a/b/"`, `name="c.js"` | `/a/b/c.js` | `/a/b//c.js` ❌ 双斜杠 |
| `distDir="/a/b"`, `name="/c.js"` | `/c.js` (绝对路径覆盖) | `/a/b//c.js` ❌ 逻辑错误 |
| `distDir="."`, `name="c.js"` | `/Users/.../c.js` (绝对路径) | `./c.js` ❌ 相对路径 |

## 实际应用场景

```javascript
// 1. 基于文件位置解析路径
const distPath = path.resolve(__dirname, 'dist');

// 2. 基于运行位置解析路径
const output = path.resolve(process.cwd(), 'out');

// 3. 多层级路径构建
const configPath = path.resolve(__dirname, '..', 'config', 'app.json');

// 4. 安全拼接路径（防止路径遍历攻击）
const safePath = path.resolve('/safe/base', userInput);
```

## 注意事项

1. **不检查路径存在性**：只做字符串运算，不验证文件系统
   ```javascript
   path.resolve('/不存在的路径', 'file.txt');  // /不存在的路径/file.txt
   ```

2. **尾部斜杠处理**：除根目录外，尾部斜杠会被保留
   ```javascript
   path.resolve('/a/', 'b/');  // /a/b/
   ```

3. **跨平台**：自动处理 Windows 和 POSIX 路径差异

## 总结

- 使用 `path.resolve` 当需要**绝对路径**
- 使用 `path.join` 当只需要**规范化路径**（可为相对路径）
- 避免使用字符串拼接路径，容易出错
