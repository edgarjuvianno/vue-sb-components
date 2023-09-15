<template>
	<div class="stepper-wrapper" :class="[type]" v-bind="{ ...$attrs }">
		<div class="stepper-header">
			<template
				v-for="(item, index) in localItems"
				:key="`header-step-${index}`"
			>
				<div
					class="header-step"
					:class="{
						'non-linear': nonLinear,
						active: localCurrent >= index + 1 && !item.isSkip,
						alternate: alternateTitle,
						error: isError(item.rules),
						filled: isFilled(index),
					}"
					@click="() => nonLinear && handleClickHead(index)"
				>
					<div class="header-step-number-wrapper">
						<component :is="iconXMark" v-if="isError(item.rules)" />
						<component
							:is="iconPen"
							v-else-if="
								localCurrent === index + 1 && !item.isSkip
							"
						/>
						<component
							:is="iconCheck"
							v-else-if="isFilled(index) && !item.isSkip"
						/>
						<span v-else>{{ index + 1 }}</span>
					</div>
					<div class="header-step-label-wrapper" v-if="!mobile">
						<div>{{ item.title }}</div>
						<div v-if="item.subtitle">{{ item.subtitle }}</div>
					</div>
					<template v-if="type === 'vertical'">
						<div
							class="content-wrapper"
							:class="{
								expanded: localCurrent === index + 1,
							}"
						>
							<div class="stepper-body">
								<div
									class="stepper-body-content"
									:ref="`body-content-${index + 1}`"
								>
									<slot
										:name="`step-${index + 1}`"
										v-bind="{
											...item,
											index: index + 1,
										}"
									/>
								</div>
							</div>
							<div
								class="stepper-footer"
								:class="{ 'only-next': localCurrent === 1 }"
							>
								<sb-button
									:color="getPrevColor"
									:disabled="isButtonDisabled"
									variant="text"
									v-if="localCurrent !== 1"
									@click="handleNav(-1)"
								>
									{{ getPrevText }}
								</sb-button>
								<div class="action-buttons">
									<sb-button
										:disabled="isButtonDisabled"
										color="secondary"
										variant="text"
										v-if="
											localItems[localCurrent - 1]
												.optional
										"
										@click="handleNav(1, true)"
									>
										{{ getSkipText }}
									</sb-button>
									<sb-button
										:color="getNextColor"
										:disabled="isNextDisabled"
										@click="handleNav(1)"
									>
										{{ getNextText }}
									</sb-button>
								</div>
							</div>
						</div>
					</template>
				</div>
				<hr
					class="header-step_divider"
					:class="{
						active: isFilled(index),
						mobile,
					}"
					v-if="
						index !== localItems.length - 1 && type !== 'vertical'
					"
				/>
			</template>
		</div>
		<template v-if="type === 'horizontal'">
			<div class="stepper-body">
				<div
					class="stepper-body-content"
					:key="`body-content-${index}`"
					:ref="`body-content-${index + 1}`"
					:style="[
						localCurrent !== index + 1 ? 'display: none;' : '',
					]"
					v-for="(item, index) in localItems"
				>
					<slot
						:name="`step-${index + 1}`"
						v-bind="{
							...item,
							index: index + 1,
						}"
					/>
				</div>
			</div>
			<div
				class="stepper-footer"
				:class="{ 'only-next': localCurrent === 1 }"
			>
				<sb-button
					:color="getPrevColor"
					:disabled="isButtonDisabled"
					variant="text"
					v-if="localCurrent !== 1"
					@click="handleNav(-1)"
				>
					{{ getPrevText }}
				</sb-button>
				<div class="action-buttons">
					<sb-button
						:disabled="isButtonDisabled"
						color="secondary"
						variant="text"
						v-if="localItems[localCurrent - 1].optional"
						@click="handleNav(1, true)"
					>
						{{ getSkipText }}
					</sb-button>
					<sb-button
						:color="getNextColor"
						:disabled="isNextDisabled"
						@click="handleNav(1)"
					>
						{{ getNextText }}
					</sb-button>
				</div>
			</div>
		</template>
	</div>
</template>

<script lang="ts">
	import { defineComponent, PropType } from 'vue'

	// components
	import Button from '@/components/_button.vue'

	// icons
	import { check, pen, xMark } from '@/assets/icons'
	import { IStepperItem } from '@/interface'

	export default defineComponent({
		emits: ['onFinish', 'update:modelValue'],
		props: {
			alternateTitle: {
				required: false,
				type: Boolean,
			},
			interceptNav: {
				required: false,
				type: Function as PropType<
					| ((_target: number) => boolean)
					| ((_target: number) => Promise<boolean>)
				>,
			},
			items: {
				required: true,
				type: Object as PropType<IStepperItem[]>,
			},
			mobile: {
				required: false,
				type: Boolean,
			},
			modelValue: {
				required: true,
				type: Number,
			},
			nonLinear: {
				required: false,
				type: Boolean,
			},
			type: {
				default: 'horizontal',
				type: String as PropType<'horizontal' | 'vertical'>,
			},
		},
		name: 'sb-stepper',
		components: {
			'sb-button': Button,
		},
		data() {
			return {
				isButtonDisabled: false,
				localCurrent: 1 as number,
				localItems: [] as any[],
			}
		},
		computed: {
			getNextColor() {
				return (
					this.localItems[this.localCurrent - 1].nextColor ||
					'secondary'
				)
			},
			getNextText() {
				return this.localItems[this.localCurrent - 1].nextText || 'next'
			},
			getPrevColor() {
				return (
					this.localItems[this.localCurrent - 1].prevColor ||
					'secondary'
				)
			},
			getPrevText() {
				return this.localItems[this.localCurrent - 1].prevText || 'prev'
			},
			getSkipText() {
				return (
					this.localItems[this.localCurrent - 1].optionalText ||
					'skip'
				)
			},
			iconCheck() {
				return check()
			},
			iconPen() {
				return pen()
			},
			iconXMark() {
				return xMark()
			},
			isNextDisabled() {
				return (
					this.isError(
						this.localItems[this.localCurrent - 1].rules,
					) || this.isButtonDisabled
				)
			},
		},
		methods: {
			doNavigate(inc: number) {
				if (this.localCurrent + inc <= this.items.length) {
					this.$emit('update:modelValue', this.localCurrent + inc)
				} else if (this.localCurrent === this.items.length) {
					this.$emit('onFinish')
				}
			},
			async handleClickHead(index: number) {
				return await this.handleNav(index + 1 - this.localCurrent)
			},
			async handleNav(inc: number, isSkip = false) {
				if (isSkip) {
					this.localItems[this.localCurrent - 1].isSkip = true

					this.doNavigate(inc)
				} else {
					const target: number = this.localCurrent + inc

					if (
						this.localItems[target - 1].optional &&
						this.localItems[target - 1].isSkip
					) {
						this.localItems[target - 1].isSkip = false
					}

					if (this.interceptNav) {
						this.isButtonDisabled = true

						const goOn: boolean = await this.interceptNav(
							this.localCurrent + inc,
						)

						this.isButtonDisabled = false

						if (goOn) {
							this.doNavigate(inc)
						}
					} else {
						this.doNavigate(inc)
					}
				}
			},
			handleSlide(index: number, inc: number) {
				const currentEl: any = this.$refs[`body-content-${index}`]
				const targetEl: any = this.$refs[`body-content-${index + inc}`]

				if (
					currentEl &&
					targetEl &&
					currentEl.length > 0 &&
					targetEl.length > 0
				) {
					if (inc < 0) {
						currentEl[0].classList.add(
							'slide-right-from-zero',
							'sb-whitespace-nowrap',
							'sb-overflow-hidden',
						)
						targetEl[0].classList.add('slide-right')
					} else {
						currentEl[0].classList.add(
							'slide-left-from-zero',
							'sb-whitespace-nowrap',
							'sb-overflow-hidden',
						)
						targetEl[0].classList.add('slide-left')
					}

					setTimeout(() => {
						currentEl[0].classList.remove(
							'sb-whitespace-nowrap',
							'sb-overflow-hidden',
							'slide-left-from-zero',
							'slide-right-from-zero',
						)

						targetEl[0].classList.remove(
							'slide-left',
							'slide-right',
						)
					}, 550)
				}
			},
			isError(rules?: (() => boolean)[]) {
				if (rules) {
					const hasError: boolean = rules.some(
						(it: () => boolean) => !it(),
					)

					return hasError
				}

				return false
			},
			isFilled(index: number) {
				return this.localCurrent > index + 1
			},
		},
		watch: {
			items: {
				deep: true,
				handler(newValue: IStepperItem[]) {
					this.localItems = [...newValue]
				},
				immediate: true,
			},
			modelValue: {
				handler(newValue: number, oldValue: number) {
					if (oldValue && this.type !== 'vertical') {
						this.handleSlide(this.localCurrent, newValue - oldValue)
					}

					this.localCurrent = newValue
				},
				immediate: true,
			},
		},
	})
</script>

<style lang="scss" scoped>
	@import '../assets/scss/components/_stepper.scss';
</style>
