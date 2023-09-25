<template>
	<div class="color-wrapper" v-bind="{ ...$attrs }">
		<label class="label" v-if="label">
			<span>{{ label }}</span>
		</label>
		<div class="input-group colors-wrapper">
			<div
				:class="{
					selected: isSelected(color),
				}"
				:key="index"
				:style="{ background: color }"
				class="color"
				v-for="(color, index) in list"
				@click="doSelect(color)"
			></div>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent, PropType } from 'vue'

	export default defineComponent({
		emits: ['change', 'update:modelValue'],
		props: {
			label: {
				required: false,
				type: String,
			},
			list: {
				required: true,
				type: Object as PropType<string[]>,
			},
			modelValue: {
				required: false,
				type: String as PropType<string | null>,
			},
			value: {
				required: false,
				type: String as PropType<string | null>,
			},
		},
		name: 'sb-color-picker',
		data() {
			return {
				selected: (this.modelValue || this.value || null) as
					| string
					| null,
			}
		},
		methods: {
			doSelect(value: string) {
				this.selected = value

				this.$nextTick(() => {
					this.$emit('update:modelValue', this.selected)
					this.$emit('change', this.selected)
				})
			},
			isSelected(item: string) {
				if (this.selected) {
					return this.selected === item
				}

				return false
			},
		},
		watch: {
			modelValue: {
				deep: true,
				handler(newValue: string | null) {
					this.selected = newValue
				},
			},
			value: {
				deep: true,
				handler(newValue: string | null) {
					this.selected = newValue
				},
			},
		},
	})
</script>

<style lang="scss" scoped>
	@import '../../assets/scss/components/_color-picker.scss';
</style>
