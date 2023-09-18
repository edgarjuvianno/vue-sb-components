import { Dayjs } from 'dayjs'

export const getProperDateFormat = (
	date: number,
	month: number,
	year: number,
) => {
	const dateMod: string = `${date < 10 ? '0' : ''}${date}`
	const monthMod: string = `${month < 10 ? '0' : ''}${month}`

	return `${year}-${monthMod}-${dateMod}`
}

export const getProperTimeFormat = (hour: number, minute: number) => {
	const hourMod: string = `${hour < 10 ? '0' : ''}${hour}`
	const minuteMod: string = `${minute < 10 ? '0' : ''}${minute}`

	return `${hourMod}:${minuteMod}:00`
}

export const sortDateRange = (values: Dayjs[]) => {
	const sortedValues: Dayjs[] = values.sort(
		(a: Dayjs, b: Dayjs) => a.unix() - b.unix(),
	)

	return sortedValues
}
