import type { Meta, StoryObj } from '@storybook/vue3'
import type { Channel } from '@storybook/channels'
import { UPDATE_STORY_ARGS } from '@storybook/core-events'

import Checkbox from '@/components/form-checkbox/form-checkbox.vue'
import { ICheckItem } from '@/interface'

const meta = {
	title: 'Forms/Check Box',
	component: Checkbox,
	tags: ['autodocs'],
	argTypes: {
		'onUpdate:modelValue': {
			action: 'change',
			control: false,
			description: 'This event fired when users select items',
			table: {
				category: 'events',
				type: {
					summary: '(selected: ICheckItem[] | null) => void',
				},
			},
			type: 'function',
		},
		disabled: {
			control: 'boolean',
			description: 'Is Check Box disabled',
		},
		errorMessage: {
			control: 'text',
			description: 'Check Box error message',
		},
		isError: {
			control: 'boolean',
			description: 'Is Check Box validation error',
		},
		label: {
			control: 'text',
			description: 'Check Box label',
		},
		list: {
			control: 'object',
			description: 'Check Box items',
		},
		modelValue: {
			control: 'object',
			description: 'Check Box selected value',
		},
		onChange: {
			action: 'change',
			control: false,
			description: 'This event fired when users select items',
			table: {
				category: 'events',
				type: {
					summary: '(selected: ICheckItem[] | null) => void',
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
					summary: '(selected: ICheckItem[] | null) => void',
				},
			},
			type: 'function',
		},
		readOnly: {
			control: 'boolean',
			description: 'Is Check Box read-only',
		},
		required: {
			control: 'boolean',
			description: 'Is Check Box required',
		},
		value: {
			control: 'object',
			description: 'Check Box selected value',
		},
	},
	args: {
		label: 'Some Check Box',
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
			;(ctx.args as any).onChange = (selected: ICheckItem[]) => {
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
				sort: 'requiredFirst',
			},
		},
	},
} satisfies Meta<typeof Checkbox>

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
