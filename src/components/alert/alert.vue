<template>
	<div
		v-if="variant === 'big'"
		class="backdrop"
		:class="[!show ? 'hide' : 'show']"
		@click="doClose()"
	></div>
	<div
		class="alert"
		:class="[
			icon,
			!show ? 'hide' : 'show',
			`x_${positionX}`,
			`y_${positionY}`,
			variant,
		]"
	>
		<div class="icon-wrapper" v-if="icon">
			<div class="icon" :class="[icon]">
				<component :is="getIcon" />
			</div>
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
				v-if="(confirmButton || cancelButton) && variant === 'big'"
			>
				<sb-button
					v-if="cancelButton"
					no-elevation
					:color="cancelButton.color || 'default'"
					:variant="cancelButton.variant || 'contained'"
					@click.stop="doClose('cancel')"
				>
					{{ cancelButton.text }}</sb-button
				>
				<sb-button
					v-if="confirmButton"
					no-elevation
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
			v-if="localDuration < 0 && variant !== 'big'"
		>
			<div class="x-mark" @click="doClose()">
				<component :is="iconXMark" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent, PropType } from 'vue'

	// components
	import Button from '@/components/button/button.vue'

	// icons
	import { check, info, question, warning, xMark } from '@/assets/icons'
	import { IAlertButton } from '@/interface'

	export default defineComponent({
		emits: ['close'],
		props: {
			cancelButton: {
				required: false,
				type: Object as PropType<IAlertButton>,
			},
			confirmButton: {
				required: false,
				type: Object as PropType<IAlertButton>,
			},
			duration: {
				required: true,
				type: Number,
			},
			icon: {
				required: false,
				type: String as PropType<
					'success' | 'error' | 'info' | 'warning' | 'question'
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
		},
		data() {
			return {
				localDuration: 3000,
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
				this.$emit('close', action)
			},
		},
		watch: {
			duration: {
				handler(value: number) {
					this.localDuration = value
				},
				immediate: true,
			},
			show(value: boolean) {
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

				if (value && this.localDuration > 0) {
					setTimeout(() => {
						this.$emit('close')
					}, this.localDuration)
				}
			},
		},
	})
</script>

<style lang="scss">
	@import '../../assets/scss/components/_alert.scss';
</style>
