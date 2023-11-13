<template>
	<div class="datatable" v-bind="{ ...$attrs }">
		<div class="search-wrapper" v-if="search">
			<sb-input
				:icon="{
					placement: 'append',
				}"
				autocomplete="off"
				variant="flat"
				v-model="response.term"
				@input="handleChange"
			>
				<template v-slot:icon>
					<component :is="iconMagnifyingGlass" />
				</template>
			</sb-input>
		</div>
		<div class="table-wrapper table-responsive">
			<table
				class="sb-table"
				:class="[
					rowStyle,
					localLoading || isLoading ? 'loader' : '',
					isColSearch ? 'with-col-search' : '',
					isColSort ? 'with-col-sort' : '',
				]"
				ref="dt-table"
			>
				<template v-if="$slots.header">
					<thead>
						<slot name="header" />
					</thead>
				</template>
				<template v-else-if="columns">
					<thead>
						<tr>
							<th
								class="sb-relative"
								v-for="(th, thIndex) in columns"
								:class="getHeadClass(thIndex)"
								:key="`head-th-${thIndex}`"
								@click.stop="
									() =>
										columns &&
										columns[thIndex]?.sort &&
										handleColSort(thIndex)
								"
							>
								<div class="th-items-wrapper">
									<div
										class="th-search-wrapper"
										:style="{
											'min-height':
												getHeadClass(thIndex).indexOf(
													'search',
												) > -1
													? '40px'
													: '',
										}"
									>
										<div class="label">
											<slot
												:name="`th-${thIndex + 1}`"
												v-bind="th"
											>
												{{ th.label }}
											</slot>
										</div>
										<div
											class="input"
											:style="{
												display: !isColSearchTop
													? 'none'
													: '',
												width: !isTopSearchEnabled(
													thIndex,
												)
													? 0
													: '100%',
											}"
											v-if="columns"
										>
											<sb-input
												:placeholder="th.label"
												autocomplete="off"
												variant="flat"
												v-model="
													response.termColumns[
														thIndex
													].term
												"
												@input="handleChange"
												v-if="columns[thIndex]?.search"
											/>
										</div>
									</div>
									<span class="action-wrapper" v-if="columns">
										<span
											class="col-search-wrapper"
											:style="{
												display: !isColSearchTop
													? 'none'
													: 'flex',
											}"
											@click.stop="
												handleClickColSearch(
													thIndex,
													isTopSearchEnabled(thIndex),
												)
											"
											v-if="columns[thIndex]?.search"
										>
											<component
												class="icon"
												:is="
													isTopSearchEnabled(thIndex)
														? iconXMark
														: iconMagnifyingGlass
												"
											/>
										</span>
										<span
											class="sort-wrapper"
											@click.stop="handleColSort(thIndex)"
											v-if="columns[thIndex]?.sort"
											v-show="
												!isTopSearchEnabled(thIndex)
											"
										>
											<component
												class="icon"
												:is="iconSortUp"
											/>
											<component
												class="icon"
												:is="iconSortDown"
											/>
										</span>
									</span>
								</div>
							</th>
						</tr>
					</thead>
				</template>
				<sb-table-loader
					:rowCount="response.length"
					v-if="localLoading || isLoading"
				/>
				<template v-else-if="$slots.body">
					<tbody>
						<slot name="body" />
					</tbody>
				</template>
				<template v-else-if="list">
					<tbody v-if="list.length > 0">
						<tr
							v-for="(tr, trIndex) in list"
							:key="`body-tr-${trIndex}`"
						>
							<slot
								name="tr"
								v-bind="{
									...tr,
									index: trIndex,
								}"
							>
								{{ tr }}
							</slot>
						</tr>
					</tbody>
					<tbody v-else>
						<tr>
							<td colspan="100%">
								<div class="no-results">
									<sb-svg-no-results />
									<div
										v-if="language?.noResult"
										v-html="language?.noResult"
									></div>
									<div v-else>No Results Found...</div>
								</div>
							</td>
						</tr>
					</tbody>
				</template>
				<tfoot v-if="showColumnSearch && !isColSearchTop && columns">
					<tr>
						<th
							v-for="(th, thIndex) in columns"
							:key="`foot-th-${thIndex}`"
						>
							<sb-input
								:placeholder="th.label"
								variant="flat"
								v-model="response.termColumns[thIndex].term"
								v-if="th.search"
								@input="handleChange"
							/>
						</th>
					</tr>
				</tfoot>
			</table>
		</div>
		<div
			class="footer-wrapper"
			:class="{ options: lengthChange.enabled }"
			v-if="showFooter"
		>
			<div class="length-options" v-if="lengthChange.enabled">
				<span
					v-if="language?.perPage"
					v-html="language?.perPage"
				></span>
				<span v-else>Rows per page</span>
				<sb-dropdown
					flat
					:list="getLengthOptions"
					opt-label="label"
					v-model="selectedLength"
				/>
			</div>
			<div
				class="pagination-wrapper"
				v-if="pagination?.enabled || serverSide"
			>
				<div class="count-wrapper">
					<component :is="getCounter"></component>
				</div>
				<div class="arrow-wrapper">
					<component
						@click="
							() =>
								handlePaginate(-1, localPagination.current < 1)
						"
						:is="iconAngleLeft"
						:class="{ disabled: localPagination.current < 1 }"
					/>
					<component
						@click="
							() =>
								handlePaginate(
									1,
									localPagination.current + 1 ===
										Math.ceil(
											localPagination.total /
												localPagination.length,
										),
								)
						"
						:is="iconAngleRight"
						:class="{
							disabled:
								localPagination.current + 1 ===
								Math.ceil(
									localPagination.total /
										localPagination.length,
								),
						}"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent, PropType, h } from 'vue'

	// components
	import Dropdown from '@/components/form-dropdown/form-dropdown.vue'
	import Input from '@/components/form-input/form-input.vue'
	import SVGNoResults from './no-results.vue'
	import TableLoader from '@/components/table-loader/table-loader.vue'

	// icons
	import {
		angleLeft,
		angleRight,
		magnifyingGlass,
		sortDown,
		sortUp,
		xMark,
	} from '@/assets/icons'

	import {
		IDTChangeResponse,
		IDTColumn,
		IDTLanguage,
		IDTServerSideHandler,
		IDTSort,
		ILengthChange,
		IPagination,
		IServerSide,
	} from '@/interface'

	export default defineComponent({
		emits: {
			onChange: (_resp: IDTChangeResponse) => true,
		},
		props: {
			columnSearchPlacement: {
				default: 'bottom',
				type: String as PropType<'bottom' | 'top'>,
			},
			columns: {
				required: false,
				type: Object as PropType<IDTColumn[]>,
			},
			defaultSort: {
				required: false,
				type: Object as PropType<IDTSort>,
			},
			isLoading: {
				required: false,
				type: Boolean,
			},
			language: {
				required: false,
				type: Object as PropType<IDTLanguage>,
			},
			lengthChange: {
				default: () => ({
					enabled: false,
					options: [10, 20, 50, 100],
				}),
				type: Object as PropType<ILengthChange>,
			},
			list: {
				required: false,
				type: Object as PropType<any[]>,
			},
			onAjax: {
				required: false,
				type: Function as PropType<
					(
						_resp: IDTServerSideHandler,
						_type: 'BEFORE SEND' | 'ERROR' | 'SUCCESS',
					) => void
				>,
			},
			pagination: {
				required: false,
				type: Object as PropType<IPagination>,
			},
			rowStyle: {
				default: 'default',
				type: String as PropType<'default' | 'odd-even'>,
			},
			search: {
				default: false,
				type: Boolean,
			},
			serverSide: {
				required: false,
				type: Object as PropType<IServerSide>,
			},
		},
		name: 'sb-datatable',
		components: {
			'sb-dropdown': Dropdown,
			'sb-input': Input,
			'sb-svg-no-results': SVGNoResults,
			'sb-table-loader': TableLoader,
		},
		data() {
			return {
				colSearchState: [] as any[],
				localAbort: null as any | AbortController,
				localLoading: false,
				localPagination: {
					current: 0,
					length: 10,
					total: 10,
					totalRow: 10,
				},
				response: {
					length: 10,
					page: 0,
					sort: {},
					term: '',
					termColumns: [],
				} as IDTChangeResponse,
				selectedLength: {
					label: 10,
					value: 10,
				} as any,
			}
		},
		computed: {
			getCounter() {
				const start: number =
					(this.localPagination.current || 0) *
					(this.localPagination.length || 0)

				return h('div', {
					innerHTML: `${
						this.localPagination.totalRow > 0 ? start + 1 : 0
					} - ${
						start + (this.localPagination.totalRow || 0)
					} <span style="font-weight: 400; color: #6b7280;">of ${
						this.localPagination.total || 0
					}</span>`,
				})
			},
			getLengthOptions() {
				if (this.lengthChange.enabled) {
					if (
						this.lengthChange.options &&
						this.lengthChange.options.length > 0
					) {
						return [...this.lengthChange.options].map(
							(it: number) => ({
								label: it,
								value: it,
							}),
						)
					}

					return [10, 20, 50, 100].map((it: number) => ({
						label: it,
						value: it,
					}))
				}

				return []
			},
			iconAngleLeft() {
				return angleLeft()
			},
			iconAngleRight() {
				return angleRight()
			},
			iconMagnifyingGlass() {
				return magnifyingGlass()
			},
			iconSortDown() {
				return sortDown()
			},
			iconSortUp() {
				return sortUp()
			},
			iconXMark() {
				return xMark()
			},
			isColSearch() {
				if (this.columns) {
					return this.columns.some((it: IDTColumn) => it.search)
				}

				return false
			},
			isColSearchTop() {
				return this.columnSearchPlacement === 'top'
			},
			isColSort() {
				if (this.columns) {
					return this.columns.some((it: IDTColumn) => it.sort)
				}

				return false
			},
			showColumnSearch() {
				return [...(this.columns || [])].some(
					(it: IDTColumn) => it.search,
				)
			},
			showFooter() {
				return this.pagination?.enabled || this.lengthChange.enabled
			},
		},
		methods: {
			getHeadClass(index: number) {
				const classes: any[] = [
					this.response.sort?.column === index &&
						this.response.sort?.dir,
				].filter((it: any) => it)

				if (this.columns) {
					return [
						...classes,
						this.columns[index]?.alignHead &&
							`text-${this.columns[index]?.alignHead}`,
						this.columns[index]?.hidden ? 'sb-hidden' : '',
						this.columns[index]?.sort ? 'sort' : '',
						this.columns[index]?.search && this.isColSearchTop
							? 'search'
							: '',
					].filter((it: any) => it !== '')
				}

				return classes
			},
			getModdedResponse() {
				return {
					...this.response,
					...(this.response.sort &&
						Object.keys(this.response.sort).length > 0 && {
							sort: {
								...this.response.sort,
								column:
									this.columns?.[
										this.response.sort?.column as number
									]?.name || this.response.sort?.column,
							},
						}),
					...(this.response.termColumns &&
						this.response.termColumns.length > 0 && {
							termColumns: [...this.response.termColumns]
								.map((it: any, index: number) => {
									if (it) {
										return {
											column:
												this.columns?.[index]?.name ||
												it.column,
											term: it.term,
										}
									}

									return it
								})
								.filter((it: any) => it),
						}),
				}
			},
			async handleAJAX() {
				try {
					if (this.serverSide?.url) {
						this.localLoading = true

						let additionalConfig: Record<string, any> = {
							headers: this.serverSide?.options?.headers || {},
							payload: {
								...(this.serverSide?.options?.payload || {}),
								...this.getModdedResponse(),
							},
						}

						if (this.onAjax) {
							const handle: any = this.onAjax(
								{
									headers: { ...additionalConfig.headers },
									payload: { ...additionalConfig.payload },
								},
								'BEFORE SEND',
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
								const response: any = xhr.response

								reject({
									status: xhr.status,
									statusText: xhr.statusText,
									response: response,
								})
							}

							xhr.send(getPayload())
						})
							.then((ajaxResult: any) => {
								if (that.onAjax) {
									const handler: any = that.onAjax(
										{
											dtConfig: {
												...that.response,
											},
											response: {
												data: ajaxResult.response,
												httpResponse: {
													code: ajaxResult.status,
													message:
														ajaxResult.statusText,
												},
												status: true,
											},
										},
										'SUCCESS',
									)

									that.localPagination = {
										...that.localPagination,
										total: handler?.total || 0,
										totalRow: handler?.totalRow || 0,
									}
								}

								that.localLoading = false
							})
							.catch((ajaxResult: any) => {
								that.localLoading = false

								if (ajaxResult.statusText !== 'abort') {
									if (that.onAjax) {
										that.onAjax(
											{
												dtConfig: {
													...that.response,
												},
												response: {
													data: null,
													httpResponse: {
														code:
															ajaxResult.status ||
															500,
														message:
															ajaxResult.response
																.message,
													},
													status: false,
												},
											},
											'ERROR',
										)
									}

									that.setEmptyData()
								}
							})
					} else {
						if (this.onAjax) {
							this.onAjax(
								{
									dtConfig: {
										...this.response,
									},
									response: {
										data: null,
										status: false,
									},
								},
								'ERROR',
							)
						}

						this.setEmptyData()
					}
				} catch (error) {
					if (this.onAjax) {
						this.onAjax(
							{
								dtConfig: {
									...this.response,
								},
								response: {
									data: null,
									status: false,
								},
							},
							'ERROR',
						)
					}

					this.setEmptyData()
				}
			},
			handleChange() {
				this.localPagination = {
					...this.localPagination,
					current: 0,
				}

				this.response = {
					...this.response,
					page: 0,
				}

				if (this.serverSide) {
					this.handleAJAX()
				}

				this.$emit('onChange', this.getModdedResponse())
			},
			handleClickColSearch(index: number, isClose = false) {
				this.colSearchState = [...this.colSearchState].map(
					(it: any) => {
						if (it.column === index) {
							return { ...it, enabled: !it.enabled }
						}

						return it
					},
				)

				if (this.response.termColumns?.[index]) {
					this.response.termColumns[index].term = ''
				}

				if (isClose) {
					this.handleChange()
				}
			},
			handlePaginate(operation: number, isDisabled: boolean) {
				if (!isDisabled) {
					this.response = {
						...this.response,
						page: this.response.page + operation,
					}
					this.localPagination = {
						...this.localPagination,
						current: this.localPagination.current + operation,
					}

					if (this.serverSide) {
						this.handleAJAX()
					}

					this.$emit('onChange', this.getModdedResponse())
				}
			},
			handleColSort(column: number) {
				if (
					this.response.sort &&
					this.response.sort?.column === column
				) {
					this.localPagination = {
						...this.localPagination,
						current: 0,
					}

					this.response = {
						...this.response,
						page: 0,
						sort: {
							...this.response.sort,
							dir:
								this.response.sort?.dir === 'asc'
									? 'desc'
									: 'asc',
						},
					}
				} else {
					this.localPagination = {
						...this.localPagination,
						current: 0,
					}

					this.response = {
						...this.response,
						page: 0,
						sort: {
							column,
							dir: 'asc',
						},
					}
				}

				this.$nextTick(() => {
					this.handleAJAX()
				})
			},
			isTopSearchEnabled(index: number) {
				return this.colSearchState.find(
					(it: any) => it.column === index,
				)?.enabled
			},
			setEmptyData() {
				this.localPagination = {
					...this.localPagination,
					current: 0,
					total: 0,
					totalRow: 0,
				}

				this.response = {
					...this.response,
					page: 0,
				}
			},
		},
		watch: {
			columns: {
				deep: true,
				handler(newValue: IDTColumn[]) {
					if (newValue) {
						const columnSearch: any[] = [
							...(this.columns || []),
						].map((it: IDTColumn, index: number) => {
							if (it.search) {
								return {
									column: index,
									term: '',
								}
							}

							return null
						})

						this.response.termColumns = columnSearch
						this.colSearchState = columnSearch
							.filter((it: any) => it)
							.map((it: any) => ({ ...it, enabled: false }))
					}
				},
				immediate: true,
			},
			defaultSort: {
				deep: true,
				handler(newValue: any) {
					if (newValue) {
						this.response = {
							...this.response,
							sort: this.defaultSort || {},
						}
					}
				},
				immediate: true,
			},
			lengthChange: {
				deep: true,
				handler(newValue: ILengthChange) {
					if (
						newValue &&
						newValue.enabled &&
						newValue.options &&
						newValue.options.length > 0
					) {
						this.selectedLength = {
							label: newValue.options[0],
							value: newValue.options[0],
						}

						this.response.length = newValue.options[0]
						this.localPagination.length = newValue.options[0]
					}
				},
				immediate: true,
			},
			pagination: {
				deep: true,
				handler(newValue: IPagination) {
					if (newValue) {
						this.response = {
							...this.response,
							length: newValue.length || 0,
							page: newValue.current || 0,
						}

						this.localPagination = {
							...this.localPagination,
							current: newValue.current || 0,
							length: newValue.length || 0,
							total: newValue.total || 0,
							totalRow: newValue.totalRow || 0,
						}
					}
				},
				immediate: true,
			},
			selectedLength: {
				deep: true,
				handler(newValue: any) {
					this.localPagination = {
						...this.localPagination,
						current: 0,
						length: newValue.value,
					}

					this.response = {
						...this.response,
						length: newValue.value,
						page: 0,
					}

					this.$nextTick(() => {
						if (this.serverSide) {
							this.handleAJAX()
						}

						this.$emit('onChange', this.getModdedResponse())
					})
				},
			},
			serverSide: {
				deep: true,
				handler(newValue: IServerSide) {
					if (newValue) {
						this.handleAJAX()
					}
				},
				immediate: true,
			},
		},
		unmounted() {
			if (this.localAbort) {
				this.localAbort.abort()
			}
		},
	})
</script>

<style lang="scss">
	@import '../../assets/scss/components/_datatable.scss';
</style>
