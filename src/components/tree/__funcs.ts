import { ITreeItem } from '@/interface'

export const isSelected = (
	item: ITreeItem,
	selected?: Record<any, ITreeItem>,
) => {
	if (selected) {
		return !!selected[String(item.value)]
	}

	return false
}

export const getAllChilds = (item: ITreeItem) => {
	const childs: ITreeItem[] = []

	if (item.children) {
		let tempChilds: ITreeItem[] = item.children.flatMap(
			(item: ITreeItem) => (item.children ? [...item.children] : item),
		)

		const hasMoreChild: () => boolean = () => {
			return tempChilds.some((value: ITreeItem) => !!value.children)
		}

		do {
			tempChilds = tempChilds.flatMap((item) =>
				item.children ? [...item.children] : item,
			)
		} while (hasMoreChild())

		return tempChilds
	}

	return childs
}
