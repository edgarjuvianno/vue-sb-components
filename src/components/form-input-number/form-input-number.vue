<template>
	<div
		class="input-wrapper number"
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
				icon_prepend: !!icon || $slots.icon,
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
				v-if="!!icon || $slots.icon"
				@click.stop="handleClickIcon"
				@mouseover="handleMouseOverIcon"
				@mouseleave="handleMouseLeaveIcon"
			>
				<slot name="icon" />
			</span>
			<div
				class="form-control"
				:class="['text', textAlign]"
				@click="(event) => toggleFocus(true, event)"
			>
				<input
					:tabindex="readOnly || disabled ? -1 : tabindex"
					type="text"
					v-maska:[getMaskaOptions]
					v-model="localValue"
					v-bind="{
						autocomplete,
						disabled,
						placeholder,
						readonly: readOnly,
					}"
					@blur="(ev) => handleBlur(ev)"
					@focus="(ev) => handleInputFocus(ev)"
					@input="(ev) => handleChange(ev)"
					@keydown="(ev) => handleKeydown(ev)"
					@change="(ev) => handleInputChange(ev)"
					@paste="handlePaste"
				/>
			</div>
			<div class="button-wrapper">
				<div class="button increment" @click="handleClickStep(step)">
					<component :is="iconSortUp" />
				</div>
				<div
					class="button decrement"
					@click="handleClickStep(step * -1)"
				>
					<component :is="iconSortDown" />
				</div>
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
		<div
			class="error-wrapper"
			v-if="isInvalidNumber || (isError && errorMessage)"
		>
			<span v-if="isInvalidNumber">{{ invalidNumberMessage }}</span>
			<span v-else v-html="handleErrorMessage()"></span>
		</div>
	</div>
</template>

<script lang="ts">
	import { IIcon } from '@/interface'
	import { defineComponent, PropType } from 'vue'
	import { vMaska } from 'maska'

	// helper
	import { parseLocaleNumber } from '@/components/helper/helper'

	// icons
	import { sortDown, sortUp } from '@/assets/icons'

	export default defineComponent({
		emits: [
			'change',
			'input',
			'update:modelValue',
			'blur',
			'focus',
			'keydown',
		],
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
			invalidNumberMessage: {
				default: 'Please enter valid numbers',
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
			max: {
				required: false,
				type: Number,
			},
			maxDecimalPlaces: {
				default: 10,
				type: Number,
			},
			min: {
				required: false,
				type: Number,
			},
			modelValue: {
				required: false,
				type: null as unknown as PropType<string | number | null>,
			},
			numberLocale: {
				default: 'en-US',
				type: String as PropType<'en-US' | 'id-ID'>,
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
				default: 1,
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
			value: {
				required: false,
				type: null as unknown as PropType<string | number | null>,
			},
			variant: {
				default: 'default',
				required: false,
				type: String as PropType<'default' | 'flat'>,
			},
			withLocale: {
				default: false,
				type: Boolean,
			},
		},
		name: 'sb-form-input',
		directives: {
			maska: vMaska,
		},
		data() {
			return {
				isFocus: false,
				isInvalidNumber: false,
				localValue: (this.modelValue || this.value || null) as any,
			}
		},
		computed: {
			getMaskaOptions() {
				if (!this.withLocale) {
					const decimalPlaces: string = [
						...Array(this.maxDecimalPlaces).keys(),
					]
						.map(() => '9')
						.join('')

					if (!this.maxDecimalPlaces) {
						return {
							mask: '#0',
							preProcess: (val: string | number) => String(val),
							tokens: {
								'#': {
									optional: true,
									pattern: /-/,
								},
								0: {
									multiple: true,
									pattern: /[0-9]/,
								},
							},
						}
					}

					return {
						mask: `#0.${decimalPlaces}`,
						preProcess: (val: string | number) => String(val),
						tokens: {
							'#': {
								optional: true,
								pattern: /-/,
							},
							0: {
								multiple: true,
								pattern: /[0-9]/,
							},
							9: {
								optional: true,
								pattern: /[0-9]/,
							},
						},
					}
				}

				return {
					postProcess: (val: string | number) => {
						if (val && typeof val !== 'undefined' && val !== '') {
							const value: number | null = this.getRealValue(
								String(val),
							)
							const splittedValue: number = Number(
								String(value).split(
									this.numberLocale === 'en-US' ? '.' : ',',
								)[0],
							)

							if (!this.maxDecimalPlaces) {
								return Intl.NumberFormat(this.numberLocale, {
									maximumFractionDigits:
										this.maxDecimalPlaces,
									minimumFractionDigits: 0,
								}).format(splittedValue)
							} else if (!Number.isNaN(value)) {
								return Intl.NumberFormat(this.numberLocale, {
									maximumFractionDigits:
										this.maxDecimalPlaces,
									minimumFractionDigits: 0,
								}).format(Number(value))
							}
						}

						return val || ''
					},
					preProcess: (val: any) => {
						if (String(val).split(/[.,]/g)[0] === '') {
							return ''
						}

						return String(val).replace(/[^0-9,.-]/gi, '')
					},
				}
			},
			iconSortDown() {
				return sortDown()
			},
			iconSortUp() {
				return sortUp()
			},
			isFilled() {
				if (
					this.localValue !== null &&
					typeof this.localValue !== 'undefined'
				) {
					if (typeof this.localValue !== 'number') {
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
			getRealValue(masked: string) {
				if (!masked || typeof masked === 'undefined') {
					return null
				}

				masked = String(masked)

				if (!this.withLocale) {
					if (
						masked.split('.')[0] !== '' &&
						masked.split('.')[1] === ''
					) {
						return Number('-')
					}

					return Number(masked)
				} else if (
					(this.numberLocale === 'en-US' &&
						masked.split('.')[0] !== '' &&
						masked.split('.')[1] === '') ||
					(this.numberLocale === 'id-ID' &&
						masked.split(',')[0] !== '' &&
						masked.split(',')[1] === '') ||
					masked === '-'
				) {
					return Number('-')
				}

				return parseLocaleNumber(masked, this.numberLocale)
			},
			handleBlur(ev: Event) {
				this.isFocus = false
				const realValue: number | null = this.getRealValue(
					this.localValue,
				)

				;(ev as any).target.value = Number.isNaN(realValue)
					? this.localValue
					: Number(realValue)

				this.$emit('blur', ev)
			},
			handleChange(ev: Event) {
				const event: InputEvent = ev as InputEvent

				if (typeof (event.detail as any)?.unmasked !== 'undefined') {
					const unmaskedValue: any = (event.detail as any)?.unmasked
					const maskedValue: any = (event.detail as any)?.masked
					const realValue: number | null =
						this.getRealValue(maskedValue)

					if (unmaskedValue === '') {
						;(event as any).target.value = (event.detail as any)
							?.unmasked
						this.isInvalidNumber = false

						this.$emit('input', ev)
						this.$emit('update:modelValue', null)
					} else if (!Number.isNaN(realValue)) {
						;(event as any).target.value = realValue
						this.isInvalidNumber = false

						this.$emit('input', ev)
						this.$emit('update:modelValue', realValue)
					} else {
						this.isInvalidNumber = true

						this.$emit('input', ev)
						this.$emit('update:modelValue', maskedValue)
					}
				}
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
			handleClickStep(inc: number) {
				const realValue: number | null =
					this.getRealValue(this.localValue) || 0

				const tempValue: number = Number.isNaN(realValue)
					? 0
					: realValue + inc

				if (realValue > 0 && realValue < 1 && tempValue < 0) {
					this.localValue = 0
				} else if (
					typeof this.max !== 'undefined' &&
					tempValue > this.max
				) {
					this.localValue = this.max
				} else if (
					typeof this.min !== 'undefined' &&
					tempValue < this.min
				) {
					this.localValue = this.min
				} else {
					if (this.withLocale && this.numberLocale === 'id-ID') {
						this.localValue = Intl.NumberFormat(this.numberLocale, {
							maximumFractionDigits: this.maxDecimalPlaces,
							minimumFractionDigits: 0,
						}).format(Number(tempValue))
					} else {
						this.localValue = tempValue
					}
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
			handleInputChange(ev: Event) {
				const realValue: number | null = this.getRealValue(
					this.localValue,
				)

				if (
					realValue !== null &&
					typeof this.max !== 'undefined' &&
					!Number.isNaN(realValue) &&
					realValue > this.max
				) {
					;(ev as any).target.value = this.max

					this.localValue = this.max
					this.$emit('update:modelValue', this.max)
					this.$emit('change', ev)
				} else if (
					realValue !== null &&
					typeof this.min !== 'undefined' &&
					!Number.isNaN(realValue) &&
					realValue < this.min
				) {
					;(ev as any).target.value = this.min

					this.localValue = this.min
					this.$emit('update:modelValue', this.min)
					this.$emit('change', ev)
				} else {
					;(ev as any).target.value = Number.isNaN(realValue)
						? this.localValue
						: realValue

					this.$emit('change', ev)
				}
			},
			handleInputFocus(ev: Event) {
				this.isFocus = true

				this.$emit('focus', ev)
			},
			handleKeydown(ev: KeyboardEvent) {
				if (
					!this.maxDecimalPlaces &&
					(ev.key === ',' || ev.key === '.')
				) {
					ev.preventDefault()
					ev.stopPropagation()
				} else if (ev.key === 'ArrowUp') {
					ev.preventDefault()
					ev.stopPropagation()

					this.handleClickStep(this.step)
				} else if (ev.key === 'ArrowDown') {
					ev.preventDefault()
					ev.stopPropagation()

					this.handleClickStep(this.step * -1)
				} else if (
					this.maxDecimalPlaces &&
					this.withLocale &&
					(ev.key === ',' || ev.key === '.')
				) {
					const currentValue: any = String(this.localValue)

					if (currentValue) {
						const target: any = ev.target as any
						const startSelection: number = target.selectionStart
						const endSelection: number = target.selectionEnd

						if (this.numberLocale === 'en-US' && ev.key === ',') {
							ev.preventDefault()
							ev.stopPropagation()

							this.localValue = `${currentValue.substr(
								0,
								startSelection,
							)}.${currentValue.substr(endSelection)}`

							target.selectionEnd = endSelection + 1
						} else if (
							this.numberLocale === 'id-ID' &&
							ev.key === '.'
						) {
							ev.preventDefault()
							ev.stopPropagation()

							this.localValue = `${currentValue.substr(
								0,
								startSelection,
							)},${currentValue.substr(endSelection)}`

							target.selectionEnd = endSelection + 1
						}
					}
				}

				this.$emit('keydown', ev)
			},
			handleMouseLeaveIcon(ev: Event) {
				return this.icon?.onMouseLeave && this.icon.onMouseLeave(ev)
			},
			handleMouseOverIcon(ev: Event) {
				return this.icon?.onMouseOver && this.icon.onMouseOver(ev)
			},
			handlePaste(ev: ClipboardEvent) {
				const clipboardData: any =
					ev.clipboardData || (window as any).clipboardData

				const pastedData: any = clipboardData.getData('Text')

				if (!/^-?\d*[.,]?\d*$/.test(pastedData)) {
					ev.preventDefault()
				}
			},
			handleValueProp(value: any) {
				if (
					value !== null &&
					typeof value !== 'undefined' &&
					String(value) !== '' &&
					this.withLocale &&
					this.numberLocale === 'id-ID' &&
					!Number.isNaN(Number(value))
				) {
					this.localValue = Intl.NumberFormat(this.numberLocale, {
						maximumFractionDigits: this.maxDecimalPlaces,
						minimumFractionDigits: 0,
					}).format(Number(value))
				} else {
					this.localValue = value
				}
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

				this.isFocus = focus
			},
		},
		watch: {
			focus(newValue: boolean) {
				this.isFocus = newValue
			},
			modelValue: {
				handler(newValue: any) {
					this.handleValueProp(newValue)
				},
			},
			value: {
				handler(newValue: any) {
					this.handleValueProp(newValue)
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
	@import '../../assets/scss/components/forms/_input-number.scss';
</style>
