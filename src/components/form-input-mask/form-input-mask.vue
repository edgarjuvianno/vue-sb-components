<template>
	<div
		class="input-wrapper"
		:class="{ error: isError, flat: variant === 'flat' }"
		ref="input-wrapper"
		v-bind="{ ...$attrs }"
	>
		<div
			class="input-group"
			:class="{
				disabled,
				filled: isFilled,
				focus: isFocus || localIsFocus,
				icon_append: icon?.placement === 'append',
				icon_prepend: icon?.placement === 'prepend',
				readonly: readOnly,
			}"
		>
			<label class="label" :class="{ required }" v-if="label">
				<span>{{ label }}</span>
				<span class="asterisk" v-if="required">*</span>
			</label>
			<span
				:class="{
					'sb-cursor-pointer': icon?.onClick,
				}"
				class="icon"
				v-if="icon"
				@click.stop="handleClickIcon"
				@mouseover="handleMouseOverIcon"
				@mouseleave="handleMouseLeaveIcon"
			>
				<slot name="icon-slot" />
			</span>
			<div
				class="form-control"
				:class="['text', textAlign]"
				@click="(event) => toggleFocus(true, event)"
			>
				<input
					:autocomplete="autocomplete ? 'on' : 'off'"
					:tabindex="readOnly || disabled ? -1 : tabindex"
					type="text"
					v-maska:[getMaskaOptions]
					v-model="localValue"
					v-bind="{
						disabled,
						placeholder,
						readonly: readOnly,
					}"
					@blur="(ev) => handleBlur(ev)"
					@focus="(ev) => handleInputFocus(ev)"
					@input="(ev) => handleChange(ev)"
					@keydown="(ev) => $emit('keydown', ev)"
				/>
			</div>
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
		</div>
		<div class="error-wrapper" v-if="isError && errorMessage">
			<span v-html="handleErrorMessage()"></span>
		</div>
	</div>
</template>

<script lang="ts">
	import { IIcon, IMaskaOptions } from '@/interface'
	import { defineComponent, PropType } from 'vue'
	import { vMaska } from 'maska'

	export default defineComponent({
		emits: {
			'update:modelValue': (_value: string | null) => true,
			blur: (_event: Event) => true,
			focus: (_event: Event) => true,
			input: (_event: Event) => true,
			keydown: (_event: Event) => true,
		},
		props: {
			autocomplete: {
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
			icon: {
				required: false,
				type: Object as PropType<IIcon>,
			},
			isError: {
				required: false,
				type: Boolean,
			},
			isFocus: {
				required: false,
				type: Boolean,
			},
			label: {
				required: false,
				type: String,
			},
			maskaOptions: {
				required: false,
				type: Object as PropType<IMaskaOptions>,
			},
			modelValue: {
				required: false,
				type: null as unknown as PropType<string | null>,
			},
			pattern: {
				required: false,
				type: String,
			},
			placeholder: {
				required: false,
				type: String,
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
			textAlign: {
				default: 'left',
				type: String as PropType<'left' | 'right'>,
			},
			value: {
				required: false,
				type: null as unknown as PropType<string | null>,
			},
			variant: {
				default: 'default',
				required: false,
				type: String as PropType<'default' | 'flat'>,
			},
		},
		name: 'sb-form-input',
		directives: {
			maska: vMaska,
		},
		data() {
			return {
				localIsFocus: false,
				localValue: (this.modelValue || this.value || null) as any,
			}
		},
		computed: {
			getMaskaOptions() {
				return {
					...(this.pattern && {
						mask: this.pattern,
					}),
					...(this.maskaOptions && {
						...this.maskaOptions,
					}),
				}
			},
			isFilled() {
				return (
					this.localValue &&
					(this.localValue !== '' || this.localValue.length)
				)
			},
		},
		methods: {
			handleBlur(ev: Event) {
				this.localIsFocus = false
				this.$emit('blur', ev)
			},
			handleChange(ev: Event) {
				this.$emit('input', ev)
				this.$emit('update:modelValue', this.localValue)
			},
			handleClickIcon(ev: Event) {
				return this.icon?.onClick && this.icon.onClick(ev)
			},
			handleClickOutsideInput(event: MouseEvent) {
				const target: HTMLElement = event.target as HTMLElement
				const parent: HTMLElement = this.$refs['input-wrapper'] as any

				if (
					target &&
					parent &&
					!parent.contains(target) &&
					!target.isSameNode(parent)
				) {
					this.toggleFocus(false)
				}
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
			handleInputFocus(ev: Event) {
				this.localIsFocus = true

				this.$emit('focus', ev)
			},
			handleMouseLeaveIcon(ev: Event) {
				return this.icon?.onMouseLeave && this.icon.onMouseLeave(ev)
			},
			handleMouseOverIcon(ev: Event) {
				return this.icon?.onMouseOver && this.icon.onMouseOver(ev)
			},
			toggleFocus(focus: boolean, event?: Event) {
				if (event) {
					const target: any = event.target
					const inputs: any[] = target?.querySelectorAll('input')

					if (inputs.length > 0) {
						const input: any = inputs[0]

						input.focus()
					}
				}

				this.localIsFocus = focus
			},
		},
		watch: {
			isFocus(newValue: boolean) {
				this.localIsFocus = newValue
			},
			modelValue: {
				handler(newValue: any) {
					this.localValue = newValue
				},
			},
			value: {
				handler(newValue: any) {
					this.localValue = newValue
				},
			},
		},
		mounted() {
			document.addEventListener('click', (event: MouseEvent) =>
				this.handleClickOutsideInput(event),
			)
		},
		unmounted() {
			document.removeEventListener('click', (event: MouseEvent) =>
				this.handleClickOutsideInput(event),
			)
		},
	})
</script>

<style lang="scss">
	@import '../../assets/scss/components/forms/_input.scss';
</style>
