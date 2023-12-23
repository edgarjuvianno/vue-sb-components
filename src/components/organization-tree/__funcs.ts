import { IConnection, ICoordinates } from '@/interface'

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

export const doSortPoints: (
	points: ICoordinates[],
	endLine: ICoordinates,
) => ICoordinates[] = (points: ICoordinates[], endLine: ICoordinates) => {
	const tempPoints: ICoordinates[] = [...points]
	const sortedPoints: ICoordinates[] = tempPoints.sort(
		(a: ICoordinates, b: ICoordinates) => {
			const distanceAToEnd: number = Math.sqrt(
				(a.x - endLine.x) * (a.x - endLine.x) +
					(a.y - endLine.y) * (a.y - endLine.y),
			)
			const distanceBToEnd: number = Math.sqrt(
				(b.x - endLine.x) * (b.x - endLine.x) +
					(b.y - endLine.y) * (b.y - endLine.y),
			)

			return distanceAToEnd - distanceBToEnd
		},
	)

	return sortedPoints.reverse()
}

export const getConnectionPath: (
	connection: IConnection,
	orgUID: string,
	canvasRect: Record<string, any>,
) => string | undefined = (
	connection: IConnection,
	orgUID: string,
	canvasRect: Record<string, any>,
) => {
	const {
		canvasHeight,
		canvasWidth,
		x: canvasX,
		y: canvasY,
	}: Record<string, any> = canvasRect

	const { from, points, to }: IConnection = connection

	const elemFrom: HTMLElement | null = document.querySelector(
		`#org-${orgUID} #org-${orgUID}-item-${from.item}-io-${from.io}`,
	)
	const elemTo: HTMLElement | null = document.querySelector(
		`#org-${orgUID} #org-${orgUID}-item-${to.item}-io-${to.io}`,
	)

	if (elemFrom && elemTo) {
		const {
			height: heightFrom,
			width: widthFrom,
			x: xFrom,
			y: yFrom,
		}: DOMRect = elemFrom.getBoundingClientRect().toJSON()
		const {
			height: heightTo,
			width: widthTo,
			x: xTo,
			y: yTo,
		}: DOMRect = elemTo.getBoundingClientRect().toJSON()

		const fromX: number = widthFrom / 2 + (xFrom - canvasX) * canvasWidth
		const fromY = heightFrom / 2 + (yFrom - canvasY) * canvasHeight

		const toX: number = widthTo / 2 + (xTo - canvasX) * canvasWidth
		const toY: number = heightTo / 2 + (yTo - canvasY) * canvasHeight

		const fromCoordinates: ICoordinates = {
			...getUpdatedPointCoordinates(from.io, {
				x: fromX,
				y: fromY,
			}),
		}

		const toCoordinates: ICoordinates = {
			...getUpdatedPointCoordinates(to.io, {
				x: toX,
				y: toY,
			}),
		}

		if (points?.length) {
			const updatedPath: string = points
				.map((_it: ICoordinates, idx: number) => {
					if (idx === points.length - 1) {
						return `L ${toCoordinates.x} ${toCoordinates.y}`
					}

					return `L ${points[idx + 1].x} ${points[idx + 1].y}`
				})
				.join(' ')

			const finalPath: string = `M ${fromCoordinates.x} ${fromCoordinates.y} L ${points[0].x} ${points[0].y} ${updatedPath}`

			return finalPath
		}

		return `M ${fromCoordinates.x} ${fromCoordinates.y} L ${toCoordinates.x} ${toCoordinates.y}`
	}

	return undefined
}
