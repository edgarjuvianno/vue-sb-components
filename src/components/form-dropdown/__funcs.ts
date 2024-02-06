export const renderOption = (opt: any, renderLabel: any) => {
	if (opt && typeof opt === 'object') {
		if (typeof renderLabel === 'string') {
			return opt[renderLabel]
		}

		return renderLabel(opt)
	}

	return ''
}
