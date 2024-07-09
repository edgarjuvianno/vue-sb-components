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
				focus: isFocus || localIsFocus,
				icon_prepend: !!icon || !!$slots['icon-slot'],
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
				v-if="!!icon || !!$slots['icon-slot']"
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
				<imask-input
					unmask
					:autocomplete="autocomplete ? 'on' : 'off'"
					:map-to-radix="['.']"
					:mask="Number"
					:max="max ?? Infinity"
					:min="min ?? -Infinity"
					:radix="getRadix"
					:scale="maxDecimalPlaces ?? 0"
					:tabindex="readOnly || disabled ? -1 : tabindex"
					:thousands-separator="getThousandsSeparator"
					v-model:typed="localValue"
					type="text"
					v-bind="{
						disabled,
						placeholder,
						readonly: readOnly,
					}"
					@blur="handleBlur"
					@change="handleChange"
					@complete:typed="handleComplete"
					@focus="handleInputFocus"
					@keydown="handleKeydown"
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
	import { IMaskComponent } from 'vue-imask'

	// icons
	import { sortDown, sortUp } from '@/assets/icons'

	export default defineComponent({
		emits: {
			'update:modelValue': (_value: number | string | null) => true,
			blur: (_event: Event) => true,
			change: (_event: Event) => true,
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
			invalidNumberMessage: {
				default: 'Please enter valid numbers',
				type: String,
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
		components: {
			'imask-input': IMaskComponent,
		},
		data() {
			return {
				localIsFocus: false,
				isInvalidNumber: false,
				localValue: (this.modelValue ?? this.value ?? '') as any,
			}
		},
		computed: {
			getRadix() {
				if (this.withLocale && this.numberLocale === 'id-ID') {
					return ','
				}

				return '.'
			},
			getThousandsSeparator() {
				if (this.withLocale && this.numberLocale === 'id-ID') {
					return '.'
				}

				return ','
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
			handleBlur(ev: Event) {
				this.localIsFocus = false
				;(ev as any).target.value = this.localValue

				this.$emit('blur', ev)
			},
			handleChange(ev: any) {
				;(ev as any).target.value = this.localValue
				this.$emit('change', ev)
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
				const realValue: number = Number(this.localValue)
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
					this.localValue = tempValue
				}
			},
			handleComplete(value: any) {
				this.$emit('input', {
					target: {
						value,
					},
				} as any)
				this.$emit('update:modelValue', value)
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
			modelValue(newValue) {
				this.localValue = newValue || ''
			},
			value(newValue) {
				this.localValue = newValue || ''
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
