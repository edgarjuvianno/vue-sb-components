export const renderOption = (opt: any, renderLabel: any) => {
	if (opt) {
		if (typeof renderLabel === 'string') {
			return opt[renderLabel]
		}

		return renderLabel(opt)
	}

	return ''
}
