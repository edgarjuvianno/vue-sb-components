import { IResponsive } from '@/interface'

export const getActiveBreakpoint = () => {
	const breakpoints: Record<any, any> = {
		xs: 300,
		sm: 640,
		md: 768,
		lg: 1024,
		xl: 1280,
		'2xl': 1440,
		'3xl': 1600,
		'4xl': 1920,
	}

	const modBreakpoints: any[] = Object.keys(breakpoints).map(
		(key: string) => ({
			key,
			value: breakpoints[key],
		}),
	)

	const sorted: any[] = [...modBreakpoints].sort(
		(a: any, b: any) => b.value - a.value,
	)

	const findBreakpoint: any = sorted.find(
		(item: any) => window.innerWidth >= item.value,
	)

	return findBreakpoint?.key || 'lg'
}

export const numbersInRange: (start: number, stop: number) => number[] = (
	start: number,
	stop: number,
) => {
	return Array.from(
		{ length: stop - start + 1 },
		(_value, index) => start + index * 1,
	)
}

export const sortBreakpoints: (responsives: IResponsive[]) => IResponsive[] = (
	responsives: IResponsive[],
) => {
	const sorted: IResponsive[] = [...responsives].sort(
		(a: IResponsive, b: IResponsive) => a.breakpoint - b.breakpoint,
	)

	return sorted
}
