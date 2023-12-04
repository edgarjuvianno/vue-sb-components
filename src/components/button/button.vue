<template>
	<button
		class="btn"
		:class="[
			`btn-${variant}`,
			size,
			color,
			isClicked && 'clicked',
			noElevation && 'no-elevation',
		]"
		:disabled="disabled"
		@click="handleClick"
		v-bind="{ ...$attrs }"
		v-if="!tooltip"
	>
		<slot />
	</button>
	<sb-tooltip :label="tooltip" v-else>
		<button
			class="btn"
			:class="[
				`btn-${variant}`,
				size,
				color,
				isClicked && 'clicked',
				noElevation && 'no-elevation',
			]"
			:disabled="disabled"
			@click="handleClick"
			v-bind="{ ...$attrs }"
		>
			<slot />
		</button>
	</sb-tooltip>
</template>

<script lang="ts">
	import { defineComponent, PropType } from 'vue'
	import SBTooltip from '@/components/tooltip/tooltip.vue'

	export default defineComponent({
		emits: {
			click: (_event: MouseEvent) => true,
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
			disabled: {
				default: false,
				type: Boolean,
			},
			noElevation: {
				required: false,
				type: Boolean,
			},
			size: {
				default: 'base',
				type: String as PropType<'base' | 'large' | 'small'>,
			},
			tooltip: {
				required: false,
				type: String,
			},
			variant: {
				default: 'contained',
				type: String as PropType<'contained' | 'outlined' | 'text'>,
			},
		},
		name: 'sb-button',
		components: {
			'sb-tooltip': SBTooltip,
		},
		data() {
			return { isClicked: false }
		},
		methods: {
			handleClick(event: MouseEvent) {
				this.isClicked = true

				setTimeout(() => {
					this.isClicked = false
				}, 350)

				this.$emit('click', event)
			},
		},
	})
</script>

<style lang="scss">
	@import '../../assets/scss/components/_button.scss';
</style>
