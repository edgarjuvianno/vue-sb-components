<template>
	<div class="tree-view" v-bind="{ ...$attrs }">
		<ul>
			<sb-tree-item
				v-for="(item, index) in list"
				:check="check"
				:expanded="expanded"
				:item="item"
				:key="`item-${index}`"
				:multi="multi"
				:selected="localSelected"
				@on-deselect="handleDeselect"
				@on-select="handleSelect"
			/>
		</ul>
	</div>
</template>

<script lang="ts">
	import { defineComponent, PropType } from 'vue'

	// components
	import TreeItem from './__item.vue'
	import { ITreeItem } from '@/interface'

	export default defineComponent({
		emits: ['onChange'],
		props: {
			check: {
				required: false,
				type: Boolean,
			},
			expanded: {
				required: false,
				type: Boolean,
			},
			list: {
				required: true,
				type: Object as PropType<ITreeItem[]>,
			},
			multi: {
				required: false,
				type: Boolean,
			},
			selected: {
				required: false,
				type: Object as PropType<ITreeItem[] | ITreeItem>,
			},
		},
		name: 'sb-tree-view',
		components: {
			'sb-tree-item': TreeItem,
		},
		data() {
			return {
				localSelected: {} as any,
			}
		},
		methods: {
			handleChange() {
				if (this.multi) {
					this.$emit('onChange', Object.values(this.localSelected))
				} else {
					this.$emit(
						'onChange',
						Object.values(this.localSelected)[0] || null,
					)
				}
			},
			handleDeselect(item: ITreeItem | ITreeItem[]) {
				const tempSelected: Record<any, ITreeItem> = {
					...this.localSelected,
				}

				if (Array.isArray(item)) {
					const keys: any[] = Object.keys({
						...this.localSelected,
					})
					const values: any[] = item.map((it: ITreeItem) =>
						String(it.value),
					)

					const filtered: any[] = keys.filter(
						(it: any) => values.indexOf(it) < 0,
					)

					this.localSelected = filtered.reduce(
						(prev: any, curr: any) => ({
							...prev,
							[curr]: tempSelected[curr],
						}),
						{},
					)
				} else {
					if (tempSelected[item.value]) {
						delete tempSelected[item.value]
					}

					this.localSelected = {
						...tempSelected,
					}
				}

				this.$nextTick(() => {
					this.handleChange()
				})
			},
			handleSelect(item: ITreeItem | ITreeItem[]) {
				if (Array.isArray(item)) {
					const combined: any[] = [
						...Object.values(this.localSelected),
						...item,
					]

					this.localSelected = combined.reduce(
						(prev: any, curr: ITreeItem) => ({
							...prev,
							[curr.value]: curr,
						}),
						{},
					)
				} else {
					if (this.multi) {
						this.localSelected = {
							...this.localSelected,
							[item.value]: item,
						}
					} else {
						this.localSelected = {
							[item.value]: item,
						}
					}
				}

				this.$nextTick(() => {
					this.handleChange()
				})
			},
		},
		watch: {
			selected: {
				deep: true,
				handler(newValue: ITreeItem[] | ITreeItem | undefined) {
					if (newValue) {
						if (Array.isArray(newValue)) {
							const tempSelected: Record<any, any> = {}

							newValue.forEach((it: ITreeItem) => {
								tempSelected[it.value] = it
							})

							this.localSelected = { ...tempSelected }
						} else {
							this.localSelected = {
								[newValue.value]: newValue,
							}
						}
					} else {
						this.localSelected = {}
					}
				},
				immediate: true,
			},
		},
	})
</script>

<style lang="scss">
	@import '../../assets/scss/components/_tree-view.scss';
</style>
