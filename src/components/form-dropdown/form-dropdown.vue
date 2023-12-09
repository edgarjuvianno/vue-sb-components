<template>
	<div
		class="dropdown-wrapper"
		:class="{
			multi,
			ajax: serverSide,
			expanded: isOpen,
			search: search || serverSide,
		}"
		:data-target="`dropdown-${$.uid}`"
		:tabindex="!disabled && !readOnly ? 0 : -1"
		ref="dropdown-wrapper"
		v-bind="{ ...$attrs }"
		@blur="handleParentBlur"
		@focus="handleParentFocus"
		@keydown="handleKeyEvent"
	>
		<sb-input
			:error-message="errorMessage"
			:icon="getIcon"
			:is-error="isError"
			:is-focus="isFocus"
			:label="label"
			:placeholder="placeholder"
			:required="required"
			:variant="flat ? 'flat' : 'default'"
			ref="input-wrapper"
			v-bind="{ disabled, readOnly }"
			v-model="selected"
			@click.stop="handleOpen"
		>
			<template v-slot:icon-slot>
				<component :is="getIconSVG" />
			</template>
			<template v-slot:custom-input>
				<plain-input
					:multi="multi"
					:on-delete="handleClear"
					:opt-label="optLabel"
					:placeholder="placeholder"
					:selected="selected"
					v-if="!search && !serverSide"
				/>
				<search-input
					:is-open="isOpen"
					:multi="multi"
					:on-blur="handleRemoveFocus"
					:on-delete="handleClear"
					:on-filter="handleFilterList"
					:on-focus="() => (isFocus = true)"
					:opt-label="optLabel"
					:placeholder="placeholder"
					:selected="selected"
					v-bind="{
						disabled,
						readOnly,
					}"
					v-else
				/>
			</template>
		</sb-input>
		<Teleport to="body">
			<div
				class="sb-dropdown-options-wrapper"
				:class="{
					multi,
					expanded: isOpen,
				}"
				:data-target="`options-${$.uid}`"
				:style="optWrapperStyles"
				@scroll="
					(ev) =>
						(serverSide || search) &&
						infinite &&
						isOpen &&
						onScrollBottom(ev)
				"
				ref="options-wrapper"
				v-if="isOpen"
			>
				<plain-option
					:active-option="activeOption"
					:is-loading="isLoading"
					:list="localList"
					:multi="multi"
					:optLabel="optLabel"
					:selected="selected"
					v-bind="{
						noResultText,
					}"
					@select="doSelect"
					v-if="!serverSide"
				/>
				<ajax-option
					:active-option="activeOption"
					:is-open="isOpen"
					:multi="multi"
					:on-ajax="handleAjax"
					:optLabel="optLabel"
					:selected="selected"
					:server-side="serverSide"
					:term="localTerm"
					:infinite="infinite"
					:is-scroll-bottom="isScrollBottom"
					v-bind="{
						noResultText,
					}"
					@list-change="handleListChange"
					@select="doSelect"
					v-else
				/>
			</div>
		</Teleport>
	</div>
</template>

<script lang="ts">
	import { defineComponent, PropType } from 'vue'

	// components
	import AjaxOption from './options/__option-ajax.vue'
	import Input from '@/components/form-input/form-input.vue'
	import PlainInput from './inputs/__input-plain.vue'
	import PlainOption from './options/__option-plain.vue'
	import SearchInput from './inputs/__input-search.vue'

	// icons
	import { angleDown, xMark } from '@/assets/icons'
	import { IIcon, IServerSide, IServerSideHandler } from '@/interface'

	// utils
	import { recursiveSearchScrollParent } from '@/utils/helper'

	export default defineComponent({
		emits: {
			'update:modelValue': (_selected: any) => true,
			change: (_selected: any) => true,
			close: () => true,
			input: (_selected: any) => true,
			open: () => true,
		},
		props: {
			allowClear: {
				required: false,
				type: Boolean,
			},
			disabled: {
				required: false,
				type: Boolean,
			},
			closeOnSelect: {
				default: true,
				type: Boolean,
			},
			errorMessage: {
				required: false,
				type: [String, Function],
			},
			flat: {
				required: false,
				type: Boolean,
			},
			infinite: {
				required: false,
				type: Boolean,
			},
			isError: {
				required: false,
				type: Boolean,
			},
			isLoading: {
				required: false,
				type: Boolean,
			},
			label: {
				required: false,
				type: String,
			},
			list: {
				required: false,
				type: Object as PropType<any[]>,
			},
			modelValue: {
				required: false,
				type: [Object, String] as PropType<
					| Record<string, any>
					| Record<string, any>[]
					| String
					| String[]
					| null
				>,
			},
			multi: {
				required: false,
				type: Boolean,
			},
			noResultText: {
				default: 'No Results Found...',
				type: String,
			},
			onAjax: {
				required: false,
				type: Function as PropType<
					(
						_resp: IServerSideHandler,
						_type: string | 'BEFORE SEND' | 'ERROR' | 'SUCCESS',
						_isLoadMore?: boolean,
					) => void
				>,
			},
			onPopulateList: {
				required: false,
				type: Function as PropType<
					(_term: string, _isLoadMore?: boolean) => void
				>,
			},
			optLabel: {
				required: true,
				type: [String, Function],
			},
			optValue: {
				required: false,
				type: String,
			},
			placeholder: {
				required: false,
				type: String,
			},
			readOnly: {
				required: false,
				type: Boolean,
			},
			required: {
				required: false,
				type: Boolean,
			},
			search: {
				required: false,
				type: Boolean,
			},
			serverSide: {
				required: false,
				type: Object as PropType<IServerSide>,
			},
			value: {
				required: false,
				type: [Object, String] as PropType<
					| Record<string, any>
					| Record<string, any>[]
					| String
					| String[]
					| null
				>,
			},
		},
		name: 'sb-form-dropdown',
		components: {
			'ajax-option': AjaxOption,
			'plain-input': PlainInput,
			'plain-option': PlainOption,
			'sb-input': Input,
			'search-input': SearchInput,
		},
		data() {
			return {
				activeOption: -1 as number,
				elem: null as any,
				icon: {
					onClick: null as any,
					placement: 'append',
				} as IIcon,
				isFocus: false,
				isOpen: false,
				localList: [] as any[],
				localTerm: '' as string,
				optWrapperStyles: {
					left: '0',
					top: '0',
					width: '0',
				},
				isScrollBottom: false,
				parentWithScroll: null as HTMLElement | any,
				selected: null as any,
				termMulti: null as any,
				termSingle: null as any,
			}
		},
		computed: {
			getIcon() {
				if (
					this.allowClear &&
					((!this.multi && this.selected) ||
						(this.multi &&
							this.selected &&
							this.selected.length > 0))
				) {
					return {
						...this.icon,
						onClick: this.handleClickIcon,
					}
				}

				return {
					...this.icon,
				}
			},
			getIconSVG() {
				if (
					this.allowClear &&
					((!this.multi && this.selected) ||
						(this.multi &&
							this.selected &&
							this.selected.length > 0))
				) {
					return xMark()
				}

				return angleDown()
			},
		},
		methods: {
			doSelect(opt: any, isSelected?: boolean) {
				if (isSelected) {
					if (this.closeOnSelect && !this.multi) {
						this.isOpen = false

						this.handleRemoveFocus()
					}
				} else {
					if (this.multi) {
						if (this.selected) {
							this.selected = [...this.selected, opt]
						} else {
							this.selected = [opt]
						}
					} else {
						this.selected = opt
					}

					this.$nextTick(() => {
						this.handleUpdateModel()

						if (this.closeOnSelect && !this.multi) {
							this.isOpen = false

							this.handleRemoveFocus()
						}
					})
				}
			},
			handleAjax(
				resp: IServerSideHandler,
				type: string,
				isLoadMore?: boolean,
			) {
				if (this.onAjax) {
					return this.onAjax(resp, type, isLoadMore)
				}

				return null
			},
			handleArrowEvent(inc: number, event: KeyboardEvent) {
				if (this.isOpen) {
					event.preventDefault()

					const optionsWrapper: Element | null =
						document.querySelector(
							`[data-target="options-${this.$.uid}"]`,
						)

					if (optionsWrapper) {
						const options: HTMLCollection = optionsWrapper.children

						let targetOptIndex: number = this.activeOption + inc

						if (this.activeOption < 1 && targetOptIndex < 0) {
							targetOptIndex = options.length - 1
						} else if (
							this.activeOption === options.length - 1 &&
							targetOptIndex > options.length - 1
						) {
							targetOptIndex = 0
						}

						const targetOption: Element | null =
							options.item(targetOptIndex)

						;(targetOption as HTMLElement)?.scrollIntoView(false)

						this.activeOption = targetOptIndex
					}
				}
			},
			handleClear(index?: number) {
				if (!this.readOnly && !this.disabled) {
					if (typeof index !== 'undefined') {
						const tempSelected: any[] = [...this.selected]
						tempSelected.splice(index, 1)

						this.selected = [...tempSelected]
					} else if (this.search || this.serverSide) {
						if (this.multi) {
							const tempSelected: any[] = [...this.selected]
							tempSelected.pop()

							this.selected = [...tempSelected]
						} else {
							this.selected = null
						}
					}

					this.$nextTick(() => {
						this.handleUpdateModel()
					})
				}
			},
			handleClickIcon() {
				if (
					this.allowClear &&
					((!this.multi && this.selected) ||
						(this.multi &&
							this.selected &&
							this.selected.length > 0))
				) {
					this.selected = null

					this.$nextTick(() => {
						this.handleUpdateModel()
					})
				}
			},
			handleFilterList(term: string) {
				this.localTerm = term

				if (!this.serverSide) {
					if (this.onPopulateList && this.isOpen) {
						this.onPopulateList(term)
					} else {
						term = term.replace(/\s/g, '').toLowerCase()

						this.localList = [...(this.list || [])].filter(
							(it: any) => {
								const stringData: string =
									JSON.stringify(it).toLowerCase()

								return stringData.indexOf(term) > -1
							},
						)
					}
				}
			},
			handleKeyEvent(event: KeyboardEvent) {
				if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
					const inc: number = event.key === 'ArrowDown' ? 1 : -1

					if (!this.isOpen) {
						this.handleOpen()
					}

					this.$nextTick(() => this.handleArrowEvent(inc, event))
				} else if (event.key === 'Enter') {
					if (this.isOpen) {
						event.preventDefault()
						event.stopPropagation()

						const options: NodeListOf<Element> =
							document.querySelectorAll(
								`[data-target="options-${this.$.uid}"] .option`,
							)

						const activeOption: number = Array.from(
							options,
						).findIndex(
							(it: Element) =>
								it.classList.contains('focus') &&
								!it.classList.contains('selected'),
						)

						if (activeOption > -1) {
							this.doSelect(this.localList[activeOption])
						}
					}
				} else if (event.key === 'Escape' || event.key === 'Tab') {
					this.isOpen = false

					this.handleRemoveFocus()
				}
			},
			handleListChange(list: any[]) {
				this.localList = [...list]
			},
			handleOpen() {
				if (!this.readOnly && !this.disabled && !this.isOpen) {
					this.isOpen = true

					this.$nextTick(() => {
						this.setOptionsPosition()
					})
				}
			},
			handleOptValue() {
				const value: any = this.value || this.modelValue

				if (value && typeof value !== 'undefined') {
					if (this.localList.length) {
						if (this.multi) {
							this.selected = [...this.localList].filter(
								(it: any) =>
									String(
										it[this.optValue as string],
									).toUpperCase() ===
									String(value).toUpperCase(),
							)
						} else {
							this.selected = [...this.localList].find(
								(it: any) =>
									String(
										it[this.optValue as string],
									).toUpperCase() ===
									String(value).toUpperCase(),
							)
						}
					} else {
						const value: any = this.value || this.modelValue

						if (this.multi) {
							this.selected = [...this.selected].map(
								(it: any) => ({
									[this.optValue as string]: it,
								}),
							)
						} else {
							this.selected = {
								[this.optValue as string]: value,
							}
						}
					}
				} else {
					this.selected = null
				}
			},
			handleParentBlur(event: FocusEvent) {
				const self: Element = event.target as Element
				const target: Element = event.relatedTarget as Element

				if (!self.contains(target)) {
					this.isOpen = false

					this.handleRemoveFocus()
				}
			},
			handleParentClickOutside(event: MouseEvent) {
				const target: HTMLElement = event.target as HTMLElement
				const dropdown: HTMLElement = this.$refs[
					'dropdown-wrapper'
				] as any
				const optionsWrapper: HTMLElement = this.$refs[
					'options-wrapper'
				] as any

				if (
					target &&
					parent &&
					optionsWrapper &&
					!dropdown.contains(target) &&
					!optionsWrapper.contains(target) &&
					!target.isSameNode(dropdown)
				) {
					this.isOpen = false
					this.handleRemoveFocus()
				}
			},
			handleParentFocus() {
				const self: Element = this.$el as Element
				const inputs: HTMLCollectionOf<HTMLInputElement> =
					self.getElementsByTagName('input')

				if (inputs?.length > 0) {
					const input: HTMLInputElement | null = inputs.item(0)

					input?.focus()
				}

				this.isFocus = true

				this.handleOpen()
			},
			handleParentScroll(isOpen: boolean) {
				const parentWithScroll: HTMLElement | null =
					recursiveSearchScrollParent(this.$el)

				if (this.parentWithScroll) {
					this.parentWithScroll.removeEventListener('scroll', () => {
						this.setOptionsPosition()
					})
				}

				if (parentWithScroll) {
					if (isOpen) {
						parentWithScroll.addEventListener('scroll', () => {
							this.setOptionsPosition()
						})
					} else {
						parentWithScroll.removeEventListener('scroll', () => {
							this.setOptionsPosition()
						})
					}
				}

				this.$nextTick(() => {
					this.parentWithScroll = parentWithScroll
				})
			},
			handleRemoveFocus() {
				this.isFocus = false

				const self: HTMLElement = this.$el as HTMLElement
				self.blur()

				const inputs: HTMLCollectionOf<HTMLInputElement> =
					self.getElementsByTagName('input')

				if (inputs?.length > 0) {
					const input: HTMLInputElement | null = inputs.item(0)
					input?.blur()
				}
			},
			handleUpdateModel() {
				if (this.multi) {
					this.$nextTick(() => {
						this.setOptionsPosition()
					})
				}

				if (this.optValue) {
					if (this.multi) {
						const values: any[] = [...this.selected].map(
							(it: any) =>
								it[this.optValue as string] || it.value,
						)

						this.$emit('update:modelValue', values)
						this.$emit('input', values)
						this.$emit('change', values)
					} else {
						const value: any =
							this.selected[this.optValue] || this.selected.value

						this.$emit('update:modelValue', value)
						this.$emit('input', value)
						this.$emit('change', value)
					}
				} else {
					this.$emit('update:modelValue', this.selected)
					this.$emit('input', this.selected)
					this.$emit('change', this.selected)
				}
			},
			onScrollBottom(e: any) {
				const { scrollTop, offsetHeight, scrollHeight }: any = e.target

				if (scrollTop + offsetHeight + 20 >= scrollHeight) {
					this.isScrollBottom = true

					if (this.onPopulateList) {
						this.onPopulateList(this.localTerm || '', true)
					}
				} else if (this.isScrollBottom) {
					this.isScrollBottom = false
				}
			},
			setOptionsPosition() {
				if (this.elem) {
					const DOMRect: DOMRect = this.elem.getBoundingClientRect()
					const optionsWrapper: DOMRect = (
						this.$refs['options-wrapper'] as any
					)?.getBoundingClientRect()

					if (optionsWrapper) {
						const isTop: boolean =
							document.body.getBoundingClientRect().height -
								(DOMRect.height + DOMRect.y) <=
							optionsWrapper.height

						if (isTop) {
							return (this.optWrapperStyles = {
								left: `${DOMRect.x}px`,
								top: `${
									DOMRect.y - 6 - optionsWrapper.height
								}px`,
								width: `${DOMRect.width + 1}px`,
							})
						}

						return (this.optWrapperStyles = {
							left: `${DOMRect.x}px`,
							top: `${DOMRect.y + DOMRect.height}px`,
							width: `${DOMRect.width + 1}px`,
						})
					}
				}
			},
		},
		watch: {
			isOpen(newValue: boolean) {
				this.handleParentScroll(newValue)

				if (!newValue) {
					this.$emit('close')

					this.activeOption = -1

					if (this.search) {
						if (this.multi) {
							this.termMulti = null
						} else {
							this.termSingle = null
						}
					}

					if (!this.onPopulateList && this.search) {
						this.handleFilterList('')
					}
				} else {
					this.$emit('open')
				}
			},
			list: {
				deep: true,
				handler(newValue: any[]) {
					if (newValue) {
						this.localList = [...newValue]
					}
				},
				immediate: true,
			},
			localList: {
				deep: true,
				handler() {
					this.$nextTick(() => {
						if (this.optValue) {
							this.handleOptValue()
						}

						this.setOptionsPosition()
					})
				},
			},
			modelValue: {
				deep: true,
				handler(newValue: any) {
					if (typeof newValue === 'object') {
						this.selected = newValue
					} else {
						this.handleOptValue()
					}
				},
				immediate: true,
			},
			value: {
				deep: true,
				handler(newValue: any) {
					if (typeof newValue === 'object') {
						this.selected = newValue
					} else {
						this.handleOptValue()
					}
				},
				immediate: true,
			},
		},
		mounted() {
			const childs: HTMLCollection = (this.$refs['input-wrapper'] as any)
				.$el.children
			const inputGroup: Element | undefined = Array.from(childs).find(
				(it: Element) => it.classList.contains('input-group'),
			)

			if (inputGroup) {
				this.elem = inputGroup
			}

			if (this.elem) {
				this.setOptionsPosition()
			}

			this.icon.onClick = this.handleOpen

			document.addEventListener('click', (event: MouseEvent) =>
				this.handleParentClickOutside(event),
			)

			this.parentWithScroll = recursiveSearchScrollParent(this.$el)
		},
		unmounted() {
			document.removeEventListener('click', (event: MouseEvent) =>
				this.handleParentClickOutside(event),
			)

			if (this.parentWithScroll) {
				this.parentWithScroll.removeEventListener('scroll', () => {
					this.setOptionsPosition()
				})
			}
		},
	})
</script>

<style lang="scss">
	@import '../../assets/scss/components/forms/dropdown/_dropdown.scss';
</style>
