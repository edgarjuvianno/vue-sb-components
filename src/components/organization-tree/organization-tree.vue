<template>
	<div class="organization-wrapper" v-bind="{ ...$attrs }">
		<ul class="parent-tree">
			<sb-org-tree-item
				:item="localList"
				:key="`${$.uid}-org`"
				:lastIndex="cardIndex"
				v-bind="{
					isDraggable,
				}"
				@change-item="handleChangeItem"
			/>
		</ul>
	</div>
</template>

<script lang="ts">
	import { PropType, defineComponent } from 'vue'
	import {
		IOrganizationCurrentData,
		IOrganizationTreeItem,
	} from '@/interface'
	import {
		recurseArrayAddItem,
		recurseArrayGetChilds,
		recurseArrayModifyItem,
		recurseArrayRemoveItem,
	} from './__funcs'

	// components
	import TreeItem from './__organization-tree-item.vue'

	export default defineComponent({
		emits: {
			change: (_list: IOrganizationTreeItem) => true,
		},
		props: {
			isDraggable: {
				required: false,
				type: Boolean,
			},
			list: {
				required: true,
				type: Object as PropType<IOrganizationTreeItem>,
			},
		},
		name: 'sb-organization-tree',
		components: {
			'sb-org-tree-item': TreeItem,
		},
		data() {
			return {
				cardIndex: 1 as number,
				localList: {} as IOrganizationTreeItem,
			}
		},
		computed: {},
		methods: {
			handleChangeItem(
				parent: IOrganizationCurrentData,
				target: IOrganizationCurrentData,
			) {
				const targetSequence: string[] = target.index
					.split('-org-')[1]
					.split('-')

				if (parent.index.split('-org')[1] === '') {
					const tempList: IOrganizationTreeItem[] = [
						...(this.localList.childs || []),
						target.data,
					]

					const finalArray: IOrganizationTreeItem[] = [
						...recurseArrayRemoveItem(tempList, targetSequence),
					]

					this.$emit('change', {
						...this.localList,
						childs: [...finalArray],
					})
				} else {
					const dropSequence: string[] = parent.index
						.split('-org-')[1]
						.split('-')
					const tempList: IOrganizationTreeItem[] = [
						...(this.localList.childs || []),
					]

					if (targetSequence.length < dropSequence.length) {
						if (!parent.data.childs && !target.data.childs) {
							const modChild: IOrganizationTreeItem[] = [
								...recurseArrayModifyItem(
									tempList,
									dropSequence,
									{
										...parent.data,
										childs: [target.data],
									},
								),
							]

							const removeTarget: IOrganizationTreeItem[] = [
								...recurseArrayRemoveItem(
									modChild,
									targetSequence,
								),
							]

							this.$emit('change', {
								...this.localList,
								childs: [...removeTarget],
							})
						} else {
							const removeParent: IOrganizationTreeItem[] = [
								...recurseArrayRemoveItem(
									tempList,
									dropSequence,
								),
							]

							const parentChilds: IOrganizationTreeItem[] = [
								...(parent.data.childs || []),
							]
							const targetChilds: IOrganizationTreeItem[] = [
								...recurseArrayGetChilds(
									removeParent,
									targetSequence,
								),
							]
							const modTargetData: IOrganizationTreeItem = {
								...target.data,
							}
							delete modTargetData.childs

							const modChild: IOrganizationTreeItem[] = [
								...recurseArrayModifyItem(
									removeParent,
									targetSequence,
									{
										...parent.data,
										childs: [
											...parentChilds,
											...targetChilds,
											modTargetData,
										],
									},
								),
							]

							this.$emit('change', {
								...this.localList,
								childs: [...modChild],
							})
						}
					} else {
						const addedChild: IOrganizationTreeItem[] = [
							...recurseArrayAddItem(
								tempList,
								dropSequence,
								target.data,
							),
						]

						const finalArray: IOrganizationTreeItem[] = [
							...recurseArrayRemoveItem(
								addedChild,
								targetSequence,
							),
						]

						this.$emit('change', {
							...this.localList,
							childs: [...finalArray],
						})
					}
				}
			},
		},
		watch: {
			list: {
				deep: true,
				handler(newValue: IOrganizationTreeItem) {
					if (!Object.keys(newValue).length) {
						this.cardIndex = 1
					}

					this.localList = { ...newValue }
				},
			},
		},
		mounted() {
			this.cardIndex = 1
			this.localList = { ...(this.list || {}) }
		},
	})
</script>

<style lang="scss">
	@import '../../assets/scss/components/_organization-tree.scss';
</style>
