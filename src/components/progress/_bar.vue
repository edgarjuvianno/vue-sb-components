<template>
	<div
		class="progress-bar"
		:class="{
			[color]: !!color,
			indeterminate: indeterminate || typeof progress === 'undefined',
		}"
		:style="{ height: `${height}px` }"
		v-bind="{ ...$attrs }"
	>
		<div
			class="progress-bar-value"
			:style="{
				width:
					typeof progress !== 'undefined' ? `${progress}%` : '100%',
			}"
		>
			<div class="progress-bar-value-percentage" v-if="percentage">
				{{ typeof progress !== 'undefined' ? progress : 100 }}%
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent, PropType } from 'vue'

	export default defineComponent({
		props: {
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
			height: {
				default: 5,
				type: Number,
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
		},
		name: 'sb-progress-bar',
	})
</script>

<style lang="scss" scoped>
	@import '../../assets/scss/components/progress/_bar.scss';
</style>
