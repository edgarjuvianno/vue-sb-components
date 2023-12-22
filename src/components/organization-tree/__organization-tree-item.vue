<template>
	<div
		v-if="item.department"
		class="department"
		:class="{
			connecting: isConnecting,
			draggable: isEditable,
			dragged: isDragged,
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
		{{ item.department }}
	</div>
	<div
		v-else
		class="card"
		:class="{
			connecting: isConnecting,
			draggable: isEditable,
			dragged: isDragged,
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
			<p class="name">{{ item.name }}</p>
			<p class="position">{{ item.position }}</p>
			<div v-html="item.additionalInfo" v-if="item.additionalInfo"></div>
		</div>
	</div>
	<svg
		class="connection"
		xmlns="http://www.w3.org/2000/svg"
		:class="{
			editable: isEditable,
			selected:
				`${String($.vnode.key)}-connection-${index}` ===
				selectedConnection,
		}"
		:key="`${String($.vnode.key)}-connection-${index}`"
		v-for="(connection, index) in item.connections || []"
	>
		<path
			:d="connection.path"
			@click.stop="handleConnectionClick(index)"
			@dblclick.stop="handleConnectionDoubleClick($event, index)"
		></path>
		<circle
			class="circle"
			r="4"
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
	} from './interface'
	import { doUpdateConnectionPath } from './__funcs'

	export default defineComponent({
		emits: {
			changePoint: (_item: IOrganizationTreeItem, _index: number) => true,
			dragItem: (_item: IDraggedItem) => true,
			dragConnection: (_io: string, _fromRect: DOMRect) => true,
			dragPoint: (_target: IPointTarget, _fromRect: DOMRect) => true,
			selectConnection: (_connectionKey: string) => true,
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
				type: String as PropType<string | null>,
			},
		},
		name: 'sb-organization-tree-item',
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

					const updatedConnectionPath: IConnection =
						doUpdateConnectionPath({
							...tempConnections[indexConnection],
							points: [...tempPoints],
						})

					tempConnections[indexConnection] = {
						...updatedConnectionPath,
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
			handleConnectionClick(index: number) {
				if (this.isEditable) {
					this.$emit(
						'selectConnection',
						`${String(this.$.vnode.key)}-connection-${index}`,
					)
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

					const updatedConnectionPath: IConnection =
						doUpdateConnectionPath({
							...tempConnections[index],
							points: [
								...(tempConnections[index].points || []),
								{
									x: targetX,
									y: targetY,
								},
							],
						})

					tempConnections[index] = { ...updatedConnectionPath }

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
			handleItemClick(ev: MouseEvent | TouchEvent) {
				const target: HTMLElement = ev.target as HTMLElement

				if (!target.classList.contains('io') && this.isEditable) {
					const coordinates: ICoordinates =
						this.getCoordinatesMove(ev)

					this.$emit('dragItem', {
						coordinates,
						elem: this.$el.nextSibling,
						key: this.$.vnode.key as string,
					})
				}
			},
		},
	})
</script>
