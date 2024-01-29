import type { Meta, StoryObj } from '@storybook/vue3'
import type { Channel } from '@storybook/channels'
import { UPDATE_STORY_ARGS } from '@storybook/core-events'
import { IOrganizationTreeItem } from '@/interface'

import Button from '@/components/button/button.vue'
import OrganizationTree from '@/components/organization-tree/organization-tree.vue'

const meta = {
	title: 'Components/Organization Tree',
	component: OrganizationTree,
	tags: ['autodocs'],
	argTypes: {
		isEditable: {
			control: 'boolean',
			description: 'Is tree editable',
		},
		list: {
			control: 'object',
			description: 'Organization Tree items',
		},
		onChange: {
			action: 'change',
			control: false,
			description: 'Fired when tree changed by user drag',
			table: {
				category: 'events',
				type: {
					summary: '(list: IOrganizationTreeItem[]) => void',
				},
			},
			type: 'function',
		},
		onClickItem: {
			action: 'click',
			control: false,
			description: 'Fired when user click on tree item',
			table: {
				category: 'events',
				type: {
					summary:
						'(item: IOrganizationTreeItem, index: number) => void',
				},
			},
			type: 'function',
		},
	},
	args: {
		list: [
			{
				coordinates: {
					x: 250,
					y: 10,
				},
				name: 'Griffin Woldridge',
				photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww',
				position: 'CEO',
				connections: [
					{
						from: {
							io: 5,
							item: 0,
						},
						to: {
							io: 2,
							item: 1,
						},
					},
				],
			},
			{
				coordinates: {
					x: 270,
					y: 120,
				},
				department: 'Software Engineering',
				connections: [
					{
						from: {
							io: 5,
							item: 1,
						},
						to: {
							io: 2,
							item: 2,
						},
					},
				],
			},
			{
				coordinates: {
					x: 250,
					y: 190,
				},
				name: 'Ospan Ali',
				photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww',
				position: 'Head of Software Engineering',
				connections: [
					{
						from: {
							io: 0,
							item: 2,
						},
						to: {
							io: 2,
							item: 3,
						},
						points: [
							{
								x: 140,
								y: 230,
							},
						],
					},
					{
						from: {
							io: 7,
							item: 2,
						},
						to: {
							io: 3,
							item: 4,
						},
						points: [
							{
								x: 520,
								y: 230,
							},
						],
					},
				],
			},
			{
				coordinates: {
					x: 30,
					y: 320,
				},
				name: 'Ellie',
				photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww',
				position: 'Jr. Software Engineer',
			},
			{
				coordinates: {
					x: 360,
					y: 320,
				},
				name: 'Owen',
				photo: 'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D',
				position: 'Software Engineer',
				connections: [
					{
						from: {
							io: 4,
							item: 4,
						},
						to: {
							io: 2,
							item: 5,
						},
						points: [
							{
								x: 420,
								y: 430,
							},
							{
								x: 370,
								y: 430,
							},
						],
					},
					{
						from: {
							io: 6,
							item: 4,
						},
						to: {
							io: 2,
							item: 6,
						},
						points: [
							{
								x: 520,
								y: 430,
							},
							{
								x: 670,
								y: 430,
							},
						],
					},
				],
			},
			{
				coordinates: {
					x: 260,
					y: 470,
				},
				name: 'David',
				photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww',
				position: 'Front-End Engineer',
			},
			{
				coordinates: {
					x: 560,
					y: 470,
				},
				name: 'Motoki',
				photo: 'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D',
				position: 'Back-End Engineer',
			},
		],
	},
	decorators: [
		(story, ctx) => {
			delete (ctx.args as any).change
			;(ctx.args as any).onChange = (list: IOrganizationTreeItem[]) => {
				// eslint-disable-next-line no-underscore-dangle
				const channel = (window as any)
					.__STORYBOOK_ADDONS_CHANNEL__ as Channel

				channel.emit(UPDATE_STORY_ARGS, {
					storyId: ctx.id,
					updatedArgs: { list },
				})
			}
			;(ctx.args as any).onClickItem = (
				item: IOrganizationTreeItem,
				itemIndex: number,
			) => {
				console.log(item, itemIndex, 'item clicked')
			}

			return story()
		},
	],
	parameters: {
		docs: {
			controls: {
				exclude: ['change'],
				sort: 'requiredFirst',
			},
		},
	},
	render: (args) => ({
		components: { OrganizationTree },
		setup() {
			return { args }
		},
		template:
			'<div style="height: 100vh; width: 100%; display: flex; justify-content: center; align-items: center;"><OrganizationTree v-bind="args" /></div>',
	}),
} satisfies Meta<typeof OrganizationTree>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {},
}

export const Editable: Story = {
	args: {
		isEditable: true,
	},
}

export const RenderInfo: Story = {
	args: {
		list: [
			{
				coordinates: {
					x: 250,
					y: 10,
				},
				name: 'Griffin Woldridge',
				photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww',
				position: 'CEO',
				connections: [
					{
						from: {
							io: 5,
							item: 0,
						},
						to: {
							io: 2,
							item: 1,
						},
					},
				],
				renderInfo: (item: IOrganizationTreeItem) =>
					`<p style="margin: 0;">additional info: ${item.position}</p>`,
			},
			{
				coordinates: {
					x: 270,
					y: 120,
				},
				department: 'Software Engineering',
				connections: [
					{
						from: {
							io: 5,
							item: 1,
						},
						to: {
							io: 2,
							item: 2,
						},
					},
				],
			},
			{
				coordinates: {
					x: 250,
					y: 190,
				},
				name: 'Ospan Ali',
				photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww',
				position: 'Head of Software Engineering',
				connections: [
					{
						from: {
							io: 0,
							item: 2,
						},
						to: {
							io: 2,
							item: 3,
						},
						points: [
							{
								x: 140,
								y: 230,
							},
						],
					},
					{
						from: {
							io: 7,
							item: 2,
						},
						to: {
							io: 3,
							item: 4,
						},
						points: [
							{
								x: 520,
								y: 230,
							},
						],
					},
				],
			},
			{
				coordinates: {
					x: 30,
					y: 320,
				},
				name: 'Ellie',
				photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww',
				position: 'Jr. Software Engineer',
			},
			{
				coordinates: {
					x: 360,
					y: 320,
				},
				name: 'Owen',
				photo: 'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D',
				position: 'Software Engineer',
				connections: [
					{
						from: {
							io: 4,
							item: 4,
						},
						to: {
							io: 2,
							item: 5,
						},
						points: [
							{
								x: 420,
								y: 430,
							},
							{
								x: 370,
								y: 430,
							},
						],
					},
					{
						from: {
							io: 6,
							item: 4,
						},
						to: {
							io: 2,
							item: 6,
						},
						points: [
							{
								x: 520,
								y: 430,
							},
							{
								x: 670,
								y: 430,
							},
						],
					},
				],
			},
			{
				coordinates: {
					x: 260,
					y: 470,
				},
				name: 'David',
				photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww',
				position: 'Front-End Engineer',
			},
			{
				coordinates: {
					x: 560,
					y: 470,
				},
				name: 'Motoki',
				photo: 'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D',
				position: 'Back-End Engineer',
			},
		],
	},
}

export const ExportImage: Story = {
	args: {},
	render: (args) => ({
		components: { Button, OrganizationTree },
		setup() {
			return {
				args: {
					...args,
					ref: 'example-org-chart',
				},
			}
		},
		methods: {
			async onClickButton() {
				if (this.$refs['example-org-chart']) {
					const base64: string | null =
						await this.$refs['example-org-chart'].doExport()

					console.log(base64)
				}
			},
		},
		template:
			'<div style="height: 100vh; width: 100%; display: block; justify-content: center; align-items: center;"><Button color="accent" @click="onClickButton">Export See Console for result</Button><OrganizationTree v-bind="args" /></div>',
	}),
}
