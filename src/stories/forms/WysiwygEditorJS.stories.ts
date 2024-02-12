import type { Meta, StoryObj } from '@storybook/vue3'
import type { Channel } from '@storybook/channels'
import { UPDATE_STORY_ARGS } from '@storybook/core-events'

import Wysiwyg from '@/components/form-wysiwyg-editorjs/form-wysiwyg-editorjs.vue'

const meta = {
	title: 'Forms/Wysiswyg Editor.js',
	component: Wysiwyg,
	tags: ['autodocs'],
	argTypes: {
		'onUpdate:modelValue': {
			action: 'change',
			control: false,
			description: 'This event fired when input value changed',
			table: {
				category: 'events',
				type: {
					summary: '(value: any) => void',
				},
			},
			type: 'function',
		},
		errorMessage: {
			control: 'text',
			description: 'Input error message',
		},
		isError: {
			control: 'boolean',
			description: 'Is Input validation error',
		},
		label: {
			control: 'text',
			description: 'Input label',
		},
		modelValue: {
			control: 'text',
			description: 'Input value',
		},
		onChange: {
			action: 'change',
			control: false,
			description: 'This event fired when input value changed',
			table: {
				category: 'events',
				type: {
					summary: '(value: IWysiwygOutputData) => void',
				},
			},
			type: 'function',
		},
		onInput: {
			action: 'change',
			control: false,
			description: 'This event fired when input value changed',
			table: {
				category: 'events',
				type: {
					summary: '(value: IWysiwygOutputData) => void',
				},
			},
			type: 'function',
		},
		readOnly: {
			control: 'boolean',
			description: 'Is Input read-only',
		},
		required: {
			control: 'boolean',
			description: 'Is Input required',
		},
		tabindex: {
			control: 'number',
			description: 'Input tab-index',
		},
		tools: {
			control: 'object',
			description: 'Editor.js tools',
		},
		value: {
			control: 'text',
			description: 'Input value',
		},
	},
	args: {
		label: 'Some Text Input',
		modelValue: {
			blocks: [],
		},
		tools: {},
	},
	decorators: [
		(story, ctx) => {
			delete (ctx.args as any).onChange
			delete (ctx.args as any).onInput
			delete (ctx.args as any)['onUpdate:modelValue']
			;(ctx.args as any).onInput = (value: any) => {
				console.log(value, 'here')
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
	parameters: {
		docs: {
			controls: {
				exclude: [
					'blur',
					'change',
					'focus',
					'input',
					'keydown',
					'update:modelValue',
				],
				sort: 'requiredFirst',
			},
		},
	},
	render: (args) => ({
		components: { Wysiwyg },
		setup() {
			return { args }
		},
		template: '<Wysiwyg v-bind="args" />',
	}),
} satisfies Meta<typeof Wysiwyg>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {},
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
