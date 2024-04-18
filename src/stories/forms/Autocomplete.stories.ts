import type { Meta, StoryObj } from '@storybook/vue3'
import type { Channel } from '@storybook/channels'
import { UPDATE_STORY_ARGS } from '@storybook/core-events'

import Autocomplete from '@/components/form-autocomplete/form-autocomplete.vue'

const meta = {
	title: 'Forms/Autocomplete',
	component: Autocomplete,
	tags: ['autodocs'],
	argTypes: {
		'onUpdate:modelValue': {
			action: 'change',
			control: false,
			description: 'This event fired when users finish typing',
			table: {
				category: 'events',
				type: {
					summary: '(selected: any) => void',
				},
			},
			type: 'function',
		},
		disabled: {
			control: 'boolean',
			description: 'Is Autocomplete disabled',
		},
		errorMessage: {
			control: 'text',
			description: 'Autocomplete error message',
		},
		flat: {
			control: 'boolean',
			description: 'Is Autocomplete type flat or not',
		},
		isError: {
			control: 'boolean',
			description: 'Is Autocomplete validation error',
		},
		isLoading: {
			control: 'boolean',
			description: 'Show loader',
		},
		label: {
			control: 'text',
			description: 'Autocomplete label',
		},
		list: {
			control: 'object',
			description: 'Autocomplete items',
		},
		loadingText: {
			control: 'text',
			description: 'Text to show when loading',
		},
		modelValue: {
			control: 'object',
			description: 'Autocomplete selected value',
		},
		onChange: {
			action: 'change',
			control: false,
			description: 'This event fired when users finish typing',
			table: {
				category: 'events',
				type: {
					summary: '(selected: any) => void',
				},
			},
			type: 'function',
		},
		onInput: {
			action: 'change',
			control: false,
			description: 'This event fired when users finish typing',
			table: {
				category: 'events',
				type: {
					summary: '(selected: any) => void',
				},
			},
			type: 'function',
		},
		placeholder: {
			control: 'text',
			description: 'Dropdown placeholder',
		},
		readOnly: {
			control: 'boolean',
			description: 'Is Dropdown read-only',
		},
		required: {
			control: 'boolean',
			description: 'Is Dropdown required',
		},
		value: {
			control: 'object',
			description: 'Autocomplete selected value',
		},
	},
	args: {
		label: 'Some Autocomplete',
		list: [
			{
				label: 'red',
				value: 'red',
			},
			{
				label: 'green',
				value: 'green',
			},
			{
				label: 'blue',
				value: 'blue',
			},
			{
				label: 'cyan',
				value: 'cyan',
			},
			{
				label: 'magenta',
				value: 'magenta',
			},
			{
				label: 'yellow',
				value: 'yellow',
			},
			{
				label: 'black',
				value: 'black',
			},
		],
		modelValue: null,
	},
	decorators: [
		(story, ctx) => {
			delete (ctx.args as any).onChange
			delete (ctx.args as any).onInput
			delete (ctx.args as any)['onUpdate:modelValue']
			;(ctx.args as any).onChange = (selected: any) => {
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
	render: (args) => ({
		components: { Autocomplete },
		setup() {
			return { args }
		},
		template:
			'<div style="height: 27rem; display: flex; justify-content: center; align-items: start;"><Autocomplete style="min-width: 15rem;" v-bind="args" /></div>',
	}),
} satisfies Meta<typeof Autocomplete>

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
