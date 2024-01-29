<template>
	<div
		v-if="item.department"
		class="department"
		:class="{
			connecting: isConnecting,
			draggable: isEditable,
			dragged: isDragged,
			selected: isSelected,
		}"
		:id="String($.vnode.key)"
		:style="getItemPosition"
		@mousedown.stop="handleItemClick"
		@touchstart.stop="handleItemClick"
	>
		<span
			class="io"
			:id="`${String($.vnode.key)}-io-${io}`"
			:key="`io-${io}`"
			v-for="io in [...Array(8).keys()]"
			@mousedown.stop="handleClickIO($event, io)"
			@touchstart.stop="handleClickIO($event, io)"
		></span>
		<div class="text">
			{{ item.department }}
		</div>
	</div>
	<div
		v-else
		class="card"
		:class="{
			connecting: isConnecting,
			draggable: isEditable,
			dragged: isDragged,
			selected: isSelected,
		}"
		:id="String($.vnode.key)"
		:style="getItemPosition"
		@mousedown.stop="handleItemClick"
		@touchstart.stop="handleItemClick"
	>
		<span
			class="io"
			:id="`${String($.vnode.key)}-io-${io}`"
			:key="`io-${io}`"
			v-for="io in [...Array(8).keys()]"
			@mousedown.stop="handleClickIO($event, io)"
			@touchstart.stop="handleClickIO($event, io)"
		></span>
		<div
			class="item-photo"
			:style="{
				backgroundImage: `url(${item.photo})`,
			}"
			v-if="item.photo"
		></div>
		<div class="data-wrapper">
			<template v-if="!item.renderInfo">
				<p class="name">{{ item.name || '-' }}</p>
				<p class="position">{{ item.position || '-' }}</p>
			</template>
			<div v-html="item.renderInfo()" v-else></div>
		</div>
	</div>
	<svg
		class="connection"
		xmlns="http://www.w3.org/2000/svg"
		:class="[
			connection.type || 'solid',
			isConnectionSelected(index) && 'selected',
			isEditable && 'editable',
		]"
		:id="`${String($.vnode.key)}-connection-${index}`"
		:key="`${String($.vnode.key)}-connection-${index}`"
		v-for="(connection, index) in item.connections || []"
	>
		<path
			:d="getConnectionPathString(connection)"
			@click.stop="handleConnectionClick($event, index)"
			@dblclick.stop="handleConnectionDoubleClick($event, index)"
		></path>
		<circle
			class="circle"
			r="6"
			:cx="circle.x"
			:cy="circle.y"
			:key="`${String(
				$.vnode.key,
			)}-connection-${index}-circle-${indexCircle}`"
			v-for="(circle, indexCircle) in connection.points || []"
			@dblclick.stop="handleCircleDoubleClick(index, indexCircle)"
			@mousedown.stop="handleClickPoint($event, index, indexCircle)"
			@touchstart.stop="handleClickPoint($event, index, indexCircle)"
		></circle>
	</svg>
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
		IPointTarget,
		ISelectedConnection,
	} from '@/interface'
	import { doSortPoints, getConnectionPath } from './__funcs'

	export default defineComponent({
		emits: {
			changePoint: (_item: IOrganizationTreeItem, _index: number) => true,
			clickItem: (_item: IOrganizationTreeItem, _index: number) => true,
			dragItem: (_item: IDraggedItem) => true,
			dragConnection: (_io: string, _fromRect: DOMRect) => true,
			dragPoint: (_target: IPointTarget, _fromRect: DOMRect) => true,
			selectConnection: (_connection: ISelectedConnection) => true,
		},
		props: {
			canvasState: {
				required: true,
				type: Object as PropType<ICanvasState>,
			},
			connectorState: {
				required: true,
				type: Object as PropType<IConnectorState>,
			},
			isDragged: {
				required: false,
				type: Boolean,
			},
			isSelected: {
				required: false,
				type: Boolean,
			},
			isEditable: {
				required: false,
				type: Boolean,
			},
			item: {
				required: true,
				type: Object as PropType<IOrganizationTreeItem>,
			},
			selectedConnection: {
				required: false,
				type: Object as PropType<ISelectedConnection | null>,
			},
		},
		name: 'sb-organization-tree-item',
		data() {
			return {
				connectionsPath: {} as Record<string, any>,
			}
		},
		computed: {
			getItemPosition() {
				return {
					left: this.item.coordinates.x
						? `${this.item.coordinates.x}px`
						: 0,
					top: this.item.coordinates.y
						? `${this.item.coordinates.y}px`
						: 0,
				}
			},
			isConnecting() {
				if (this.connectorState.from) {
					return (
						this.connectorState.from.split('-io-')[0] ===
						this.$.vnode.key
					)
				}

				return false
			},
		},
		methods: {
			getConnectionPath(connection: IConnection) {
				if (this.canvasState.elem) {
					const orgUID: string = String(this.$.vnode.key)
						.split('-item-')[0]
						.replace('org-', '')

					const canvasRect: DOMRect = this.canvasState.elem
						.getBoundingClientRect()
						.toJSON()

					const canvasHeight: number = canvasRect.height || 0
					const canvasWidth: number = canvasRect.width || 0

					const canvasWidthZoom: number =
						canvasWidth / (canvasWidth * this.canvasState.zoom) || 0
					const canvasHeightZoom: number =
						canvasHeight / (canvasHeight * this.canvasState.zoom) ||
						0

					return getConnectionPath(connection, orgUID, {
						canvasHeight: canvasHeightZoom,
						canvasWidth: canvasWidthZoom,
						x: canvasRect.x,
						y: canvasRect.y,
					})
				}

				return undefined
			},
			getConnectionPathString(connection: IConnection) {
				return this.connectionsPath[
					`${String(this.$.vnode.key)}-connection-${
						connection.from.item
					}-${connection.from.io}-${connection.to.item}-${
						connection.to.io
					}`
				]
			},
			getCoordinatesMove(ev: MouseEvent | TouchEvent) {
				if (ev.type === 'touchstart') {
					return {
						x: (ev as TouchEvent).touches[0].clientX,
						y: (ev as TouchEvent).touches[0].clientY,
					}
				}

				return {
					x: (ev as MouseEvent).clientX,
					y: (ev as MouseEvent).clientY,
				}
			},
			handleCircleDoubleClick(
				indexConnection: number,
				indexCircle: number,
			) {
				if (this.isEditable) {
					const tempConnections: IConnection[] = [
						...(this.item.connections || []),
					]
					const tempPoints: ICoordinates[] = [
						...(tempConnections[indexConnection]?.points || []),
					]

					tempPoints.splice(indexCircle, 1)

					tempConnections[indexConnection] = {
						...tempConnections[indexConnection],
						points: [...tempPoints],
					}

					const itemIndex: number = Number(
						String(this.$.vnode.key).split('-item-')[1],
					)

					this.$emit(
						'changePoint',
						{
							...this.item,
							connections: [...tempConnections],
						},
						itemIndex,
					)
				}
			},
			handleClickIO(ev: MouseEvent | TouchEvent, targetIO: number) {
				const target: HTMLElement = ev.target as HTMLElement

				if (target && this.isEditable) {
					const fromRect: DOMRect = target.getBoundingClientRect()

					this.$emit(
						'dragConnection',
						`${String(this.$.vnode.key)}-io-${targetIO}`,
						fromRect,
					)
				}
			},
			handleClickPoint(
				ev: MouseEvent | TouchEvent,
				indexConnection: number,
				indexPoint: number,
			) {
				const target: HTMLElement = ev.target as HTMLElement

				if (target && this.isEditable) {
					const fromRect: DOMRect = target.getBoundingClientRect()

					this.$emit(
						'dragPoint',
						{
							connection: indexConnection,
							item: Number(
								String(this.$.vnode.key).split('-item-')[1],
							),
							point: indexPoint,
						},
						fromRect,
					)
				}
			},
			handleConnectionClick(ev: MouseEvent, index: number) {
				if (this.isEditable && ev.target) {
					const connection: IConnection = {
						...((this.item.connections as IConnection[])[index] ||
							{}),
					}

					this.$emit('selectConnection', {
						from: connection.from,
						key: `${String(this.$.vnode.key)}-connection-${index}`,
						to: connection.to,
						type: connection.type,
					})
				}
			},
			handleConnectionDoubleClick(ev: MouseEvent, index: number) {
				const tempConnections: IConnection[] = [
					...(this.item.connections || []),
				]

				const { elem, zoom } = this.canvasState

				if (elem && this.isEditable) {
					const { height, width, x, y }: DOMRect = elem
						.getBoundingClientRect()
						.toJSON()
					const posX: number = ev.clientX
					const posY: number = ev.clientY

					const targetX: number =
						posX * (width / (width * zoom)) -
						x * (width / (width * zoom))
					const targetY =
						posY * (height / (height * zoom)) -
						y * (height / (height * zoom))

					const orgKey: string = String(this.$.vnode.key).split(
						'-item-',
					)[0]

					const elemTo: HTMLElement | null = document.getElementById(
						`${orgKey}-item-${tempConnections[index].to.item}-io-${tempConnections[index].to.io}`,
					)

					if (elemTo && this.canvasState.elem) {
						const {
							height: heightTo,
							width: widthTo,
							x: xTo,
							y: yTo,
						}: DOMRect = elemTo.getBoundingClientRect().toJSON()

						const {
							height: canvasHeight,
							width: canvasWidth,
							x: canvasX,
							y: canvasY,
						}: DOMRect = this.canvasState.elem
							.getBoundingClientRect()
							.toJSON()

						const toX: number =
							widthTo / 2 + (xTo - canvasX) * canvasWidth
						const toY: number =
							heightTo / 2 + (yTo - canvasY) * canvasHeight

						const sortedPoints: ICoordinates[] = [
							...doSortPoints(
								[
									...(tempConnections[index].points || []),
									{
										x: targetX,
										y: targetY,
									},
								],
								{
									x: toX,
									y: toY,
								},
							),
						]

						tempConnections[index] = {
							...tempConnections[index],
							points: [...sortedPoints],
						}

						const itemIndex: number = Number(
							String(this.$.vnode.key).split('-item-')[1],
						)

						this.$emit(
							'changePoint',
							{
								...this.item,
								connections: [...tempConnections],
							},
							itemIndex,
						)
					}
				}
			},
			handleInitConnections() {
				if (this.item.connections) {
					this.connectionsPath = {}

					this.item.connections.forEach((it: IConnection) => {
						const path: string | undefined =
							this.getConnectionPath(it)

						this.connectionsPath[
							`${String(this.$.vnode.key)}-connection-${
								it.from.item
							}-${it.from.io}-${it.to.item}-${it.to.io}`
						] = path
					})
				}
			},
			handleItemClick(ev: MouseEvent | TouchEvent) {
				const target: HTMLElement = ev.target as HTMLElement

				if (!target.classList.contains('io')) {
					if (this.isEditable) {
						const coordinates: ICoordinates =
							this.getCoordinatesMove(ev)

						this.$emit('dragItem', {
							coordinates,
							elem: this.$el.nextSibling,
							key: this.$.vnode.key as string,
						})
					} else {
						const itemIndex: number = Number(
							String(this.$.vnode.key).split('-item-')[1],
						)

						this.$emit('clickItem', this.item, itemIndex)
					}
				}
			},
			isConnectionSelected(index: number) {
				if (this.selectedConnection) {
					return (
						`${String(this.$.vnode.key)}-connection-${index}` ===
						this.selectedConnection.key
					)
				}

				return false
			},
		},
		mounted() {
			this.handleInitConnections()
		},
		watch: {
			'item.connections': {
				deep: true,
				handler() {
					this.$nextTick(() => this.handleInitConnections())
				},
			},
		},
	})
</script>
