<template>
	<template v-if="!localLoading || infinite">
		<div
			class="option"
			:class="{ selected: isSelected(opt) }"
			:key="opt"
			v-for="opt in localList"
			@click.stop="doSelect(opt)"
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
	import { IServerSide, IServerSideHandler } from '@/interface'

	// funcs
	import { renderOption } from '../__funcs'

	// components
	import Circular from '@/components/progress-circular/progress-circular.vue'

	export default defineComponent({
		emits: {
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

						const xhr: XMLHttpRequest = new XMLHttpRequest()

						if (this.serverSide?.options?.withCredential) {
							xhr.withCredentials = true
						}

						if (this.localAbort) {
							this.localAbort.abort()
						}

						this.localAbort = xhr

						const getPayload: any = () => {
							if (
								!this.serverSide?.method ||
								this.serverSide?.method === 'GET'
							) {
								return null
							}

							return JSON.stringify(
								additionalConfig.payload || {},
							)
						}

						const getURL: () => string = () => {
							if (this.serverSide?.url) {
								if (
									this.serverSide?.method === 'GET' ||
									!this.serverSide?.method
								) {
									const params: string = new URLSearchParams(
										additionalConfig.payload || {},
									).toString()

									return `${this.serverSide?.url}?${params}`
								}

								return this.serverSide?.url
							}

							return ''
						}

						const that = this

						await new Promise((resolve, reject) => {
							xhr.open(that.serverSide?.method || 'GET', getURL())

							if (that.serverSide?.method === 'POST') {
								xhr.setRequestHeader(
									'Content-Type',
									'application/json;charset=UTF-8',
								)
							}

							Object.keys(additionalConfig.headers).forEach(
								(key: string) => {
									xhr.setRequestHeader(
										key,
										additionalConfig.headers[key],
									)
								},
							)

							xhr.onload = () => {
								if (xhr.status !== 200) {
									reject({
										status: xhr.status,
										statusText: xhr.statusText,
										response: xhr.response,
									})
								} else {
									const response: any = JSON.parse(
										xhr.response,
									)

									resolve({
										status: xhr.status,
										statusText: xhr.statusText,
										response: response,
									})
								}
							}

							xhr.onabort = () => {
								reject({
									status: 'ERR_ABORTED',
									statusText: 'ERR_ABORTED',
									response: {
										message: 'ERR_ABORTED',
									},
								})
							}

							xhr.send(getPayload())
						})
							.then((ajaxResult: any) => {
								if (this.onAjax) {
									const handler: any = this.onAjax(
										{
											data: ajaxResult.response,
											httpResponse: {
												code: ajaxResult.status,
												message: ajaxResult.statusText,
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
									this.localList = ajaxResult.response
								}

								this.localLoading = false
							})
							.catch((ajaxResult: any) => {
								this.localLoading = false

								if (!this.infinite) {
									this.localList = []
								}

								if (this.onAjax) {
									this.onAjax(
										{
											data: null,
											httpResponse: {
												code: ajaxResult.status || 500,
												message:
													ajaxResult.response.message,
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
					}

					if (this.localAbort) {
						this.localAbort.abort()
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
		unmounted() {
			if (this.localAbort) {
				this.localAbort.abort()
			}
		},
	})
</script>

<style lang="scss" scoped>
	@import '../../../assets/scss/components/forms/dropdown/_dropdown-option.scss';
</style>
