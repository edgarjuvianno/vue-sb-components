import type { Meta, StoryObj } from '@storybook/vue3'
import type { Channel } from '@storybook/channels'
import { UPDATE_STORY_ARGS } from '@storybook/core-events'

import Wysiwyg from '@/components/form-wysiwyg/form-wysiwyg.vue'

const meta = {
	title: 'Forms/Wysiswyg',
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
		onInput: {
			action: 'change',
			control: false,
			description: 'This event fired when input value changed',
			table: {
				category: 'events',
				type: {
					summary: '(event: Event) => void',
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
		value: {
			control: 'text',
			description: 'Input value',
		},
	},
	args: {
		label: 'Some Text Input',
		modelValue: {
			blocks: [
				{
					id: 'bItEBYnDhJ',
					type: 'paragraph',
					data: {
						text: 'ini kiri loh<br>ini lanjutan kiri loh',
						alignment: 'left',
					},
				},
				{
					id: 'Wnlgd6bRCV',
					type: 'paragraph',
					data: {
						text: 'ini kanan loh<br>ini lanjutan kanan loh<br>',
						alignment: 'right',
					},
				},
				{
					id: '8xuFxpjSLY',
					type: 'paragraph',
					data: {
						text: 'ini tengah loh<br>ini lanjutan tengah loh',
						alignment: 'center',
					},
				},
				{
					id: 'JYyqA5PfZl',
					type: 'paragraph',
					data: {
						text: 'ini justify loh<br>ini lanjutan justify loh',
						alignment: 'justify',
					},
				},
				{
					id: 'E6Cxx755fm',
					type: 'paragraph',
					data: {
						text: '<b>list bold loh</b>',
						alignment: 'left',
					},
				},
				{
					id: 'I0GaNjdGlN',
					type: 'paragraph',
					data: {
						text: '<u class="cdx-underline">ini underline loh</u>',
						alignment: 'left',
					},
				},
				{
					id: '7umcA_zgcQ',
					type: 'paragraph',
					data: {
						text: '<i>ini italic loh</i>',
						alignment: 'left',
					},
				},
				{
					id: 'Ujj1EDe0Pn',
					type: 'list',
					data: {
						style: 'ordered',
						items: [
							{
								content: 'list 1',
								items: [],
							},
							{
								content: 'list 2',
								items: [
									{
										content: 'list 2.1',
										items: [
											{
												content: 'list 2.1.1',
												items: [],
											},
										],
									},
								],
							},
							{
								content: 'list 3',
								items: [
									{
										content: 'list 3.1',
										items: [],
									},
								],
							},
							{
								content: 'list 4',
								items: [],
							},
						],
					},
				},
				{
					id: '1V6wruZc_3',
					type: 'checklist',
					data: {
						items: [
							{
								text: 'checklist 1',
								checked: false,
							},
							{
								text: 'checklist 2',
								checked: true,
							},
							{
								text: 'checklist 3',
								checked: true,
							},
							{
								text: 'checklist 4',
								checked: false,
							},
						],
					},
				},
				{
					id: 'udWuwH4yQu',
					type: 'header',
					data: {
						text: 'heading 1',
						level: 1,
						alignment: 'left',
					},
				},
				{
					id: 'WZrXlp7Cpx',
					type: 'paragraph',
					data: {
						text: 'heading 2',
						alignment: 'left',
					},
				},
			],
		},
		toolbarConfigs: {
			checklist: {
				enabled: true,
			},
			code: {
				enabled: true,
			},
			header: {
				enabled: true,
				placeholder: 'Masukkan Header',
			},
			linkWithPreview: {
				enabled: true,
			},
			list: {
				enabled: true,
				type: 'ordered',
			},
			quote: {
				captionPlaceholder: 'Masukkan Keterangan Penulis',
				enabled: true,
				quotePlaceholder: 'Masukkan Kutipan',
			},
			table: {
				enabled: true,
			},
			urlImage: {
				enabled: true,
			},
		},
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
