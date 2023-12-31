import { ICSSVariables } from '@/interface'

export const hexToRgb: (hex: string) => string | null = (hex: string) => {
	const regex: RegExpExecArray | null =
		/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

	if (regex) {
		const b = parseInt(regex[3], 16),
			g = parseInt(regex[2], 16),
			r = parseInt(regex[1], 16)

		return `${r} ${g} ${b}`
	}

	return null
}

export const parseLocaleNumber: (
	value: string,
	locale: 'en-US' | 'id-ID',
) => number = (value: string, locale: 'en-US' | 'id-ID') => {
	if (typeof value === 'undefined' || value === null) {
		return value
	}

	value = value.replace(/Rp|\$|\s|&nbsp;/g, '')

	const thousandSeparator: string = Intl.NumberFormat(locale)
		.format(11111)
		.replace(/\p{Number}/gu, '')

	const decimalSeparator: string = Intl.NumberFormat(locale)
		.format(1.1)
		.replace(/\p{Number}/gu, '')

	return parseFloat(
		value
			.replace(new RegExp('\\' + thousandSeparator, 'g'), '')
			.replace(new RegExp('\\' + decimalSeparator), '.'),
	)
}

export const recursiveSearchScrollParent: (
	target: HTMLElement,
) => HTMLElement | null = (target: HTMLElement) => {
	if (!target) {
		return null
	} else if (target.scrollHeight > target.clientHeight) {
		return target
	}

	return recursiveSearchScrollParent(target.parentNode as HTMLElement)
}

export const setCSSVariables = ({
	backdropColor,
	backdropOpacity,
	borderColor,
	dangerColor,
	defaultColor,
	disabledColor,
	infoColor,
	primaryAccentColor,
	primaryColor,
	primaryFontColor,
	secondaryColor,
	secondaryFontColor,
	successColor,
	tableHeadColor,
	warningColor,
}: ICSSVariables) => {
	if (document) {
		const root: HTMLElement = document.documentElement

		if (backdropColor) {
			root.style.setProperty(
				'--sb-color-backdrop',
				hexToRgb(backdropColor),
			)
		}

		if (backdropOpacity) {
			root.style.setProperty(
				'--sb-color-backdrop-opacity',
				String(backdropOpacity),
			)
		}

		if (borderColor) {
			root.style.setProperty('--sb-color-border', hexToRgb(borderColor))
		}

		if (dangerColor) {
			Object.keys(dangerColor).forEach((key: string) => {
				root.style.setProperty(
					`--sb-color-danger-${key}`,
					hexToRgb((dangerColor as any)[key]),
				)
			})
		}

		if (defaultColor) {
			Object.keys(defaultColor).forEach((key: string) => {
				root.style.setProperty(
					`--sb-color-default-${key}`,
					hexToRgb((defaultColor as any)[key]),
				)
			})
		}

		if (disabledColor) {
			Object.keys(disabledColor).forEach((key: string) => {
				root.style.setProperty(
					`--sb-color-disabled-${key}`,
					hexToRgb((disabledColor as any)[key]),
				)
			})
		}

		if (infoColor) {
			Object.keys(infoColor).forEach((key: string) => {
				root.style.setProperty(
					`--sb-color-info-${key}`,
					hexToRgb((infoColor as any)[key]),
				)
			})
		}

		if (primaryAccentColor) {
			Object.keys(primaryAccentColor).forEach((key: string) => {
				root.style.setProperty(
					`--sb-color-primary-accent-${key}`,
					hexToRgb((primaryAccentColor as any)[key]),
				)
			})
		}

		if (primaryColor) {
			Object.keys(primaryColor).forEach((key: string) => {
				root.style.setProperty(
					`--sb-color-primary-${key}`,
					hexToRgb((primaryColor as any)[key]),
				)
			})
		}

		if (primaryFontColor) {
			root.style.setProperty(
				'--sb-color-primary-font',
				hexToRgb(primaryFontColor),
			)
		}

		if (secondaryColor) {
			Object.keys(secondaryColor).forEach((key: string) => {
				root.style.setProperty(
					`--sb-color-secondary-${key}`,
					hexToRgb((secondaryColor as any)[key]),
				)
			})
		}

		if (secondaryFontColor) {
			root.style.setProperty(
				'--sb-color-secondary-font',
				hexToRgb(secondaryFontColor),
			)
		}

		if (successColor) {
			Object.keys(successColor).forEach((key: string) => {
				root.style.setProperty(
					`--sb-color-success-${key}`,
					hexToRgb((successColor as any)[key]),
				)
			})
		}

		if (tableHeadColor) {
			root.style.setProperty(
				'--sb-color-table-head',
				hexToRgb(tableHeadColor),
			)
		}

		if (warningColor) {
			Object.keys(warningColor).forEach((key: string) => {
				root.style.setProperty(
					`--sb-color-warning-${key}`,
					hexToRgb((warningColor as any)[key]),
				)
			})
		}
	}
}
