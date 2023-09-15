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
			value: Number(breakpoints[key].replace('px', '')),
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

export const numbersMedian: (array: number[]) => number = (array: number[]) => {
	const mid = Math.floor(array.length / 2)
	const nums = [...array].sort((a, b) => a - b)

	return array.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2
}
