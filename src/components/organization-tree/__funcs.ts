import { IOrganizationTreeItem } from '@/interface'

const getAllItems: (
	items: IOrganizationTreeItem[],
) => IOrganizationTreeItem[] = (items: IOrganizationTreeItem[]) => {
	let childs: IOrganizationTreeItem[] = []

	return [...items]
		.map((it: IOrganizationTreeItem) => {
			if (it.childs && it.childs.length) {
				childs = [...childs, ...it.childs]
			}

			return it
		})
		.concat(childs.length ? getAllItems(childs) : childs)
}

export const addItemToParent: (
	list: IOrganizationTreeItem,
	obj: IOrganizationTreeItem,
) => IOrganizationTreeItem = (
	list: IOrganizationTreeItem,
	obj: IOrganizationTreeItem,
) => {
	if (list.childs) {
		return {
			...list,
			childs: [...list.childs, { ...obj }],
		}
	}

	return { ...list }
}

export const recurseArrayAddItem: (
	item: IOrganizationTreeItem,
	path: string,
	obj: IOrganizationTreeItem,
) => IOrganizationTreeItem = (
	item: IOrganizationTreeItem,
	path: string,
	obj: IOrganizationTreeItem,
) => {
	if (item.childs) {
		const hasTarget: boolean = [...item.childs].some(
			(it: IOrganizationTreeItem) => it.path === path,
		)

		if (hasTarget) {
			return {
				...item,
				childs: [...item.childs].map((it: IOrganizationTreeItem) => {
					if (it.path === path) {
						return {
							...it,
							childs: [...(it.childs || []), obj],
						}
					}

					return it
				}),
			}
		}

		return {
			...item,
			childs: [...item.childs].map((it: IOrganizationTreeItem) =>
				recurseArrayAddItem(it, path, obj),
			),
		}
	}

	return item
}

export const recurseArrayGetData: (
	item: IOrganizationTreeItem,
	path: string,
) => IOrganizationTreeItem | undefined = (
	item: IOrganizationTreeItem,
	path: string,
) => {
	const tempItems: IOrganizationTreeItem[] = [item]
	const items: IOrganizationTreeItem[] = [...getAllItems(item.childs || [])]

	return [...tempItems, ...items].find(
		(it: IOrganizationTreeItem) => it.path === path,
	)
}

export const recurseArrayModifyItem: (
	item: IOrganizationTreeItem,
	path: string,
	obj: IOrganizationTreeItem,
) => IOrganizationTreeItem = (
	item: IOrganizationTreeItem,
	path: string,
	obj: IOrganizationTreeItem,
) => {
	if (item.childs) {
		const hasTarget: boolean = [...item.childs].some(
			(it: IOrganizationTreeItem) => it.path === path,
		)

		if (hasTarget) {
			return {
				...item,
				childs: [...item.childs].map((it: IOrganizationTreeItem) => {
					if (it.path === path) {
						return obj
					}

					return it
				}),
			}
		}

		return {
			...item,
			childs: [...item.childs].map((it: IOrganizationTreeItem) =>
				recurseArrayModifyItem(it, path, obj),
			),
		}
	}

	return item
}

export const recurseArrayRemoveItem: (
	item: IOrganizationTreeItem,
	path: string,
) => IOrganizationTreeItem = (item: IOrganizationTreeItem, path: string) => {
	if (item.childs) {
		const hasTarget: boolean = [...item.childs].some(
			(it: IOrganizationTreeItem) => it.path === path,
		)

		if (hasTarget) {
			return {
				...item,
				childs: [...item.childs].filter(
					(it: IOrganizationTreeItem) => it.path !== path,
				),
			}
		}

		return {
			...item,
			childs: [...item.childs].map((it: IOrganizationTreeItem) =>
				recurseArrayRemoveItem(it, path),
			),
		}
	}

	return item
}
