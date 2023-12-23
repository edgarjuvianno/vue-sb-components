export interface ICoordinates {
	x: number
	y: number
}

export interface IMouseState {
	mouse: ICoordinates
	position: ICoordinates
	positionStart: ICoordinates
}

export interface IParentState {
	isDrag: boolean
	position: ICoordinates
}

export interface IParentPointerState {
	events: PointerEvent[]
	prevDiff: number
}

export interface IElemSize {
	height: number
	width: number
}

export interface ICanvasState {
	coordinates: ICoordinates
	elem: HTMLElement | null
	lastZoom: number
	zoom: number
}

export interface IItemState {
	isDrag: boolean
	position: ICoordinates
}

export interface IDraggedItem {
	coordinates: ICoordinates
	elem: HTMLElement
	key: string
}

export interface IConnectorStatePathObject {
	from: ICoordinates
	to: ICoordinates
}

export interface IConnectorState {
	from: string | null
	fromRect: DOMRect | null
	path?: string
	pathObject?: IConnectorStatePathObject
	toCoordinates: ICoordinates | null
}

export interface IConnectionIO {
	io: number
	item: number
}

export interface IConnection {
	from: IConnectionIO
	points?: ICoordinates[]
	to: IConnectionIO
}

export interface IPointTarget {
	connection: number
	item: number
	point: number
}

export interface IPointState {
	fromRect: DOMRect | null
	target: IPointTarget | null
	toCoordinates: ICoordinates | null
}

export interface ISelectedConnection {
	from: IConnectionIO
	key: string
	to: IConnectionIO
}
