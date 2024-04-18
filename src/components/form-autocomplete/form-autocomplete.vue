<template>
	<div
		class="autocomplete-wrapper"
		:class="{
			expanded: isOpen,
			loading: isLoading,
		}"
		:data-target="`autocomplete-${$.uid}`"
		:tabindex="!disabled && !readOnly ? 0 : -1"
		ref="autocomplete-wrapper"
		v-bind="{ ...$attrs }"
		@blur="handleParentBlur"
		@focus="handleParentFocus"
		@keydown="handleKeyEvent"
	>
		<sb-input
			:error-message="errorMessage"
			:icon="icon"
			:is-error="isError"
			:is-focus="isFocus"
			:label="label"
			:placeholder="placeholder"
			:required="required"
			:variant="flat ? 'flat' : 'default'"
			ref="input-wrapper"
			v-bind="{ disabled, modelValue, readOnly, value }"
			@blur="handleRemoveFocus"
			@input="handleInput"
		>
			<template v-slot:icon-slot>
				<sb-circular indeterminate :size="20" v-if="isLoading" />
			</template>
		</sb-input>
		<Teleport to="body">
			<div
				class="sb-autocomplete-backdrop"
				v-if="isOpen"
				@click.stop="handleBackdropClick"
			></div>
			<div
				class="sb-autocomplete-result-wrapper"
				:class="{
					expanded: isOpen,
				}"
				:data-target="`options-${$.uid}`"
				:style="optWrapperStyles"
				ref="options-wrapper"
				v-if="isOpen"
			>
				<OptionComponent
					:active-option="activeOption"
					:is-loading="isLoading"
					:list="localList"
					:term="localTerm"
					v-bind="{
						loadingText,
					}"
					@select="doSelect"
				/>
			</div>
		</Teleport>
	</div>
</template>

<script lang="ts">
	import { defineComponent, PropType } from 'vue'
	import { IAutocompleteItem, IIcon } from '@/interface'

	// components
	import CircularLoading from '@/components/progress-circular/progress-circular.vue'
	import Input from '@/components/form-input/form-input.vue'
	import OptionComponent from './__option.vue'

	// utils
	import { recursiveSearchScrollParent } from '@/utils/helper'

	export default defineComponent({
		emits: {
			'update:modelValue': (_selected: any) => true,
			change: (_selected: any) => true,
			input: (_term: string) => true,
		},
		props: {
			disabled: {
				required: false,
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
				type: Object as PropType<IAutocompleteItem[]>,
			},
			loadingText: {
				default: 'Loading...',
				type: String,
			},
			modelValue: {
				required: false,
				type: String as PropType<String | null>,
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
			value: {
				required: false,
				type: String as PropType<String | null>,
			},
		},
		name: 'sb-form-autocomplete',
		components: {
			OptionComponent,
			'sb-circular': CircularLoading,
			'sb-input': Input,
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
				parentWithScroll: null as HTMLElement | any,
			}
		},
		methods: {
			doSelect(value: any) {
				this.isOpen = false
				this.handleRemoveFocus()
				this.handleUpdateModel(value)
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
			handleBackdropClick() {
				this.handleRemoveFocus()
				this.isOpen = false
			},
			handleFilterList(term: string) {
				this.localTerm = term

				term = term.replace(/^\s?|\s?$/g, '').toLowerCase()

				this.localList = [...(this.list || [])].filter(
					(it: IAutocompleteItem) =>
						it.label.toLowerCase().includes(term),
				)
			},
			handleInput(ev: any) {
				const value: string = ev.target.value

				this.handleFilterList(value)

				if (value?.length) {
					this.$emit('input', value)
					this.handleUpdateModel(value)
					this.handleOpen()
				} else {
					this.isOpen = false
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
			handleOpen() {
				if (!this.readOnly && !this.disabled && !this.isOpen) {
					this.isOpen = true

					this.$nextTick(() => {
						this.setOptionsPosition()
					})
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
			handleParentFocus() {
				const self: Element = this.$el as Element
				const inputs: HTMLCollectionOf<HTMLInputElement> =
					self.getElementsByTagName('input')

				if (inputs?.length > 0) {
					const input: HTMLInputElement | null = inputs.item(0)

					input?.focus()
				}

				this.isFocus = true
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
			handleUpdateModel(value: any) {
				this.$emit('update:modelValue', value)
				this.$emit('change', value)
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
					this.activeOption = -1
					this.handleFilterList('')
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
						this.setOptionsPosition()
					})
				},
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

			this.parentWithScroll = recursiveSearchScrollParent(this.$el)
		},
		unmounted() {
			if (this.parentWithScroll) {
				this.parentWithScroll.removeEventListener('scroll', () => {
					this.setOptionsPosition()
				})
			}
		},
	})
</script>
<style lang="scss">
	@import '../../assets/scss/components/forms/_autocomplete.scss';
</style>
