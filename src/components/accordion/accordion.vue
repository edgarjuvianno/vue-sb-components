<template>
	<div
		class="accordion"
		:class="{ expanded: expand }"
		ref="accordion"
		v-bind="{ ...$attrs }"
	>
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
				default: 'accent',
				type: String as PropType<
					| 'accent'
					| 'default'
					| 'secondary'
					| 'primary'
					| 'info'
					| 'warning'
					| 'success'
					| 'danger'
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
			handleClickOutsideAccordion(event: MouseEvent) {
				const target: HTMLElement = event.target as HTMLElement
				const parent: HTMLElement = this.$refs['accordion'] as any

				if (
					this.expand &&
					this.clickOutside &&
					target &&
					parent &&
					!parent.contains(target) &&
					!target.isSameNode(parent)
				) {
					this.handleToggle(false)
				}
			},
			handleToggle(value: boolean) {
				this.$emit('change', value)
			},
		},
		mounted() {
			document.addEventListener('click', (event: MouseEvent) =>
				this.handleClickOutsideAccordion(event),
			)
		},
		unmounted() {
			document.removeEventListener('click', (event: MouseEvent) =>
				this.handleClickOutsideAccordion(event),
			)
		},
	})
</script>

<style lang="scss" scoped>
	@import '../../assets/scss/components/_accordion.scss';
</style>
