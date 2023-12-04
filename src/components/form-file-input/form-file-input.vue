<template>
	<div
		class="file-input-wrapper"
		:class="{
			'on-drag': onDragOver,
			'upload-error': uploadState?.status === 'ERROR',
			uploaded: uploadState?.status === 'SUCCESS',
			uploading: isUploadVisible,
		}"
		v-bind="{ ...$attrs }"
		@dragenter.prevent="handleDragEnter"
		@dragleave.prevent="handleDragLeave"
		@dragover.prevent="handleDragEnter"
		@drop.prevent="handleDropFile"
	>
		<div class="drag-overlay" v-if="onDragOver">
			<div class="text">{{ getOnDragText }}</div>
		</div>
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
				:errorMessage="errorMessage"
				:icon="icon"
				:isError="isError"
				:label="label"
				v-bind="{
					disabled,
					readOnly,
					required,
					...(!readOnly &&
						!disabled && {
							icon,
						}),
				}"
				v-model="localValue"
				@click="() => handleOpenInput()"
			>
				<template v-slot:icon-slot v-if="!readOnly && !disabled">
					<component :is="iconSVG" />
				</template>
				<template v-slot:custom-input>
					<template v-if="localValue && localValue.length > 0">
						<div
							class="value-wrapper"
							v-if="!multi"
							@click="(event) => viewFile && handleView(event)"
						>
							{{ localValue[0]?.name }}
						</div>
						<div class="value-wrapper" v-if="multi">
							<div
								class="pill"
								v-for="(file, index) in localValue"
								:key="`pill-${index}`"
								@click="
									(event) =>
										!viewFile && handleClear(event, index)
								"
							>
								<div
									class="clear"
									@click.stop="
										(event) => handleClear(event, index)
									"
								>
									x
								</div>
								<div
									class="content"
									@click.stop="
										(event) => handleView(event, index)
									"
								>
									<span>{{ file.name }}</span>
								</div>
							</div>
						</div>
					</template>
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
</template>

<script lang="ts">
	import { defineComponent, PropType } from 'vue'

	// components
	import Input from '@/components/form-input/form-input.vue'
	import ProgressBar from '@/components/progress-bar/progress-bar.vue'

	// icons
	import { arrowUpFromBracket, rotate, xMark } from '@/assets/icons'
	import { IIcon, IPreviewFile, IUploadState } from '@/interface'

	export default defineComponent({
		emits: {
			'update:modelValue': (_value: File[] | null) => true,
			change: (_value: File[] | null) => true,
			error: (
				_errorType: 'INVALID FORMAT' | 'INVALID SIZE',
				_format?: string,
			) => true,
			retry: (_value: File[] | null) => true,
			previewFile: (_preview: IPreviewFile) => true,
		},
		props: {
			allowClear: {
				required: false,
				type: Boolean,
			},
			disabled: {
				required: false,
				type: Boolean,
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
			onDragText: {
				required: false,
				type: String as PropType<string | null>,
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
			'sb-input': Input,
			'sb-progress-bar': ProgressBar,
		},
		data() {
			return {
				icon: {
					onClick: null as any,
					onMouseLeave: null as any,
					onMouseOver: null as any,
					placement: 'append',
				} as IIcon,
				iconSVG: null as any,
				localValue: (this.modelValue || this.value || null) as any,
				onDragOver: false,
				onDragTimeout: null as any,
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
			getOnDragText() {
				if (this.onDragText) {
					return this.onDragText
				}

				return 'Drag and drop your files here'
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
				const tempFiles: File[] = files || this.localValue

				if (!this.isFormatValid(tempFiles)) {
					this.$emit('error', 'INVALID FORMAT', this.getHumanFormats)

					return false
				} else if (this.maxSize && !this.isSizeValid(tempFiles)) {
					this.$emit('error', 'INVALID SIZE')

					return false
				}

				return true
			},
			handleClear(ev: Event, index: number) {
				if (!this.readOnly && !this.disabled) {
					ev.stopPropagation()
					const tempValues: File[] = [...this.localValue]
					tempValues.splice(index, 1)

					if (tempValues.length < 1) {
						;(this.$refs['input-file'] as any).value = null
					}

					this.handleUpdateModelValue([...tempValues])
				}
			},
			handleClickIcon(ev: Event) {
				ev.stopPropagation()

				if (!this.readOnly && !this.disabled) {
					if (
						this.allowClear &&
						this.localValue &&
						this.localValue.length > 0
					) {
						if (this.uploadState?.status === 'ERROR') {
							this.$emit('retry', this.localValue)
						} else {
							;(this.$refs['input-file'] as any).value = null
							this.handleUpdateModelValue(null)
						}
					} else {
						this.handleOpenInput()
					}
				}
			},
			handleDragEnter() {
				this.onDragOver = true

				if (this.onDragTimeout) {
					clearTimeout(this.onDragTimeout)
				}
			},
			handleDragLeave() {
				this.onDragTimeout = setTimeout(() => {
					this.onDragOver = false
				}, 50)
			},
			handleDropFile(ev: DragEvent) {
				this.handleDragLeave()

				if (ev.dataTransfer?.files) {
					const files: File[] = ev.dataTransfer
						.files as unknown as File[]

					if (this.doValidateFiles(files)) {
						if (this.multi) {
							return this.handleUpdateModelValue([
								...(this.localValue || []),
								...files,
							])
						}

						return this.handleUpdateModelValue([...files])
					}
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
				if (ev.target?.value) {
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
				}

				return this.handleUpdateModelValue(null)
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

				const file: File =
					this.localValue[typeof index !== 'undefined' ? index : 0]

				this.$emit('previewFile', {
					file,
					type: file.type,
				})
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

			const events: string[] = [
				'dragenter',
				'dragover',
				'dragleave',
				'drop',
			]

			events.forEach((eventName: string) => {
				document.body.addEventListener(eventName, (e: Event) =>
					e.preventDefault(),
				)
			})
		},
		unmounted() {
			const events: string[] = [
				'dragenter',
				'dragover',
				'dragleave',
				'drop',
			]

			events.forEach((eventName: string) => {
				document.body.removeEventListener(eventName, (e: Event) =>
					e.preventDefault(),
				)
			})
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
