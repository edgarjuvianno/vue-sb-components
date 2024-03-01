<template>
	<div class="dropdown-input-wrapper search" :class="{ multi, selected }">
		<template v-if="!multi">
			<div class="content">
				<span v-html="renderOption(selected)" />
			</div>
			<input
				:placeholder="isEmpty ? placeholder : ''"
				:tabindex="-1"
				class="input"
				autocomplete="off"
				role="combobox"
				v-model="termSingle"
				@blur="handleBlur"
				@click="(ev) => isOpen && ev.stopPropagation()"
				@focus="handleFocus"
				@keydown="(ev) => handleSearchSelected(ev)"
				@keyup="(ev) => handleSearchInput(ev)"
				v-if="!disabled && !readOnly"
			/>
		</template>
		<template v-else>
			<div
				class="pill"
				v-for="(opt, index) in selected"
				:key="opt"
				@click.stop="handleClear(index)"
			>
				<div class="clear">x</div>
				<div class="content">
					<span v-html="renderOption(opt)" />
				</div>
			</div>
			<input
				:placeholder="isEmpty ? placeholder : ''"
				:tabindex="-1"
				class="input"
				autocomplete="off"
				role="combobox"
				v-model="termMulti"
				@blur="handleBlur"
				@click="(ev) => isOpen && ev.stopPropagation()"
				@focus="handleFocus"
				@keydown="(ev) => handleSearchSelected(ev)"
				@keyup="(ev) => handleSearchInput(ev)"
				v-if="!disabled && !readOnly"
			/>
		</template>
	</div>
</template>

<script lang="ts">
	import { defineComponent, PropType } from 'vue'

	// funcs
	import { renderOption } from '../__funcs'

	export default defineComponent({
		emits: {
			onBlur: () => true,
		},
		props: {
			disabled: {
				required: false,
				type: Boolean,
			},
			isOpen: {
				required: true,
				type: Boolean,
			},
			multi: {
				required: false,
				type: Boolean,
			},
			onBlur: {
				required: false,
				type: Function as PropType<() => void>,
			},
			onFocus: {
				required: false,
				type: Function as PropType<() => void>,
			},
			onDelete: {
				required: false,
				type: Function as PropType<(_index?: number) => void>,
			},
			onFilter: {
				required: false,
				type: Function as PropType<(_term: string) => void>,
			},
			optLabel: {
				required: true,
				type: [String, Function],
			},
			placeholder: {
				required: false,
				type: String,
			},
			readOnly: {
				required: false,
				type: Boolean,
			},
			selected: {
				required: false,
				type: Object as PropType<any | any[]>,
			},
		},
		name: 'sb-form-dropdown-input-search',
		data() {
			return {
				termMulti: '',
				termSingle: '',
			}
		},
		computed: {
			isEmpty() {
				return (
					!this.selected ||
					(this.selected &&
						(this.selected.length < 1 ||
							Object.keys(this.selected).length < 1))
				)
			},
		},
		methods: {
			handleBlur() {
				if (this.onBlur) {
					this.onBlur()
				}
			},
			handleFocus() {
				if (this.onFocus) {
					this.onFocus()
				}
			},
			handleSearchSelected(ev: any) {
				if (ev.key !== 'Backspace' && this.selected && !this.multi) {
					ev.preventDefault()
				} else if (
					ev.key === 'Backspace' &&
					!this.isEmpty &&
					((this.multi && ev.target.value === '') || !this.multi)
				) {
					this.handleClear()
				}
			},
			handleClear(index?: number) {
				if (this.onDelete) {
					this.onDelete(index)
				}
			},
			handleFilterList(term: string) {
				term = term.replace(/^\s?|\s?$/g, '').toLowerCase()

				if (this.onFilter) {
					this.onFilter(term)
				}
			},
			handleSearchInput(ev: any) {
				this.handleFilterList(ev.target.value)

				this.termMulti = this.termSingle = ev.target.value
			},
			renderOption(opt: any) {
				return renderOption(opt, this.optLabel)
			},
		},
		watch: {
			isOpen(newValue: boolean) {
				if (!newValue) {
					if (this.multi) {
						this.termMulti = ''
						this.handleFilterList('')
					} else {
						this.termSingle = ''
						this.handleFilterList('')
					}
				}
			},
			selected() {
				if (!this.multi) {
					this.termSingle = ''
				}
			},
		},
	})
</script>

<style lang="scss" scoped>
	@import '../../../assets/scss/components/forms/dropdown/_dropdown-input.scss';
</style>
