<template>
	<div
		class="progress-circular"
		:class="{
			[color]: !!color,
			indeterminate: indeterminate || typeof progress === 'undefined',
		}"
		:style="[`height: ${size}px`, `width: ${size}px`]"
		v-bind="{ ...$attrs }"
	>
		<svg class="progress-circular-value" viewBox="22 22 44 44">
			<circle
				cx="44"
				cy="44"
				fill="none"
				r="20.2"
				stroke-width="3"
				:style="getCircularStyle"
			></circle>
			<circle
				class="bg"
				cx="44"
				cy="44"
				fill="none"
				r="20.2"
				stroke-width="3"
			></circle>
		</svg>
		<div class="progress-circular-value-percentage" v-if="percentage">
			{{ typeof progress !== 'undefined' ? progress : 100 }}%
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent, PropType } from 'vue'

	export default defineComponent({
		props: {
			borderWidth: {
				required: false,
				type: Number,
			},
			color: {
				default: 'accent',
				type: String as PropType<
					| 'accent'
					| 'default'
					| 'primary'
					| 'info'
					| 'secondary'
					| 'warning'
					| 'success'
					| 'danger'
					| 'white'
					| 'black'
				>,
			},
			indeterminate: {
				required: false,
				type: Boolean,
			},
			percentage: {
				required: false,
				type: Boolean,
			},
			progress: {
				required: false,
				type: Number,
			},
			size: {
				default: 40,
				type: Number,
			},
		},
		name: 'sb-progress-circular',
		computed: {
			getCircularStyle(): any {
				if (typeof this.progress !== 'undefined') {
					return [
						'stroke-dasharray: 126.92',
						`stroke-dashoffset: ${(100 - this.progress) * 1.2692}`,
					]
				}

				return []
			},
			getColor() {
				switch (this.color) {
					case 'default':
						return '#9db2bf'
					case 'primary':
						return '#4942e4'
					case 'info':
						return '#62b6b7'
					case 'secondary':
						return '#636363'
					case 'warning':
						return '#fbc252'
					case 'success':
						return '#54b435'
					case 'danger':
						return '#ed2b2a'
					case 'white':
						return '#ffffff'
					case 'black':
						return '#303030'
					default:
						return '#6e53b9'
				}
			},
		},
	})
</script>

<style lang="scss" scoped>
	@import '../../assets/scss/components/progress/_circular.scss';
</style>
