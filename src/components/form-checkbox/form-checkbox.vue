<template>
	<div
		class="checkbox-wrapper"
		:class="{ error: isError }"
		v-bind="{ ...$attrs }"
	>
		<label class="label" :class="{ required }" v-if="label">
			<span>{{ label }}</span>
			<span class="asterisk" v-if="required">*</span>
		</label>
		<div
			class="input-group checkboxs-wrapper"
			:class="{ disabled, readonly: readOnly }"
		>
			<div
				class="checkbox"
				v-for="(checkbox, index) in list"
				:class="{
					disabled,
					readonly: readOnly,
					selected: isSelected(checkbox),
				}"
				:key="index"
				:tabindex="!disabled && !readOnly ? 0 : -1"
				@click="doSelect(checkbox)"
				@keydown="(event) => handleKeydown(event, checkbox)"
			>
				<div class="selector">
					<component :is="check" />
				</div>
				<p class="label">{{ checkbox.label }}</p>
			</div>
		</div>
		<div class="error-wrapper" v-if="isError">
			<span v-html="handleErrorMessage()"></span>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent, PropType } from 'vue'

	// icons
	import { check } from '@/assets/icons'
	import { ICheckItem } from '@/interface'

	export default defineComponent({
		emits: {
			'update:modelValue': (_selected: ICheckItem[] | null) => true,
			change: (_selected: ICheckItem[] | null) => true,
			input: (_selected: ICheckItem[] | null) => true,
		},
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
				type: Object as PropType<ICheckItem[]>,
			},
			modelValue: {
				required: false,
				type: Object as PropType<ICheckItem[] | null>,
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
				type: Object as PropType<ICheckItem[] | null>,
			},
		},
		name: 'sb-form-checkbox-input',
		data() {
			return {
				selected: (this.modelValue || this.value || null) as
					| ICheckItem[]
					| null,
			}
		},
		computed: {
			check() {
				return check()
			},
		},
		methods: {
			doSelect(item: ICheckItem) {
				if (!this.disabled && !this.readOnly) {
					if (this.selected && this.selected.length > 0) {
						const isSelected: number = this.selected.findIndex(
							(it: ICheckItem) => it.value === item.value,
						)

						if (isSelected > -1) {
							const tempSelected: ICheckItem[] = [
								...this.selected,
							]
							tempSelected.splice(isSelected, 1)

							this.selected = [...tempSelected]
						} else {
							this.selected = [...this.selected, item]
						}
					} else if (
						!this.selected ||
						(this.selected && this.selected.length < 1)
					) {
						this.selected = [item]
					}

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
			handleKeydown(ev: KeyboardEvent, item: ICheckItem) {
				if (ev.key === 'Enter') {
					this.doSelect(item)
				}
			},
			isSelected(item: ICheckItem) {
				if (this.selected && Object.keys(this.selected).length > 0) {
					return !!this.selected.find(
						(it: ICheckItem) => it.value === item.value,
					)
				}

				return false
			},
		},
		watch: {
			modelValue: {
				deep: true,
				handler(newValue: ICheckItem[] | null) {
					if (newValue) {
						this.selected = [...newValue]
					} else {
						this.selected = null
					}
				},
			},
			value: {
				deep: true,
				handler(newValue: ICheckItem[] | null) {
					if (newValue) {
						this.selected = [...newValue]
					} else {
						this.selected = null
					}
				},
			},
		},
	})
</script>

<style lang="scss" scoped>
	@import '../../assets/scss/components/forms/_checkbox.scss';
</style>
