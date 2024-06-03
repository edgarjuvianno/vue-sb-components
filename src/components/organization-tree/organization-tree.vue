<template>
	<div class="organization-wrapper-parent" v-bind="{ ...$attrs }">
		<div
			:class="{
				connecting: connectorState.from,
				dragging: parentState.isDrag,
			}"
			:id="`org-${$.uid}`"
			class="organization-wrapper"
			ref="organization-wrapper"
			@mousedown.stop="handleParentClick"
			@mousemove.stop="handleParentPosition"
			@mouseup.stop="handleParentDragEnd"
			@pointercancel="handleParentPointerUp"
			@pointerdown="handleParentPointerDown"
			@pointerleave="handleParentPointerUp"
			@pointermove="handleParentPointerMove"
			@pointerout="handleParentPointerUp"
			@pointerup="handleParentPointerUp"
			@touchend.stop="handleParentDragEnd"
			@touchmove.stop="handleParentPosition"
			@touchstart.stop="handleParentClick"
			@wheel.stop="handleParentZoom"
		>
			<div
				class="canvas"
				ref="canvas-tree"
				:class="{
					'connection-selected': selectedConnection,
				}"
				:id="`canvas-tree-${$.uid}`"
				:style="canvasStyle"
			>
				<template v-if="canvasState.elem">
					<sb-org-tree-item
						:canvas-state="canvasState"
						:connector-state="connectorState"
						:is-dragged="
							isItemDragged(`org-${$.uid}-item-${index}`)
						"
						:is-selected="
							isItemSelected(`org-${$.uid}-item-${index}`)
						"
						:key="`org-${$.uid}-item-${index}`"
						:selected-connection="selectedConnection"
						v-bind="{
							isEditable,
							item,
						}"
						v-for="(item, index) in localList"
						@change-point="handleChangeItemPoint"
						@click-item="handleClickItem"
						@drag-connection="handleConnectionDragged"
						@drag-item="handleItemDragged"
						@drag-point="handlePointDragged"
						@select-connection="handleSelectConnection"
					/>
					<svg
						class="connection connecting"
						xmlns="http://www.w3.org/2000/svg"
						v-if="connectorState.from"
					>
						<path :d="connectorState.path"></path>
					</svg>
				</template>
			</div>
			<div
				class="connection-options-wrapper"
				ref="connection-options-wrapper"
				v-if="selectedConnection"
			>
				<sb-dropdown
					flat
					opt-value="value"
					type="flat"
					v-model="selectedLineType"
					:list="lineType"
					:opt-label="getOptionLine"
					@change="handleChangeLineType"
				/>
			</div>
		</div>
		<div
			class="export-area-org-chart"
			:id="`org-${$.uid}-export-area`"
			:style="exportAreaStyle"
			v-if="isExporting"
		></div>
	</div>
</template>

<script lang="ts">
	import { PropType, defineComponent } from 'vue'
	import { IOrganizationTreeItem } from '@/interface'
	import {
		ICanvasState,
		IConnection,
		IConnectorState,
		ICoordinates,
		IDraggedItem,
		IMouseState,
		IParentPointerState,
		IParentState,
		IPointState,
		IPointTarget,
		ISelectedConnection,
	} from '@/interface'
	import { toPng as htmlToPNG } from 'html-to-image'
	import { getConnectionPathItem, getConnectionPathPoint } from './__funcs'

	// components
	import Dropdown from '@/components/form-dropdown/form-dropdown.vue'
	import TreeItem from './__organization-tree-item.vue'

	export default defineComponent({
		emits: {
			change: (_list: IOrganizationTreeItem[]) => true,
			clickItem: (_item: IOrganizationTreeItem, _index: number) => true,
		},
		props: {
			isEditable: {
				required: false,
				type: Boolean,
			},
			list: {
				required: true,
				type: Object as PropType<IOrganizationTreeItem[]>,
			},
		},
		name: 'sb-organization-tree',
		components: {
			'sb-dropdown': Dropdown,
			'sb-org-tree-item': TreeItem,
		},
		data() {
			return {
				canvasState: {
					coordinates: {
						x: 0,
						y: 0,
					},
					elem: null,
					lastZoom: 1,
					zoom: 1,
				} as ICanvasState,
				canvasStyle: {} as Record<string, any>,
				connectorState: {
					from: null,
					fromRect: null,
					toCoordinates: null,
				} as IConnectorState,
				draggedItem: null as IDraggedItem | null,
				exportAreaStyle: {} as Record<string, any>,
				isExporting: false,
				isItemMoved: false,
				lineType: [
					{
						label: 'Solid',
						value: 'solid',
					},
					{
						label: 'Dashed',
						value: 'dashed',
					},
					{
						label: 'Dotted',
						value: 'dotted',
					},
				],
				localList: [] as IOrganizationTreeItem[],
				mouseState: {
					mouse: {
						x: 0,
						y: 0,
					},
					position: {
						x: 0,
						y: 0,
					},
					positionStart: {
						x: 0,
						y: 0,
					},
				} as IMouseState,
				parentPointerState: {
					events: [],
					prevDiff: -1,
				} as IParentPointerState,
				parentState: {
					isDrag: false,
					position: {
						x: 0,
						y: 0,
					},
				} as IParentState,
				pointState: {
					fromRect: null,
					target: null,
					toCoordinates: null,
				} as IPointState,
				selectedConnection: null as null | ISelectedConnection,
				selectedItem: null as null | IDraggedItem,
				selectedLineType: 'solid' as any,
			}
		},
		computed: {
			getMinMaxXY() {
				const connections: IConnection[] = [...this.localList].flatMap(
					(item: IOrganizationTreeItem) =>
						item.connections ? [...item.connections] : [],
				)
				const points: ICoordinates[] = [...connections].flatMap(
					(item: IConnection) =>
						item.points ? [...item.points] : [],
				)
				const itemRects: Record<string, any>[] = [
					...this.localList,
				].map((it: IOrganizationTreeItem, idx: number) => {
					const card: HTMLElement | null = document.getElementById(
						`org-${this.$.uid}-item-${idx}`,
					)

					if (card) {
						return {
							height: card.offsetHeight,
							x: card.offsetLeft,
							y: card.offsetTop,
							width: card.offsetWidth,
						}
					}

					return it.coordinates
				})

				const itemX: number[] = [...itemRects].map(
					(it: Record<string, any>) => it.x,
				)
				const itemXWidth: number[] = [...itemRects].map(
					(it: Record<string, any>) => it.x + (it.width || 220),
				)
				const itemY: number[] = [...itemRects].map(
					(it: Record<string, any>) => it.y,
				)
				const itemYHeight: number[] = [...itemRects].map(
					(it: Record<string, any>) => it.y + (it.height || 100),
				)

				const xAxis: number[] = [
					...[...points].map((it: ICoordinates) => it.x),
					...itemX,
					...itemXWidth,
				]
				const yAxis: number[] = [
					...[...points].map((it: ICoordinates) => it.y),
					...itemY,
					...itemYHeight,
				]

				const maxX: number = Math.max.apply(null, xAxis)
				const minX: number = Math.min.apply(null, xAxis)

				const maxY: number = Math.max.apply(null, yAxis)
				const minY: number = Math.min.apply(null, yAxis)

				return {
					maxX,
					minX,
					maxY,
					minY,
				}
			},
		},
		methods: {
			async doExport() {
				this.selectedConnection = null
				this.isExporting = true

				await new Promise((resolve) =>
					setTimeout(() => {
						resolve(true)
					}, 200),
				)

				const { maxX, minX, maxY, minY }: Record<string, number> =
					this.getMinMaxXY

				const elemHeight: number =
					(minY < 0 ? Math.abs(minY) : 0) + maxY
				const elemWidth: number = (minX < 0 ? Math.abs(minX) : 0) + maxX
				const canvasElem: HTMLElement | null = document.getElementById(
					`canvas-tree-${this.$.uid}`,
				)

				this.exportAreaStyle = {
					height: `${elemHeight + 40}px`,
					width: `${elemWidth + 40}px`,
				}

				if (canvasElem) {
					const clonedElem: HTMLElement = canvasElem.cloneNode(
						true,
					) as HTMLElement

					clonedElem.classList.remove('connection-selected')
					clonedElem.style.transform = 'none'
					clonedElem.style.background = 'transparent'
					clonedElem.style.height = `${elemHeight + 40}px`
					clonedElem.style.position = 'relative'
					clonedElem.style.transform = `translate(${
						(minX < 0 ? Math.abs(minX) : minX * -1) + 20
					}px, ${(minY < 0 ? Math.abs(minY) : minY * -1) + 20}px)`
					clonedElem.style.width = `${elemWidth + 40}px`

					const parent: HTMLElement | null = document.getElementById(
						`org-${this.$.uid}-export-area`,
					)

					if (parent) {
						parent.appendChild(clonedElem)

						const pngDataURI: string | null = await htmlToPNG(
							parent,
							{
								style: {
									opacity: '1',
								},
							},
						).catch(() => null)

						clonedElem.remove()
						this.isExporting = false

						return pngDataURI
					}
				}

				return null
			},
			doParentZoom(inc: number) {
				this.canvasState.zoom += inc

				this.$nextTick(() => this.doParentZoomRefresh())
			},
			doParentZoomRefresh() {
				const { coordinates, lastZoom, zoom }: ICanvasState =
					this.canvasState

				const targetX: number = (coordinates.x / lastZoom) * zoom
				const targetY: number = (coordinates.y / lastZoom) * zoom

				this.canvasState.lastZoom = zoom
				this.canvasStyle = {
					transform: `translate(${targetX}px, ${targetY}px) scale(${zoom})`,
				}
			},
			doSetTempConnectionPath() {
				if (
					this.connectorState.toCoordinates &&
					this.connectorState.fromRect
				) {
					const { x: mouseX, y: mouseY } =
						this.connectorState.toCoordinates
					const {
						height: fromHeight,
						width: fromWidth,
						x: fromX,
						y: fromY,
					} = this.connectorState.fromRect
					const { zoom } = this.canvasState

					const canvasRect: DOMRect | null = this.getCanvasRect()

					const canvasHeight: number = canvasRect?.height || 0
					const canvasWidth: number = canvasRect?.width || 0

					const canvasWidthZoom: number =
						canvasWidth / (canvasWidth * zoom) || 0
					const canvasHeightZoom: number =
						canvasHeight / (canvasHeight * zoom) || 0

					const canvasX: number = canvasRect?.x || 0
					const canvasY: number = canvasRect?.y || 0

					const startX: number =
						fromWidth / 2 + (fromX - canvasX) * canvasWidthZoom

					const startY =
						fromHeight / 2 + (fromY - canvasY) * canvasHeightZoom

					const endX: number =
						mouseX * (canvasWidth / (canvasWidth * zoom)) -
						canvasX * (canvasWidth / (canvasWidth * zoom))

					const endY =
						mouseY * (canvasHeight / (canvasHeight * zoom)) -
						canvasY * (canvasHeight / (canvasHeight * zoom))

					this.connectorState.pathObject = {
						from: {
							x: startX,
							y: startY,
						},
						to: {
							x: endX,
							y: endY,
						},
					}
					this.connectorState.path = `M ${startX} ${startY} L ${endX} ${endY}`
				} else {
					this.connectorState.pathObject = undefined
					this.connectorState.path = undefined
				}
			},
			doUpdateItemMovedConnections(triggerIndex: number) {
				this.localList.forEach(
					(it: IOrganizationTreeItem, idx: number) => {
						if (
							[...(it.connections || [])].some(
								(itConnection: IConnection) =>
									itConnection.from.item === triggerIndex ||
									itConnection.to.item === triggerIndex,
							)
						) {
							;[...(it.connections || [])].forEach(
								(
									itConnection: IConnection,
									idxConnection: number,
								) => {
									if (
										itConnection.from.item ===
											triggerIndex ||
										itConnection.to.item === triggerIndex
									) {
										const connection: HTMLElement | null =
											document.getElementById(
												`org-${this.$.uid}-item-${idx}-connection-${idxConnection}`,
											)
										const path:
											| HTMLCollectionOf<SVGPathElement>
											| undefined =
											connection?.getElementsByTagName(
												'path',
											)

										const orgUID: string = String(
											this.$.uid,
										)

										const canvasRect: DOMRect =
											this.getCanvasRect()

										const canvasHeight: number =
											canvasRect.height || 0
										const canvasWidth: number =
											canvasRect.width || 0

										const canvasWidthZoom: number =
											canvasWidth /
												(canvasWidth *
													this.canvasState.zoom) || 0
										const canvasHeightZoom: number =
											canvasHeight /
												(canvasHeight *
													this.canvasState.zoom) || 0

										const newPath: string | undefined =
											getConnectionPathItem(
												triggerIndex,
												itConnection,
												path,
												orgUID,
												{
													canvasHeight:
														canvasHeightZoom,
													canvasWidth:
														canvasWidthZoom,
													x: canvasRect.x,
													y: canvasRect.y,
												},
											)

										if (newPath && path) {
											path[0].setAttributeNS(
												null,
												'd',
												newPath,
											)
										}
									}
								},
							)
						}
					},
				)
			},
			doUpdatePointMovedConnection(
				points: ICoordinates[],
				connectionIndex: number,
				itemIndex: number,
			) {
				const connectionElem: HTMLElement | null =
					document.getElementById(
						`org-${this.$.uid}-item-${itemIndex}-connection-${connectionIndex}`,
					)
				const path: HTMLCollectionOf<SVGPathElement> | undefined =
					connectionElem?.getElementsByTagName('path')

				const newPath: string | undefined = getConnectionPathPoint(
					points,
					path,
				)

				if (newPath && path) {
					path[0].setAttributeNS(null, 'd', newPath)
				}
			},
			getCanvasRect() {
				if (this.$refs['canvas-tree']) {
					const clientRect: DOMRect = (
						this.$refs['canvas-tree'] as any
					).getBoundingClientRect()

					return {
						...clientRect.toJSON(),
					}
				}

				return null
			},
			getCoordinatesEnd(ev: MouseEvent | TouchEvent) {
				if (ev.type === 'touchend') {
					return {
						x: this.mouseState.mouse.x,
						y: this.mouseState.mouse.y,
					}
				}

				return {
					x: (ev as MouseEvent).clientX,
					y: (ev as MouseEvent).clientY,
				}
			},
			getCoordinatesMove(ev: MouseEvent | TouchEvent, treshold?: number) {
				const finalTreshold: number = treshold ? treshold : 10

				const position: () => ICoordinates = () => {
					if (ev.type === 'touchmove' || ev.type === 'touchstart') {
						return {
							x: (ev as TouchEvent).touches[0].clientX,
							y: (ev as TouchEvent).touches[0].clientY,
						}
					}

					return {
						x: (ev as MouseEvent).clientX,
						y: (ev as MouseEvent).clientY,
					}
				}

				const cursorPosition: ICoordinates = position()

				if (treshold && treshold < 2) {
					return cursorPosition
				} else if (
					Math.abs(cursorPosition.x - this.parentState.position.x) >=
						finalTreshold ||
					Math.abs(cursorPosition.y - this.parentState.position.y) >=
						finalTreshold
				) {
					const rounded: ICoordinates = {
						x:
							Math.round(cursorPosition.x / finalTreshold) *
							finalTreshold,
						y:
							Math.round(cursorPosition.y / finalTreshold) *
							finalTreshold,
					}

					return rounded
				}

				return this.parentState.position
			},
			getOptionLine(opt: any) {
				return `
					<div class="line-opt ${opt.value}">
						<div></div>
					</div>
				`
			},
			handleChangeItemPoint(item: IOrganizationTreeItem, index: number) {
				this.localList[index] = { ...item }

				this.$nextTick(() => this.$emit('change', this.localList))
			},
			handleChangeLineType(selected: any) {
				if (this.selectedConnection) {
					const splitConnection: string[] =
						this.selectedConnection.key.split('-connection-')

					this.selectedConnection = null

					const itemIndex: number = Number(
						splitConnection[0].split('-item-')[1],
					)
					const connectionIndex: number = Number(splitConnection[1])

					if (this.localList[itemIndex]) {
						const connections: IConnection[] = [
							...(this.localList[itemIndex].connections || []),
						]
						connections[connectionIndex].type = selected

						this.localList[itemIndex].connections = [...connections]

						this.$nextTick(() => {
							this.$emit('change', this.localList)
						})
					}
				}
			},
			handleClickItem(item: IOrganizationTreeItem, index: number) {
				this.$emit('clickItem', item, index)
			},
			handleConnectionDragged(io: string, fromRect: DOMRect) {
				this.connectorState.from = io
				this.connectorState.fromRect = { ...fromRect.toJSON() }
				this.selectedConnection = null
			},
			handleItemChangePosition(coordinates: ICoordinates) {
				if (this.draggedItem) {
					const index: number = Number(
						this.draggedItem.key.split('-item-')[1],
					)

					const tempList: IOrganizationTreeItem[] = [
						...this.localList,
					]

					const lastCoordinates: ICoordinates = {
						...tempList[index].coordinates,
					}

					if (
						lastCoordinates.x !== coordinates.x ||
						lastCoordinates.y !== coordinates.y
					) {
						this.isItemMoved = true

						tempList[index] = {
							...this.localList[index],
							coordinates,
						}

						this.localList = [...tempList]

						this.$nextTick(() =>
							this.doUpdateItemMovedConnections(index),
						)
					}
				}
			},
			handleItemDragged(item: IDraggedItem) {
				this.draggedItem = { ...item }
				this.selectedItem = { ...item }
				this.mouseState.position = { ...item.coordinates }
				this.parentState.position = { ...item.coordinates }
				this.selectedConnection = null
			},
			handleParentClick(ev: MouseEvent | TouchEvent) {
				const coordinates: ICoordinates = this.getCoordinatesMove(ev, 1)

				const optionsWrapper: HTMLElement = this.$refs[
					'connection-options-wrapper'
				] as HTMLElement

				const target: HTMLElement = ev.target as HTMLElement

				if (
					!this.selectedConnection ||
					(this.selectedConnection &&
						(!optionsWrapper ||
							(optionsWrapper &&
								!optionsWrapper.contains(target) &&
								!optionsWrapper.isSameNode(target))))
				) {
					this.selectedConnection = null
					this.parentState.isDrag = true
					this.mouseState.mouse = { ...coordinates }
					this.mouseState.position = { ...coordinates }
					this.mouseState.positionStart = { ...coordinates }
					this.selectedLineType = 'solid'
					this.selectedItem = null
				}
			},
			handleParentClickOutside(event: MouseEvent) {
				const target: HTMLElement = event.target as HTMLElement
				const parent: HTMLElement = this.$refs[
					'organization-wrapper'
				] as any

				if (
					target &&
					parent &&
					!parent.contains(target) &&
					!target.isSameNode(parent)
				) {
					this.isItemMoved = false
					this.parentState.isDrag = false
					this.draggedItem = null
					this.connectorState = {
						from: null,
						fromRect: null,
						path: undefined,
						toCoordinates: null,
					}
					this.pointState = {
						fromRect: null,
						target: null,
						toCoordinates: null,
					}
					this.selectedItem = null
				}
			},
			handleParentDragEnd(ev: MouseEvent | TouchEvent) {
				const { x, y }: ICoordinates = this.getCoordinatesEnd(ev)
				const { coordinates }: ICanvasState = this.canvasState

				const targetX: number =
					coordinates.x + -(this.mouseState.position.x - x)
				const targetY: number =
					coordinates.y + -(this.mouseState.position.y - y)

				if (this.parentState.isDrag) {
					this.canvasState.coordinates = {
						x: targetX,
						y: targetY,
					}
				} else if (this.connectorState.from) {
					const targetDrop: HTMLElement = ev.target as HTMLElement

					if (
						targetDrop.id !== this.connectorState.from &&
						targetDrop.classList.contains('io')
					) {
						const isConnectionExist: boolean =
							this.isConnectionExist(
								this.connectorState.from,
								targetDrop.id,
							)

						if (!isConnectionExist) {
							const fromItemId: string =
								this.connectorState.from.split('-io-')[0]
							const fromIOIndex: number = Number(
								this.connectorState.from.split('-io-')[1],
							)
							const fromItemIndex: number = Number(
								fromItemId.split('-item-')[1],
							)

							const toItemId: string =
								targetDrop.id.split('-io-')[0]
							const toIOIndex: number = Number(
								targetDrop.id.split('-io-')[1],
							)
							const toItemIndex: number = Number(
								toItemId.split('-item-')[1],
							)

							if (
								this.localList[fromItemIndex] &&
								this.localList[toItemIndex] &&
								this.connectorState.fromRect
							) {
								const tempList: IOrganizationTreeItem[] = [
									...this.localList,
								]

								tempList[fromItemIndex].connections = [
									...(tempList[fromItemIndex].connections ||
										[]),
									{
										from: {
											io: fromIOIndex,
											item: fromItemIndex,
										},
										to: {
											io: toIOIndex,
											item: toItemIndex,
										},
										type: 'solid',
									},
								]

								this.localList = [...tempList]
							}
						}
					}
				} else if (this.draggedItem && !this.isItemMoved) {
					const { key } = this.draggedItem
					const itemIndex: number = Number(
						String(key).split('-item-')[1],
					)

					this.$emit(
						'clickItem',
						this.localList[itemIndex],
						itemIndex,
					)
				}

				this.$nextTick(() => {
					if (
						this.draggedItem ||
						this.pointState.target ||
						this.connectorState.from
					) {
						this.$nextTick(() =>
							this.$emit('change', this.localList),
						)
					}

					this.isItemMoved = false
					this.parentState.isDrag = false
					this.draggedItem = null
					this.connectorState = {
						from: null,
						fromRect: null,
						path: undefined,
						toCoordinates: null,
					}
					this.pointState = {
						fromRect: null,
						target: null,
						toCoordinates: null,
					}
				})
			},
			async handleParentKeydown(ev: KeyboardEvent) {
				if (ev.key === 'Delete' || ev.key === 'Backspace') {
					if (this.selectedConnection) {
						ev.preventDefault()

						const splitConnection: string[] =
							this.selectedConnection.key.split('-connection-')

						this.selectedConnection = null

						const itemIndex: number = Number(
							splitConnection[0].split('-item-')[1],
						)
						const connectionIndex: number = Number(
							splitConnection[1],
						)

						if (this.localList[itemIndex]) {
							const connections: IConnection[] = [
								...(this.localList[itemIndex].connections ||
									[]),
							]

							this.localList[itemIndex].connections =
								connections.filter(
									(_it: IConnection, idx: number) =>
										idx !== connectionIndex,
								)

							this.$nextTick(() => {
								this.$emit('change', this.localList)
							})
						}
					} else if (this.selectedItem) {
						ev.preventDefault()

						const itemIndex: number = Number(
							this.selectedItem.key.split('-item-')[1],
						)

						const tempList: IOrganizationTreeItem[] = [
							...this.localList,
						].filter(
							(_it: IOrganizationTreeItem, idx: number) =>
								idx !== itemIndex,
						)

						const removeConnections: IOrganizationTreeItem[] = [
							...tempList,
						].map((it: IOrganizationTreeItem) => {
							if (it.connections) {
								const modConnections: IConnection[] = [
									...it.connections,
								]
									.filter(
										(itConnection: IConnection) =>
											itConnection.from.item !==
												itemIndex &&
											itConnection.to.item !== itemIndex,
									)
									.map((itConnection: IConnection) => {
										if (
											itConnection.from.item >
												itemIndex ||
											itConnection.to.item > itemIndex
										) {
											return {
												...itConnection,
												...(itConnection.from.item >
													itemIndex && {
													from: {
														...itConnection.from,
														item:
															itConnection.from
																.item - 1,
													},
												}),
												...(itConnection.to.item >
													itemIndex && {
													to: {
														...itConnection.to,
														item:
															itConnection.to
																.item - 1,
													},
												}),
											}
										}

										return itConnection
									})

								return {
									...it,
									connections: modConnections,
								}
							}

							return it
						})

						this.localList = [...removeConnections]

						this.$nextTick(() => {
							this.$emit('change', this.localList)
						})
					}
				}
			},
			handleParentPointerDown(ev: PointerEvent) {
				this.parentPointerState.events.push(ev)
			},
			handleParentPointerMove(ev: PointerEvent) {
				this.parentPointerState.events = [
					...this.parentPointerState.events,
				].map((it: PointerEvent) => {
					if (it.pointerId === ev.pointerId) {
						return ev
					}

					return it
				})

				this.$nextTick(() => {
					if (this.parentPointerState.events.length === 2) {
						const currentDiff: number = Math.abs(
							this.parentPointerState.events[0].clientX -
								this.parentPointerState.events[1].clientX,
						)

						if (
							this.parentPointerState.prevDiff > 100 &&
							currentDiff > this.parentPointerState.prevDiff
						) {
							this.doParentZoom(0.1)
						} else if (
							this.parentPointerState.prevDiff > 100 &&
							currentDiff < this.parentPointerState.prevDiff
						) {
							this.doParentZoom(-0.1)
						}

						this.parentPointerState.prevDiff = currentDiff
					}
				})
			},
			handleParentPointerUp(ev: PointerEvent) {
				this.parentPointerState.events = [
					...this.parentPointerState.events,
				].filter((it: PointerEvent) => it.pointerId !== ev.pointerId)

				this.$nextTick(() => {
					if (this.parentPointerState.events.length < 2) {
						this.parentPointerState.prevDiff = -1
					}
				})
			},
			handleParentPosition(ev: MouseEvent | TouchEvent) {
				const positionTreshold: number = this.pointState.target
					? 5
					: this.connectorState.from
					? 1
					: 10

				const { x, y }: ICoordinates = this.getCoordinatesMove(
					ev,
					positionTreshold,
				)

				const { x: parentX, y: parentY } = this.parentState.position

				const { coordinates, zoom }: ICanvasState = this.canvasState
				const canvasRect: DOMRect | null = this.getCanvasRect()

				if (this.parentState.isDrag) {
					const targetX: number =
						coordinates.x + -(this.mouseState.position.x - x)
					const targetY: number =
						coordinates.y + -(this.mouseState.position.y - y)

					this.canvasStyle = {
						transform: `translate(${targetX}px, ${targetY}px) scale(${zoom})`,
					}
				} else if (this.draggedItem) {
					ev.preventDefault()

					const { x: posX, y: posY } = this.mouseState.position

					const targetX: number =
						((posX - x) * (canvasRect?.width || 0)) /
						((canvasRect?.width || 0) * zoom)

					const targetY: number =
						((posY - y) * (canvasRect?.height || 0)) /
						((canvasRect?.height || 0) * zoom)

					this.handleItemChangePosition({
						x:
							Math.round(
								(this.draggedItem.elem.offsetLeft - targetX) /
									10,
							) * 10,
						y:
							Math.round(
								(this.draggedItem.elem.offsetTop - targetY) /
									10,
							) * 10,
					})

					this.$nextTick(() => (this.mouseState.position = { x, y }))
				} else if (this.connectorState.from) {
					this.connectorState.toCoordinates = {
						x,
						y,
					}

					this.$nextTick(() => this.doSetTempConnectionPath())
				} else if (
					this.pointState.target &&
					this.canvasState.elem &&
					(x !== parentX || y !== parentY)
				) {
					const {
						height,
						width,
						x: canvasX,
						y: canvasY,
					}: DOMRect = this.canvasState.elem
						.getBoundingClientRect()
						.toJSON()

					const targetX: number =
						x * (width / (width * zoom)) -
						canvasX * (width / (width * zoom))
					const targetY =
						y * (height / (height * zoom)) -
						canvasY * (height / (height * zoom))

					const { target } = this.pointState

					const tempConnections: IConnection[] = [
						...(this.localList[target.item].connections || []),
					]
					const tempPoints: ICoordinates[] = [
						...(tempConnections[target.connection].points || []),
					]

					tempPoints[target.point] = {
						x: Math.round(targetX / 5) * 5,
						y: Math.round(targetY / 5) * 5,
					}

					this.doUpdatePointMovedConnection(
						[...tempPoints],
						target.connection,
						target.item,
					)

					tempConnections[target.connection] = {
						...tempConnections[target.connection],
						points: [...tempPoints],
					}

					this.localList[target.item].connections = [
						...tempConnections,
					]
				}

				this.parentState.position = {
					x,
					y,
				}

				if (ev.type === 'touchmove') {
					this.mouseState.mouse = {
						x,
						y,
					}
				}
			},
			handleParentZoom(ev: WheelEvent) {
				if (ev.ctrlKey) {
					ev.preventDefault()

					if (ev.deltaY > 0 && this.canvasState.zoom > 0.5) {
						this.doParentZoom(-0.1)
					} else if (this.canvasState.zoom < 1.6) {
						this.doParentZoom(0.1)
					}
				}
			},
			handlePointDragged(target: IPointTarget, fromRect: DOMRect) {
				this.pointState.target = { ...target }
				this.pointState.fromRect = { ...fromRect.toJSON() }
			},
			handleSelectConnection(connection: ISelectedConnection) {
				this.selectedConnection = { ...connection }
				this.selectedLineType = connection.type || 'solid'
			},
			isConnectionExist(fromId: string, toId: string) {
				const connections: IConnection[] = [...this.localList].flatMap(
					(item: IOrganizationTreeItem) =>
						item.connections ? [...item.connections] : [],
				)

				return connections.some((it: IConnection) => {
					const itemFromId: string = `org-${this.$.uid}-item-${it.from.item}-io-${it.from.io}`
					const itemToId: string = `org-${this.$.uid}-item-${it.to.item}-io-${it.to.io}`

					return (
						(fromId === itemFromId && toId === itemToId) ||
						(fromId === itemToId && toId === itemFromId)
					)
				})
			},
			isItemDragged(key: string) {
				return this.draggedItem?.key === key && this.isItemMoved
			},
			isItemSelected(key: string) {
				return this.selectedItem?.key === key
			},
		},
		watch: {
			list: {
				deep: true,
				handler(newValue: IOrganizationTreeItem[]) {
					this.localList = [...newValue]
				},
				immediate: true,
			},
		},
		mounted() {
			if (this.$refs['canvas-tree']) {
				this.canvasState.elem = this.$refs['canvas-tree'] as HTMLElement
			}

			document.addEventListener('keydown', this.handleParentKeydown)
			document.addEventListener('click', (event: MouseEvent) =>
				this.handleParentClickOutside(event),
			)
		},
		unmounted() {
			this.canvasState.elem = null

			document.removeEventListener('keydown', this.handleParentKeydown)
			document.removeEventListener('click', (event: MouseEvent) =>
				this.handleParentClickOutside(event),
			)
		},
		expose: ['doExport'],
	})
</script>

<style lang="scss">
	@import '../../assets/scss/components/_organization-tree.scss';
</style>
