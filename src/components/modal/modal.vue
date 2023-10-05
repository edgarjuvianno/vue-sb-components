<template>
	<div
		class="modal-mask"
		:class="{ hide: !show, show }"
		:id="id || ''"
		v-bind="{ ...$attrs }"
	>
		<div class="backdrop" @click.stop="doClose()" />
		<div class="modal-wrapper">
			<div class="modal-container" :class="container">
				<button v-if="showX" class="x-mark" @click.stop="doClose()">
					<component :is="xMark" />
				</button>
				<div class="modal-content">
					<slot />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { PropType, defineComponent } from 'vue'

	// icons
	import { xMark } from '@/assets/icons'

	export default defineComponent({
		emits: ['close'],
		props: {
			container: {
				default: 'medium',
				type: String as PropType<
					'x-large' | 'large' | 'medium' | 'small'
				>,
			},
			id: {
				required: false,
				type: String,
			},
			show: {
				default: false,
				type: Boolean,
			},
			showX: {
				default: true,
				type: Boolean,
			},
		},
		name: 'sb-modal',
		computed: {
			xMark() {
				return xMark()
			},
		},
		methods: {
			doClose() {
				if (this.id) {
					const modal: HTMLDivElement | null = document.querySelector(
						`#${this.id}`,
					)

					modal?.classList.remove('show')
					modal?.classList.add('hide')
				}

				this.$emit('close')
			},
		},
		watch: {
			show(value: boolean) {
				if (value) {
					return document
						?.querySelector('body')
						?.classList?.add('sb-overflow-hidden')
				}

				return document
					?.querySelector('body')
					?.classList?.remove('sb-overflow-hidden')
			},
			showX: {
				handler(value: boolean) {
					if (value) {
						return document.addEventListener(
							'keydown',
							(e: KeyboardEvent) => {
								if (e.key === 'Escape') {
									this.doClose()
								}
							},
						)
					}

					return document.removeEventListener(
						'keydown',
						(e: KeyboardEvent) => {
							if (e.key === 'Escape') {
								this.doClose()
							}
						},
					)
				},
				immediate: true,
			},
		},
	})
</script>

<style lang="scss" scoped>
	@import '../../assets/scss/components/_modal.scss';
</style>