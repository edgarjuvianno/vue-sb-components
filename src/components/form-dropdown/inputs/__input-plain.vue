<template>
	<div class="dropdown-input-wrapper plain" :class="{ multi }">
		<input
			autocomplete="off"
			class="dummy"
			role="combobox"
			tabindex="-1"
			type="text"
		/>
		<template v-if="renderEmpty">
			<span class="placeholder">{{ placeholder || '&nbsp;' }}</span>
		</template>
		<template v-else>
			<template v-if="multi">
				<div
					class="pill"
					v-for="(opt, index) in selected"
					:key="opt"
					@click.stop="handleClear(index)"
				>
					<div class="clear">x</div>
					<div class="content">
						<span v-html="renderOption(opt)"></span>
					</div>
				</div>
			</template>
			<template v-else>
				<div class="content">
					<span v-html="renderOption(selected)"></span>
				</div>
			</template>
		</template>
	</div>
</template>

<script lang="ts">
	import { defineComponent, PropType } from 'vue'

	// funcs
	import { renderOption } from '../__funcs'

	export default defineComponent({
		props: {
			multi: {
				required: false,
				type: Boolean,
			},
			onDelete: {
				required: false,
				type: Function as PropType<(_index?: number) => void>,
			},
			optLabel: {
				required: true,
				type: [String, Function],
			},
			placeholder: {
				required: false,
				type: String,
			},
			selected: {
				required: false,
				type: Object as PropType<any | any[]>,
			},
		},
		name: 'sb-form-dropdown-input-plain',
		computed: {
			renderEmpty() {
				return (
					!this.selected ||
					(this.selected &&
						(this.selected.length < 1 ||
							Object.keys(this.selected).length < 1))
				)
			},
		},
		methods: {
			handleClear(index: number) {
				if (this.onDelete) {
					return this.onDelete(index)
				}

				return null
			},
			renderOption(opt: any) {
				return renderOption(opt, this.optLabel)
			},
		},
	})
</script>

<style lang="scss" scoped>
	@import '../../../assets/scss/components/forms/dropdown/_dropdown-input.scss';
</style>
