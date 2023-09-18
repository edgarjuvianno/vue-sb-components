<template>
	<div
		:class="{ error: isError }"
		class="radio-wrapper"
		v-bind="{ ...$attrs }"
	>
		<label class="label" :class="{ required }" v-if="label">
			<span>{{ label }}</span>
			<span class="asterisk" v-if="required">*</span>
		</label>
		<div
			class="input-group radios-wrapper"
			:class="{ disabled, readonly: readOnly }"
		>
			<div
				:class="{
					disabled,
					readonly: readOnly,
					selected: isSelected(radio),
				}"
				:key="index"
				:tabindex="!disabled && !readOnly ? 0 : -1"
				class="radio"
				v-for="(radio, index) in list"
				@click="doSelect(radio)"
				@keydown="(event) => handleKeydown(event, radio)"
			>
				<div class="selector" />
				<p class="label">{{ radio.label }}</p>
			</div>
		</div>
		<div class="error-wrapper" v-if="isError">
			<span v-html="handleErrorMessage()"></span>
		</div>
	</div>
</template>

<script lang="ts">
	import { IRadioItem } from '@/interface'
	import { defineComponent, PropType } from 'vue'

	export default defineComponent({
		emits: ['change', 'update:modelValue', 'input'],
		props: {
			disabled: {
				required: false,
				type: Boolean,
			},
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
			list: {
				required: true,
				type: Object as PropType<IRadioItem[]>,
			},
			modelValue: {
				required: false,
				type: Object as PropType<IRadioItem | null>,
			},
			readOnly: {
				required: false,
				type: Boolean,
			},
			required: {
				required: false,
				type: Boolean,
			},
			value: {
				required: false,
				type: Object as PropType<IRadioItem>,
			},
		},
		name: 'sb-form-radio-input',
		data() {
			return {
				selected: (this.modelValue || this.value || null) as IRadioItem,
			}
		},
		methods: {
			doSelect(value: IRadioItem) {
				if (!this.disabled && !this.readOnly) {
					this.selected = value

					this.$nextTick(() => {
						this.$emit('update:modelValue', this.selected)
						this.$emit('input', this.selected)
						this.$emit('change', this.selected)
					})
				}
			},
			handleErrorMessage() {
				if (this.errorMessage) {
					if (typeof this.errorMessage === 'string') {
						return this.errorMessage
					}

					return this.errorMessage(this.selected)
				}

				return ''
			},
			handleKeydown(ev: KeyboardEvent, radio: IRadioItem) {
				if (ev.key === 'Enter') {
					this.doSelect(radio)
				}
			},
			isSelected(item: IRadioItem) {
				if (this.selected && Object.keys(this.selected).length > 0) {
					return this.selected.value === item.value
				}

				return false
			},
		},
	})
</script>

<style lang="scss" scoped>
	@import '../../assets/scss/components/forms/_radio.scss';
</style>
