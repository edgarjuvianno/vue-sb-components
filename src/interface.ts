import { OutputBlockData } from '@editorjs/editorjs'

export interface IHTTPResponse {
	code: number | string
	message: string
}

export interface IAJAXResponse {
	data?: any
	httpResponse?: IHTTPResponse
	status: boolean
}

export interface IServerSideOptions {
	headers?: any
	payload?: any
	withCredential?: boolean
}

export interface IServerSide {
	method?: string | 'GET' | 'POST'
	options?: IServerSideOptions
	url: string
}

export interface IServerSideHandler
	extends Partial<IServerSideOptions>,
		Partial<IAJAXResponse> {}

export interface IChartDataset {
	backgroundColor?: string
	borderColor?: string
	data: number[]
	label?: string
}

export interface IChartData {
	datasets: IChartDataset[]
	labels: string[]
}

export interface ICSSColors {
	100?: string
	85?: string
	80?: string
	60?: string
	50?: string
	40?: string
	30?: string
	20?: string
	10?: string
}

export interface ICSSVariables {
	backdropColor?: string
	backdropOpacity?: number
	borderColor?: string
	dangerColor?: ICSSColors
	defaultColor?: ICSSColors
	disabledColor?: ICSSColors
	infoColor?: ICSSColors
	primaryAccentColor?: ICSSColors
	primaryColor?: ICSSColors
	primaryFontColor?: string
	secondaryColor?: ICSSColors
	secondaryFontColor?: string
	successColor?: ICSSColors
	tableHeadColor?: string
	warningColor?: ICSSColors
}

export interface IAlertButton {
	color?: 'default' | 'primary' | 'info' | 'warning' | 'success' | 'danger'
	text: string
	variant?: 'contained' | 'outlined' | 'text'
}

export interface IButtonGroupItem {
	active?: boolean
	disabled?: boolean
	label: string
}

export interface IStepperItem {
	nextColor?:
		| 'default'
		| 'primary'
		| 'info'
		| 'secondary'
		| 'warning'
		| 'success'
		| 'danger'
	nextText?: string
	optional?: boolean
	optionalText?: string
	prevColor?:
		| 'default'
		| 'primary'
		| 'info'
		| 'secondary'
		| 'warning'
		| 'success'
		| 'danger'
	prevText?: string
	rules?: (() => boolean)[]
	subtitle?: string
	title: string
}

export interface IResponsiveSettings {
	cardsToShow: number
	dots?: boolean
	infinite?: boolean
}

export interface IResponsive {
	breakpoint: number
	settings: IResponsiveSettings
}

export interface IDTSort {
	column?: number | string
	dir?: string
}

export interface IDTColSearch {
	column?: number | string
	term?: string
}

export interface IDTChangeResponse {
	page: number
	length: number
	sort: IDTSort
	term: string
	termColumns: IDTColSearch[]
}

export interface IDTColumn {
	alignHead?: string | 'center' | 'left' | 'right'
	label: string
	name?: string
	search?: boolean
	sort?: boolean
}

export interface IDTAJAXResponse {
	dtConfig: IDTChangeResponse
	response?: IAJAXResponse
}

export interface IDTServerSideHandler
	extends Partial<IServerSideOptions>,
		Partial<IDTAJAXResponse> {}

export interface ILengthChange {
	enabled: boolean
	options?: number[]
}

export interface IPagination {
	current?: number
	enabled: boolean
	length?: number
	total: number
	totalRow?: number
}

export interface ICheckItem {
	label: string
	value: string | number
}

export interface IUploadState {
	progress: number
	status: 'UPLOADING' | 'SUCCESS' | 'ERROR' | 'IDLE'
}

export interface IIcon {
	onClick?: (_ev: Event) => void
	onMouseOver?: (_ev: Event) => void
	onMouseLeave?: (_ev: Event) => void
	placement?: string | 'append' | 'prepend'
}

export interface IRadioItem {
	label: string
	value: string | number
}

export interface ITreeItem {
	children?: ITreeItem[]
	expanded?: boolean
	label: string
	value?: any
}

export interface ISwitchColor {
	background: string
	toggle: string
}

export interface ISwitchLabel {
	active: string
	notActive: string
}

export interface IDTLanguage {
	noResult?: string
	perPage?: string
	result?: (start: number, end: number, total: number) => string
}

export interface IMaskaOptions {
	eager?: boolean
	mask?: string | string[] | Function
	tokens?: any
	tokensReplace?: any
	postProcess?: Function
	preProcess?: Function
	reversed?: boolean
}

export interface IPreviewFile {
	file: File
	type: string
}

// organization chart
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
	type?: 'solid' | 'dashed' | 'dotted'
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
	type?: 'solid' | 'dashed' | 'dotted'
}

export interface IOrganizationTreeItem {
	additionalInfo?: Record<string, any>
	connections?: IConnection[]
	coordinates: ICoordinates
	department?: string
	id?: any
	name?: string
	path?: string
	photo?: string
	position?: string
	renderInfo?: (item: IOrganizationTreeItem) => string
}

export interface IDate {
	disabled?: boolean
	value: number
	viewOnly?: boolean
}

interface IWysiswygParagraph {
	align?: boolean
	background?: boolean
	blockquote?: boolean
	code?: boolean
	color?: boolean
	header?: (1 | 2 | 3 | 4 | 5 | 6)[]
	indent?: boolean
	style?: ('bold' | 'italic' | 'strike' | 'underline')[]
	subscript?: boolean
	superscript?: boolean
}

interface IWysiswygList {
	ordered?: boolean
	unordered?: boolean
}

export interface IWysiswygConfig {
	list?: IWysiswygList
	paragraph?: IWysiswygParagraph
}

export interface IWysiwygOutputData {
	blocks: OutputBlockData[]
	time?: number
	version?: string
}
