import type { Meta, StoryObj } from '@storybook/vue3'
import type { Channel } from '@storybook/channels'
import { UPDATE_STORY_ARGS } from '@storybook/core-events'
import { Dayjs } from 'dayjs'

import Datepicker from '@/components/form-datepicker/form-datepicker.vue'

const meta = {
	title: 'Forms/Date Picker',
	component: Datepicker,
	tags: ['autodocs'],
	argTypes: {
		'update:modelValue': {
			action: 'change',
			control: false,
			description: 'This event fired when input value changed',
		},
		allowClear: {
			control: 'boolean',
			description: 'Clear input value',
		},
		change: {
			action: 'change',
			control: false,
			description: 'This event fired when input value changed',
		},
		closeOnSelect: {
			control: 'boolean',
			description: 'Close popup when users select date',
		},
		disabled: {
			control: 'boolean',
			description: 'Is Input disabled',
		},
		errorMessage: {
			control: 'text',
			description: 'Input error message',
		},
		format: {
			control: 'text',
			description: 'Valid date format. Example: YYYY-MM-DD HH:mm:ss',
		},
		input: {
			action: 'change',
			control: false,
			description: 'This event fired when input value changed',
		},
		isError: {
			control: 'boolean',
			description: 'Is Input validation error',
		},
		label: {
			control: 'text',
			description: 'Input label',
		},
		max: {
			control: 'text',
			description: 'Max Date to select. Please provide valid Date format',
		},
		min: {
			control: 'text',
			description: 'Max Date to select. Please provide valid Date format',
		},
		modelValue: {
			control: 'object',
			description: 'Input value in Day.js object',
		},
		noIcon: {
			control: 'boolean',
			description: 'Hide input icon',
		},
		placeholder: {
			control: 'text',
			description: 'Input placeholder',
		},
		range: {
			control: 'boolean',
			description: 'Enable Date Range Picker',
		},
		readOnly: {
			control: 'boolean',
			description: 'Is Input read-only',
		},
		required: {
			control: 'boolean',
			description: 'Is Input required',
		},
		saveText: {
			control: 'text',
			description: 'Button Save text',
		},
		type: {
			control: 'select',
			description: 'Input Date Picker type',
			options: ['date', 'datetime', 'time', 'month', 'year'],
		},
		value: {
			control: 'object',
			description: 'Input value in Day.js object',
		},
	},
	args: {
		label: 'Date Picker',
		modelValue: null,
	},
	decorators: [
		(story, ctx) => {
			delete (ctx.args as any).change
			delete (ctx.args as any).input
			delete (ctx.args as any)['update:modelValue']
			;(ctx.args as any).onChange = (value: Dayjs) => {
				// eslint-disable-next-line no-underscore-dangle
				const channel = (window as any)
					.__STORYBOOK_ADDONS_CHANNEL__ as Channel

				channel.emit(UPDATE_STORY_ARGS, {
					storyId: ctx.id,
					updatedArgs: { modelValue: value },
				})
			}

			return story()
		},
	],
	render: (args) => ({
		components: { Datepicker },
		setup() {
			return { args }
		},
		template:
			'<div style="height: 27rem; display: flex; justify-content: center; align-items: start;"><Datepicker style="min-width: 15rem;" v-bind="args" /></div>',
	}),
} satisfies Meta<typeof Datepicker>

export default meta
type Story = StoryObj<typeof meta>

export const DatePicker: Story = {
	args: {},
}

export const DateTimePicker: Story = {
	args: {
		label: 'Date Time Picker',
		type: 'datetime',
	},
}

export const TimePicker: Story = {
	args: {
		label: 'Time Picker',
		type: 'time',
	},
}

export const MonthPicker: Story = {
	args: {
		label: 'Month Picker',
		type: 'month',
	},
}

export const YearPicker: Story = {
	args: {
		label: 'Year Picker',
		type: 'year',
	},
}

export const Disabled: Story = {
	args: {
		disabled: true,
	},
}

export const ReadOnly: Story = {
	args: {
		readOnly: true,
	},
}

export const Error: Story = {
	args: {
		errorMessage: 'Some Error Message',
		isError: true,
	},
}
