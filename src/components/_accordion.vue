<template>
	<div class="accordion" :class="{ expanded: expand }" v-bind="{ ...$attrs }">
		<div
			class="header-wrapper"
			:class="[color]"
			@click.stop="handleToggle(!expand)"
		>
			<p class="title" v-if="title">{{ title }}</p>
			<component :is="angleDown" />
		</div>
		<div class="content-wrapper">
			<div class="content">
				<slot />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { PropType, defineComponent } from 'vue'

	// icons
	import { angleDown } from '@/assets/icons'

	export default defineComponent({
		emits: ['change'],
		props: {
			clickOutside: {
				default: false,
				type: Boolean,
			},
			color: {
				default: 'primary',
				type: String as PropType<
					'primary' | 'info' | 'warning' | 'success' | 'danger'
				>,
			},
			expand: {
				required: true,
				type: Boolean,
			},
			title: {
				required: false,
				type: String,
			},
		},
		name: 'sb-accordion',
		computed: {
			angleDown() {
				return angleDown()
			},
		},
		methods: {
			handleClickOutside() {
				if (this.expand && this.clickOutside) {
					this.handleToggle(false)
				}
			},
			handleToggle(value: boolean) {
				this.$emit('change', value)
			},
		},
		mounted() {
			document.addEventListener('click', this.handleClickOutside)
		},
		unmounted() {
			document.removeEventListener('click', this.handleClickOutside)
		},
	})
</script>

<style lang="scss" scoped>
	@import '../assets/scss/components/_accordion.scss';
</style>
