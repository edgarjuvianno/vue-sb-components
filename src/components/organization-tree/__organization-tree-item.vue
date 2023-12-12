<template>
	<li
		class="child-tree"
		:class="{
			'has-childs': !!item.childs?.length,
		}"
	>
		<template v-if="item.department">
			<div
				class="department"
				:class="{
					'has-childs': !!item.childs?.length,
				}"
				v-if="item.department"
			>
				{{ item.department }}
			</div>
			<ul class="parent-tree" v-if="item.childs?.length">
				<sb-organization-tree-item
					:item="child"
					:key="`${String($.vnode.key)}-${idx}`"
					:last-index="lastIndex + idx + 1"
					v-bind="{
						isDraggable,
					}"
					v-for="(child, idx) in item.childs"
					@change-item="handleEmitChange"
				/>
			</ul>
		</template>
		<template v-else-if="!item.childs?.length">
			<div
				class="card"
				:class="{
					draggable: isDraggable,
					dragged: isDragged(String(lastIndex)),
					droparea: dropTarget === String(lastIndex),
				}"
				:id="String(lastIndex)"
				v-bind="{
					draggable: isDraggable,
				}"
				@dragend="handleDragEnd"
				@dragenter.prevent="handleDragEnter"
				@dragleave.prevent="handleDragLeave"
				@dragover.prevent="handleDragEnter"
				@dragstart="handleDragCard($event, item)"
				@drop.prevent="handleDropCard($event, item)"
			>
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
					<div
						v-html="item.additionalInfo"
						v-if="item.additionalInfo"
					></div>
				</div>
			</div>
		</template>
		<template v-else>
			<div
				class="card has-childs"
				:class="{
					draggable: isDraggable && lastIndex > 1,
					dragged: isDragged(String(lastIndex)),
					droparea: dropTarget === String(lastIndex),
				}"
				:id="String(lastIndex)"
				v-bind="{
					draggable: isDraggable && lastIndex > 1,
					...(lastIndex > 1 && {
						onDragend: handleDragEnd,
						onDragstart: (ev: any) => handleDragCard(ev, item),
					}),
				}"
				@dragenter.prevent="handleDragEnter"
				@dragleave.prevent="handleDragLeave"
				@dragover.prevent="handleDragEnter"
				@drop.prevent="handleDropCard($event, item)"
			>
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
					<div
						v-html="item.additionalInfo"
						v-if="item.additionalInfo"
					></div>
				</div>
			</div>
			<ul class="parent-tree">
				<sb-organization-tree-item
					:item="child"
					:key="`${String($.vnode.key)}-${idx}`"
					:last-index="lastIndex + idx + 1"
					v-bind="{
						isDraggable,
					}"
					v-for="(child, idx) in item.childs"
					@change-item="handleEmitChange"
				/>
			</ul>
		</template>
	</li>
</template>

<script lang="ts">
	import { PropType, defineComponent } from 'vue'
	import {
		IOrganizationCurrentData,
		IOrganizationTreeItem,
	} from '@/interface'

	export default defineComponent({
		emits: {
			changeItem: (
				_parent: IOrganizationCurrentData,
				_target: IOrganizationCurrentData,
			) => true,
		},
		props: {
			isDraggable: {
				required: false,
				type: Boolean,
			},
			item: {
				required: true,
				type: Object as PropType<IOrganizationTreeItem>,
			},
			lastIndex: {
				required: true,
				type: Number,
			},
		},
		name: 'sb-organization-tree-item',
		data() {
			return {
				draggedCards: [] as string[],
				dropTarget: null as string | null,
				onDropTimeout: null as any,
			}
		},
		computed: {},
		methods: {
			handleDragCard(ev: DragEvent, item: IOrganizationTreeItem) {
				ev.stopPropagation()

				const target: HTMLDivElement = ev.target as HTMLDivElement
				this.draggedCards.push(target.id)

				ev.dataTransfer?.setData(
					'text/html',
					JSON.stringify({
						data: { ...item },
						index: this.$.vnode.key,
					}),
				)
			},
			handleDragEnd(ev: DragEvent) {
				ev.stopPropagation()

				const target: HTMLDivElement = ev.target as HTMLDivElement
				this.draggedCards = [...this.draggedCards].filter(
					(it: string) => it !== target.id,
				)
			},
			handleDragEnter(ev: DragEvent) {
				const target: HTMLDivElement = ev.target as HTMLDivElement

				this.dropTarget = target.id

				if (this.onDropTimeout) {
					clearTimeout(this.onDropTimeout)
				}
			},
			handleDragLeave() {
				this.onDropTimeout = setTimeout(() => {
					this.dropTarget = null
				}, 50)
			},
			handleDropCard(ev: DragEvent, item: IOrganizationTreeItem) {
				ev.stopPropagation()
				this.handleDragLeave()

				const currentData: string | undefined =
					ev.dataTransfer?.getData('text/html')

				if (currentData) {
					const jsonString: string = currentData.replace(
						'<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">',
						'',
					)
					const parsedJson: IOrganizationCurrentData = {
						...JSON.parse(jsonString),
					}
					const parentSequences: string = this.$.vnode.key as string

					this.$emit(
						'changeItem',
						{
							data: item,
							index: parentSequences,
						},
						parsedJson,
					)
				}
			},
			handleEmitChange(
				parent: IOrganizationCurrentData,
				target: IOrganizationCurrentData,
			) {
				this.$emit('changeItem', parent, target)
			},
			isDragged(id: string) {
				return this.draggedCards.indexOf(id) > -1
			},
		},
	})
</script>
