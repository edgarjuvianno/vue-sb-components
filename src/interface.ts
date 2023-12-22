import {
	IConnection,
	ICoordinates,
} from '@/components/organization-tree/interface'
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

export interface IOrganizationTreeItem {
	additionalInfo?: string
	connections?: IConnection[]
	coordinates: ICoordinates
	department?: string
	name?: string
	path?: string
	photo?: string
	position?: string
}
