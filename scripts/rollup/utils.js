import path from 'path';
import fs from 'fs';
import ts from 'rollup-plugin-typescript2';
import cjs from '@rollup/plugin-commonjs';

// packagesDir 表示待打包的所有包的根路径
const packagesDir = path.resolve(__dirname, '../../packages/');
// 打包产物路径
const distDir = path.resolve(__dirname, '../../dist/node_modules/');

function resolvePackagePath(name, isDist) {
	if (isDist) {
		return path.resolve(distDir, name);
	}
	return path.resolve(packagesDir, name);
}

function getPackageJSON(name) {
	const packagePath = path.resolve(resolvePackagePath(name), 'package.json');
	const nameStr = fs.readFileSync(packagePath, 'utf-8');
	return JSON.parse(nameStr);
}

function getRollupConfig({ typescript = {} } = {}) {
	return [cjs(), ts(typescript)];
}

export { resolvePackagePath, getPackageJSON, getRollupConfig };
