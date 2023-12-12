import { IOrganizationTreeItem } from '@/interface'

export const recurseArrayAddItem: (
	arr: IOrganizationTreeItem[],
	path: string[],
	obj: IOrganizationTreeItem,
) => IOrganizationTreeItem[] = (
	arr: IOrganizationTreeItem[],
	path: string[],
	obj: IOrganizationTreeItem,
) => {
	const localPath: string[] = [...path]

	if (!localPath.length) {
		return arr
	} else if (arr[Number(localPath[0])]?.childs && localPath.length > 1) {
		const firstIndex: number = Number(localPath[0])
		const childs: IOrganizationTreeItem[] = [
			...(arr[Number(localPath[0])].childs || []),
		]
		localPath.shift()

		return [...arr].map((it: IOrganizationTreeItem, idx: number) => {
			if (idx === firstIndex) {
				return {
					...it,
					childs: [...recurseArrayAddItem(childs, localPath, obj)],
				}
			}

			return it
		})
	}

	return [...arr].map((it: IOrganizationTreeItem, idx: number) => {
		if (idx === Number(localPath[0])) {
			return {
				...it,
				childs: [...(it.childs || []), obj],
			}
		}

		return it
	})
}

export const recurseArrayGetChilds: (
	arr: IOrganizationTreeItem[],
	path: string[],
) => IOrganizationTreeItem[] = (
	arr: IOrganizationTreeItem[],
	path: string[],
) => {
	const localPath: string[] = [...path]

	if (!localPath.length) {
		return arr
	} else if (arr[Number(localPath[0])]?.childs && localPath.length > 1) {
		const childs: IOrganizationTreeItem[] = [
			...(arr[Number(localPath[0])].childs || []),
		]
		localPath.shift()

		return recurseArrayGetChilds(childs, localPath)
	}

	return [...(arr[Number(localPath[0])]?.childs || [])]
}

export const recurseArrayModifyItem: (
	arr: IOrganizationTreeItem[],
	path: string[],
	obj: IOrganizationTreeItem,
) => IOrganizationTreeItem[] = (
	arr: IOrganizationTreeItem[],
	path: string[],
	obj: IOrganizationTreeItem,
) => {
	const localPath: string[] = [...path]

	if (!localPath.length) {
		return arr
	} else if (arr[Number(localPath[0])]?.childs && localPath.length > 1) {
		const firstIndex: number = Number(localPath[0])
		const childs: IOrganizationTreeItem[] = [
			...(arr[Number(localPath[0])].childs || []),
		]
		localPath.shift()

		return [...arr].map((it: IOrganizationTreeItem, idx: number) => {
			if (idx === firstIndex) {
				return {
					...it,
					childs: [...recurseArrayModifyItem(childs, localPath, obj)],
				}
			}

			return it
		})
	}

	return [...arr].map((it: IOrganizationTreeItem, idx: number) => {
		if (idx === Number(localPath[0])) {
			return obj
		}

		return it
	})
}

export const recurseArrayRemoveItem: (
	arr: IOrganizationTreeItem[],
	path: string[],
) => IOrganizationTreeItem[] = (
	arr: IOrganizationTreeItem[],
	path: string[],
) => {
	const localPath: string[] = [...path]

	if (!localPath.length) {
		return arr
	} else if (arr[Number(localPath[0])]?.childs && localPath.length > 1) {
		const firstIndex: number = Number(localPath[0])
		const childs: IOrganizationTreeItem[] = [
			...(arr[Number(localPath[0])].childs || []),
		]
		localPath.shift()

		return [...arr].map((it: IOrganizationTreeItem, idx: number) => {
			if (idx === firstIndex) {
				return {
					...it,
					childs: [...recurseArrayRemoveItem(childs, localPath)],
				}
			}

			return it
		})
	}

	return [...arr].filter(
		(_it: IOrganizationTreeItem, idx: number) =>
			idx !== Number(localPath[0]),
	)
}
