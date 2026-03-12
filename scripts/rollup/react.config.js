import path from 'path';
import {
	getPackageJSON,
	resolvePackagePath,
	getRollupConfig
} from './utils.js';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const { name, module } = getPackageJSON('react') || {};
const packagePath = resolvePackagePath(name);
const distPath = resolvePackagePath(name, true);

console.log(packagePath, distPath, path.resolve(packagePath, '/src/jsx.ts'));
export default [
	// React包产物
	{
		input: path.resolve(packagePath, module),
		output: {
			file: path.resolve(distPath, 'index.js'),
			name: 'index.js',
			format: 'umd'
		},
		plugins: [
			...getRollupConfig(),
			generatePackageJson({
				inputFolder: path.resolve(packagePath),
				outputFolder: path.resolve(distPath),
				baseContents: ({ name, description, version }) => ({
					name,
					description,
					version,
					main: 'index.js'
				}),
				basePackageName: name,
				packageJson: {
					private: false,
					type: 'commonjs'
				}
			})
		]
	},
	// jsx-runtime 产物
	{
		input: path.resolve(packagePath, 'src/jsx.ts'),
		output: [
			// jsx
			{
				file: path.resolve(distPath, 'jsx-runtime.js'),
				name: 'jsx-runtime.js',
				format: 'umd'
			},
			// jsx-dev
			{
				file: path.resolve(distPath, 'jsx-dev-runtime.js'),
				name: 'jsx-dev-runtime.js',
				format: 'umd'
			}
		],
		plugins: [...getRollupConfig()]
	}
];
