<template>
	<div
		class="option"
		:class="{ focus: activeOption === idx, selected: isSelected(opt) }"
		:key="opt"
		v-for="(opt, idx) in list"
		@click.stop="doSelect(opt)"
	>
		<span v-html="renderOption(opt)"></span>
	</div>
	<div class="no-result" v-if="!isLoading && !list.length">
		{{ noResultText }}
	</div>
	<div class="loading-text" v-if="isLoading">
		{{ loadingText }}
	</div>
</template>

<script lang="ts">
	import { defineComponent, PropType } from 'vue'

	// funcs
	import { renderOption } from '../__funcs'

	export default defineComponent({
		emits: {
			select: (_option: any, _isSelected?: boolean) => true,
		},
		props: {
			activeOption: {
				required: true,
				type: Number,
			},
			isLoading: {
				required: false,
				type: Boolean,
			},
			list: {
				required: true,
				type: Object as PropType<any[]>,
			},
			loadingText: {
				default: 'Loading...',
				type: String,
			},
			multi: {
				required: false,
				type: Boolean,
			},
			noResultText: {
				default: 'No Results Found...',
				type: String,
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
		methods: {
			doSelect(opt: any) {
				if (!this.isLoading) {
					this.$emit('select', opt, this.isSelected(opt))
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
