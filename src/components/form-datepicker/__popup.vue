<template>
	<Teleport to="body">
		<div
			class="sb-datepicker-popup-wrapper"
			:class="[
				`container-${localShowContainer}`,
				type,
				range ? 'range' : '',
				show ? 'show' : '',
				type === 'time' ? 'time-only' : '',
				!closeOnSelect ? 'with-save' : '',
			]"
			ref="popup-wrapper"
			:style="popupStyles"
			v-if="show"
		>
			<div
				class="month-list-wrapper"
				v-if="type !== 'time' && type !== 'year'"
			>
				<div
					class="month"
					:class="{
						selected: isMonthSelected(month),
					}"
					:key="`month-${i}`"
					v-for="(month, i) in [...Array(12).keys()]"
					@click.stop="handleClickMonth(month)"
				>
					{{ getMonthText(month, true) }}
				</div>
			</div>
			<div
				class="year-list-wrapper"
				v-if="type !== 'time' && type !== 'month'"
			>
				<div
					class="year"
					:class="{
						selected: isYearSelected(year),
					}"
					:key="`year-${i}`"
					:ref="`year-${year}`"
					v-for="(year, i) in getYears"
					@click.stop="handleClickYear(year)"
				>
					{{ year }}
				</div>
			</div>
			<template v-if="type === 'time' || type === 'datetime'">
				<div class="hour-list-wrapper">
					<div
						class="hour"
						:class="{
							selected: isHourSelected(hour),
						}"
						:key="`hour-${i}`"
						:ref="`hour-${hour}`"
						v-for="(hour, i) in [...Array(24).keys()]"
						@click.stop="handleClickHour(hour)"
					>
						{{ `${hour < 10 ? '0' : ''}${hour}` }}
					</div>
				</div>
				<div class="minute-list-wrapper">
					<div
						class="minute"
						:class="{
							selected: isMinuteSelected(minute),
						}"
						:key="`minute-${i}`"
						:ref="`minute-${minute}`"
						v-for="(minute, i) in [...Array(60).keys()]"
						@click.stop="handleClickMinute(minute)"
					>
						{{ `${minute < 10 ? '0' : ''}${minute}` }}
					</div>
				</div>
			</template>
			<div
				class="header"
				v-if="type !== 'time' && type !== 'month' && type !== 'year'"
			>
				<div class="nav-wrapper">
					<div class="nav" @click.stop="handleNavYear(-1)">
						<component :is="iconAngleDoubleLeft" />
					</div>
					<div class="nav" @click.stop="handleNavMonth(-1)">
						<component :is="iconAngleLeft" />
					</div>
				</div>
				<div class="current">
					<div class="year" @click.stop="handleShowYearList">
						{{ popupCurrentValue.year }}
					</div>
					<div class="month" @click.stop="handleShowMonthList">
						{{ getMonthText(popupCurrentValue.month) }}
					</div>
				</div>
				<div class="nav-wrapper">
					<div class="nav" @click.stop="handleNavMonth(1)">
						<component :is="iconAngleRight" />
					</div>
					<div class="nav" @click.stop="handleNavYear(1)">
						<component :is="iconAngleDoubleRight" />
					</div>
				</div>
			</div>
			<div class="body" v-if="type !== 'month' && type !== 'year'">
				<template v-if="type !== 'time'">
					<div class="days-wrapper">
						<div
							class="day"
							v-for="(item, i) in getDays"
							:key="`day-${i}`"
						>
							{{ item }}
						</div>
					</div>
					<div class="dates-wrapper">
						<div
							class="date"
							:class="{
								'in-range': isDateInRange(item),
								current: isCurrentDate(item),
								disabled:
									item.disabled || isDateDisabled(item.value),
								selected: isDateSelected(item),
							}"
							:key="`date-${i}`"
							:style="handleOverrideDateStyle(item)"
							v-for="(item, i) in getDates"
							@click.stop="handleSelectDate(item)"
							@mouseover="handleDateMouseover(item)"
						>
							{{ item.value }}
						</div>
					</div>
				</template>
				<template v-if="type !== 'date'">
					<div class="time-wrapper">
						<div
							class="time"
							:key="`time-picker-${i}`"
							v-for="(_item, i) in !range ? [0] : [0, 1]"
						>
							<div class="value-wrapper">
								<div class="time-nav">
									<component
										:is="iconAngleUp"
										@click.stop="
											handleNavTime(1, 'hour', i)
										"
									/>
								</div>
								<div
									class="value"
									@click.stop="handleShowHourList(i)"
								>
									{{ getDisplayTimeHour(i) }}
								</div>
								<div class="time-nav down">
									<component
										:is="iconAngleDown"
										@click.stop="
											handleNavTime(-1, 'hour', i)
										"
									/>
								</div>
							</div>
							<div class="separator">:</div>
							<div class="value-wrapper">
								<div class="time-nav">
									<component
										:is="iconAngleUp"
										@click.stop="
											handleNavTime(1, 'minute', i)
										"
									/>
								</div>
								<div
									class="value"
									@click.stop="handleShowMinuteList(i)"
								>
									{{ getDisplayTimeMinute(i) }}
								</div>
								<div class="time-nav down">
									<component
										:is="iconAngleDown"
										@click.stop="
											handleNavTime(-1, 'minute', i)
										"
									/>
								</div>
							</div>
						</div>
					</div>
				</template>
			</div>
			<div
				class="footer"
				:class="{
					'two-button': !closeOnSelect && type === 'datetime',
				}"
				v-if="!closeOnSelect || type === 'datetime'"
			>
				<sb-button
					no-elevation
					class="button-time"
					color="secondary"
					tabindex="-1"
					type="button"
					variant="text"
					@click.stop="handleFooterClick"
					v-if="type === 'datetime'"
				>
					<component :is="getFooterIcon" />
				</sb-button>
				<sb-button
					:disabled="isSaveDisabled"
					no-elevation
					color="accent"
					tabindex="-1"
					type="button"
					variant="text"
					@click.stop="handleSave"
					v-if="!closeOnSelect"
				>
					{{ saveText || 'Save' }}
				</sb-button>
			</div>
		</div>
	</Teleport>
</template>

<script lang="ts">
	import { PropType, defineComponent } from 'vue'
	import DayJS, { Dayjs } from 'dayjs'
	import isToday from 'dayjs/plugin/isToday'
	import localeData from 'dayjs/plugin/localeData'
	import {
		getProperDateFormat,
		getProperTimeFormat,
		sortDateRange,
	} from './__funcs'
	import { IDate } from '@/interface'
	import LocaleID from 'dayjs/locale/id'

	DayJS.extend(isToday)
	DayJS.extend(localeData)

	// components
	import Button from '@/components/button/button.vue'

	// icons
	import {
		angleDoubleLeft,
		angleDoubleRight,
		angleDown,
		angleLeft,
		angleRight,
		angleUp,
		calendar,
		clock,
	} from '@/assets/icons'

	// utils
	import { recursiveSearchScrollParent } from '@/utils/helper'

	interface IPopupValue {
		date: number
		hour: number | number[]
		minute: number | number[]
		month: number
		year: number
	}

	export default defineComponent({
		emits: {
			change: (_selected: Dayjs | Dayjs[]) => true,
			changeTime: (_selected: Dayjs[]) => true,
			save: () => true,
		},
		props: {
			closeOnSelect: {
				required: false,
				type: Boolean,
			},
			datepickerElem: {
				required: false,
				type: Object as PropType<HTMLElement>,
			},
			inputWrapper: {
				required: false,
				type: Object,
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
			overrideDateStyle: {
				required: false,
				type: Function as PropType<
					(_date: IDate) => Record<string, any>
				>,
			},
			range: {
				required: false,
				type: Boolean,
			},
			saveText: {
				required: false,
				type: String,
			},
			show: {
				required: true,
				type: Boolean,
			},
			type: {
				default: 'date',
				required: true,
				type: String as PropType<
					'date' | 'datetime' | 'time' | 'month' | 'year'
				>,
			},
			value: {
				required: false,
				type: Object as PropType<Dayjs | Dayjs[]>,
			},
		},
		name: 'sb-form-date-picker-popup',
		components: {
			'sb-button': Button,
		},
		data() {
			return {
				lastHoverDate: null as Dayjs | null,
				localShowContainer: 'calendar' as
					| 'calendar'
					| 'time'
					| 'year-list'
					| 'month-list'
					| 'hour-list'
					| 'minute-list',
				parentWithScroll: null as HTMLElement | null,
				popupCurrentValue: {
					date: 0,
					hour: 0,
					minute: 0,
					month: 0,
					year: 0,
				} as IPopupValue,
				popupStyles: {
					left: '0',
					top: '0',
				} as any,
				selectedHourIndex: 0 as number,
				selectedMinuteIndex: 0 as number,
			}
		},
		computed: {
			getDates() {
				const properDate: string = getProperDateFormat(
					1,
					this.popupCurrentValue.month + 1,
					this.popupCurrentValue.year,
				)

				const current: Dayjs = DayJS(properDate)

				const currentMonthDays: number = current.daysInMonth()
				const firstDayOfMonth: number = current.startOf('month').day()
				const lastMonthDays: number = current
					.subtract(1, 'month')
					.daysInMonth()

				const currentDates: IDate[] = [
					...Array(currentMonthDays).keys(),
				].map((it: number) => ({
					value: it + 1,
				}))

				const lastMonthDates: IDate[] = [
					...Array(firstDayOfMonth).keys(),
				].map((it: number) => ({
					disabled: true,
					value: it + 1 + lastMonthDays - firstDayOfMonth,
					viewOnly: true,
				}))

				const nextMonthDates: IDate[] = [
					...Array(42 - (firstDayOfMonth + currentMonthDays)).keys(),
				].map((it: number) => ({
					disabled: true,
					value: it + 1,
					viewOnly: true,
				}))

				const dates: IDate[] = [
					...lastMonthDates,
					...currentDates,
					...nextMonthDates,
				]

				return dates
			},
			getDays() {
				return DayJS.weekdaysShort()
			},
			getFooterIcon() {
				if (
					this.localShowContainer !== 'calendar' &&
					this.localShowContainer !== 'hour-list' &&
					this.localShowContainer !== 'minute-list'
				) {
					return calendar()
				}

				return clock()
			},
			getYears() {
				const currentYear: number = DayJS().year()
				const yearFloor: number = Math.floor(currentYear / 100) * 100

				const years: number[] = [...Array(200).keys()].map(
					(it: number) => yearFloor - 100 + it + 1,
				)

				return years
			},
			iconAngleDoubleLeft() {
				return angleDoubleLeft()
			},
			iconAngleDoubleRight() {
				return angleDoubleRight()
			},
			iconAngleDown() {
				return angleDown()
			},
			iconAngleLeft() {
				return angleLeft()
			},
			iconAngleRight() {
				return angleRight()
			},
			iconAngleUp() {
				return angleUp()
			},
			isSaveDisabled() {
				if (this.range) {
					const value: Dayjs[] | null = this.value as Dayjs[] | null

					return !value || (value && value?.length < 2)
				}

				return false
			},
		},
		methods: {
			getDisplayTimeHour(pos: number) {
				if (this.range) {
					const hour: number = (
						this.popupCurrentValue.hour as number[]
					)[pos]

					return `${hour < 10 ? '0' : ''}${hour}`
				}

				const hour: number = this.popupCurrentValue.hour as number

				return `${hour < 10 ? '0' : ''}${hour}`
			},
			getDisplayTimeMinute(pos: number) {
				if (this.range) {
					const minute: number = (
						this.popupCurrentValue.minute as number[]
					)[pos]

					return `${minute < 10 ? '0' : ''}${minute}`
				}

				const minute: number = this.popupCurrentValue.minute as number

				return `${minute < 10 ? '0' : ''}${minute}`
			},
			getMonthText(month: number, isShort = false) {
				if (isShort) {
					const months: string[] = DayJS.monthsShort()

					return months[month]
				}

				const months: string[] = DayJS.months()

				return months[month]
			},
			handleClickHour(hour: number) {
				if (!this.range) {
					this.popupCurrentValue.hour = hour
				} else {
					;(this.popupCurrentValue.hour as number[])[
						this.selectedHourIndex
					] = hour
				}

				this.localShowContainer = 'time'

				this.$nextTick(() => {
					this.setModelValueTime()
				})
			},
			handleClickMinute(minute: number) {
				if (!this.range) {
					this.popupCurrentValue.minute = minute
				} else {
					;(this.popupCurrentValue.minute as number[])[
						this.selectedMinuteIndex
					] = minute
				}

				this.localShowContainer = 'time'

				this.$nextTick(() => {
					this.setModelValueTime()
				})
			},
			handleClickMonth(month: number) {
				this.popupCurrentValue.month = month

				this.localShowContainer = 'calendar'

				this.$nextTick(() => {
					if (this.type === 'month') {
						const properDate: string = getProperDateFormat(
							1,
							this.popupCurrentValue.month + 1,
							DayJS().year(),
						)

						this.$emit('change', DayJS(properDate))
					}
				})
			},
			handleClickYear(year: number) {
				this.popupCurrentValue.year = year

				this.localShowContainer = 'calendar'

				this.$nextTick(() => {
					if (this.type === 'year') {
						const properDate: string = getProperDateFormat(
							1,
							1,
							this.popupCurrentValue.year,
						)

						this.$emit('change', DayJS(properDate))
					}
				})
			},
			handleDateMouseover({ disabled, value }: IDate) {
				if (
					!this.isDateDisabled(value) &&
					!disabled &&
					this.value &&
					(this.value as Dayjs[]).length < 2
				) {
					const properDate: string = getProperDateFormat(
						value,
						this.popupCurrentValue.month + 1,
						this.popupCurrentValue.year,
					)

					this.lastHoverDate = DayJS(properDate)
				}
			},
			handleFooterClick() {
				if (
					this.localShowContainer !== 'calendar' &&
					this.localShowContainer !== 'hour-list' &&
					this.localShowContainer !== 'minute-list'
				) {
					this.localShowContainer = 'calendar'
				} else {
					this.localShowContainer = 'time'
				}
			},
			handleLocale() {
				if (this.locale && this.locale !== 'en') {
					DayJS.locale(LocaleID)
				}
			},
			handleNavMonth(inc: number) {
				if (inc < 0) {
					if (this.popupCurrentValue.month < 1) {
						this.popupCurrentValue.month = 11
						this.popupCurrentValue.year -= 1
					} else {
						this.popupCurrentValue.month -= 1
					}
				} else {
					if (this.popupCurrentValue.month > 10) {
						this.popupCurrentValue.month = 0
						this.popupCurrentValue.year += 1
					} else {
						this.popupCurrentValue.month += 1
					}
				}
			},
			handleNavTime(inc: number, type: 'hour' | 'minute', pos: number) {
				if (!this.range) {
					this.handleNavTimeNotRange(inc, type)
				} else {
					this.handleNavTimeRange(inc, type, pos)
				}
			},
			handleNavTimeNotRange(inc: number, type: 'hour' | 'minute') {
				const hour: number = this.popupCurrentValue.hour as number
				const minute: number = this.popupCurrentValue.minute as number

				if (type === 'hour') {
					if (inc < 0) {
						if (hour < 1) {
							this.popupCurrentValue.hour = 23
						} else {
							;(this.popupCurrentValue.hour as number) += inc
						}
					} else {
						if (hour > 22) {
							this.popupCurrentValue.hour = 0
						} else {
							;(this.popupCurrentValue.hour as number) += inc
						}
					}
				} else {
					if (inc < 0) {
						if (minute < 1) {
							this.popupCurrentValue.minute = 59
						} else {
							;(this.popupCurrentValue.minute as number) += inc
						}
					} else {
						if (minute > 58) {
							this.popupCurrentValue.minute = 0
						} else {
							;(this.popupCurrentValue.minute as number) += inc
						}
					}
				}

				this.$nextTick(() => {
					this.setModelValueTime()
				})
			},
			handleNavTimeRange(
				inc: number,
				type: 'hour' | 'minute',
				pos: number,
			) {
				const hour: number = (this.popupCurrentValue.hour as number[])[
					pos
				]
				const minute: number = (
					this.popupCurrentValue.minute as number[]
				)[0]

				if (type === 'hour') {
					if (inc < 0) {
						if (hour < 1) {
							;(this.popupCurrentValue.hour as number[])[pos] = 23
						} else {
							;(this.popupCurrentValue.hour as number[])[pos] +=
								inc
						}
					} else {
						if (hour > 22) {
							;(this.popupCurrentValue.hour as number[])[pos] = 0
						} else {
							;(this.popupCurrentValue.hour as number[])[pos] +=
								inc
						}
					}
				} else {
					if (inc < 0) {
						if (minute < 1) {
							;(this.popupCurrentValue.minute as number[])[
								pos
							] = 59
						} else {
							;(this.popupCurrentValue.minute as number[])[pos] +=
								inc
						}
					} else {
						if (minute > 58) {
							;(this.popupCurrentValue.minute as number[])[
								pos
							] = 0
						} else {
							;(this.popupCurrentValue.minute as number[])[pos] +=
								inc
						}
					}
				}

				this.$nextTick(() => {
					this.setModelValueTime()
				})
			},
			handleNavYear(inc: number) {
				this.popupCurrentValue.year += inc
			},
			handleOverrideDateStyle(date: IDate) {
				if (this.overrideDateStyle) {
					return this.overrideDateStyle(date)
				}

				return {}
			},
			handleParentScroll(isOpen: boolean) {
				const parentWithScroll: HTMLElement | null =
					recursiveSearchScrollParent(this.$el)

				if (this.parentWithScroll) {
					this.parentWithScroll.removeEventListener('scroll', () => {
						this.setPopupPosition()
					})
				}

				if (parentWithScroll) {
					if (isOpen) {
						parentWithScroll.addEventListener('scroll', () => {
							this.setPopupPosition()
						})
					} else {
						parentWithScroll.removeEventListener('scroll', () => {
							this.setPopupPosition()
						})
					}
				}

				this.$nextTick(() => {
					this.parentWithScroll = parentWithScroll
				})
			},
			handleSave() {
				if (this.type === 'time') {
					this.setModelValueTime()
				} else if (this.type === 'month') {
					const properDate: string = getProperDateFormat(
						1,
						this.popupCurrentValue.month + 1,
						DayJS().year(),
					)

					this.$emit('change', DayJS(properDate))
				} else if (this.type === 'year') {
					const properDate: string = getProperDateFormat(
						1,
						1,
						this.popupCurrentValue.year,
					)

					this.$emit('change', DayJS(properDate))
				} else {
					if (
						!this.range ||
						(this.range &&
							(!this.value || (this.value as Dayjs[]).length < 2))
					) {
						this.setModelValueDate(this.popupCurrentValue.date)
					}
				}

				this.$emit('save')
			},
			handleSelectDate({ disabled, value }: IDate) {
				if (!disabled && !this.isDateDisabled(value)) {
					this.popupCurrentValue.date = value

					this.setModelValueDate(value)
				}
			},
			handleShowHourList(pos: number) {
				const currentHourElem: any =
					this.$refs[`hour-${this.popupCurrentValue.hour}`]

				if (currentHourElem?.length > 0) {
					currentHourElem[0].scrollIntoView({
						block: 'center',
					})
				}

				this.selectedHourIndex = pos
				this.localShowContainer = 'hour-list'
			},
			handleShowMinuteList(pos: number) {
				const currentMinuteElem: any =
					this.$refs[`minute-${this.popupCurrentValue.minute}`]

				if (currentMinuteElem?.length > 0) {
					currentMinuteElem[0].scrollIntoView({
						block: 'center',
					})
				}

				this.selectedMinuteIndex = pos
				this.localShowContainer = 'minute-list'
			},
			handleShowMonthList() {
				this.localShowContainer = 'month-list'
			},
			handleShowYearList() {
				const currentYearElem: any =
					this.$refs[`year-${this.popupCurrentValue.year}`]

				if (currentYearElem?.length > 0) {
					currentYearElem[0].scrollIntoView({
						block: 'center',
					})
				}

				this.localShowContainer = 'year-list'
			},
			isCurrentDate({ value, viewOnly }: IDate) {
				if (
					this.popupCurrentValue.year !== null &&
					this.popupCurrentValue.month !== null &&
					!viewOnly
				) {
					const properDate: string = getProperDateFormat(
						value,
						this.popupCurrentValue.month + 1,
						this.popupCurrentValue.year,
					)

					const isToday: boolean = DayJS(properDate).isToday()

					return isToday
				}

				return false
			},
			isDateDisabled(date: number) {
				const properDate: string = getProperDateFormat(
					date,
					this.popupCurrentValue.month + 1,
					this.popupCurrentValue.year,
				)

				if (this.max || this.min) {
					const lteMaxDate: () => boolean = () => {
						if (this.max) {
							const ltDate: Dayjs = DayJS(this.max).endOf('day')

							return ltDate.diff(DayJS(properDate)) <= 0
						}

						return false
					}

					const gteMinDate: () => boolean = () => {
						if (this.min) {
							const gtDate: Dayjs = DayJS(this.min)
								.subtract(1, 'day')
								.startOf('day')

							return DayJS(properDate).diff(gtDate) <= 0
						}

						return false
					}

					return lteMaxDate() || gteMinDate()
				}

				return false
			},
			isDateInRange({ value }: IDate) {
				if (this.value && this.range) {
					const currentValue: Dayjs[] = [...(this.value as Dayjs[])]

					const tempValues: () => Dayjs[] = () => {
						if (currentValue.length > 1) {
							return currentValue
						} else if (this.lastHoverDate) {
							return [...currentValue, this.lastHoverDate]
						}

						return []
					}

					if (this.lastHoverDate || currentValue.length > 1) {
						const properDate: string = getProperDateFormat(
							value,
							this.popupCurrentValue.month + 1,
							this.popupCurrentValue.year,
						)

						const sortedValues: Dayjs[] = sortDateRange(
							tempValues(),
						)

						const currentDate: Dayjs = DayJS(properDate)

						return (
							currentDate.unix() >= sortedValues[0].unix() &&
							currentDate.unix() <= sortedValues[1].unix()
						)
					}
				}

				return false
			},
			isDateSelected({ value, viewOnly }: IDate) {
				if (
					this.popupCurrentValue.year !== null &&
					this.popupCurrentValue.month !== null &&
					!viewOnly &&
					this.value
				) {
					const properDate: string = getProperDateFormat(
						value,
						this.popupCurrentValue.month + 1,
						this.popupCurrentValue.year,
					)

					if (!this.range) {
						const isSelected: boolean =
							DayJS(properDate)
								.startOf('day')
								.diff((this.value as Dayjs).startOf('day')) ===
							0

						return isSelected
					}

					const isSelected: boolean = [
						...((this.value as Dayjs[]) || []),
					].some((value: any) => {
						return (
							DayJS(properDate)
								.startOf('day')
								.diff(value.startOf('day')) === 0
						)
					})

					return isSelected
				}

				return false
			},
			isHourSelected(hour: number) {
				return this.popupCurrentValue.hour === hour
			},
			isMinuteSelected(minute: number) {
				return this.popupCurrentValue.minute === minute
			},
			isMonthSelected(month: number) {
				return this.popupCurrentValue.month === month
			},
			isYearSelected(year: number) {
				return this.popupCurrentValue.year === year
			},
			setModelValueDate(date: number) {
				const properDate: string = getProperDateFormat(
					date,
					this.popupCurrentValue.month + 1,
					this.popupCurrentValue.year,
				)

				if (this.type === 'datetime') {
					if (!this.range) {
						const hour: number = this.popupCurrentValue
							.hour as number
						const minute: number = this.popupCurrentValue
							.minute as number

						const properTime: string = getProperTimeFormat(
							hour,
							minute,
						)

						this.$emit(
							'change',
							DayJS(`${properDate} ${properTime}`),
						)
					} else {
						const pos: number =
							!this.value ||
							(this.value && (this.value as Dayjs[]).length > 1)
								? 0
								: 1

						const hour: number = (
							this.popupCurrentValue.hour as number[]
						)[pos]
						const minute: number = (
							this.popupCurrentValue.minute as number[]
						)[pos]

						const properTime: string = getProperTimeFormat(
							hour,
							minute,
						)

						this.$emit(
							'change',
							DayJS(`${properDate} ${properTime}`),
						)
					}
				} else {
					this.$emit('change', DayJS(properDate))
				}
			},
			setModelValueTime() {
				if (!this.range) {
					const currentDate: Dayjs = (this.value as Dayjs) || DayJS()
					const hour: number = this.popupCurrentValue.hour as number
					const minute: number = this.popupCurrentValue
						.minute as number

					const properTime: string = getProperTimeFormat(hour, minute)
					const rawValue: string = `${currentDate.format(
						'YYYY-MM-DD',
					)} ${properTime}`

					this.$emit('change', DayJS(rawValue))
				} else {
					const currentDates: Dayjs[] = (this.value as Dayjs[]) || [
						DayJS(),
						DayJS(),
					]

					const modDates: Dayjs[] = [...currentDates].map(
						(it: Dayjs, idx: number) => {
							const hour: number = (
								this.popupCurrentValue.hour as number[]
							)[idx]
							const minute: number = (
								this.popupCurrentValue.minute as number[]
							)[idx]

							const properTime: string = getProperTimeFormat(
								hour,
								minute,
							)

							const rawValue: string = `${it.format(
								'YYYY-MM-DD',
							)} ${properTime}`

							return DayJS(rawValue)
						},
					)

					this.$emit('changeTime', modDates)
				}
			},
			setPopupPosition() {
				if (this.inputWrapper && this.$refs['popup-wrapper']) {
					const input: any = this.inputWrapper as any

					const DOMRect: DOMRect = input.getBoundingClientRect()

					const popupWrapper: DOMRect = (
						this.$refs['popup-wrapper'] as any
					).getBoundingClientRect()

					const isTop: boolean =
						document.body.getBoundingClientRect().height -
							(DOMRect.height + DOMRect.y) <=
						popupWrapper.height

					const left: () => number = () => {
						if (
							DOMRect.width > popupWrapper.width ||
							DOMRect.width < popupWrapper.width
						) {
							return (
								DOMRect.x +
								(DOMRect.width - popupWrapper.width) / 2
							)
						}

						return DOMRect.x
					}

					if (isTop) {
						this.popupStyles = {
							left: `${left() + 2}px`,
							top: `${DOMRect.y - 6 - popupWrapper.height}px`,
						}
					} else {
						this.popupStyles = {
							left: `${left() + 2}px`,
							top: `${DOMRect.y + DOMRect.height}px`,
						}
					}

					this.$nextTick(() => {
						const currentYearElem: any =
							this.$refs[`year-${this.popupCurrentValue.year}`]

						if (currentYearElem?.length > 0) {
							currentYearElem[0].scrollIntoView({
								block: 'center',
							})
						}
					})
				}
			},
			setPopupValue() {
				if (this.value) {
					if (!this.range) {
						const currentValue: Dayjs = this.value as Dayjs

						this.popupCurrentValue = {
							date: currentValue.date(),
							hour: currentValue.hour(),
							minute: currentValue.minute(),
							month: currentValue.month(),
							year: currentValue.year(),
						}
					} else {
						const currentValue: Dayjs[] = this.value as Dayjs[]
						const minutes: number[] = [...currentValue].map(
							(it: Dayjs) => it.minute(),
						)
						const hours: number[] = [...currentValue].map(
							(it: Dayjs) => it.hour(),
						)

						const lastHour: number = (
							this.popupCurrentValue.hour as number[]
						)[(this.popupCurrentValue.hour as number[]).length - 1]

						const lastMinute: number = (
							this.popupCurrentValue.minute as number[]
						)[
							(this.popupCurrentValue.minute as number[]).length -
								1
						]

						this.popupCurrentValue = {
							date: currentValue[currentValue.length - 1].date(),
							hour: [
								...hours,
								...(currentValue.length < 2 ? [lastHour] : []),
							],
							minute: [
								...minutes,
								...(currentValue.length < 2
									? [lastMinute]
									: []),
							],
							month: currentValue[
								currentValue.length - 1
							].month(),
							year: currentValue[currentValue.length - 1].year(),
						}
					}
				} else {
					const now: Dayjs = DayJS()

					this.popupCurrentValue = {
						date: now.date(),
						hour: this.range
							? [now.hour(), now.hour()]
							: now.hour(),
						minute: this.range
							? [now.minute(), now.minute()]
							: now.minute(),
						month: now.month(),
						year: now.year(),
					}
				}
			},
		},
		watch: {
			show(newValue: boolean, oldValue: boolean) {
				this.handleParentScroll(newValue)

				if (oldValue && !newValue) {
					this.setPopupValue()

					if (this.type === 'time') {
						this.localShowContainer = 'time'
					} else {
						this.localShowContainer = 'calendar'
					}
				} else if (!oldValue && newValue) {
					this.$nextTick(() => this.setPopupPosition())
				}
			},
			type: {
				handler(newValue: string) {
					if (newValue === 'time') {
						this.localShowContainer = 'time'
					} else {
						this.localShowContainer = 'calendar'
					}
				},
				immediate: true,
			},
			value: {
				deep: true,
				handler() {
					this.setPopupValue()
				},
				immediate: true,
			},
		},
		mounted() {
			this.handleLocale()
			this.setPopupPosition()

			this.parentWithScroll = recursiveSearchScrollParent(
				this.datepickerElem as HTMLElement,
			)
		},
		unmounted() {
			if (this.parentWithScroll) {
				this.parentWithScroll.removeEventListener('scroll', () => {
					this.setPopupPosition()
				})
			}
		},
	})
</script>
