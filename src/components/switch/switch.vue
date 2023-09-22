<template>
	<div
		class="switch-wrapper"
		v-bind="{ ...$attrs }"
		:class="{ label, active: localActive }"
		:style="getStyle"
		@click.stop="handleToggle"
	>
		<div class="active">
			{{ label?.active || '' }}
		</div>
		<div class="active not">
			{{ label?.notActive || '' }}
		</div>
		<div class="toggle">
			<div class="circle"></div>
		</div>
	</div>
</template>

<script lang="ts">
	import { PropType, defineComponent } from 'vue'
	import { hexToRgb } from '@/components/helper/helper'

	export interface ISwitchColor {
		background: string
		toggle: string
	}

	export interface ISwitchLabel {
		active: string
		notActive: string
	}

	export default defineComponent({
		emits: ['change', 'update:modelValue'],
		props: {
			active: {
				required: true,
				type: Boolean,
			},
			activeColor: {
				required: false,
				type: Object as PropType<ISwitchColor>,
			},
			label: {
				required: false,
				type: Object as PropType<ISwitchLabel>,
			},
			noElevation: {
				required: false,
				type: Boolean,
			},
		},
		name: 'sb-switch',
		data() {
			return {
				localActive: this.active,
			}
		},
		computed: {
			getStyle() {
				if (this.activeColor) {
					return [
						`--sb-switch-bg: ${hexToRgb(
							this.activeColor.background,
						)};`,
						`--sb-switch-toggle: ${hexToRgb(
							this.activeColor.toggle,
						)};`,
						this.getWidth,
					]
				}

				return [
					'--sb-switch-bg: 80 64 153;',
					'--sb-switch-toggle: 255 255 255;',
					this.getWidth,
				]
			},
			getWidth() {
				if (this.label) {
					const activeLength: number = this.label.active.length
					const notActiveLength: number = this.label.notActive.length

					return `--sb-switch-width: ${
						activeLength > notActiveLength
							? activeLength
							: notActiveLength
					}ch;`
				}

				return '--sb-switch-width: 2.5rem;'
			},
		},
		methods: {
			handleToggle() {
				this.localActive = !this.localActive

				this.$nextTick(() => {
					this.$emit('update:modelValue', this.localActive)
					this.$emit('change', this.localActive)
				})
			},
		},
	})
</script>

<style lang="scss" scoped>
	@import '../../assets/scss/components/_switch.scss';
</style>
