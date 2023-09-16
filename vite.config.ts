import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import typescript2 from 'rollup-plugin-typescript2'

// https://vitejs.dev/config/
export default () => {
	return defineConfig({
		build: {
			cssCodeSplit: true,
			lib: {
				// Could also be a dictionary or array of multiple entry points
				entry: resolve(__dirname, 'src/main.ts'),
				name: 'vueSB',
				formats: ['es', 'cjs', 'umd'],
			},
			rollupOptions: {
				external: ['vue'],
				input: resolve(__dirname, 'src/main.ts'),
				output: {
					globals: {
						vue: 'Vue',
					},
				},
			},
		},
		plugins: [
			vue(),
			dts(),
			typescript2({
				check: false,
				include: ['src/components/**/*.vue'],
				tsconfigOverride: {
					compilerOptions: {
						outDir: 'dist',
						sourceMap: true,
						declaration: true,
						declarationMap: true,
					},
				},
				exclude: ['vite.config.ts'],
			}),
		],
		resolve: {
			alias: {
				'@': resolve(__dirname, 'src'),
			},
		},
	})
}
