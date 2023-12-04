import type { Meta, StoryObj } from '@storybook/vue3'
import type { Channel } from '@storybook/channels'
import { UPDATE_STORY_ARGS } from '@storybook/core-events'

import Radio from '@/components/form-radio/form-radio.vue'
import { IRadioItem } from '@/interface'

const meta = {
	title: 'Forms/Radio',
	component: Radio,
	tags: ['autodocs'],
	argTypes: {
		'onUpdate:modelValue': {
			action: 'change',
			control: false,
			description: 'This event fired when users select items',
			table: {
				category: 'events',
				type: {
					summary: '(selected: IRadioItem | null) => void',
				},
			},
			type: 'function',
		},
		disabled: {
			control: 'boolean',
			description: 'Is Radio Button disabled',
		},
		errorMessage: {
			control: 'text',
			description: 'Radio Button error message',
		},
		isError: {
			control: 'boolean',
			description: 'Is Radio Button validation error',
		},
		label: {
			control: 'text',
			description: 'Radio Button label',
		},
		list: {
			control: 'object',
			description: 'Radio Button items',
		},
		modelValue: {
			control: 'object',
			description: 'Radio Button selected value',
		},
		onChange: {
			action: 'change',
			control: false,
			description: 'This event fired when users select items',
			table: {
				category: 'events',
				type: {
					summary: '(selected: IRadioItem | null) => void',
				},
			},
			type: 'function',
		},
		onInput: {
			action: 'change',
			control: false,
			description: 'This event fired when users select items',
			table: {
				category: 'events',
				type: {
					summary: '(selected: IRadioItem | null) => void',
				},
			},
			type: 'function',
		},
		readOnly: {
			control: 'boolean',
			description: 'Is Radio Button read-only',
		},
		required: {
			control: 'boolean',
			description: 'Is Radio Button required',
		},
		value: {
			control: 'object',
			description: 'Radio Button selected value',
		},
	},
	args: {
		label: 'Some Radio Button',
		list: [
			{
				label: '1',
				value: 1,
			},
			{
				label: '2',
				value: 2,
			},
			{
				label: '3',
				value: 3,
			},
		],
		modelValue: null,
	},
	decorators: [
		(story, ctx) => {
			delete (ctx.args as any).onChange
			delete (ctx.args as any).onInput
			delete (ctx.args as any)['onUpdate:modelValue']
			;(ctx.args as any).onChange = (selected: IRadioItem) => {
				// eslint-disable-next-line no-underscore-dangle
				const channel = (window as any)
					.__STORYBOOK_ADDONS_CHANNEL__ as Channel

				channel.emit(UPDATE_STORY_ARGS, {
					storyId: ctx.id,
					updatedArgs: { modelValue: selected },
				})
			}

			return story()
		},
	],
	parameters: {
		docs: {
			controls: {
				exclude: ['change', 'input', 'update:modelValue'],
			},
		},
	},
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {},
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
