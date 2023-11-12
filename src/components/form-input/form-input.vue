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
				focus: focus || isFocus,
				icon_append: icon?.placement === 'append',
				icon_prepend: icon?.placement === 'prepend',
				['multi-line']: type === 'textarea',
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
				<slot name="icon" />
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
						v-maska:[getMaskaOptions]
						v-model="localValue"
						v-bind="{
							autocomplete,
							disabled,
							min,
							max,
							placeholder,
							readonly: readOnly,
						}"
						v-if="type === 'text' && (pattern || maskaOptions)"
						@blur="(ev) => handleBlur(ev)"
						@focus="(ev) => handleInputFocus(ev)"
						@input="(ev) => handleChange(ev)"
						@keydown="(ev) => $emit('onKeydown', ev)"
					/>
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
							readonly: readOnly,
							...(type === 'password' && {
								onScroll: handleInputScroll,
							}),
						}"
						v-else-if="type !== 'textarea'"
						@blur="(ev) => handleBlur(ev)"
						@focus="(ev) => handleInputFocus(ev)"
						@input="(ev) => handleChange(ev)"
						@keydown="(ev) => $emit('onKeydown', ev)"
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
						@keydown="(ev) => $emit('onKeydown', ev)"
					/>
				</template>
				<template v-else>
					<slot name="custom-input" />
				</template>
			</div>
			<div class="input-border">
				<div class="start" />
				<div class="notch">
					<label class="notch-label" v-if="label">
						<span>{{ label }}</span>
						<span class="asterisk" v-if="required">*</span>
					</label>
				</div>
				<div class="end" />
			</div>
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
		emits: ['input', 'update:modelValue', 'onBlur', 'onFocus', 'onKeydown'],
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
			focus: {
				required: false,
				type: Boolean,
			},
			icon: {
				required: false,
				type: Object as PropType<IIcon>,
			},
			isError: {
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
		directives: {
			maska: vMaska,
		},
		data() {
			return {
				isFocus: false,
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
				if (this.type === 'number') {
					return this.localValue !== null
				}

				if (
					this.localValue !== null &&
					typeof this.localValue !== 'undefined'
				) {
					if (this.type !== 'number') {
						return (
							this.localValue !== '' ||
							this.localValue?.length ||
							Object.keys(this.localValue).length > 0
						)
					}

					return true
				}

				return false
			},
		},
		methods: {
			handleBlur(ev: Event) {
				this.isFocus = false
				this.$emit('onBlur', ev)
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
				this.isFocus = true

				this.$emit('onFocus', ev)
			},
			handleInputScroll(ev: UIEvent) {
				if (this.$refs['pass-over']) {
					const elem: HTMLElement = this.$refs['pass-over'] as any
					const input: HTMLInputElement = ev.target as any

					elem.scrollTo({
						left:
							(input.scrollWidth / input.value.length) *
							(input.selectionEnd || 0),
					})
				}
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

				this.isFocus = focus
			},
		},
		watch: {
			focus(newValue: boolean) {
				this.isFocus = newValue
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
</style>
