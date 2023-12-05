import type { Meta, StoryObj } from '@storybook/vue3'
import type { Channel } from '@storybook/channels'
import { UPDATE_STORY_ARGS } from '@storybook/core-events'

import FileInput from '@/components/form-file-input/form-file-input.vue'

const meta = {
	title: 'Forms/File Input',
	component: FileInput,
	tags: ['autodocs'],
	argTypes: {
		'onUpdate:modelValue': {
			action: 'change',
			control: false,
			description: 'This event fired when input value changed',
			table: {
				category: 'events',
				type: {
					summary: '(value: File[] | null) => void',
				},
			},
			type: 'function',
		},
		allowClear: {
			control: 'boolean',
			description: 'Clear input value',
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
			control: 'object',
			description: 'Accept file formats. Example: [.jpg, .jpeg, .png]',
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
		onChange: {
			action: 'change',
			control: false,
			description: 'This event fired when input value changed',
			table: {
				category: 'events',
				type: {
					summary: '(value: File[] | null) => void',
				},
			},
			type: 'function',
		},
		onDragText: {
			control: 'text',
			description: 'On-drag File drop area text',
		},
		onError: {
			action: 'change',
			control: false,
			description: 'Fire when File validation error',
			table: {
				category: 'events',
				type: {
					summary:
						'(errorType: "INVALID FORMAT" | "INVALID SIZE", format?: string) => void',
				},
			},
			type: 'function',
		},
		onPreviewFile: {
			action: 'click',
			control: false,
			description: 'Fire when users click on file name to view file',
			table: {
				category: 'events',
				type: {
					summary: '(preview: IPreviewFile) => void',
				},
			},
			type: 'function',
		},
		onRetry: {
			action: 'click',
			control: false,
			description: 'Fire when File upload state error',
			table: {
				category: 'events',
				type: {
					summary: '(value: File[] | null) => void',
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
			delete (ctx.args as any).onChange
			delete (ctx.args as any).onInput
			delete (ctx.args as any)['onUpdate:modelValue']
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
	parameters: {
		docs: {
			controls: {
				exclude: [
					'change',
					'error',
					'previewFile',
					'retry',
					'update:modelValue',
				],
				sort: 'requiredFirst',
			},
		},
	},
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
