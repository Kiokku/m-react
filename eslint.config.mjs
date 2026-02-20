import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			parser: tseslint.parser,
			globals: {
				...globals.browser,
				...globals.es2021,
				...globals.node
			}
		},
		plugins: {
			'@typescript-eslint': tseslint.plugin,
			prettier: prettier
		},
		rules: {
			...js.configs.recommended.rules,
			...tseslint.configs.recommended.rules,
			'prettier/prettier': 'error',
			'no-case-declarations': 'off',
			'no-constant-condition': 'off',
			'@typescript-eslint/ban-ts-comment': 'off'
		}
	},
	prettierConfig
];
