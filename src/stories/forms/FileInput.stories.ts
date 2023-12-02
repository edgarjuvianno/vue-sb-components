import type { Meta, StoryObj } from '@storybook/vue3'
import type { Channel } from '@storybook/channels'
import { UPDATE_STORY_ARGS } from '@storybook/core-events'

import FileInput from '@/components/form-file-input/form-file-input.vue'

const meta = {
	title: 'Forms/File Input',
	component: FileInput,
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
		disabled: {
			control: 'boolean',
			description: 'Is Input disabled',
		},
		error: {
			action: 'change',
			control: false,
			description: 'Fire when File validation error',
		},
		errorMessage: {
			control: 'text',
			description: 'Input error message',
		},
		helperText: {
			control: 'text',
			description: 'File input helper text',
		},
		isError: {
			control: 'boolean',
			description: 'Is Input validation error',
		},
		label: {
			control: 'text',
			description: 'Input label',
		},
		maxSize: {
			control: 'number',
			description: 'File maximum size in MB',
		},
		modelValue: {
			control: 'array',
			description: 'Input value',
		},
		multi: {
			control: 'boolean',
			description: 'Multiple upload files',
		},
		onDragText: {
			control: 'text',
			description: 'On-drag File drop area text',
		},
		previewFile: {
			action: 'click',
			control: false,
			description: 'Fire when users click on file name to view file',
		},
		readOnly: {
			control: 'boolean',
			description: 'Is Input read-only',
		},
		required: {
			control: 'boolean',
			description: 'Is Input required',
		},
		retry: {
			action: 'click',
			control: false,
			description: 'Fire when File upload state error',
		},
		value: {
			control: 'array',
			description: 'Input value',
		},
		viewFile: {
			control: 'boolean',
			description: 'Whether users can view file or not',
		},
	},
	args: {
		format: ['.png', '.jpg', '.jpeg'],
		label: 'Some File Input',
		modelValue: null,
		onDragText: null,
	},
	decorators: [
		(story, ctx) => {
			delete (ctx.args as any).change
			delete (ctx.args as any).input
			delete (ctx.args as any)['update:modelValue']
			;(ctx.args as any).onChange = (value: any) => {
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
} satisfies Meta<typeof FileInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {},
}

export const Multiple: Story = {
	args: {
		multi: true,
	},
}

export const AllowClear: Story = {
	args: {
		allowClear: true,
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
