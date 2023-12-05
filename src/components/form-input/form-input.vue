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
				['multi-line']: type === 'textarea',
				readonly: readOnly,
			}"
		>
			<label
				class="label"
				:class="{ required, multiline: type === 'textarea' }"
				v-if="label"
			>
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
				:class="[textAlign, type, noSavePassword && 'no-save-password']"
				@click="(event) => toggleFocus(true, event)"
			>
				<template v-if="!$slots['custom-input']">
					<input
						:type="getInputType"
						:tabindex="readOnly || disabled ? -1 : tabindex"
						v-model="localValue"
						v-bind="{
							autocomplete,
							disabled,
							min,
							max,
							placeholder,
							step,
							readonly: readOnly,
						}"
						v-if="type !== 'textarea'"
						@blur="(ev) => handleBlur(ev)"
						@focus="(ev) => handleInputFocus(ev)"
						@input="(ev) => handleChange(ev)"
						@keydown="(ev) => $emit('keydown', ev)"
					/>
					<textarea
						:class="{ readonly: readOnly }"
						rows="6"
						:tabindex="readOnly || disabled ? -1 : tabindex"
						v-else
						v-bind="{
							autocomplete,
							disabled,
							placeholder,
							readonly: readOnly,
						}"
						v-model="localValue"
						@blur="(ev) => handleBlur(ev)"
						@focus="(ev) => handleInputFocus(ev)"
						@input="(ev) => handleChange(ev)"
						@keydown="(ev) => $emit('keydown', ev)"
					/>
				</template>
				<template v-else>
					<slot name="custom-input" />
				</template>
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
	import { IIcon } from '@/interface'
	import { defineComponent, PropType } from 'vue'

	export default defineComponent({
		emits: {
			'update:modelValue': (_value: any) => true,
			blur: (_event: Event) => true,
			focus: (_event: Event) => true,
			input: (_event: Event) => true,
			keydown: (_event: Event) => true,
		},
		props: {
			autocomplete: {
				default: 'on',
				type: String as PropType<'off' | 'on'>,
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
			max: {
				required: false,
				type: [Number, String],
			},
			min: {
				required: false,
				type: [Number, String],
			},
			modelValue: {
				required: false,
				type: null as unknown as PropType<
					string | number | object | null
				>,
			},
			noSavePassword: {
				required: false,
				type: Boolean,
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
			step: {
				required: false,
				type: Number,
			},
			tabindex: {
				required: false,
				type: Number,
			},
			textAlign: {
				default: 'left',
				type: String as PropType<'left' | 'right'>,
			},
			type: {
				default: 'text',
				type: String as PropType<
					| string
					| 'text'
					| 'number'
					| 'textarea'
					| 'password'
					| 'email'
				>,
			},
			value: {
				required: false,
				type: null as unknown as PropType<
					string | number | object | null
				>,
			},
			variant: {
				default: 'default',
				required: false,
				type: String as PropType<'default' | 'flat'>,
			},
		},
		name: 'sb-form-input',
		data() {
			return {
				localIsFocus: false,
				localValue: (this.modelValue || this.value || null) as any,
			}
		},
		computed: {
			getInputType() {
				if (this.type === 'password' && this.noSavePassword) {
					return 'text'
				}

				return this.type
			},
			isFilled() {
				if (
					this.localValue !== null &&
					typeof this.localValue !== 'undefined'
				) {
					if (this.type !== 'number') {
						return (
							this.localValue !== '' &&
							(this.localValue?.length ||
								Object.keys(this.localValue).length > 0)
						)
					}

					return true
				}

				return false
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
					const inputs: any[] =
						target?.querySelectorAll('input, textarea')

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
				deep: true,
				handler(newValue: any) {
					this.localValue = newValue
				},
			},
			value: {
				deep: true,
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
	@import '../../assets/scss/components/forms/_input-password.scss';
</style>
