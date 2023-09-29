<template>
	<div
		class="tooltip"
		:class="{ hide: hidden, show }"
		:style="rect"
		ref="tooltip"
		v-bind="{ ...$attrs }"
	>
		{{ label }}
	</div>
	<div
		@mouseleave="toggleShow(false)"
		@mouseover="toggleShow(true)"
		ref="content-wrapper"
	>
		<slot />
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue'

	export default defineComponent({
		emits: ['close'],
		props: {
			hidden: {
				required: false,
				type: Boolean,
			},
			label: {
				required: true,
				type: String,
			},
		},
		name: 'sb-tooltip',
		data() {
			return {
				rect: {
					left: '0',
					top: '0',
				},
				show: false,
			}
		},
		methods: {
			toggleShow(show: boolean) {
				if (this.$refs['content-wrapper'] && this.$refs['tooltip']) {
					const elemContentRect: DOMRect = (
						this.$refs['content-wrapper'] as any
					).getBoundingClientRect()

					const elemTooltipRect: DOMRect = (
						this.$refs['tooltip'] as any
					).getBoundingClientRect()

					const tooltipLeft: number =
						elemContentRect.width / 2 -
						elemTooltipRect.width / 2 +
						elemContentRect.left

					const isTop: boolean =
						document.body.getBoundingClientRect().height -
							(elemContentRect.height + elemContentRect.y) <=
						elemTooltipRect.height + 6

					if (isTop) {
						this.rect = {
							left: `${tooltipLeft < 0 ? 6 : tooltipLeft}px`,
							top: `${
								elemContentRect.top - elemContentRect.height - 6
							}px`,
						}

						this.show = show
					} else {
						this.rect = {
							left: `${tooltipLeft < 0 ? 6 : tooltipLeft}px`,
							top: `${
								elemContentRect.top + elemContentRect.height + 6
							}px`,
						}

						this.show = show
					}
				}
			},
		},
	})
</script>

<style lang="scss" scoped>
	@import '../../assets/scss/components/_tooltip.scss';
</style>
