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
						'non-linear': nonLinear || isDetail,
						active: localCurrent >= index + 1 && !item.isSkip,
						alternate: alternateTitle,
						error: isError(item.rules),
						filled: isFilled(index),
					}"
					@click="
						() => (nonLinear || isDetail) && handleClickHead(index)
					"
				>
					<div class="header-step-number-wrapper">
						<template v-if="!isDetail">
							<component
								:is="iconXMark"
								v-if="isError(item.rules)"
							/>
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
						</template>
						<span v-else>{{ index + 1 }}</span>
					</div>
					<div
						:class="{
							error: isError(item.rules),
						}"
						class="header-step-label-wrapper"
						v-if="!mobile"
					>
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
										name="step"
										v-bind="{
											...item,
											index: index + 1,
										}"
										v-if="localCurrent === index + 1"
									/>
								</div>
							</div>
							<div
								class="stepper-footer"
								:class="{ 'only-next': localCurrent === 1 }"
								v-if="!hideFooter"
							>
								<sb-button
									:color="getPrevColor"
									:disabled="isButtonDisabled"
									no-elevation
									type="button"
									variant="outlined"
									v-if="index !== 0"
									@click="handleNav(-1)"
								>
									{{ getPrevText }}
								</sb-button>
								<div class="action-buttons">
									<sb-button
										:disabled="isButtonDisabled"
										no-elevation
										color="secondary"
										type="button"
										variant="outlined"
										v-if="
											localItems[localCurrent - 1]
												.optional
										"
										@click="handleNav(1, true)"
									>
										{{ getSkipText }}
									</sb-button>
									<sb-button
										type="button"
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
				<template
					:key="`body-content-${index}`"
					v-for="(item, index) in localItems"
				>
					<div
						:ref="`body-content-${index + 1}`"
						class="stepper-body-content"
						v-if="localCurrent === index + 1"
					>
						<slot
							name="step"
							v-bind="{
								...item,
								index: index + 1,
							}"
						/>
					</div>
				</template>
			</div>
			<div
				class="stepper-footer"
				:class="{ 'only-next': localCurrent === 1 }"
				v-if="!hideFooter"
			>
				<sb-button
					:color="getPrevColor"
					:disabled="isButtonDisabled"
					no-elevation
					type="button"
					variant="outlined"
					v-if="localCurrent !== 1"
					@click="handleNav(-1)"
				>
					{{ getPrevText }}
				</sb-button>
				<div class="action-buttons">
					<sb-button
						:disabled="isButtonDisabled"
						no-elevation
						color="secondary"
						type="button"
						variant="outlined"
						v-if="localItems[localCurrent - 1].optional"
						@click="handleNav(1, true)"
					>
						{{ getSkipText }}
					</sb-button>
					<sb-button
						type="button"
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
	import Button from '@/components/button/button.vue'

	// icons
	import { check, pen, xMark } from '@/assets/icons'
	import { IStepperItem } from '@/interface'

	export default defineComponent({
		emits: {
			'update:modelValue': (_active: number) => true,
			change: (_active: number) => true,
			finish: () => true,
		},
		props: {
			alternateTitle: {
				required: false,
				type: Boolean,
			},
			hideFooter: {
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
			isDetail: {
				required: false,
				type: Boolean,
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
					this.$emit('change', this.localCurrent + inc)
				} else if (this.localCurrent === this.items.length) {
					this.$emit('finish')
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
						this.localItems[target - 1] &&
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
				handler(newValue: number) {
					this.localCurrent = newValue
				},
				immediate: true,
			},
		},
	})
</script>

<style lang="scss" scoped>
	@import '../../assets/scss/components/_stepper.scss';
</style>
