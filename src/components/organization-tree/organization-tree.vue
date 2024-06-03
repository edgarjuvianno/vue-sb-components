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
					const now = new Date().getTime().toString()

					clonedElem.classList.remove('connection-selected')
					clonedElem.style.transform = 'none'
					clonedElem.style.background = 'transparent'
					clonedElem.style.height = `${elemHeight + 40}px`
					clonedElem.style.position = 'relative'
					clonedElem.style.transform = `translate(${
						(minX < 0 ? Math.abs(minX) : minX * -1) + 20
					}px, ${(minY < 0 ? Math.abs(minY) : minY * -1) + 20}px)`
					clonedElem.style.width = `${elemWidth + 40}px`
					clonedElem.id = `org-${this.$.uid}-export-${now}`

					const parent: HTMLElement | null = document.getElementById(
						`org-${this.$.uid}-export-area`,
					)

					if (parent) {
						parent.appendChild(clonedElem)

						const pngDataURI: string | null = await htmlToPNG(
							clonedElem,
							{
								cacheBust: true,
								fetchRequestInit: {
									headers: {
										'Content-Type': 'blob',
									},
								},
								imagePlaceholder: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA1wAAALwCAYAAACDTHTlAAAACXBIWXMAAC4jAAAuIwF4pT92AAAHY2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpiOGY2MzNlMS0wNjM2LTI3NGQtYmFhYy04ZjkxOTE4ZTBiYjkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6YmZjODE0MjMtNmM2Yy0xODQyLTk1NDktNzYwZGZlZDYwZWU5IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9IkM1NzJCOEI0NjE3NUM1MkQwQzZCQ0M1OEMzRjMxMDgzIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9IiIgeG1wOkNyZWF0ZURhdGU9IjIwMjAtMDctMDFUMTg6MjQ6MTYrMDU6MzAiIHhtcDpNb2RpZnlEYXRlPSIyMDIwLTA3LTAxVDIzOjM1OjQxKzA1OjMwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIwLTA3LTAxVDIzOjM1OjQxKzA1OjMwIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6Mjg3NzI5MDEtOGExNy1hYzQxLTkwYmQtMzMxZmFmZGI4YzJkIiBzdEV2dDp3aGVuPSIyMDIwLTA3LTAxVDIzOjM1OjQxKzA1OjMwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBpbWFnZS9qcGVnIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iZGVyaXZlZCIgc3RFdnQ6cGFyYW1ldGVycz0iY29udmVydGVkIGZyb20gaW1hZ2UvanBlZyB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmJmYzgxNDIzLTZjNmMtMTg0Mi05NTQ5LTc2MGRmZWQ2MGVlOSIgc3RFdnQ6d2hlbj0iMjAyMC0wNy0wMVQyMzozNTo0MSswNTozMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyODc3MjkwMS04YTE3LWFjNDEtOTBiZC0zMzFmYWZkYjhjMmQiIHN0UmVmOmRvY3VtZW50SUQ9IkM1NzJC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`,
								skipFonts: true,
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
