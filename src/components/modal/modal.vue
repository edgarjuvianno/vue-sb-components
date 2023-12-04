<template>
	<Teleport to="body">
		<div
			:class="[...maskClasses, 'modal-mask']"
			:id="id || ''"
			v-bind="{ ...$attrs }"
			v-if="localShow"
		>
			<div class="backdrop" @click.stop="doClose()" />
			<div class="modal-wrapper">
				<div class="modal-container" :class="container">
					<button
						v-if="showX"
						class="x-mark"
						type="button"
						@click.stop="doClose()"
					>
						<component :is="xMark" />
					</button>
					<div class="modal-content">
						<slot />
					</div>
				</div>
			</div>
		</div>
	</Teleport>
</template>

<script lang="ts">
	import { PropType, defineComponent } from 'vue'

	// icons
	import { xMark } from '@/assets/icons'

	export default defineComponent({
		emits: {
			close: () => true,
		},
		props: {
			container: {
				default: 'fit-content',
				type: String as PropType<
					'x-large' | 'large' | 'medium' | 'small' | 'fit-content'
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
		data() {
			return {
				localShow: false,
				maskClasses: ['hide'] as string[],
			}
		},
		computed: {
			xMark() {
				return xMark()
			},
		},
		methods: {
			doClose() {
				if (this.localShow) {
					if (this.id) {
						const modal: HTMLDivElement | null =
							document.querySelector(`#${this.id}`)

						modal?.classList.remove('show')
						modal?.classList.add('hide')
					}

					this.$emit('close')
				}
			},
			handleShow(value: boolean) {
				if (value) {
					document.addEventListener('keydown', (e: KeyboardEvent) => {
						if (e.key === 'Escape') {
							this.doClose()
						}
					})

					this.localShow = true
					this.maskClasses = ['show']

					document
						?.querySelector('body')
						?.classList?.add('sb-overflow-hidden')
				} else {
					document.removeEventListener(
						'keydown',
						(e: KeyboardEvent) => {
							if (e.key === 'Escape') {
								this.doClose()
							}
						},
					)

					this.maskClasses = ['hide']

					setTimeout(() => {
						this.localShow = false
						document
							?.querySelector('body')
							?.classList?.remove('sb-overflow-hidden')
					}, 250)
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

<style lang="scss" scoped>
	@import '../../assets/scss/components/_modal.scss';
</style>
