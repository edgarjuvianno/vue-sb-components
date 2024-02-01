<template>
	<div class="wysiwyg-wrapper">
		<div
			class="input-wrapper"
			:class="{
				error: isError,
				filled: localValue?.blocks?.length,
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
	import EditorJS, { OutputData } from '@editorjs/editorjs'
	import { IWysiswygConfig } from '@/interface'

	// components
	import ProgressCircular from '@/components/progress-circular/progress-circular.vue'

	// editor tools
	import ToolChecklist from '@editorjs/checklist'
	import ToolCode from '@editorjs/code'
	import ToolHeader from 'editorjs-header-with-alignment'
	import ToolLink from '@editorjs/link'
	import ToolNestedList from '@editorjs/nested-list'
	import ToolParagraph from 'editorjs-paragraph-with-alignment'
	import ToolQuote from '@editorjs/quote'
	import ToolSimpleImage from '@editorjs/simple-image'
	import ToolTable from '@editorjs/table'
	import ToolUnderline from '@editorjs/underline'

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
				type: null as unknown as PropType<OutputData | null>,
			},
			toolbarConfigs: {
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
				type: null as unknown as PropType<OutputData | null>,
			},
		},
		name: 'sb-form-wysiwyg',
		components: {
			ProgressCircular,
		},
		data() {
			return {
				localIsFocus: false,
				localValue: (this.modelValue || this.value || null) as any,
				stateEditor: {
					editor: null as null | EditorJS,
					isReady: false,
				},
			}
		},
		computed: {
			getAdditionalTools() {
				if (this.toolbarConfigs) {
					const tempConfigs: Record<string, any> = {}

					if (this.toolbarConfigs.checklist?.enabled) {
						tempConfigs.checklist = {
							class: ToolChecklist,
							inlineToolbar: true,
						}
					}

					if (this.toolbarConfigs.code?.enabled) {
						tempConfigs.code = ToolCode
					}

					if (this.toolbarConfigs.header?.enabled) {
						tempConfigs.header = {
							class: ToolHeader,
							config: {
								levels: this.toolbarConfigs.header?.levels || [
									1, 2, 3, 4, 5, 6,
								],
								placeholder:
									this.toolbarConfigs.header?.placeholder ||
									'Enter a Header',
							},
						}
					}

					if (this.toolbarConfigs.linkWithPreview?.enabled) {
						tempConfigs.linkTool = {
							class: ToolLink,
						}
					}

					if (this.toolbarConfigs.list?.enabled) {
						tempConfigs.list = {
							class: ToolNestedList,
							config: {
								defaultStyle:
									this.toolbarConfigs.list?.type ||
									'unordered',
							},
							inlineToolbar: true,
						}
					}

					if (this.toolbarConfigs.quote?.enabled) {
						tempConfigs.quote = {
							class: ToolQuote,
							inlineToolbar: true,
							config: {
								captionPlaceholder:
									this.toolbarConfigs.quote
										?.captionPlaceholder ||
									'Enter a Caption',
								quotePlaceholder:
									this.toolbarConfigs.quote
										?.quotePlaceholder || 'Enter a Quote',
							},
						}
					}

					if (this.toolbarConfigs.table?.enabled) {
						tempConfigs.table = ToolTable
					}

					if (this.toolbarConfigs.urlImage?.enabled) {
						tempConfigs.image = ToolSimpleImage
					}

					return tempConfigs
				}

				return {}
			},
			getId() {
				return `wysiwyg-${this.$.uid}`
			},
		},
		methods: {
			doRenderData(data: OutputData | null) {
				if (this.stateEditor.editor) {
					this.stateEditor.editor.render({
						blocks: [],
						...(data && {
							...data,
						}),
					})
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
		mounted() {
			const container: HTMLElement | null = document.getElementById(
				this.getId,
			)

			if (container) {
				this.stateEditor.editor = new EditorJS({
					holder: this.getId,
					minHeight: 300,
					onChange: async () => {
						const saveData: any = await this.stateEditor.editor
							?.save()
							.then((data: any) => data)
							.catch(() => null)

						if (
							saveData?.blocks?.length !==
							this.localValue?.blocks?.length
						) {
							this.localValue = { ...saveData }

							this.$nextTick(() => this.handleChange())
						}
					},
					onReady: () => {
						this.stateEditor.isReady = true

						this.$nextTick(() => {
							this.doRenderData(
								this.modelValue || this.value || null,
							)
						})
					},
					readOnly: !!this.readOnly,
					tools: {
						paragraph: {
							class: ToolParagraph,
						},
						underline: ToolUnderline,
						...this.getAdditionalTools,
					},
				})
			}
		},
	})
</script>

<style lang="scss" scoped>
	@import '../../assets/scss/components/forms/_wysiwyg.scss';
</style>
