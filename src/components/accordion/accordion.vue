<template>
	<div
		class="accordion"
		:class="{
			expanded: localExpanded || localExpanding,
			'no-elevation': noElevation,
		}"
		ref="accordion"
		v-bind="{ ...$attrs }"
	>
		<div
			class="header-wrapper"
			:class="[color]"
			@click.stop="handleToggle(!localExpanded)"
		>
			<p class="title" v-if="title">{{ title }}</p>
			<div class="title" v-else-if="$slots.title">
				<slot name="title" />
			</div>
			<component :is="angleDown" />
		</div>
		<div class="content-wrapper" :style="getAccordionStyles">
			<div class="content" :ref="`${$.uid}-content`">
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
				required: false,
				type: Boolean,
			},
			noElevation: {
				required: false,
				type: Boolean,
			},
			title: {
				required: false,
				type: String,
			},
		},
		name: 'sb-accordion',
		data() {
			return {
				localCollapsing: false,
				localExpanding: false,
				localExpanded: false,
			}
		},
		computed: {
			angleDown() {
				return angleDown()
			},
			getAccordionStyles() {
				if (this.localExpanding || this.localCollapsing) {
					const content: HTMLElement = this.$refs[
						`${this.$.uid}-content`
					] as unknown as HTMLElement

					if (content) {
						const height: number =
							content.getBoundingClientRect()?.height || 0

						return {
							height: `${height}px`,
						}
					}
				}

				return {}
			},
		},
		methods: {
			handleClickOutsideAccordion(event: MouseEvent) {
				const target: HTMLElement = event.target as HTMLElement
				const parent: HTMLElement = this.$refs['accordion'] as any

				if (
					this.localExpanded &&
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
				if (value && !this.localExpanded) {
					this.localExpanding = true

					setTimeout(() => {
						this.localExpanding = false
						this.localExpanded = true
					}, 300)
				} else {
					this.localCollapsing = true

					setTimeout(() => {
						this.localCollapsing = false
						this.localExpanded = false
					}, 150)
				}
			},
		},
		watch: {
			expand: {
				handler(newValue: boolean | undefined) {
					this.localExpanded = newValue || false
				},
				immediate: true,
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
