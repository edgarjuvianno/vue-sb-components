<template>
	<div
		class="file-input-wrapper"
		:class="{
			'upload-error': uploadState?.status === 'ERROR',
			uploaded: uploadState?.status === 'SUCCESS',
			uploading: isUploadVisible,
		}"
		v-bind="{ ...$attrs }"
	>
		<label class="helper-text" v-if="helperText">
			{{ helperText }}
		</label>
		<div class="input-group">
			<input
				:accept="getFormatString"
				ref="input-file"
				type="file"
				v-bind="{ multiple: multi }"
				@change="(ev) => handleSelectFile(ev)"
			/>
			<sb-input
				:class="{ multi }"
				:errorMessage="errorMessageLocal || errorMessage"
				:icon="icon"
				:isError="isError || isErrorLocal"
				:label="label"
				:render-input="handleSelected"
				v-bind="{ disabled, readOnly, required }"
				v-model="localValue"
				@click="() => handleOpenInput()"
			>
				<template v-slot:icon>
					<component :is="iconSVG" />
				</template>
			</sb-input>
			<template v-if="isUploadVisible">
				<span
					class="upload-progress-percentage"
					v-if="uploadState?.status === 'UPLOADING'"
				>
					{{ uploadState?.progress || 0 }}%
				</span>
				<sb-progress-bar
					class="upload-progress-bar"
					:color="getProgressColor"
					:height="4"
					:progress="uploadState?.progress || 0"
				/>
			</template>
		</div>
	</div>
	<sb-file-preview
		v-bind="{ ...fileView }"
		@close="() => (fileView.show = false)"
		v-if="viewFile"
	/>
</template>

<script lang="ts">
	import { defineComponent, h, PropType } from 'vue'
	import { fileAsURL } from '@/components/helper/helper'

	// components
	import FilePreview from '@/components/file-preview/file-preview.vue'
	import Input from '@/components/form-input/form-input.vue'
	import ProgressBar from '@/components/progress-bar/progress-bar.vue'

	// icons
	import { arrowUpFromBracket, rotate, xMark } from '@/assets/icons'
	import { IIcon, IUploadState } from '@/interface'

	export default defineComponent({
		emits: ['change', 'update:modelValue', 'onError', 'onRetry'],
		props: {
			allowClear: {
				required: false,
				type: Boolean,
			},
			disabled: {
				required: false,
				type: Boolean,
			},
			errorHandler: {
				required: false,
				type: Function as PropType<(_value: any) => void>,
			},
			errorMessage: {
				required: false,
				type: [String, Function],
			},
			format: {
				required: true,
				type: Object as PropType<string[]>,
			},
			helperText: {
				required: false,
				type: String,
			},
			isError: {
				required: false,
				type: Boolean,
			},
			label: {
				required: false,
				type: String,
			},
			maxSize: {
				required: false,
				type: Number,
			},
			modelValue: {
				required: false,
				type: Object as PropType<File[] | null>,
			},
			multi: {
				required: false,
				type: Boolean,
			},
			readOnly: {
				required: false,
				type: Boolean,
			},
			required: {
				required: false,
				type: Boolean,
			},
			uploadState: {
				required: false,
				type: Object as PropType<IUploadState>,
			},
			value: {
				required: false,
				type: Object as PropType<File[] | null>,
			},
			viewFile: {
				required: false,
				type: Boolean,
			},
		},
		name: 'sb-form-file-input',
		components: {
			'sb-file-preview': FilePreview,
			'sb-input': Input,
			'sb-progress-bar': ProgressBar,
		},
		data() {
			return {
				errorMessageLocal: null as string | null,
				fileView: {
					show: false,
					src: null,
					type: 'image',
				} as any,
				icon: {
					onClick: null as any,
					onMouseLeave: null as any,
					onMouseOver: null as any,
					placement: 'append',
				} as IIcon,
				iconSVG: null as any,
				isErrorLocal: false,
				localValue: (this.modelValue || this.value || null) as any,
			}
		},
		computed: {
			getFormatString() {
				return this.format.join(', ')
			},
			getIcon() {
				if (this.localValue && this.localValue.length > 0) {
					if (this.uploadState?.status === 'ERROR') {
						return rotate()
					} else if (this.allowClear) {
						return xMark()
					}
				}

				return arrowUpFromBracket()
			},
			getHumanFormats() {
				return this.format
					.map((it: string) => `*${it || ''}`)
					.join(', ')
			},
			getProgressColor() {
				if (this.uploadState?.status === 'ERROR') {
					return 'danger'
				} else if (this.uploadState?.status === 'SUCCESS') {
					return 'success'
				}

				return undefined
			},
			isUploadVisible() {
				return this.uploadState && this.uploadState?.status !== 'IDLE'
			},
		},
		methods: {
			doValidateFiles(files?: File[]) {
				this.isErrorLocal = false
				this.errorMessageLocal = null

				const tempFiles: File[] = files || this.localValue

				if (!this.isFormatValid(tempFiles)) {
					this.isErrorLocal = true
					this.errorMessageLocal = `Format yang didukung: ${this.getHumanFormats}`

					this.$emit('onError', 'INVALID FORMAT')

					return false
				} else if (this.maxSize && !this.isSizeValid(tempFiles)) {
					this.isErrorLocal = true
					this.errorMessageLocal = `Ukuran Berkas maksimum ${this.maxSize}MB`

					this.$emit('onError', 'INVALID SIZE')

					return false
				}

				return true
			},
			handleClear(ev: Event, index: number) {
				ev.stopPropagation()
				const tempValues: File[] = [...this.localValue]
				tempValues.splice(index, 1)

				if (tempValues.length < 1) {
					;(this.$refs['input-file'] as any).value = null
				}

				this.handleUpdateModelValue([...tempValues])
			},
			handleClickIcon(ev: Event) {
				ev.stopPropagation()

				if (
					this.allowClear &&
					this.localValue &&
					this.localValue.length > 0
				) {
					if (this.uploadState?.status === 'ERROR') {
						this.$emit('onRetry', this.localValue)
					} else {
						;(this.$refs['input-file'] as any).value = null
						this.handleUpdateModelValue(null)
					}
				} else {
					this.handleOpenInput()
				}
			},
			handleOpenInput() {
				if (
					!this.disabled &&
					!this.readOnly &&
					this.uploadState?.status !== 'UPLOADING'
				) {
					;(this.$refs['input-file'] as any).click()
				}
			},
			handleSelectFile(ev: any) {
				if (ev.target.value || this.multi) {
					const files: File[] = ev.target.files

					if (this.doValidateFiles(files)) {
						if (this.multi) {
							return this.handleUpdateModelValue([
								...(this.localValue || []),
								...files,
							])
						}

						return this.handleUpdateModelValue([...files])
					}
				} else if (
					!ev.target.value &&
					this.errorMessageLocal &&
					this.errorMessageLocal !== ''
				) {
					this.errorMessageLocal = null
				}

				return this.handleUpdateModelValue(null)
			},
			handleSelected() {
				if (this.localValue && this.localValue.length > 0) {
					if (!this.multi) {
						return h(
							'div',
							{
								class: 'value-wrapper',
								...(this.viewFile && {
									onClick: (ev: Event) => this.handleView(ev),
								}),
							},
							this.localValue[0].name,
						)
					} else if (this.multi && this.viewFile) {
						return h(
							'div',
							{
								class: 'value-wrapper',
							},
							this.localValue.map((it: File, index: number) => {
								return h(
									'div',
									{
										class: 'pill',
									},
									{
										default: () => [
											h('div', {
												class: 'clear',
												innerHTML: 'x',
												onClick: (ev: Event) =>
													this.handleClear(ev, index),
											}),
											h('div', {
												class: 'content',
												innerHTML: `<span>${it.name}</span>`,
												onClick: (ev: Event) =>
													this.handleView(ev, index),
											}),
										],
									},
								)
							}),
						)
					}

					return h(
						'div',
						{
							class: 'value-wrapper',
						},
						this.localValue.map((it: File, index: number) => {
							return h('div', {
								class: 'pill',
								innerHTML: `
											<div class="clear">x</div>
											<div class="content">
												<span>${it.name}</span>
											</div>
										`,
								onClick: (ev: Event) =>
									this.handleClear(ev, index),
							})
						}),
					)
				}

				return ''
			},
			handleUpdateModelValue(value: any) {
				this.localValue = value

				this.$nextTick(() => {
					this.$emit('update:modelValue', this.localValue)
					this.$emit('change', this.localValue)
				})
			},
			handleView(ev: Event, index?: number) {
				ev.stopPropagation()

				if (this.fileView.src) {
					window.URL.revokeObjectURL(this.fileView.src)
				}

				const file: File =
					this.localValue[typeof index !== 'undefined' ? index : 0]

				let fileType: any = ''

				if (file.type.indexOf('image') > -1) {
					fileType = 'image'
				} else if (file.type.indexOf('pdf') > -1) {
					fileType = 'pdf'
				} else if (file.type.indexOf('video') > -1) {
					fileType = 'video'
				} else if (file.type.indexOf('audio') > -1) {
					fileType = 'audio'
				}

				if (fileType !== '') {
					const uri: string = fileAsURL(file, file.type)

					this.fileView = {
						show: true,
						src: uri,
						type: fileType,
					}
				}
			},
			isFormatValid(files: File[]) {
				const tempFiles: any[] = [...files]
				const isValid: boolean = tempFiles.every((it: File) => {
					const nameSplit: string[] = it.name.split('.')
					const ext: string | undefined = nameSplit.pop()

					if (ext) {
						return this.format.indexOf(`.${ext}`) > -1
					}

					return true
				})

				return isValid
			},
			isSizeValid(files: File[]) {
				const tempFiles: any[] = [...files]

				const isValid: boolean = tempFiles.every((it: File) => {
					if (this.maxSize) {
						return Number(`${this.maxSize}000000`) > it.size
					}

					return true
				})

				return isValid
			},
		},
		mounted() {
			this.icon.onClick = this.handleClickIcon
		},
		watch: {
			localValue: {
				deep: true,
				handler() {
					this.iconSVG = this.getIcon
				},
				immediate: true,
			},
			modelValue: {
				deep: true,
				handler(newValue: any) {
					this.localValue = newValue
				},
			},
			uploadState: {
				deep: true,
				handler(newValue: IUploadState | undefined) {
					if (
						newValue &&
						(newValue?.status === 'ERROR' ||
							newValue?.status === 'SUCCESS')
					) {
						this.iconSVG = this.getIcon
					}
				},
				immediate: true,
			},
			value: {
				deep: true,
				handler(newValue: any) {
					this.localValue = newValue
				},
			},
		},
	})
</script>

<style lang="scss">
	@import '../../assets/scss/components/forms/_file-input.scss';
</style>
@/components/helper/helper
