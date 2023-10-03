<template>
	<div
		class="option"
		:class="{ selected: isSelected(opt) }"
		:key="opt"
		v-for="opt in list"
		@click="doSelect(opt)"
	>
		<span v-html="renderOption(opt)"></span>
	</div>
	<div class="loading-wrapper" v-if="isLoading">
		<sb-circular indeterminate :size="36" />
	</div>
</template>

<script lang="ts">
	import { defineComponent, PropType } from 'vue'

	// funcs
	import { renderOption } from '../__funcs'

	// components
	import Circular from '@/components/progress-circular/progress-circular.vue'

	export default defineComponent({
		emits: {
			onSelect: (_selected: any) => true,
		},
		props: {
			isLoading: {
				required: false,
				type: Boolean,
			},
			list: {
				required: true,
				type: Object as PropType<any[]>,
			},
			multi: {
				required: false,
				type: Boolean,
			},
			optLabel: {
				required: true,
				type: [String, Function],
			},
			selected: {
				required: false,
				type: Object as PropType<any | any[]>,
			},
		},
		name: 'sb-form-dropdown-option-plain',
		components: {
			'sb-circular': Circular,
		},
		methods: {
			doSelect(opt: any) {
				if (!this.isSelected(opt)) {
					this.$emit('onSelect', opt)
				}
			},
			isSelected(opt: any) {
				if (this.selected) {
					if (this.multi) {
						return this.selected.some(
							(it: any) =>
								JSON.stringify(it).indexOf(
									JSON.stringify(opt),
								) > -1,
						)
					}

					return (
						JSON.stringify(this.selected).indexOf(
							JSON.stringify(opt),
						) > -1
					)
				}

				return false
			},
			renderOption(opt: any) {
				return renderOption(opt, this.optLabel)
			},
		},
	})
</script>

<style lang="scss" scoped>
	@import '../../../assets/scss/components/forms/dropdown/_dropdown-option.scss';
</style>
