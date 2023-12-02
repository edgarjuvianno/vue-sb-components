import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default () => {
	return defineConfig({
		build: {
			cssMinify: true,
			minify: true,
		},
		plugins: [vue()],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
			},
		},
	})
}
