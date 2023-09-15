<template>
	<template v-if="!localLoading || infinite">
		<div
			class="option"
			:class="{ selected: isSelected(opt) }"
			:key="opt"
			v-for="opt in localList"
			@click="doSelect(opt)"
		>
			<span v-html="renderOption(opt)"></span>
		</div>
	</template>
	<div class="loading-wrapper" v-if="localLoading">
		<sb-circular indeterminate :size="36" />
	</div>
</template>

<script lang="ts">
	import { defineComponent, PropType } from 'vue'
	import Axios, { AxiosError, AxiosResponse } from 'axios'

	// funcs
	import { renderOption } from '../__funcs'

	// components
	import Circular from '@/components/progress/_circular.vue'
	import { IServerSide, IServerSideHandler } from '@/interface'

	export default defineComponent({
		emits: {
			onLoading: (_loading: boolean) => true,
			onListChange: (_list: any[]) => true,
			onSelect: (_selected: any) => true,
		},
		props: {
			infinite: {
				required: false,
				type: Boolean,
			},
			isOpen: {
				required: true,
				type: Boolean,
			},
			isScrollBottom: {
				required: true,
				type: Boolean,
			},
			multi: {
				required: false,
				type: Boolean,
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
			optLabel: {
				required: true,
				type: [String, Function],
			},
			selected: {
				required: false,
				type: Object as PropType<any | any[]>,
			},
			serverSide: {
				required: false,
				type: Object as PropType<IServerSide>,
			},
			term: {
				required: true,
				type: String,
			},
		},
		name: 'sb-form-dropdown-option-ajax',
		components: {
			'sb-circular': Circular,
		},
		data() {
			return {
				localAbort: null as any | AbortController,
				localList: [] as any[],
				localLoading: false,
				localPage: 0,
			}
		},
		methods: {
			doSelect(opt: any) {
				if (!this.isSelected(opt)) {
					this.$emit('onSelect', opt)
				}
			},
			async handleAjax() {
				try {
					if (this.serverSide?.url) {
						this.localLoading = true

						let additionalConfig: Record<string, any> = {
							headers: this.serverSide?.options?.headers || {},
							payload: {
								...(this.serverSide?.options?.payload || {}),
								term: this.term,
								page: this.localPage,
							},
						}

						if (this.onAjax) {
							const handle: any = this.onAjax(
								{
									headers: { ...additionalConfig.headers },
									payload: { ...additionalConfig.payload },
								},
								'BEFORE SEND',
								this.infinite && this.isScrollBottom,
							)

							additionalConfig = {
								...additionalConfig,
								...handle,
							}
						}

						if (this.localAbort) {
							this.localAbort.abort()
						}

						const abortController: AbortController =
							new AbortController()

						this.localAbort = abortController

						return await Axios({
							headers: additionalConfig.headers,
							method: this.serverSide?.method || 'GET',
							signal: abortController.signal,
							url: this.serverSide?.url,
							...((!this.serverSide?.method ||
								this.serverSide?.method === 'GET') && {
								params: additionalConfig.payload || {},
							}),
							...(this.serverSide?.method === 'POST' && {
								data: additionalConfig.payload || {},
							}),
						})
							.then((response: AxiosResponse) => {
								if (this.onAjax) {
									const handler: any = this.onAjax(
										{
											data: response.data,
											httpResponse: {
												code: response.status,
												message: response.statusText,
											},
											status: true,
										},
										'SUCCESS',
									)

									if (this.infinite) {
										this.localList = [
											...this.localList,
											...handler,
										]
									} else {
										this.localList = [...handler]
									}
								} else {
									this.localList = response.data
								}

								this.localLoading = false
							})
							.catch((responseErr: AxiosError) => {
								this.localLoading = false

								if (!this.infinite) {
									this.localList = []
								}

								if (this.onAjax) {
									this.onAjax(
										{
											data: null,
											httpResponse: {
												code:
													responseErr.response
														?.status || 500,
												message: responseErr.message,
											},
											status: false,
										},
										'ERROR',
									)
								}
							})
					}
				} catch (error) {
					//
				}
			},
			isSelected(opt: any) {
				if (this.selected) {
					if (this.multi) {
						return this.selected.some(
							(it: any) =>
								JSON.stringify(it).indexOf(
									JSON.stringify(opt),
								) > -1,
						)
					}

					return (
						JSON.stringify(this.selected).indexOf(
							JSON.stringify(opt),
						) > -1
					)
				}

				return false
			},
			renderOption(opt: any) {
				return renderOption(opt, this.optLabel)
			},
		},
		watch: {
			isOpen: {
				handler(newValue: boolean, oldValue: boolean) {
					if (newValue && !oldValue) {
						this.localPage = 0

						this.$nextTick(() => this.handleAjax())
					} else if (!newValue && oldValue) {
						if (this.localAbort) {
							this.localAbort.abort()
						}
					}
				},
				immediate: true,
			},
			isScrollBottom(newValue: boolean) {
				if (newValue && !this.localLoading && this.isOpen) {
					this.localPage += 1

					this.$nextTick(() => this.handleAjax())
				}
			},
			localList(newValue: any[]) {
				this.$emit('onListChange', newValue)
			},
			localLoading(newValue: boolean) {
				this.$emit('onLoading', newValue)
			},
			term: {
				handler() {
					this.localPage = 0
					this.localList = []

					if (this.isOpen) {
						this.$nextTick(() => this.handleAjax())
					}
				},
			},
		},
	})
</script>

<style lang="scss" scoped>
	@import '../../../../assets/scss/components/forms/dropdown/_dropdown-option.scss';
</style>
