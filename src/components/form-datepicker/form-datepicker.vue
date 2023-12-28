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
			:is-error="isError"
			:is-focus="localShow"
			:label="label"
			:placeholder="placeholder"
			:tabindex="-1"
			:value="valueString"
			:variant="variant"
			ref="input-wrapper"
			type="text"
			v-bind="{
				disabled,
				required,
				readOnly,
				...(!noIcon && {
					icon,
				}),
			}"
			@focus="() => handleOpenCalendar()"
			@keydown="handleKeyDown"
		>
			<template v-slot:icon-slot v-if="!noIcon">
				<component :is="getIcon" />
			</template>
		</sb-input>
		<sb-datepicker-popup
			:datepicker-elem="datepickerWrapper"
			:close-on-select="closeOnSelect"
			:input-wrapper="inputWrapper"
			:override-date-style="overrideDateStyle"
			:show="localShow"
			:value="localValue"
			v-bind="{
				max,
				min,
				range,
				saveText,
				type,
			}"
			@change="handleOnChange"
			@change-time="handleOnChangeTime"
			@save="handleOnSave"
		/>
	</div>
</template>

<script lang="ts">
	import { defineComponent, PropType } from 'vue'
	import DayJS, { Dayjs, isDayjs } from 'dayjs'
	import { sortDateRange } from './__funcs'

	// components
	import Input from '@/components/form-input/form-input.vue'
	import Popup from './__popup.vue'

	// icons
	import { calendar, clock, xMark } from '@/assets/icons'
	import { IDate, IIcon } from '@/interface'

	export default defineComponent({
		emits: {
			'update:modelValue': (_selected: string | string[] | null) => true,
			change: (_selected: string | string[] | null) => true,
			input: (_selected: string | string[] | null) => true,
		},
		props: {
			allowClear: {
				required: false,
				type: Boolean,
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
			locale: {
				required: false,
				type: String as PropType<'en' | 'id'>,
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
				type: String as PropType<string | string[] | null>,
			},
			noIcon: {
				required: false,
				type: Boolean,
			},
			overrideDateStyle: {
				required: false,
				type: Function as PropType<
					(_date: IDate) => Record<string, any>
				>,
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
			saveText: {
				required: false,
				type: String,
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
				type: String as PropType<string | string[] | null>,
			},
			variant: {
				default: 'default',
				required: false,
				type: String as PropType<'default' | 'flat'>,
			},
		},
		name: 'sb-form-date-picker',
		components: {
			'sb-input': Input,
			'sb-datepicker-popup': Popup,
		},
		data() {
			return {
				datepickerWrapper: null as any,
				icon: {
					onClick: null as any,
					placement: 'append',
				} as IIcon,
				inputWrapper: null as any,
				localValue: null as any,
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
			getLocales() {
				return {
					en: import('dayjs/locale/en'),
					id: import('dayjs/locale/id'),
				}
			},
		},
		methods: {
			emitFinalValue() {
				if (
					typeof this.localValue === 'object' &&
					this.localValue.length
				) {
					const stringValues: string[] = [
						...(this.localValue as Dayjs[]),
					].map((it: Dayjs) => it.toISOString())

					this.$emit('update:modelValue', stringValues)
					this.$emit('input', stringValues)
					this.$emit('change', stringValues)
				} else {
					const stringValue: string = (
						this.localValue as Dayjs
					).toISOString()

					this.$emit('update:modelValue', stringValue)
					this.$emit('input', stringValue)
					this.$emit('change', stringValue)
				}
			},
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
			handleClickOutsideDatepicker(event: MouseEvent) {
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
			handleGenerateString() {
				if (!this.range) {
					if (this.localValue) {
						if (this.format) {
							this.valueString = this.localValue.format(
								this.format,
							)
						} else {
							this.valueString = this.localValue.format(
								this.getDefaultFormat(),
							)
						}
					}
				} else {
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
				}
			},
			handleKeyDown(ev: Event) {
				const event: KeyboardEvent = ev as KeyboardEvent

				if (event.key === 'Backspace') {
					this.handleUpdateModelValue(null)
				} else if (event.key === 'Tab') {
					this.localShow = false

					const self: HTMLElement = this.$el as HTMLElement
					self.blur()
				} else {
					ev.preventDefault()
				}
			},
			handleLocale() {
				this.getLocales[this.locale || 'en'].then(() =>
					DayJS.locale(this.locale || 'en'),
				)
			},
			handleOnChange(value: any) {
				if (!this.range) {
					this.handleUpdateModelValue(value)
				} else {
					const tempValues: () => Dayjs[] = () => {
						if (this.localValue && this.localValue.length === 1) {
							return [...this.localValue, value]
						}

						return [value]
					}

					const sortedValues: Dayjs[] = sortDateRange(tempValues())

					this.localValue = [...sortedValues]

					this.$nextTick(() => {
						if (this.localValue.length > 1) {
							this.handleRangeUpdateModelValue()
						}
					})
				}
			},
			handleOnChangeTime(value: Dayjs[]) {
				const sortedValues: Dayjs[] = sortDateRange(value)
				this.localValue = [...sortedValues]

				this.$nextTick(() => this.handleRangeUpdateModelValue())
			},
			handleOnSave() {
				this.localShow = false

				this.$nextTick(() => {
					this.handleGenerateString()
					this.emitFinalValue()
				})
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

				if (this.closeOnSelect) {
					this.localShow = false

					this.$nextTick(() => {
						this.handleGenerateString()
						this.emitFinalValue()
					})
				}
			},
			handleRangeUpdateModelValue() {
				if (this.closeOnSelect) {
					this.localShow = false

					this.$nextTick(() => {
						this.handleGenerateString()
						this.emitFinalValue()
					})
				}
			},
			setLocalValue(value: any) {
				if (!value || value?.length < 1) {
					this.valueString = null
					this.localValue = null
				} else {
					if (!this.range) {
						const newValueObject: Dayjs = isDayjs(value)
							? value
							: DayJS(value)

						if (newValueObject.isValid()) {
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
							this.valueString = null
							this.localValue = null
						}
					} else {
						const newValueObject: Dayjs[] = [
							isDayjs(value[0]) ? value[0] : DayJS(value[0]),
							isDayjs(value[1]) ? value[1] : DayJS(value[1]),
						]
						const hasNotValid: boolean = [...newValueObject].some(
							(it: Dayjs) => !it.isValid(),
						)

						if (hasNotValid) {
							this.valueString = null
							this.localValue = null
						} else {
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
				} else if (!newValue) {
					const self: Element = this.$el as Element
					const inputs: HTMLCollectionOf<HTMLInputElement> =
						self.getElementsByTagName('input')

					if (inputs?.length > 0) {
						const input: HTMLInputElement | null = inputs.item(0)

						input?.blur()
					}
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
			this.handleLocale()
			this.setLocalValue(this.modelValue || this.value)

			this.icon.onClick = this.handleClickIcon

			const childs: HTMLCollection = (this.$refs['input-wrapper'] as any)
				.$el.children
			const inputGroup: Element | undefined = Array.from(childs).find(
				(it: Element) => it.classList.contains('input-group'),
			)

			this.inputWrapper = inputGroup

			document.addEventListener('click', (event: MouseEvent) =>
				this.handleClickOutsideDatepicker(event),
			)

			this.setLocalValue(this.localValue)
			this.datepickerWrapper = this.$el
		},
		unmounted() {
			document.removeEventListener('click', (event: MouseEvent) =>
				this.handleClickOutsideDatepicker(event),
			)
		},
	})
</script>

<style lang="scss">
	@import '../../assets/scss/components/forms/_datepicker.scss';
</style>
