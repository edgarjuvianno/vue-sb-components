import { IConnection, ICoordinates } from '@/interface'

const getUpdatedPointCoordinates: (
	pointIndex: number,
	coordinates: ICoordinates,
) => ICoordinates = (pointIndex: number, coordinates: ICoordinates) => {
	if (pointIndex < 1) {
		return {
			x: coordinates.x + 5,
			y: coordinates.y,
		}
	} else if (pointIndex >= 1 && pointIndex <= 3) {
		return {
			x: coordinates.x,
			y: coordinates.y + 5,
		}
	} else if (pointIndex >= 4 && pointIndex <= 6) {
		return {
			x: coordinates.x,
			y: coordinates.y - 5,
		}
	}

	return {
		x: coordinates.x - 5,
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
				x: Math.round(fromX / 5) * 5,
				y: Math.round(fromY / 5) * 5,
			}),
		}

		const toCoordinates: ICoordinates = {
			...getUpdatedPointCoordinates(to.io, {
				x: Math.round(toX / 5) * 5,
				y: Math.round(toY / 5) * 5,
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

export const getConnectionPathItem: (
	itemIndex: number,
	connection: IConnection,
	connectionElem: HTMLCollectionOf<SVGPathElement> | undefined,
	orgUID: string,
	canvasRect: Record<string, any>,
) => string | undefined = (
	itemIndex: number,
	connection: IConnection,
	connectionElem: HTMLCollectionOf<SVGPathElement> | undefined,
	orgUID: string,
	canvasRect: Record<string, any>,
) => {
	const {
		canvasHeight,
		canvasWidth,
		x: canvasX,
		y: canvasY,
	}: Record<string, any> = canvasRect

	const isStartFromItem: boolean = connection.from.item === itemIndex

	const { from, to }: IConnection = connection

	const elemFrom: HTMLElement | null = document.querySelector(
		`#org-${orgUID} #org-${orgUID}-item-${from.item}-io-${from.io}`,
	)

	const elemTo: HTMLElement | null = document.querySelector(
		`#org-${orgUID} #org-${orgUID}-item-${to.item}-io-${to.io}`,
	)

	if (isStartFromItem && elemTo && connectionElem && connectionElem[0]) {
		const {
			height: heightTo,
			width: widthTo,
			x: xTo,
			y: yTo,
		}: DOMRect = elemTo.getBoundingClientRect().toJSON()

		const toX: number = widthTo / 2 + (xTo - canvasX) * canvasWidth
		const toY: number = heightTo / 2 + (yTo - canvasY) * canvasHeight

		const toCoordinates: ICoordinates = {
			...getUpdatedPointCoordinates(to.io, {
				x: Math.round(toX / 5) * 5,
				y: Math.round(toY / 5) * 5,
			}),
		}

		const d: string | null = connectionElem[0].getAttribute('d')

		if (d) {
			const splitD: string[] = d.split(' ')

			splitD[splitD.length - 2] = String(toCoordinates.x)
			splitD[splitD.length - 1] = String(toCoordinates.y)

			return splitD.join(' ')
		}
	} else if (elemFrom && connectionElem && connectionElem[0]) {
		const {
			height: heightFrom,
			width: widthFrom,
			x: xFrom,
			y: yFrom,
		}: DOMRect = elemFrom.getBoundingClientRect().toJSON()

		const fromX: number = widthFrom / 2 + (xFrom - canvasX) * canvasWidth
		const fromY = heightFrom / 2 + (yFrom - canvasY) * canvasHeight

		const fromCoordinates: ICoordinates = {
			...getUpdatedPointCoordinates(from.io, {
				x: Math.round(fromX / 5) * 5,
				y: Math.round(fromY / 5) * 5,
			}),
		}

		const d: string | null = connectionElem[0].getAttribute('d')

		if (d) {
			const splitD: string[] = d.split(' ')

			splitD[1] = String(fromCoordinates.x)
			splitD[2] = String(fromCoordinates.y)

			return splitD.join(' ')
		}
	}

	return undefined
}

export const getConnectionPathPoint: (
	points: ICoordinates[],
	connectionElem: HTMLCollectionOf<SVGPathElement> | undefined,
) => string | undefined = (
	points: ICoordinates[],
	connectionElem: HTMLCollectionOf<SVGPathElement> | undefined,
) => {
	if (connectionElem) {
		const d: string | null = connectionElem[0].getAttribute('d')

		if (d) {
			const splitD: string[] = d.split(' ')

			const end: string = `L ${splitD[splitD.length - 2]} ${
				splitD[splitD.length - 1]
			}`
			const start: string = `M ${splitD[1]} ${splitD[2]}`

			if (points?.length) {
				const updatedPath: string = points
					.map((it: ICoordinates) => `L ${it.x} ${it.y}`)
					.join(' ')

				const finalPath: string = `${start} ${updatedPath} ${end}`

				return finalPath
			}

			return `${start} ${end}`
		}
	}

	return undefined
}
