<template>
	<Teleport to="body">
		<div
			v-if="localShow"
			class="alert-mask"
			:class="[
				...maskClasses,
				`x_${positionX}`,
				`y_${positionY}`,
				variant,
			]"
		>
			<div class="backdrop" @click.stop="doClose()" />
			<div
				class="alert"
				:class="[
					customClass,
					icon,
					!show ? 'hide' : 'show',
					`x_${positionX}`,
					`y_${positionY}`,
					variant,
				]"
			>
				<div class="icon-wrapper" v-if="icon && !$slots['custom-icon']">
					<div class="icon" :class="[icon]">
						<component :is="getIcon" v-if="icon !== 'loading'" />
						<sb-circular-progress
							indeterminate
							color="accent"
							:size="96"
							v-else-if="icon === 'loading' && variant === 'big'"
						/>
					</div>
				</div>
				<div
					class="icon-wrapper icon-slot"
					v-if="$slots['custom-icon']"
				>
					<slot name="custom-icon" />
				</div>
				<div class="text-wrapper">
					<div class="title" v-if="variant === 'big'">
						{{ title }}
					</div>
					<div class="text">
						<slot name="body">
							{{ text }}
						</slot>
					</div>
					<div
						class="alert-buttons"
						v-if="
							(confirmButton || cancelButton) && variant === 'big'
						"
					>
						<sb-button
							v-if="cancelButton"
							no-elevation
							type="button"
							:color="cancelButton.color || 'default'"
							:variant="cancelButton.variant || 'contained'"
							@click.stop="doClose('cancel')"
						>
							{{ cancelButton.text }}</sb-button
						>
						<sb-button
							v-if="confirmButton"
							no-elevation
							type="button"
							:color="confirmButton.color || 'primary'"
							:variant="confirmButton.variant || 'contained'"
							@click.stop="doClose('confirm')"
						>
							{{ confirmButton.text }}
						</sb-button>
					</div>
				</div>
				<div
					class="close-wrapper"
					v-if="duration < 0 && variant !== 'big'"
				>
					<div class="x-mark" @click="doClose()">
						<component :is="iconXMark" />
					</div>
				</div>
			</div>
		</div>
	</Teleport>
</template>

<script lang="ts">
	import { defineComponent, PropType } from 'vue'

	// components
	import Button from '@/components/button/button.vue'
	import ProgressCircular from '@/components/progress-circular/progress-circular.vue'

	// icons
	import { check, info, question, warning, xMark } from '@/assets/icons'
	import { IAlertButton } from '@/interface'

	export default defineComponent({
		emits: {
			close: (_action?: string) => true,
		},
		props: {
			cancelButton: {
				required: false,
				type: Object as PropType<IAlertButton>,
			},
			confirmButton: {
				required: false,
				type: Object as PropType<IAlertButton>,
			},
			customClass: {
				required: false,
				type: String,
			},
			duration: {
				required: true,
				type: Number,
			},
			icon: {
				required: false,
				type: String as PropType<
					| 'success'
					| 'error'
					| 'info'
					| 'warning'
					| 'question'
					| 'loading'
				>,
			},
			positionX: {
				default: 'right',
				type: String as PropType<'right' | 'center' | 'left'>,
			},
			positionY: {
				default: 'top',
				type: String as PropType<'top' | 'conter' | 'bottom'>,
			},
			show: {
				required: true,
				type: Boolean,
			},
			text: {
				default: '...',
				type: String,
			},
			title: {
				default: '...',
				type: String,
			},
			variant: {
				default: 'flat',
				type: String as PropType<'big' | 'flat'>,
			},
		},
		name: 'sb-alert',
		components: {
			'sb-button': Button,
			'sb-circular-progress': ProgressCircular,
		},
		data() {
			return {
				localShow: false,
				maskClasses: ['hide'] as string[],
			}
		},
		computed: {
			getIcon() {
				switch (this.icon) {
					case 'error':
						return xMark()
					case 'info':
						return info()
					case 'warning':
						return warning()
					case 'question':
						return question()
					default:
						return check()
				}
			},
			iconXMark() {
				return xMark()
			},
		},
		methods: {
			doClose(action?: string) {
				if (this.icon !== 'loading') {
					this.$emit('close', action)
				}
			},
			handleShow(value: boolean) {
				if (value) {
					this.localShow = true
					this.maskClasses = ['show']
				} else {
					setTimeout(() => {
						this.localShow = false
					}, 100)

					this.maskClasses = ['hide']
				}

				if (this.variant === 'big') {
					if (value) {
						document
							?.querySelector('body')
							?.classList?.add('sb-overflow-hidden')
					} else {
						document
							?.querySelector('body')
							?.classList?.remove('sb-overflow-hidden')
					}
				}

				if (value && this.duration > 0) {
					setTimeout(() => {
						this.$emit('close')
					}, this.duration)
				}
			},
		},
		watch: {
			show(value: boolean) {
				this.handleShow(value)
			},
		},
	})
</script>

<style lang="scss">
	@import '../../assets/scss/components/_alert.scss';
</style>
