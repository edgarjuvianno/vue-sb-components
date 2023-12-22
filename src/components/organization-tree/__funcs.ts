import { IOrganizationTreeItem } from '@/interface'
import { IConnection, ICoordinates } from './interface'

const getUpdatedPointCoordinates: (
	pointIndex: number,
	coordinates: ICoordinates,
) => ICoordinates = (pointIndex: number, coordinates: ICoordinates) => {
	if (pointIndex < 1) {
		return {
			x: coordinates.x + 3,
			y: coordinates.y,
		}
	} else if (pointIndex >= 1 && pointIndex <= 3) {
		return {
			x: coordinates.x,
			y: coordinates.y + 3,
		}
	} else if (pointIndex >= 4 && pointIndex <= 6) {
		return {
			x: coordinates.x,
			y: coordinates.y - 3,
		}
	}

	return {
		x: coordinates.x - 3,
		y: coordinates.y,
	}
}

export const doUpdateConnectionPath: (item: IConnection) => IConnection = (
	item: IConnection,
) => {
	const points: ICoordinates[] = [...(item.points || [])]

	if (points.length) {
		const updatedPath: string = points
			.map((_it: ICoordinates, idx: number) => {
				if (idx === points.length - 1) {
					return `L ${item.pathObject.to.x} ${item.pathObject.to.y}`
				}

				return `L ${points[idx + 1].x} ${points[idx + 1].y}`
			})
			.join(' ')

		const finalPath: string = `M ${item.pathObject.from.x} ${item.pathObject.from.y} L ${points[0].x} ${points[0].y} ${updatedPath}`

		return {
			...item,
			path: finalPath,
		}
	}

	return {
		...item,
		path: `M ${item.pathObject.from.x} ${item.pathObject.from.y} L ${item.pathObject.to.x} ${item.pathObject.to.y}`,
	}
}

export const doUpdateConnectionPathItemMoved: (
	items: IOrganizationTreeItem[],
	itemMoved: number,
	orgUID: string,
	canvasState: Record<string, any>,
) => IOrganizationTreeItem[] = (
	items: IOrganizationTreeItem[],
	itemMoved: number,
	orgUID: string,
	canvasState: Record<string, any>,
) => {
	const { canvasHeight, canvasWidth, x: canvasX, y: canvasY } = canvasState

	const modItems: IOrganizationTreeItem[] = [...items].map(
		(it: IOrganizationTreeItem) => {
			const isAffected: boolean = [...(it.connections || [])].some(
				(itConnection: IConnection) =>
					itConnection.from.item === itemMoved ||
					itConnection.to.item === itemMoved,
			)

			if (isAffected) {
				const modConnections: IConnection[] = [
					...(it.connections || []),
				].map((itConnection: IConnection) => {
					if (
						itConnection.from.item === itemMoved ||
						itConnection.to.item === itemMoved
					) {
						const elemFrom: HTMLElement | null =
							document.getElementById(
								`${orgUID}-org-item-${itConnection.from.item}-io-${itConnection.from.io}`,
							)
						const elemTo: HTMLElement | null =
							document.getElementById(
								`${orgUID}-org-item-${itConnection.to.item}-io-${itConnection.to.io}`,
							)

						if (elemFrom && elemTo) {
							const {
								height: heightFrom,
								width: widthFrom,
								x: xFrom,
								y: yFrom,
							}: DOMRect = elemFrom
								.getBoundingClientRect()
								.toJSON()
							const {
								height: heightTo,
								width: widthTo,
								x: xTo,
								y: yTo,
							}: DOMRect = elemTo.getBoundingClientRect().toJSON()

							const fromX: number =
								widthFrom / 2 + (xFrom - canvasX) * canvasWidth
							const fromY =
								heightFrom / 2 +
								(yFrom - canvasY) * canvasHeight

							const toX: number =
								widthTo / 2 + (xTo - canvasX) * canvasWidth
							const toY: number =
								heightTo / 2 + (yTo - canvasY) * canvasHeight

							const updatedPath: IConnection =
								doUpdateConnectionPath({
									...itConnection,
									pathObject: {
										from: {
											...getUpdatedPointCoordinates(
												itConnection.from.io,
												{
													x: fromX,
													y: fromY,
												},
											),
										},
										to: {
											...getUpdatedPointCoordinates(
												itConnection.to.io,
												{
													x: toX,
													y: toY,
												},
											),
										},
									},
								})

							return {
								...updatedPath,
							}
						}
					}

					return itConnection
				})

				return {
					...it,
					connections: [...modConnections],
				}
			}

			return it
		},
	)

	return modItems
}
