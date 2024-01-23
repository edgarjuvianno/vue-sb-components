/* eslint-disable no-underscore-dangle */
import type { Meta, StoryObj } from '@storybook/vue3'
import type { Channel } from '@storybook/channels'
import { UPDATE_STORY_ARGS } from '@storybook/core-events'

import Datatable from '@/components/datatable/datatable.vue'
import { IDTServerSideHandler } from '@/interface'

const dummyData: any[] = [
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
]

const dummyDataString: string = [...dummyData]
	.map(
		(it: any, idx: number) => `
			<tr style="text-align: center;">
				<td>${idx + 1}</td>
				<td>${it.color}</td>
				<td>
					<div style="border-radius: 6px; background: ${
						it.value
					}; color: white; padding: 6px 12px; margin: 0 auto; width: fit-content;">
						${it.value}
					</div>
				</td>
			</tr>
		`,
	)
	.join('\n')

const meta = {
	title: 'Components/Datatable',
	component: Datatable,
	tags: ['autodocs'],
	argTypes: {
		columnSearchPlacement: {
			control: 'select',
			description:
				'Column search input placement. This props works only if props "columns" exist',
			options: ['bottom', 'top'],
		},
		columns: {
			control: 'object',
			description: 'Datatable columns definition & configurations',
		},
		defaultSort: {
			control: 'object',
			description:
				'Datatable default column sort. This props works only if props "columns" exist',
		},
		isLoading: {
			control: 'boolean',
			description: 'Show Datatable loader',
		},
		language: {
			control: 'object',
			description:
				'Datatable text configurations. You can use this to change text "No Results Found..."',
		},
		lengthChange: {
			control: 'object',
			description: 'Datatable length options',
		},
		list: {
			control: 'object',
			description: 'Datatable row list',
		},
		onAjax: {
			action: 'change',
			control: false,
			description: 'Intercept Datatable on Ajax event (Server Side only)',
		},
		onChange: {
			action: 'change',
			control: false,
			description:
				'Datatable will fire this event on pagination change, row length change, column search input, search bar input',
			table: {
				category: 'events',
				type: {
					summary: '(data: IDTChangeResponse) => void',
				},
			},
			type: 'function',
		},
		pagination: {
			control: 'object',
			description: 'Datatable pagination configurations',
		},
		rowStyle: {
			control: 'select',
			description: 'Datatable row style',
			options: ['default', 'odd-even'],
		},
		search: {
			control: 'boolean',
			description: 'Show Datatable search bar',
		},
		serverSide: {
			control: 'object',
			description: 'Datatable Server Side configurations',
		},
	},
	args: {},
	parameters: {
		docs: {
			controls: {
				exclude: ['change'],
				sort: 'requiredFirst',
			},
		},
		slots: {
			'`th-${thIndex + 1}`': {
				description:
					'Slot to render Datatable Column if props "list" exist',
			},
			body: {
				description: 'Datatable body slot',
			},
			header: {
				description: 'Datatable header slot',
			},
			tr: {
				description:
					'Slot to render Datatable Row if props "list" exist',
			},
		},
	},
	render: (args) => ({
		components: { Datatable },
		setup() {
			return { args }
		},
		template: '<Datatable v-bind="args" />',
	}),
} satisfies Meta<typeof Datatable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {},
	render: (args) => ({
		components: { Datatable },
		setup() {
			return { args }
		},
		template: `
			<Datatable v-bind="args">
				<template v-slot:header>
					<tr>
						<th>#</th>
						<th>Color</th>
						<th>Value</th>
					</tr>
				</template>
				<template v-slot:body>
					${dummyDataString}
				</template>
			</Datatable>
		`,
	}),
}

export const ColumnsProp: Story = {
	args: {
		columns: [
			{
				alignHead: 'center',
				label: '#',
				sort: true,
			},
			{
				alignHead: 'center',
				label: 'Color',
				sort: true,
			},
			{
				alignHead: 'center',
				label: 'Value',
				name: 'sortLast',
				sort: true,
			},
		],
	},
	render: (args) => ({
		components: { Datatable },
		setup() {
			return { args }
		},
		template: `
			<Datatable v-bind="args">
				<template v-slot:body>
					${dummyDataString}
				</template>
			</Datatable>
		`,
	}),
}

export const IsLoading: Story = {
	args: {
		columns: [
			{
				alignHead: 'center',
				label: '#',
			},
			{
				alignHead: 'center',
				label: 'Color',
			},
			{
				alignHead: 'center',
				label: 'Value',
			},
		],
		isLoading: true,
	},
}

export const RowStyle: Story = {
	args: {
		rowStyle: 'odd-even',
	},
	render: (args) => ({
		components: { Datatable },
		setup() {
			return { args }
		},
		template: `
			<Datatable v-bind="args">
				<template v-slot:header>
					<tr>
						<th>#</th>
						<th>Color</th>
						<th>Value</th>
					</tr>
				</template>
				<template v-slot:body>
					${dummyDataString}
				</template>
			</Datatable>
		`,
	}),
}

export const ServerSide: Story = {
	args: {
		columnSearchPlacement: 'top',
		columns: [
			{
				alignHead: 'center',
				label: '#',
				sort: true,
			},
			{
				alignHead: 'center',
				label: 'Pokemon Name',
				search: true,
				sort: true,
			},
			{
				alignHead: 'center',
				label: 'Image URL',
				name: 'sortUrl',
				search: true,
				sort: true,
			},
		],
		lengthChange: {
			enabled: true,
			options: [5, 10, 20, 40],
		},
		list: [],
		search: true,
		serverSide: {
			options: {
				payload: {
					limit: 10,
					offset: 0,
				},
			},
			url: 'https://pokeapi.co/api/v2/pokemon',
		},
	},
	decorators: [
		(story, ctx) => {
			delete (ctx.args as any).change
			;(ctx.args as any).onAjax = (
				{ headers, payload, response }: IDTServerSideHandler,
				type: 'BEFORE SEND' | 'SUCCESS' | 'ERROR',
			) => {
				console.log(payload, 'here')
				if (type === 'BEFORE SEND') {
					return {
						headers,
						payload: {
							...payload,
							limit: payload.length,
							offset: payload.length * payload.page,
						},
					}
				} else if (response?.status) {
					const channel = (window as any)
						.__STORYBOOK_ADDONS_CHANNEL__ as Channel

					channel.emit(UPDATE_STORY_ARGS, {
						storyId: ctx.id,
						updatedArgs: {
							list: [...(response.data?.results || [])],
						},
					})

					return {
						total: response?.data?.count,
						totalRow: response?.data?.results.length,
					}
				}

				const channel = (window as any)
					.__STORYBOOK_ADDONS_CHANNEL__ as Channel

				channel.emit(UPDATE_STORY_ARGS, {
					storyId: ctx.id,
					updatedArgs: {
						list: [],
					},
				})
				return null
			}

			return story()
		},
	],
	render: (args) => ({
		components: { Datatable },
		setup() {
			return { args }
		},
		template: `
			<Datatable v-bind="args">
				<template #th-3="{ label }">
					<span>The Label: {{ label }}</span>
				</template>
				<template #tr="{ dtConfig, index, name, url }">
					<td style="text-align: center;">
						{{ dtConfig.page * dtConfig.length + index + 1 }}
					</td>
					<td style="text-align: center;">{{ name }}</td>
					<td style="text-align: center;">{{ url }}</td>
				</template>
			</Datatable>
		`,
	}),
}

export const HoverRow: Story = {
	args: {
		canHoverRow: true,
		columnSearchPlacement: 'top',
		columns: [
			{
				alignHead: 'center',
				label: '#',
				sort: true,
			},
			{
				alignHead: 'center',
				label: 'Pokemon Name',
				search: true,
				sort: true,
			},
			{
				alignHead: 'center',
				label: 'Image URL',
				name: 'sortUrl',
				search: true,
				sort: true,
			},
		],
		lengthChange: {
			enabled: true,
			options: [5, 10, 20, 40],
		},
		list: [],
		search: true,
		serverSide: {
			options: {
				payload: {
					limit: 10,
					offset: 0,
				},
			},
			url: 'https://pokeapi.co/api/v2/pokemon',
		},
	},
	decorators: [
		(story, ctx) => {
			delete (ctx.args as any).change
			;(ctx.args as any).onAjax = (
				{ headers, payload, response }: IDTServerSideHandler,
				type: 'BEFORE SEND' | 'SUCCESS' | 'ERROR',
			) => {
				if (type === 'BEFORE SEND') {
					return {
						headers,
						payload: {
							...payload,
							limit: payload.length,
							offset: payload.length * payload.page,
						},
					}
				} else if (response?.status) {
					const channel = (window as any)
						.__STORYBOOK_ADDONS_CHANNEL__ as Channel

					channel.emit(UPDATE_STORY_ARGS, {
						storyId: ctx.id,
						updatedArgs: {
							list: [...(response.data?.results || [])],
						},
					})

					return {
						total: response?.data?.count,
						totalRow: response?.data?.results.length,
					}
				}

				const channel = (window as any)
					.__STORYBOOK_ADDONS_CHANNEL__ as Channel

				channel.emit(UPDATE_STORY_ARGS, {
					storyId: ctx.id,
					updatedArgs: {
						list: [],
					},
				})
				return null
			}

			return story()
		},
	],
	render: (args) => ({
		components: { Datatable },
		setup() {
			return { args }
		},
		template: `
			<Datatable v-bind="args">
				<template #th-3="{ label }">
					<span>The Label: {{ label }}</span>
				</template>
				<template #tr="{ dtConfig, index, name, url }">
					<td style="text-align: center;">
						{{ dtConfig.page * dtConfig.length + index + 1 }}
					</td>
					<td style="text-align: center;">{{ name }}</td>
					<td style="text-align: center;">{{ url }}</td>
				</template>
			</Datatable>
		`,
	}),
}

export const ClickRow: Story = {
	args: {
		canClickRow: true,
		columnSearchPlacement: 'top',
		columns: [
			{
				alignHead: 'center',
				label: '#',
				sort: true,
			},
			{
				alignHead: 'center',
				label: 'Pokemon Name',
				search: true,
				sort: true,
			},
			{
				alignHead: 'center',
				label: 'Image URL',
				name: 'sortUrl',
				search: true,
				sort: true,
			},
		],
		lengthChange: {
			enabled: true,
			options: [5, 10, 20, 40],
		},
		list: [],
		search: true,
		serverSide: {
			options: {
				payload: {
					limit: 10,
					offset: 0,
				},
			},
			url: 'https://pokeapi.co/api/v2/pokemon',
		},
	},
	decorators: [
		(story, ctx) => {
			delete (ctx.args as any).change
			;(ctx.args as any).onAjax = (
				{ headers, payload, response }: IDTServerSideHandler,
				type: 'BEFORE SEND' | 'SUCCESS' | 'ERROR',
			) => {
				if (type === 'BEFORE SEND') {
					return {
						headers,
						payload: {
							...payload,
							limit: payload.length,
							offset: payload.length * payload.page,
						},
					}
				} else if (response?.status) {
					const channel = (window as any)
						.__STORYBOOK_ADDONS_CHANNEL__ as Channel

					channel.emit(UPDATE_STORY_ARGS, {
						storyId: ctx.id,
						updatedArgs: {
							list: [...(response.data?.results || [])],
						},
					})

					return {
						total: response?.data?.count,
						totalRow: response?.data?.results.length,
					}
				}

				const channel = (window as any)
					.__STORYBOOK_ADDONS_CHANNEL__ as Channel

				channel.emit(UPDATE_STORY_ARGS, {
					storyId: ctx.id,
					updatedArgs: {
						list: [],
					},
				})
				return null
			}
			;(ctx.args as any).onClickRow = (_ev: MouseEvent, data: any) => {
				console.log('row clicked', data)
			}

			return story()
		},
	],
	render: (args) => ({
		components: { Datatable },
		setup() {
			return { args }
		},
		template: `
			<Datatable v-bind="args">
				<template #th-3="{ label }">
					<span>The Label: {{ label }}</span>
				</template>
				<template #tr="{ dtConfig, index, name, url }">
					<td style="text-align: center;">
						{{ dtConfig.page * dtConfig.length + index + 1 }}
					</td>
					<td style="text-align: center;">{{ name }}</td>
					<td style="text-align: center;">{{ url }}</td>
				</template>
			</Datatable>
		`,
	}),
}
