<template>
	<div class="btn-group" :class="[color, orientation]" v-bind="{ ...$attrs }">
		<button
			class="btn"
			type="button"
			:class="[
				`btn-${variant}`,
				size,
				color,
				item.active ? 'active' : '',
			]"
			:disabled="item.disabled"
			:key="`btn-${index}`"
			v-for="(item, index) in localList"
			@click="() => handleClick(index)"
		>
			{{ item.label }}
		</button>
	</div>
</template>

<script lang="ts">
	import { IButtonGroupItem } from '@/interface'
	import { defineComponent, PropType } from 'vue'

	export default defineComponent({
		emits: {
			click: (_index: Number) => true,
		},
		props: {
			color: {
				default: 'default',
				type: String as PropType<
					| 'accent'
					| 'default'
					| 'primary'
					| 'info'
					| 'secondary'
					| 'warning'
					| 'success'
					| 'danger'
				>,
			},
			list: {
				required: true,
				type: Object as PropType<IButtonGroupItem[]>,
			},
			orientation: {
				default: 'horizontal',
				type: String as PropType<'horizontal' | 'vertical'>,
			},
			size: {
				default: 'base',
				type: String as PropType<'base' | 'large' | 'small'>,
			},
			variant: {
				default: 'contained',
				type: String as PropType<'contained' | 'outlined'>,
			},
		},
		name: 'sb-button-group',
		data() {
			return {
				localList: [] as IButtonGroupItem[],
			}
		},
		methods: {
			handleClick(index: number) {
				this.localList = [...this.localList].map(
					(it: IButtonGroupItem, idx: number) => {
						if (idx === index) {
							return {
								...it,
								active: true,
							}
						}

						return { ...it, active: false }
					},
				)

				this.$emit('click', index)
			},
		},
		watch: {
			list: {
				deep: true,
				handler(newValue: IButtonGroupItem[]) {
					this.localList = [...newValue]
				},
				immediate: true,
			},
		},
	})
</script>

<style lang="scss" scoped>
	@import '../../assets/scss/components/_button.scss';
	@import '../../assets/scss/components/_button-group.scss';
</style>
