<template>
	<li
		class="tree-view-item"
		:class="{
			expanded: item.children && localExpand,
			'has-child': item.children,
		}"
	>
		<template v-if="!item.children">
			<div class="label-wrapper" :class="{ selected: isSelected(item) }">
				<div
					class="check-wrapper"
					v-if="checkBox"
					@click.stop="() => handleClick(item)"
				>
					<span class="check" v-if="isSelected(item)">
						<component :is="iconCheck" />
					</span>
				</div>
				<label
					@click.stop="() => handleClick(item)"
					v-html="item.label"
				>
				</label>
			</div>
		</template>
		<template v-else>
			<div
				class="label-wrapper"
				@click="
					() =>
						checkBox && multi
							? handleCheck(item)
							: toggleExpand(item)
				"
			>
				<component
					:is="iconAngleRight"
					@click.stop="() => toggleExpand(item)"
				/>
				<div
					class="check-wrapper"
					:class="{ 'all-checked': isAllChecked(item) }"
					v-if="checkBox && multi"
				>
					<span class="check" v-if="isAllChecked(item)">
						<component :is="iconCheck" />
					</span>
					<span v-else-if="isPartialChecked(item)">-</span>
				</div>
				<label v-html="item.label"></label>
			</div>
			<ul>
				<sb-tree-view-item
					v-for="(it, index) in item.children"
					:check-box="checkBox"
					:expanded="it.children && !!expanded"
					:item="it"
					:key="`item-${index}`"
					:multi="multi"
					:selected="selected"
					@deselect="handleEmitDeselect"
					@expand="handleEmitExpand"
					@select="handleEmitSelect"
				/>
			</ul>
		</template>
	</li>
</template>

<script lang="ts">
	import { defineComponent, PropType } from 'vue'

	// funcs
	import { getAllChilds, isSelected } from './__funcs'

	// icons
	import { angleRight, check } from '@/assets/icons'
	import { ITreeItem } from '@/interface'

	export default defineComponent({
		emits: {
			deselect: (_item: ITreeItem | ITreeItem[]) => true,
			expand: (_item: ITreeItem, _isExpanded: boolean) => true,
			select: (_item: ITreeItem | ITreeItem[]) => true,
		},
		props: {
			checkBox: {
				required: false,
				type: Boolean,
			},
			expanded: {
				required: false,
				type: Boolean,
			},
			item: {
				required: true,
				type: Object as PropType<ITreeItem>,
			},
			multi: {
				required: false,
				type: Boolean,
			},
			selected: {
				required: false,
				type: Object as PropType<Record<any, ITreeItem>>,
			},
		},
		name: 'sb-tree-view-item',
		data() {
			return {
				localExpand: !!this.expanded || !!this.item.expanded,
			}
		},
		computed: {
			iconAngleRight() {
				return angleRight()
			},
			iconCheck() {
				return check()
			},
		},
		methods: {
			handleEmitDeselect(item: ITreeItem | ITreeItem[]) {
				this.$emit('deselect', item)
			},
			handleEmitExpand(item: ITreeItem, isExpanded: boolean) {
				this.$emit('expand', item, isExpanded)
			},
			handleEmitSelect(item: ITreeItem | ITreeItem[]) {
				this.$emit('select', item)
			},
			handleCheck(item: ITreeItem) {
				if (item.children) {
					const all: boolean = this.isAllChecked(item)
					const childrens: ITreeItem[] = getAllChilds(item)

					if (all) {
						this.handleEmitDeselect(childrens)
					} else {
						this.handleEmitSelect(childrens)
					}
				}
			},
			handleClick(item: ITreeItem) {
				if (isSelected(item, this.selected)) {
					this.handleEmitDeselect(item)
				} else {
					this.handleEmitSelect(item)
				}
			},
			isAllChecked(item: ITreeItem) {
				if (item.children) {
					const childrens: ITreeItem[] = getAllChilds(item)

					const all: boolean = childrens.every(
						(it: ITreeItem) =>
							this.selected && !!this.selected[it.value],
					)

					return all
				}

				return false
			},
			isPartialChecked(item: ITreeItem) {
				if (item.children) {
					const childrens: ITreeItem[] = getAllChilds(item)

					const atLeastOne: boolean = childrens.some(
						(it: ITreeItem) =>
							this.selected && !!this.selected[it.value],
					)

					return atLeastOne && !this.isAllChecked(item)
				}

				return false
			},
			isSelected(item: ITreeItem) {
				return isSelected(item, this.selected)
			},
			toggleExpand(item: ITreeItem) {
				this.handleEmitExpand(item, !this.localExpand)
				this.localExpand = !this.localExpand
			},
		},
	})
</script>
