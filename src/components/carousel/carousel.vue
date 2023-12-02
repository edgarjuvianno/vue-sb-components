<template>
	<div class="carousel-wrapper" ref="carousel-wrapper" v-bind="{ ...$attrs }">
		<template v-if="isMounted">
			<div class="slider-wrapper">
				<component
					class="nav"
					:class="{ 'sb-hidden': !isInfinite && currentPage < 2 }"
					:is="iconAngleLeft"
					@click="handleNav(-1)"
					v-if="!isSmallScreen && arrow"
				/>
				<component
					class="nav"
					:class="{
						'sb-hidden':
							!isInfinite && currentPage === localDots.length,
					}"
					:is="iconAngleRight"
					@click="handleNav(1)"
					v-if="!isSmallScreen && arrow"
				/>
				<div
					draggable="true"
					class="slider"
					ref="slider"
					:class="{
						grabbing: isDrag,
					}"
					:style="sliderStyle"
					@mousedown="(event) => handleDragStart(event)"
					@mousemove="(event) => handleDrag(event)"
					@mouseup="(event) => handleDragEnd(event)"
					@touchstart="(event) => handleDragStart(event)"
					@touchmove="(event) => handleDrag(event)"
					@touchend="(event) => handleDragEnd(event)"
				>
					<template v-if="list">
						<div
							class="card"
							:class="{
								active: isCardActive(index),
							}"
							:key="`card-${index}`"
							v-for="(card, index) in cardsDisplay"
						>
							<slot name="card" v-bind="{ data: card }">
								{{ card }}
							</slot>
						</div>
					</template>
				</div>
			</div>
			<div class="dots-wrapper" v-if="isDotsEnabled">
				<div
					class="button"
					:class="{
						active: currentPage - 1 === index,
					}"
					:key="dot"
					v-for="(dot, index) in localDots"
					@click="handleDot(index + 1)"
				></div>
			</div>
		</template>
		<div class="carousel-loader" v-else></div>
	</div>
</template>

<script lang="ts">
	import { defineComponent, PropType } from 'vue'

	// funcs
	import { numbersInRange, sortBreakpoints } from './__funcs'

	// icons
	import { angleLeft, angleRight } from '@/assets/icons'
	import { IResponsive } from '@/interface'

	export default defineComponent({
		props: {
			arrow: {
				default: true,
				type: Boolean,
			},
			autoplay: {
				required: false,
				type: Boolean,
			},
			cardsToShow: {
				default: 1,
				type: Number,
			},
			dots: {
				default: true,
				type: Boolean,
			},
			infinite: {
				required: false,
				type: Boolean,
			},
			list: {
				required: true,
				type: Object as PropType<any[]>,
			},
			responsive: {
				required: false,
				type: Object as PropType<IResponsive[]>,
			},
			speed: {
				default: 3000,
				type: Number,
			},
		},
		name: 'sb-carousel',
		data() {
			return {
				autoplayInterval: null as any,
				cardWidth: 0 as number,
				cardsDisplay: [] as any,
				carouselWrapper: null as any,
				currentPage: 1,
				endDrag: -1 as number,
				isDrag: false,
				isMounted: false,
				isSmallScreen: false,
				localDots: [] as any[],
				localResponsives: [] as IResponsive[],
				sliderStyle: [] as any,
				startDrag: -1 as number,
			}
		},
		computed: {
			iconAngleLeft() {
				return angleLeft()
			},
			iconAngleRight() {
				return angleRight()
			},
			isDotsEnabled() {
				if (this.responsive && typeof window !== 'undefined') {
					const setting: IResponsive | undefined =
						this.localResponsives.find(
							(it: IResponsive) =>
								it.breakpoint === window.innerWidth,
						)

					if (setting) {
						return setting.settings.dots || this.dots
					}
				}

				return this.dots
			},
			isInfinite() {
				if (this.responsive && typeof window !== 'undefined') {
					const setting: IResponsive | undefined =
						this.localResponsives.find(
							(it: IResponsive) =>
								it.breakpoint === window.innerWidth,
						)

					if (setting) {
						return setting.settings.infinite || this.infinite
					}
				}

				return this.infinite
			},
		},
		methods: {
			getCardsToShow() {
				if (this.responsive && typeof window !== 'undefined') {
					const setting: IResponsive | undefined =
						this.localResponsives.find(
							(it: IResponsive) =>
								it.breakpoint >= window.innerWidth,
						)

					if (setting) {
						return setting.settings.cardsToShow || this.cardsToShow
					}
				}

				return this.cardsToShow
			},
			handleDot(page: number) {
				if (!this.isInfinite) {
					this.currentPage = page

					this.$nextTick(() => {
						this.handleScrollBasic()
					})
				} else {
					const current: number = this.currentPage
					this.currentPage = page

					this.$nextTick(() => {
						this.handleScrollInfinite(page - current)
					})
				}
			},
			handleDrag(ev: MouseEvent | TouchEvent) {
				if (ev.cancelable) {
					ev.preventDefault()
				}

				if ((ev as MouseEvent).movementX) {
					this.endDrag = (ev as MouseEvent).movementX
				} else if ((ev as TouchEvent).changedTouches) {
					this.endDrag = (ev as TouchEvent).changedTouches[0].clientX
				}
			},
			handleDragEnd(ev: MouseEvent | TouchEvent) {
				if (ev.cancelable) {
					ev.preventDefault()
				}

				if (this.isDrag) {
					if (this.startDrag > this.endDrag) {
						if (
							(!this.isInfinite &&
								this.currentPage < this.localDots.length) ||
							this.isInfinite
						) {
							this.handleNav(1)
						}
					} else if (this.startDrag < this.endDrag) {
						if (
							(!this.isInfinite && this.currentPage > 1) ||
							this.isInfinite
						) {
							this.handleNav(-1)
						}
					}

					this.isDrag = false
				}
			},
			handleDragStart(ev: MouseEvent | TouchEvent) {
				if (ev.cancelable) {
					ev.preventDefault()
				}

				if ((ev as MouseEvent).movementX) {
					this.startDrag = (ev as MouseEvent).movementX
				} else if ((ev as TouchEvent).changedTouches) {
					this.startDrag = (
						ev as TouchEvent
					).changedTouches[0].clientX
				}

				this.isDrag = true
			},
			handleInitCards() {
				if (typeof window !== 'undefined') {
					this.modifyCards()

					this.$nextTick(() => {
						this.localDots = Array.from(
							Array(
								Math.ceil(
									this.list.length / this.getCardsToShow(),
								),
							).keys(),
						)

						this.setSliderStyles()

						this.$nextTick(() => {
							if (
								this.$refs['slider'] &&
								this.isInfinite &&
								this.carouselWrapper
							) {
								const wrapperWidth: number =
									this.carouselWrapper.getBoundingClientRect()
										.width

								const scrollTravel: number = wrapperWidth + 16

								;(this.$refs['slider'] as any)?.scrollTo({
									left: scrollTravel,
								})
							}
						})
					})
				}
			},
			handleNav(inc: number) {
				if (!this.isInfinite) {
					if (
						(inc < 0 && this.currentPage > 1) ||
						(inc > 0 && this.currentPage < this.list.length)
					) {
						this.currentPage += inc

						this.$nextTick(() => {
							this.handleScrollBasic()
						})
					}
				} else {
					if (inc < 0 && this.currentPage < 2) {
						this.currentPage = this.localDots.length
					} else if (
						inc > 0 &&
						this.currentPage === this.localDots.length
					) {
						this.currentPage = 1
					} else {
						this.currentPage += inc
					}

					this.$nextTick(() => {
						this.handleScrollInfinite(inc)
					})
				}
			},
			handleResize() {
				this.handleInitCards()
			},
			handleScrollBasic() {
				if (this.$refs['slider']) {
					;(this.$refs['slider'] as any)?.scrollTo({
						behavior: 'smooth',
						left:
							(this.currentPage - 1) *
								this.carouselWrapper.getBoundingClientRect()
									.width +
							(this.currentPage > 1
								? 16 * (this.currentPage - 1)
								: 0),
					})
				}
			},
			handleScrollInfinite(inc: number) {
				if (this.$refs['slider']) {
					const currentScroll: number = (this.$refs['slider'] as any)
						.scrollLeft

					const wrapperWidth: number =
						this.carouselWrapper.getBoundingClientRect().width

					const scrollTravel: number = wrapperWidth + 16

					this.modifyCards()

					if (inc < 0) {
						this.$nextTick(() => {
							;(this.$refs['slider'] as any)?.scrollTo({
								left:
									currentScroll + wrapperWidth + scrollTravel,
							})

							setTimeout(() => {
								;(this.$refs['slider'] as any)?.scrollTo({
									behavior: 'smooth',
									left: scrollTravel,
								})
							}, 50)
						})
					} else {
						this.$nextTick(() => {
							;(this.$refs['slider'] as any)?.scrollTo({
								left: 0,
							})

							setTimeout(() => {
								;(this.$refs['slider'] as any)?.scrollTo({
									behavior: 'smooth',
									left: scrollTravel,
								})
							}, 50)
						})
					}
				}
			},
			isCardActive(index: number) {
				if (this.isInfinite) {
					return (
						index >= this.getCardsToShow() &&
						index < this.getCardsToShow() * 2
					)
				}

				return (
					index >= this.currentPage - 1 * this.getCardsToShow() &&
					index < this.currentPage * this.getCardsToShow()
				)
			},
			modifyCards() {
				if (this.isInfinite) {
					const prependIndexes: () => number[] = () => {
						let start: number = 0
						let end: number = 0

						if (this.currentPage < 2) {
							start =
								(this.localDots.length - 1) *
								this.getCardsToShow()
							end = this.localDots.length * this.getCardsToShow()
						} else {
							start =
								(this.currentPage - 2) * this.getCardsToShow()
							end = (this.currentPage - 1) * this.getCardsToShow()
						}

						const numbers: number[] = numbersInRange(start, end - 1)

						return [...numbers].map((it: number) => {
							if (it < 0) {
								return this.list.length + it
							} else if (it >= this.list.length) {
								return it - this.list.length
							}

							return it
						})
					}

					const prepend: any[] = [...prependIndexes()].map(
						(it: number) => this.list[it],
					)

					const appendIndexes: () => number[] = () => {
						let start: number = 0
						let end: number = 0

						if (this.currentPage === this.localDots.length) {
							start = 0
							end = this.getCardsToShow()
						} else {
							start = this.currentPage * this.getCardsToShow()
							end = (this.currentPage + 1) * this.getCardsToShow()
						}

						const numbers: number[] = numbersInRange(start, end - 1)

						return [...numbers].map((it: number) => {
							if (it < 0) {
								return this.list.length + it
							} else if (it >= this.list.length) {
								return it - this.list.length
							}

							return it
						})
					}

					const append = [...appendIndexes()].map(
						(it: number) => this.list[it],
					)

					const current: any[] = [...this.list].filter(
						(_val: any, index: number) =>
							index >=
								(this.currentPage - 1) *
									this.getCardsToShow() &&
							index < this.currentPage * this.getCardsToShow(),
					)

					return (this.cardsDisplay = [
						...prepend,
						...current,
						...append,
					])
				}

				return (this.cardsDisplay = [...this.list])
			},
			setSliderStyles() {
				const cardsToShow: number = this.getCardsToShow()
				const wrapperWidth: number | undefined =
					this.carouselWrapper?.getBoundingClientRect()?.width

				if (wrapperWidth) {
					this.sliderStyle = [
						`grid-auto-columns: calc((100% - ${
							(cardsToShow - 1) * 16
						}px) / ${cardsToShow})`,
					]

					this.cardWidth =
						(wrapperWidth - (cardsToShow - 1) * 16) / cardsToShow
				}
			},
		},
		watch: {
			autoplay: {
				handler(newValue: boolean) {
					if (this.autoplayInterval) {
						clearInterval(this.autoplayInterval)
						this.autoplayInterval = null
					}

					if (newValue && this.speed && this.isInfinite) {
						this.$nextTick(() => {
							this.autoplayInterval = setInterval(() => {
								this.handleNav(1)
							}, this.speed)
						})
					}
				},
				immediate: true,
			},
			cardsToShow() {
				this.handleInitCards()
			},
			list: {
				deep: true,
				handler() {
					this.handleInitCards()
				},
			},
			responsive: {
				deep: true,
				handler(newValue: IResponsive[] | null | undefined) {
					if (newValue) {
						this.localResponsives = [...sortBreakpoints(newValue)]
					} else {
						this.localResponsives = []
					}
				},
				immediate: true,
			},
		},
		mounted() {
			this.isMounted = true

			if (window.innerWidth <= 600) {
				this.isSmallScreen = true
			}

			if (this.$refs['carousel-wrapper']) {
				this.carouselWrapper = this.$refs['carousel-wrapper'] as any
			}

			this.$nextTick(() => {
				this.handleInitCards()
			})

			window.addEventListener('resize', this.handleResize)
		},
		unmounted() {
			this.isMounted = false
			window.removeEventListener('resize', this.handleResize)
		},
	})
</script>

<style lang="scss">
	@import '../../assets/scss/components/_carousel.scss';
</style>
