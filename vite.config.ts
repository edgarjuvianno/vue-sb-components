import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import fs from 'fs'
import { viteStaticCopy } from 'vite-plugin-static-copy'

const files = fs
	.readdirSync('./src/components')
	.filter((it) => it.indexOf('.ts') < 0)

const components = files.reduce((obj, component) => {
	if (component === 'helper') {
		obj[component] = `src/components/${component}/${component}.ts`

		return obj
	}

	obj[component] = `src/components/${component}/${component}.vue`

	return obj
}, {})

// https://vitejs.dev/config/
export default () => {
	return defineConfig({
		build: {
			cssCodeSplit: true,
			lib: {
				entry: { ...components },
				formats: ['es'],
			},
			rollupOptions: {
				external: ['vue'],
				output: {
					entryFileNames: `components/[name]/[name].js`,
					assetFileNames: `components/[name]/[name].[ext]`,
					globals: {
						vue: 'Vue',
					},
				},
			},
		},
		plugins: [
			vue(),
			dts({
				entryRoot: './src/components',
				cleanVueFileName: true,
				outDir: 'dist/components',
			}),
			viteStaticCopy({
				targets: [
					{
						src: 'src/main.ts',
						dest: '',
						rename: 'main.d.ts',
						transform: (contents) =>
							contents.toString().replace(/.vue/g, ''),
					},
					{
						src: 'src/main.ts',
						dest: '',
						rename: 'main.js',
						transform: (contents) =>
							contents.toString().replace(/.vue/g, ''),
					},
					{
						src: 'src/interface.ts',
						dest: '',
					},
					{
						src: 'src/assets/main.css',
						dest: '',
					},
				],
			}),
			{
				name: 'add-css-link',
				apply: 'build',
				writeBundle(option, bundle) {
					const files = Object.keys(bundle)
						.filter((file) => file.endsWith('.css'))
						.map((file) => file.replace('.css', ''))

					for (const file of files) {
						const filePath = resolve('', 'dist', `${file}.js`)
						const cssImport = `import "./${
							file.split('/')[1]
						}.css";`
						const data = fs.readFileSync(filePath, {
							encoding: 'utf8',
						})

						fs.writeFileSync(filePath, `${cssImport}\n${data}`)
					}
				},
			},
			{
				name: 'add-component-js',
				apply: 'build',
				writeBundle(option, bundle) {
					const files = Object.keys(bundle).filter(
						(file) =>
							file.indexOf('components') > -1 &&
							file.indexOf('helper') < 0 &&
							file.endsWith('.js'),
					)

					for (const file of files) {
						fs.writeFileSync(
							`dist/components/${
								file.split('/')[1]
							}/package.json`,
							JSON.stringify({
								sideEffects: false,
								module: './index.js',
								types: './index.d.ts',
							}),
						)

						fs.copyFile(
							`src/components/${file.split('/')[1]}/index.ts`,
							`dist/components/${file.split('/')[1]}/index.js`,
							(err) => {
								if (err) throw err

								const data = fs
									.readFileSync(
										`dist/components/${
											file.split('/')[1]
										}/index.js`,
										{
											encoding: 'utf8',
										},
									)
									.replace(/.vue/g, '')

								fs.writeFileSync(
									`dist/components/${
										file.split('/')[1]
									}/index.js`,
									data,
								)
							},
						)
					}
				},
			},
		],
		resolve: {
			alias: {
				'@': resolve(__dirname, 'src'),
			},
		},
	})
}
