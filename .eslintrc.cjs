/* eslint-env node */
// require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
	root: true,
	extends: [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'@vue/eslint-config-typescript',
		'@vue/eslint-config-prettier/skip-formatting',
		'prettier',
	],
	parserOptions: {
		ecmaVersion: 'latest',
	},
	plugins: [
		'@typescript-eslint',
		'prettier'
	],
	rules: {
		camelcase: 'off',
		'func-names': 'off',
		indent: 'off',
		'no-param-reassign': 'off',
		'no-process-exit': 'off',
		'no-restricted-globals': 'off',
		'no-underscore-dangle': ['error', { allow: ['_id', '__typename'] }],
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
				caughtErrorsIgnorePattern: '^_',
			},
		],
		'vue/no-unused-properties': [
			'error',
			{
				groups: ['computed', 'data', 'methods', 'props'],
			}
		],
		'prettier/prettier': 'error',
		'vue/html-indent': ['error', 'tab', {}],
		'vue/html-self-closing': 'off',
		'vue/singleline-html-element-content-newline': 'off',
		'vue/max-attributes-per-line': 'off',
		'no-console': [process.env.NODE_ENV === 'production' ? 'error' : 'off', {
			allow: ['error', 'warn']
		}],
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'vue/no-multiple-template-root': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
	},
}
