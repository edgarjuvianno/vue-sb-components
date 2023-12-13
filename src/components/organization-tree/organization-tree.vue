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
		addItemToParent,
		recurseArrayAddItem,
		recurseArrayGetData,
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
		methods: {
			handleChangeItem(
				parent: IOrganizationCurrentData,
				target: IOrganizationCurrentData,
			) {
				const parentPaths: string[] = parent.index
					.replace(`${this.$.uid}-org`, '')
					.split('-')
					.filter((it: string) => it !== '')
				const targetPaths: string[] = target.index
					.replace(`${this.$.uid}-org`, '')
					.split('-')
					.filter((it: string) => it !== '')

				if (!parentPaths.length) {
					const removeItem: IOrganizationTreeItem = {
						...recurseArrayRemoveItem(
							{ ...this.localList },
							target.index,
						),
					}

					const addToParent: IOrganizationTreeItem = {
						...addItemToParent({ ...removeItem }, target.data),
					}

					this.$emit('change', addToParent)
				} else if (parent.index !== target.index) {
					if (targetPaths.length < parentPaths.length) {
						const removeParent: IOrganizationTreeItem = {
							...recurseArrayRemoveItem(
								{ ...this.localList },
								parent.index,
							),
						}

						const parentChilds: IOrganizationTreeItem[] = [
							...(parent.data.childs || []),
						]

						const newTargetData: IOrganizationTreeItem = {
							...recurseArrayGetData(
								{ ...removeParent },
								target.index,
							),
						}

						const modChild: IOrganizationTreeItem = {
							...recurseArrayModifyItem(
								{ ...removeParent },
								target.index,
								{
									...parent.data,
									childs: [...parentChilds, newTargetData],
								},
							),
						}

						this.$emit('change', modChild)
					} else {
						const removeTarget: IOrganizationTreeItem = {
							...recurseArrayRemoveItem(
								{ ...this.localList },
								target.index,
							),
						}

						const addTarget: IOrganizationTreeItem = {
							...recurseArrayAddItem(
								{ ...removeTarget },
								parent.index,
								target.data,
							),
						}

						this.$emit('change', addTarget)
					}
				}
			},
			handleModList(newValue: IOrganizationTreeItem) {
				const modList: (
					item: IOrganizationTreeItem,
					selfIndex?: number,
					ancestorPath?: string,
				) => IOrganizationTreeItem = (
					item: IOrganizationTreeItem,
					selfIndex?: number,
					ancestorPath?: string,
				) => {
					const path: string = !ancestorPath
						? `${this.$.uid}-org`
						: `${ancestorPath}-childs[${selfIndex}]`

					if (item.childs) {
						return {
							...item,
							childs: [...item.childs].map(
								(it: IOrganizationTreeItem, idx: number) => {
									if (it.childs) {
										return modList(it, idx, path)
									}

									return {
										...it,
										path: `${path}-childs[${idx}]`,
									}
								},
							),
							path,
						}
					}

					return {
						...item,
						path,
					}
				}

				this.localList = { ...modList(newValue) }
			},
		},
		watch: {
			list: {
				deep: true,
				handler(newValue: IOrganizationTreeItem) {
					if (!Object.keys(newValue).length) {
						this.cardIndex = 1
					}

					this.handleModList(newValue)
				},
			},
		},
		mounted() {
			this.cardIndex = 1

			this.handleModList({ ...(this.list || {}) })
		},
	})
</script>

<style lang="scss">
	@import '../../assets/scss/components/_organization-tree.scss';
</style>
