import { RendererElement, RendererNode, VNode, h } from 'vue'

export const angleDoubleLeft: () => VNode<
	RendererNode,
	RendererElement,
	{ [key: string]: any }
> = () =>
	h('svg', {
		class: 'sb-icon angle-double-left',
		innerHTML:
			'<path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z"/>',
		viewBox: '0 0 512 512',
		xmlns: 'http://www.w3.org/2000/svg',
	})

export const angleDoubleRight: () => VNode<
	RendererNode,
	RendererElement,
	{ [key: string]: any }
> = () =>
	h('svg', {
		class: 'sb-icon angle-double-right',
		innerHTML:
			'<path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/>',
		viewBox: '0 0 512 512',
		xmlns: 'http://www.w3.org/2000/svg',
	})

export const angleDown: () => VNode<
	RendererNode,
	RendererElement,
	{ [key: string]: any }
> = () =>
	h('svg', {
		class: 'sb-icon angle-down',
		innerHTML:
			'<path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>',
		viewBox: '0 0 448 512',
		xmlns: 'http://www.w3.org/2000/svg',
	})

export const angleLeft: () => VNode<
	RendererNode,
	RendererElement,
	{ [key: string]: any }
> = () =>
	h('svg', {
		class: 'sb-icon angle-left',
		innerHTML:
			'<path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>',
		viewBox: '0 0 320 512',
		xmlns: 'http://www.w3.org/2000/svg',
	})

export const angleRight: () => VNode<
	RendererNode,
	RendererElement,
	{ [key: string]: any }
> = () =>
	h('svg', {
		class: 'sb-icon angle-right',
		innerHTML:
			'<path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/>',
		viewBox: '0 0 320 512',
		xmlns: 'http://www.w3.org/2000/svg',
	})

export const angleUp: () => VNode<
	RendererNode,
	RendererElement,
	{ [key: string]: any }
> = () =>
	h('svg', {
		class: 'sb-icon angle-up',
		innerHTML:
			'<path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/>',
		viewBox: '0 0 448 512',
		xmlns: 'http://www.w3.org/2000/svg',
	})

export const arrowUpFromBracket: () => VNode<
	RendererNode,
	RendererElement,
	{ [key: string]: any }
> = () =>
	h('svg', {
		class: 'sb-icon arrow-up-from-bracket',
		innerHTML:
			'<path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3V320c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 53 43 96 96 96H352c53 0 96-43 96-96V352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V352z"/>',
		viewBox: '0 0 448 512',
		xmlns: 'http://www.w3.org/2000/svg',
	})

export const calendar: () => VNode<
	RendererNode,
	RendererElement,
	{ [key: string]: any }
> = () =>
	h('svg', {
		class: 'sb-icon calendar',
		innerHTML:
			'<path d="M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192z"/>',
		viewBox: '0 0 448 512',
		xmlns: 'http://www.w3.org/2000/svg',
	})

export const check: () => VNode<
	RendererNode,
	RendererElement,
	{ [key: string]: any }
> = () =>
	h('svg', {
		class: 'sb-icon check',
		innerHTML:
			'<path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>',
		viewBox: '0 0 448 512',
		xmlns: 'http://www.w3.org/2000/svg',
	})

export const clock: () => VNode<
	RendererNode,
	RendererElement,
	{ [key: string]: any }
> = () =>
	h('svg', {
		class: 'sb-icon clock',
		innerHTML:
			'<path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/>',
		viewBox: '0 0 512 512',
		xmlns: 'http://www.w3.org/2000/svg',
	})

export const info: () => VNode<
	RendererNode,
	RendererElement,
	{ [key: string]: any }
> = () =>
	h('svg', {
		class: 'sb-icon info',
		innerHTML:
			'<path d="M48 80a48 48 0 1 1 96 0A48 48 0 1 1 48 80zM0 224c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V448h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H64V256H32c-17.7 0-32-14.3-32-32z"/>',
		viewBox: '0 0 192 512',
		xmlns: 'http://www.w3.org/2000/svg',
	})

export const magnifyingGlass: () => VNode<
	RendererNode,
	RendererElement,
	{ [key: string]: any }
> = () =>
	h('svg', {
		class: 'sb-icon magnifying-glass',
		innerHTML:
			'<path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>',
		viewBox: '0 0 512 512',
		xmlns: 'http://www.w3.org/2000/svg',
	})

export const pen: () => VNode<
	RendererNode,
	RendererElement,
	{ [key: string]: any }
> = () =>
	h('svg', {
		class: 'sb-icon pen',
		innerHTML:
			'<path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/>',
		viewBox: '0 0 512 512',
		xmlns: 'http://www.w3.org/2000/svg',
	})

export const question: () => VNode<
	RendererNode,
	RendererElement,
	{ [key: string]: any }
> = () =>
	h('svg', {
		class: 'sb-icon question',
		innerHTML:
			'<path d="M80 160c0-35.3 28.7-64 64-64h32c35.3 0 64 28.7 64 64v3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74V320c0 17.7 14.3 32 32 32s32-14.3 32-32v-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7V160c0-70.7-57.3-128-128-128H144C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"/>',
		viewBox: '0 0 320 512',
		xmlns: 'http://www.w3.org/2000/svg',
	})

export const rotate: () => VNode<
	RendererNode,
	RendererElement,
	{ [key: string]: any }
> = () =>
	h('svg', {
		class: 'sb-icon rotate',
		innerHTML:
			'<path d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z"/>',
		viewBox: '0 0 512 512',
		xmlns: 'http://www.w3.org/2000/svg',
	})

export const sortDown: () => VNode<
	RendererNode,
	RendererElement,
	{ [key: string]: any }
> = () =>
	h('svg', {
		class: 'sb-icon sort-down',
		innerHTML:
			'<path d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z"/>',
		viewBox: '0 0 320 512',
		xmlns: 'http://www.w3.org/2000/svg',
	})

export const sortUp: () => VNode<
	RendererNode,
	RendererElement,
	{ [key: string]: any }
> = () =>
	h('svg', {
		class: 'sb-icon sort-up',
		innerHTML:
			'<path d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"/>',
		viewBox: '0 0 320 512',
		xmlns: 'http://www.w3.org/2000/svg',
	})

export const warning: () => VNode<
	RendererNode,
	RendererElement,
	{ [key: string]: any }
> = () =>
	h('svg', {
		class: 'sb-icon warning',
		innerHTML:
			'<path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V320c0 17.7 14.3 32 32 32s32-14.3 32-32V64zM32 480a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"/>',
		viewBox: '0 0 64 512',
		xmlns: 'http://www.w3.org/2000/svg',
	})

export const xMark: () => VNode<
	RendererNode,
	RendererElement,
	{ [key: string]: any }
> = () =>
	h('svg', {
		class: 'sb-icon xmark',
		innerHTML:
			'<path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>',
		viewBox: '0 0 384 512',
		xmlns: 'http://www.w3.org/2000/svg',
	})
