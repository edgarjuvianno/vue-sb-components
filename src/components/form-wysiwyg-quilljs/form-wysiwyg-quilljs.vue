<template>
	<div class="wysiwyg-wrapper" v-bind="{ ...$attrs }">
		<div
			class="input-wrapper"
			:class="{
				error: isError,
				filled: isFilled,
				focus: localIsFocus,
				readonly: readOnly,
			}"
			ref="input-wrapper"
			v-bind="{ ...$attrs }"
		>
			<label class="label" :class="{ required }" v-if="label">
				<span>{{ label }}</span>
				<span class="asterisk" v-if="required">*</span>
			</label>
			<div
				class="editor-container"
				:id="getId"
				:tabindex="tabindex || 0"
				@focusin="handleToggleFocus"
				@focusout="handleToggleFocus"
			></div>
			<fieldset class="input-border">
				<legend class="notch">
					<span
						class="notch-label"
						:class="{ 'no-label': !label || label === '' }"
					>
						<template v-if="label && label !== ''">
							<span>{{ label }}</span>
							<span class="asterisk" v-if="required">*</span>
						</template>
						<template v-else>&ZeroWidthSpace;</template>
					</span>
				</legend>
			</fieldset>
			<div class="loader" v-if="!stateEditor.isReady">
				<ProgressCircular indeterminate :size="54" />
			</div>
		</div>
		<div class="error-wrapper" v-if="isError && errorMessage">
			<span v-html="handleErrorMessage()"></span>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent, PropType } from 'vue'
	import QuillJS from 'quill'
	import { IWysiswygConfig } from '@/interface'
	import 'quill/dist/quill.bubble.css'

	// components
	import ProgressCircular from '@/components/progress-circular/progress-circular.vue'

	export default defineComponent({
		emits: {
			'update:modelValue': (_value: any) => true,
			change: (_event: Event) => true,
			input: (_event: Event) => true,
		},
		props: {
			errorMessage: {
				required: false,
				type: [String, Function],
			},
			isError: {
				required: false,
				type: Boolean,
			},
			label: {
				required: false,
				type: String,
			},
			modelValue: {
				required: false,
				type: null as unknown as PropType<string | null>,
			},
			tools: {
				required: false,
				type: Object as PropType<IWysiswygConfig>,
			},
			readOnly: {
				required: false,
				type: Boolean,
			},
			required: {
				required: false,
				type: Boolean,
			},
			tabindex: {
				required: false,
				type: Number,
			},
			value: {
				required: false,
				type: null as unknown as PropType<string | null>,
			},
		},
		name: 'sb-form-wysiwyg',
		components: {
			ProgressCircular,
		},
		data() {
			return {
				localIsFocus: false,
				localValue: null as any,
				stateEditor: {
					editor: null as null | QuillJS,
					isReady: false,
				},
			}
		},
		computed: {
			getId() {
				return `wysiwyg-${this.$.uid}`
			},
			getToolbars() {
				if (this.tools && Object.keys(this.tools).length) {
					const { list, paragraph } = this.tools

					const {
						align,
						background,
						blockquote,
						code,
						color,
						header,
						indent,
						style,
						subscript,
						superscript,
					} = paragraph || {}

					const blockCode: any[] = [
						blockquote && 'blockquote',
						code && 'code-block',
					].filter((it: any) => it)

					const listBlock: any[] = [
						list?.ordered && {
							list: 'ordered',
						},
						list?.unordered && {
							list: 'bullet',
						},
					].filter((it: any) => it)

					const scriptBlock: any[] = [
						subscript && {
							script: 'sub',
						},
						superscript && {
							script: 'super',
						},
					].filter((it: any) => it)

					const backgroundColor: any[] = [
						color && {
							color: [],
						},
						background && {
							background: [],
						},
					].filter((it: any) => it)

					return [
						style?.length && [...style],
						(blockquote || code) && blockCode,
						list && listBlock,
						(subscript || superscript) && scriptBlock,
						indent && [{ indent: '-1' }, { indent: '+1' }],
						header?.length && [
							{
								header,
							},
						],
						(background || color) && backgroundColor,
						align && [{ align: [] }],
					].filter((it: any) => it)
				}

				return []
			},
			isFilled() {
				if (this.localValue && this.stateEditor.editor) {
					const text: string = this.stateEditor.editor
						.getText()
						.replace(/(\r\n|\n|\r)/gm, '')

					return !!text.length
				}

				return false
			},
		},
		methods: {
			doRenderData(html: string | null | undefined) {
				if (this.stateEditor.editor) {
					this.localValue = html || null
					this.stateEditor.editor.clipboard.dangerouslyPasteHTML(
						html || '',
					)
				}
			},
			handleChange() {
				this.$emit('change', this.localValue)
				this.$emit('input', this.localValue)
				this.$emit('update:modelValue', this.localValue)
			},
			handleErrorMessage() {
				if (this.errorMessage) {
					if (typeof this.errorMessage === 'string') {
						return this.errorMessage
					}

					return this.errorMessage(this.localValue)
				}

				return ''
			},
			handleToggleFocus() {
				if (!this.readOnly) {
					this.localIsFocus = !this.localIsFocus
				}
			},
		},
		watch: {
			modelValue(newValue: any) {
				this.doRenderData(newValue)
			},
			value(newValue: any) {
				this.doRenderData(newValue)
			},
		},
		mounted() {
			const container: HTMLElement | null = document.getElementById(
				this.getId,
			)

			if (container) {
				this.stateEditor.editor = new QuillJS(container, {
					modules: {
						toolbar: [...this.getToolbars],
					},
					theme: 'bubble',
				})

				this.$nextTick(() => {
					if (!this.stateEditor.isReady) {
						this.stateEditor.isReady = true
					}

					this.stateEditor.editor?.on('editor-change', (ev: any) => {
						if (ev === 'text-change') {
							this.localValue =
								this.stateEditor.editor?.root?.innerHTML

							this.$nextTick(() => this.handleChange())
						}
					})

					if (this.modelValue?.length || this.value?.length) {
						this.doRenderData(this.modelValue || this.value)
					}
				})
			}
		},
	})
</script>

<style lang="scss" scoped>
	@import '../../assets/scss/components/forms/_wysiwyg-quill-js.scss';
</style>
