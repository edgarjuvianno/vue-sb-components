import type { Meta, StoryObj } from '@storybook/vue3'
import type { Channel } from '@storybook/channels'
import { UPDATE_STORY_ARGS } from '@storybook/core-events'

import Dropdown from '@/components/form-dropdown/form-dropdown.vue'
import { IServerSideHandler } from '@/interface'

const meta = {
	title: 'Forms/Dropdown',
	component: Dropdown,
	tags: ['autodocs'],
	argTypes: {
		'onUpdate:modelValue': {
			action: 'change',
			control: false,
			description: 'This event fired when users select items',
			table: {
				category: 'events',
				type: {
					summary: '(selected: any) => void',
				},
			},
			type: 'function',
		},
		allowClear: {
			control: 'boolean',
			description: 'Allow users to clear selection',
		},
		closeOnSelect: {
			control: 'boolean',
			description: 'Collapse Dropdown when users select options',
		},
		disabled: {
			control: 'boolean',
			description: 'Is Dropdown disabled',
		},
		errorMessage: {
			control: 'text',
			description: 'Dropdown error message',
		},
		flat: {
			control: 'boolean',
			description: 'Is Dropdown type flat or not',
		},
		infinite: {
			control: 'boolean',
			description: 'Load more when users scroll until last option',
		},
		isError: {
			control: 'boolean',
			description: 'Is Dropdown validation error',
		},
		isLoading: {
			control: 'boolean',
			description: 'Show loader (not working for Server Side)',
		},
		label: {
			control: 'text',
			description: 'Dropdown label',
		},
		list: {
			control: 'object',
			description: 'Dropdown items',
		},
		loadingText: {
			control: 'text',
			description: 'Text to show when loading',
		},
		modelValue: {
			control: 'object',
			description: 'Dropdown selected value',
		},
		multi: {
			control: 'boolean',
			description: 'Multiple select options',
		},
		noResultText: {
			control: 'text',
			description: 'Text to show when no options to render',
		},
		onAjax: {
			action: 'change',
			control: false,
			description: 'Event fired on Ajax call',
		},
		onChange: {
			action: 'change',
			control: false,
			description: 'This event fired when users select items',
			table: {
				category: 'events',
				type: {
					summary: '(selected: any) => void',
				},
			},
			type: 'function',
		},
		onClose: {
			action: 'change',
			control: false,
			description: 'This event fired when Dropdown collapsed',
			table: {
				category: 'events',
				type: {
					summary: '() => void',
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
					summary: '(selected: any) => void',
				},
			},
			type: 'function',
		},
		onOpen: {
			action: 'change',
			control: false,
			description: 'This event fired when Dropdown expanded',
			table: {
				category: 'events',
				type: {
					summary: '() => void',
				},
			},
			type: 'function',
		},
		onPopulateList: {
			description: 'Load more when users scroll until last option',
		},
		optLabel: {
			control: 'text',
			description: 'Data Option key to render as label',
		},
		optValue: {
			control: 'text',
			description: 'Data Option key to use as value',
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
		search: {
			control: 'boolean',
			description:
				'Dropdown type search input (always true when "serverSide" prop exist)',
		},
		serverSide: {
			control: 'object',
			description: 'Server Side configurations',
		},
		value: {
			control: 'object',
			description: 'Dropdown selected value',
		},
	},
	args: {
		closeOnSelect: true,
		label: 'Some Dropdown',
		list: [
			{
				color: 'Keputusan Ketua Komite Kebijakan Komite Penanganan COVID 19 dan Pemulihan Ekonomi Nasional Nomor 1 tahun 2020',
				value: '#f00',
			},
			{
				color: 'green',
				value: '#0f0',
			},
			{
				color: 'blue',
				value: '#00f',
			},
			{
				color: 'cyan',
				value: '#0ff',
			},
			{
				color: 'magenta',
				value: '#f0f',
			},
			{
				color: 'yellow',
				value: '#ff0',
			},
			{
				color: 'black',
				value: '#000',
			},
		],
		modelValue: null,
		optLabel: 'color',
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
				exclude: [
					'change',
					'close',
					'input',
					'open',
					'update:modelValue',
				],
				sort: 'requiredFirst',
			},
		},
	},
	render: (args) => ({
		components: { Dropdown },
		setup() {
			return { args }
		},
		template:
			'<div style="height: 27rem; display: flex; justify-content: center; align-items: start;"><Dropdown style="min-width: 15rem;" v-bind="args" /></div>',
	}),
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {},
}

export const AllowClear: Story = {
	args: {
		allowClear: true,
	},
}

export const Multiple: Story = {
	args: {
		multi: true,
		search: true,
	},
}

export const CustomLabel: Story = {
	args: {
		optLabel: (opt: any) => {
			return `<span style="color: ${opt.value}">${opt.color}</span>`
		},
	},
}

export const Search: Story = {
	args: {
		search: true,
	},
	decorators: [
		(story, ctx) => {
			;(ctx.args as any).onPopulateList = (term: string) => {
				// eslint-disable-next-line no-underscore-dangle
				const channel = (window as any)
					.__STORYBOOK_ADDONS_CHANNEL__ as Channel

				channel.emit(UPDATE_STORY_ARGS, {
					storyId: ctx.id,
					updatedArgs: {
						list: [
							{
								color: 'red',
								value: '#f00',
							},
							{
								color: 'green',
								value: '#0f0',
							},
							{
								color: 'blue',
								value: '#00f',
							},
							{
								color: 'cyan',
								value: '#0ff',
							},
							{
								color: 'magenta',
								value: '#f0f',
							},
							{
								color: 'yellow',
								value: '#ff0',
							},
							{
								color: 'black',
								value: '#000',
							},
						].filter((it: any) =>
							it.color.toLowerCase().includes(term.toLowerCase()),
						),
					},
				})
			}

			return story()
		},
	],
}

export const ServerSide: Story = {
	args: {
		list: undefined,
		onAjax: (
			resp: IServerSideHandler,
			type: string,
			isLoadMore?: boolean,
		) => {
			if (type === 'SUCCESS') {
				return resp.data?.items
			} else if (type === 'BEFORE SEND') {
				if (isLoadMore) {
					return {
						...resp,
						payload: {
							page: resp.payload?.page + 1,
							q: resp.payload?.term || 'demo',
						},
					}
				}

				return {
					...resp,
					payload: {
						q: resp.payload?.term || 'demo',
					},
				}
			}

			return resp
		},
		optLabel: (opt: any) => {
			return `<span>${opt.name}@${opt.git_url}</span>`
		},
		serverSide: {
			options: {
				payload: {
					q: 'demo',
				},
			},
			url: 'https://api.github.com/search/repositories',
		},
	},
}

export const ServerSideInfinite: Story = {
	args: {
		infinite: true,
		list: undefined,
		onAjax: (
			resp: IServerSideHandler,
			type: string,
			isLoadMore?: boolean,
		) => {
			if (type === 'SUCCESS') {
				return resp.data?.items
			} else if (type === 'BEFORE SEND') {
				if (isLoadMore) {
					return {
						...resp,
						payload: {
							page: resp.payload?.page + 1,
							q: resp.payload?.term || 'demo',
						},
					}
				}

				return {
					...resp,
					payload: {
						q: resp.payload?.term || 'demo',
					},
				}
			}

			return resp
		},
		optLabel: (opt: any) => {
			return `<span>${opt.name}@${opt.git_url}</span>`
		},
		serverSide: {
			options: {
				payload: {
					q: 'demo',
				},
			},
			url: 'https://api.github.com/search/repositories',
		},
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

export const OptionValue: Story = {
	args: {
		optValue: 'value',
	},
}
