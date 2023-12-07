<template>
	<div class="menu-wrapper" ref="menu-wrapper">
		<sb-button
			:no-elevation="localOpen || noElevation"
			v-bind="{
				color,
				disabled,
				size,
				tooltip,
				variant,
			}"
			@click.stop="handleOpen"
		>
			<slot name="slot-label">{{ label || '...' }}</slot>
		</sb-button>
	</div>
	<Teleport to="body">
		<div
			class="menu-items-wrapper"
			ref="menu-items-wrapper"
			:style="itemsWrapperStyles"
			v-if="localOpen"
		>
			<slot />
		</div>
	</Teleport>
</template>

<script lang="ts">
	import { PropType, defineComponent } from 'vue'

	// components
	import SBButton from '@/components/button/button.vue'

	// utils
	import { recursiveSearchScrollParent } from '@/utils/helper'

	export default defineComponent({
		emits: {
			change: (_isOpen: boolean) => true,
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
			label: {
				required: false,
				type: String,
			},
			noElevation: {
				required: false,
				type: Boolean,
			},
			open: {
				required: true,
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
		name: 'sb-menu',
		components: {
			'sb-button': SBButton,
		},
		data() {
			return {
				localOpen: false as boolean,
				itemsWrapperStyles: [] as any,
				parentWithScroll: null as any,
			}
		},
		methods: {
			handleClose(event: MouseEvent) {
				const target: HTMLElement = event.target as HTMLElement
				const parent: HTMLElement = this.$refs['menu-wrapper'] as any

				if (
					target &&
					parent &&
					!parent.contains(target) &&
					!target.isSameNode(parent)
				) {
					this.$emit('change', false)
				}
			},
			handleOpen() {
				if (!this.disabled) {
					this.localOpen = true
					this.$emit('change', true)

					this.$nextTick(() => {
						this.setPopupPosition()
					})
				}
			},
			handleParentScroll(isOpen: boolean) {
				const parentWithScroll: HTMLElement | null =
					recursiveSearchScrollParent(this.$el)

				if (this.parentWithScroll) {
					this.parentWithScroll.removeEventListener('scroll', () => {
						this.setPopupPosition()
					})
				}

				if (parentWithScroll) {
					if (isOpen) {
						parentWithScroll.addEventListener('scroll', () => {
							this.setPopupPosition()
						})
					} else {
						parentWithScroll.removeEventListener('scroll', () => {
							this.setPopupPosition()
						})
					}
				}

				this.$nextTick(() => {
					this.parentWithScroll = parentWithScroll
				})
			},
			setPopupPosition() {
				const menuWrapper: any = this.$refs['menu-wrapper']

				if (menuWrapper) {
					const DOMRect: DOMRect = menuWrapper.getBoundingClientRect()
					const itemsWrapper: DOMRect = (
						this.$refs['menu-items-wrapper'] as any
					)?.getBoundingClientRect()

					const left: () => number = () => {
						if (DOMRect.width < itemsWrapper.width) {
							return (
								DOMRect.x +
								(DOMRect.width - itemsWrapper.width) / 2
							)
						}

						return DOMRect.x
					}

					if (itemsWrapper) {
						const width: number =
							DOMRect.width > itemsWrapper.width
								? DOMRect.width
								: itemsWrapper.width

						const isTop: boolean =
							document.body.getBoundingClientRect().height -
								(DOMRect.height + DOMRect.y) <=
							itemsWrapper.height

						if (isTop) {
							return (this.itemsWrapperStyles = {
								left: `${left()}px`,
								top: `${DOMRect.y - 6 - itemsWrapper.height}px`,
								width: `${width}px`,
							})
						}

						return (this.itemsWrapperStyles = {
							left: `${left()}px`,
							top: `${DOMRect.y + DOMRect.height}px`,
							width: `${width}px`,
						})
					}
				}
			},
		},
		watch: {
			open(newValue: boolean) {
				this.localOpen = newValue
			},
			localOpen(newValue: boolean) {
				this.handleParentScroll(newValue)
			},
		},
		mounted() {
			this.setPopupPosition()

			document.addEventListener('click', (event: MouseEvent) =>
				this.handleClose(event),
			)

			this.parentWithScroll = recursiveSearchScrollParent(this.$el)
		},
		unmounted() {
			document.removeEventListener('click', (event: MouseEvent) =>
				this.handleClose(event),
			)

			if (this.parentWithScroll) {
				this.parentWithScroll.removeEventListener('scroll', () => {
					this.setPopupPosition()
				})
			}
		},
	})
</script>

<style lang="scss" scoped>
	@import '../../assets/scss/components/_menu.scss';
</style>
