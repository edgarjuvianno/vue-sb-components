import type { StorybookConfig } from '@storybook/vue3-vite'
import path from 'path'

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'storybook-addon-vue-slots',
	],
	framework: {
		name: '@storybook/vue3-vite',
		options: {},
	},
	docs: {
		autodocs: 'tag',
	},
	core: {
		builder: {
			name: '@storybook/builder-vite',
			options: {
				viteConfigPath: path.resolve(
					__dirname,
					'../vite-storybook.config.ts',
				),
			},
		},
	},
}
export default config
