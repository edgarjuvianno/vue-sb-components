<template>
	<div
		:class="{ error: isError, range }"
		:tabindex="!disabled && !readOnly ? 0 : -1"
		class="datepicker-wrapper"
		ref="datepicker-wrapper"
		v-bind="{ ...$attrs }"
		@blur="() => (localShow = false)"
		@focus="() => handleOpenCalendar()"
	>
		<sb-input
			:error-message="errorMessage"
			:focus="localShow"
			:is-error="isError"
			:label="label"
			:placeholder="placeholder"
			:tabindex="-1"
			:value="valueString"
			ref="input-wrapper"
			type="text"
			v-bind="{
				autocomplete,
				disabled,
				required,
				readOnly,
				...(!noIcon && {
					icon,
				}),
			}"
			@on-focus="() => handleOpenCalendar()"
			@on-keydown="handleKeyDown"
		>
			<template v-slot:icon v-if="!noIcon">
				<component :is="getIcon" />
			</template>
		</sb-input>
		<sb-datepicker-popup
			:input-wrapper="inputWrapper"
			:show="localShow"
			:value="localValue"
			v-bind="{
				max,
				min,
				range,
				type,
			}"
			@on-change="handleOnChange"
			@on-change-time="handleOnChangeTime"
		/>
	</div>
</template>

<script lang="ts">
	import { defineComponent, PropType } from 'vue'
	import DayJS, { Dayjs } from 'dayjs'
	import { sortDateRange } from './__funcs'

	// components
	import Input from '@/components/form-input/form-input.vue'
	import Popup from './__popup.vue'

	// icons
	import { calendar, clock, xMark } from '@/assets/icons'
	import { IIcon } from '@/interface'

	export default defineComponent({
		emits: ['change', 'update:modelValue', 'input'],
		props: {
			allowClear: {
				required: false,
				type: Boolean,
			},
			autocomplete: {
				default: 'on',
				type: String as PropType<'off' | 'on'>,
			},
			closeOnSelect: {
				required: false,
				type: Boolean,
			},
			disabled: {
				required: false,
				type: Boolean,
			},
			errorMessage: {
				required: false,
				type: [String, Function],
			},
			format: {
				required: false,
				type: String,
			},
			isError: {
				required: false,
				type: Boolean,
			},
			label: {
				required: false,
				type: String,
			},
			max: {
				required: false,
				type: String,
			},
			min: {
				required: false,
				type: String,
			},
			modelValue: {
				required: false,
				type: Object as PropType<
					Date | Dayjs | Date[] | Dayjs[] | null
				>,
			},
			noIcon: {
				required: false,
				type: Boolean,
			},
			placeholder: {
				required: false,
				type: String,
			},
			range: {
				required: false,
				type: Boolean,
			},
			readOnly: {
				required: false,
				type: Boolean,
			},
			required: {
				required: false,
				type: Boolean,
			},
			type: {
				default: 'date',
				required: false,
				type: String as PropType<
					'date' | 'datetime' | 'time' | 'month' | 'year'
				>,
			},
			value: {
				required: false,
				type: Object as PropType<
					Date | Dayjs | Date[] | Dayjs[] | null
				>,
			},
		},
		name: 'sb-form-date-picker',
		components: {
			'sb-input': Input,
			'sb-datepicker-popup': Popup,
		},
		data() {
			return {
				icon: {
					onClick: null as any,
					placement: 'append',
				} as IIcon,
				inputWrapper: null as any,
				localValue: (this.modelValue || this.value || null) as any,
				localShow: false,
				valueString: null as any,
			}
		},
		computed: {
			getIcon() {
				if (
					this.allowClear &&
					this.localValue &&
					this.localValue !== ''
				) {
					return xMark()
				} else if (this.type === 'time') {
					return clock()
				}

				return calendar()
			},
		},
		methods: {
			getDefaultFormat() {
				switch (this.type) {
					case 'datetime':
						return 'YYYY-MM-DD HH:mm:ss'
					case 'time':
						return 'HH:mm:ss'
					case 'month':
						return 'YYYY-MM'
					case 'year':
						return 'YYYY'
					default:
						return 'YYYY-MM-DD'
				}
			},
			handleClickIcon() {
				if (
					this.allowClear &&
					this.localValue &&
					this.localValue !== ''
				) {
					return this.handleUpdateModelValue(null)
				} else if (!this.disabled && !this.readOnly) {
					return this.handleOpenCalendar()
				}

				return null
			},
			handleClickOutside(event: MouseEvent) {
				const target: HTMLElement = event.target as HTMLElement
				const parent: HTMLElement = this.$refs[
					'datepicker-wrapper'
				] as any

				if (
					target &&
					parent &&
					!parent.contains(target) &&
					!target.isSameNode(parent)
				) {
					this.localShow = false
				}
			},
			handleKeyDown(ev: KeyboardEvent) {
				if (ev.key === 'Backspace') {
					this.handleUpdateModelValue(null)
				} else if (ev.key === 'Tab') {
					this.localShow = false

					const self: HTMLElement = this.$el as HTMLElement
					self.blur()
				} else {
					ev.preventDefault()
				}
			},
			handleOnChange(value: any) {
				if (!this.range) {
					this.handleUpdateModelValue(value)
				} else {
					if (!this.localValue || this.localValue?.length > 1) {
						this.localValue = [value]
					} else {
						const tempValues: Dayjs[] = [...this.localValue, value]
						const sortedValues: Dayjs[] = sortDateRange(tempValues)

						this.localValue = sortedValues

						this.$nextTick(() => {
							if (this.localValue.length > 1) {
								this.handleRangeUpdateModelValue()
							}
						})
					}
				}
			},
			handleOnChangeTime(value: Dayjs[]) {
				const sortedValues: Dayjs[] = sortDateRange(value)
				this.localValue = [...sortedValues]

				this.$nextTick(() => this.handleRangeUpdateModelValue())
			},
			handleOpenCalendar() {
				if (!this.disabled && !this.readOnly) {
					const self: Element = this.$el as Element
					const inputs: HTMLCollectionOf<HTMLInputElement> =
						self.getElementsByTagName('input')

					if (inputs?.length > 0) {
						const input: HTMLInputElement | null = inputs.item(0)

						input?.focus()
					}

					this.localShow = true
				}
			},
			handleUpdateModelValue(value: any) {
				this.localValue = value

				if (value) {
					if (this.format) {
						this.valueString = value.format(this.format)
					} else {
						this.valueString = value.format(this.getDefaultFormat())
					}
				}

				if (this.closeOnSelect) {
					this.localShow = false
				}

				this.$nextTick(() => {
					this.$emit('update:modelValue', this.localValue)
					this.$emit('input', this.localValue)
					this.$emit('change', this.localValue)
				})
			},
			handleRangeUpdateModelValue() {
				const values: Dayjs[] = [...this.localValue]

				if (values) {
					if (this.format) {
						this.valueString = values
							.map((it: Dayjs) => it.format(this.format))
							.join(' - ')
					} else {
						this.valueString = values
							.map((it: Dayjs) =>
								it.format(this.getDefaultFormat()),
							)
							.join(' - ')
					}
				}

				if (this.closeOnSelect) {
					this.localShow = false
				}

				this.$nextTick(() => {
					this.$emit('update:modelValue', this.localValue)
					this.$emit('input', this.localValue)
					this.$emit('change', this.localValue)
				})
			},
			setLocalValue(value: any) {
				if (!value || value?.length < 1) {
					this.valueString = null
					this.localValue = null
				} else {
					if (!this.range) {
						const newValueObject: any = DayJS(value)

						if (this.format) {
							this.valueString = newValueObject.format(
								this.format,
							)
						} else {
							this.valueString = newValueObject.format(
								this.getDefaultFormat(),
							)
						}

						this.localValue = newValueObject
					} else {
						const newValueObject: any[] = [
							DayJS(value[0]),
							DayJS(value[1]),
						]

						if (this.format) {
							const end: string = newValueObject[1].format(
								this.format,
							)
							const start: string = newValueObject[0].format(
								this.format,
							)

							this.valueString = `${start} - ${end}`
						} else {
							const end: string = newValueObject[1].format(
								this.getDefaultFormat(),
							)
							const start: string = newValueObject[0].format(
								this.getDefaultFormat(),
							)

							this.valueString = `${start} - ${end}`
						}

						this.localValue = newValueObject
					}
				}
			},
		},
		watch: {
			localShow(newValue: boolean, oldValue: boolean) {
				if (
					!newValue &&
					oldValue &&
					this.range &&
					(!this.localValue ||
						(this.localValue && this.localValue.length < 2))
				) {
					this.localValue = null
				}
			},
			modelValue: {
				deep: true,
				handler(newValue: any) {
					this.setLocalValue(newValue)
				},
			},
			value: {
				deep: true,
				handler(newValue: any) {
					this.setLocalValue(newValue)
				},
			},
		},
		mounted() {
			this.icon.onClick = this.handleClickIcon

			const childs: HTMLCollection = (this.$refs['input-wrapper'] as any)
				.$el.children
			const inputGroup: Element | undefined = Array.from(childs).find(
				(it: Element) => it.classList.contains('input-group'),
			)

			this.inputWrapper = inputGroup

			document.addEventListener('click', (event: MouseEvent) =>
				this.handleClickOutside(event),
			)

			this.setLocalValue(this.localValue)
		},
		unmounted() {
			document.removeEventListener('click', (event: MouseEvent) =>
				this.handleClickOutside(event),
			)
		},
	})
</script>

<style lang="scss">
	@import '../../assets/scss/components/forms/_datepicker.scss';
</style>
