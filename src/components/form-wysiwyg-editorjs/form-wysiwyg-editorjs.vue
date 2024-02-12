<template>
	<div class="wysiwyg-wrapper" v-bind="{ ...$attrs }">
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
	import EditorJS, {
		ToolConstructable,
		ToolSettings,
	} from '@editorjs/editorjs'
	import { IWysiwygOutputData } from '@/interface'

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
				type: null as unknown as PropType<IWysiwygOutputData | null>,
			},
			tools: {
				required: false,
				type: Object as PropType<
					Record<string, ToolConstructable | ToolSettings>
				>,
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
				type: null as unknown as PropType<IWysiwygOutputData | null>,
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
			getId() {
				return `wysiwyg-${this.$.uid}`
			},
		},
		methods: {
			doRenderData(data: IWysiwygOutputData | null) {
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
						if (this.stateEditor.isReady) {
							const saveData: any = await this.stateEditor.editor
								?.save()
								.then((data: any) => data)
								.catch(() => null)

							if (saveData) {
								this.localValue = { ...saveData }

								this.$nextTick(() => this.handleChange())
							}
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
						...(this.tools || {}),
					},
				})
			}
		},
	})
</script>

<style lang="scss" scoped>
	@import '../../assets/scss/components/forms/_wysiwyg-editor-js.scss';
</style>
