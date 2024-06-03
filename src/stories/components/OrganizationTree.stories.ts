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
				name: 'Nicolas Saputra hehehehehehehe alsdkjasjdklasdjajsdjklajsdalsjdjalsjdajdalsjdalksjdalkjsdklajsdljasldjaslkjdasdajsldkjasldjaskldjlasldkjasldas',
				photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww',
				position:
					'alsdkjasjdklasdjajsdjklajsdalsjdjalsjdajdalsjdalksjdalkjsdklajsdljasldjaslkjdasdajsldkjasldjaskldjlasldkjasldas',
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
			// return {
			// 	args: {
			// 		...args,
			// 		ref: 'example-org-chart',
			// 	},
			// }
			return {
				args,
				list1: [
					{
						id: 'internal-a7395579-dafa-44eb-9c9d-d4b1a559b984',
						name: 'Wadda Karmila',
						photo: 'https://master.simampu.system-dev.online/v1/File/inline/download?id=21105dba-639a-4105-8a8f-f78746b96057',
						position: 'Deputi Bidang Logistik dan Peralatan',
						coordinates: {
							x: 420,
							y: 30,
						},
						connections: [
							{
								from: {
									io: 5,
									item: 0,
								},
								to: {
									io: 2,
									item: 3,
								},
								type: 'solid',
							},
							{
								from: {
									io: 5,
									item: 0,
								},
								to: {
									io: 2,
									item: 2,
								},
								type: 'solid',
								points: [
									{
										x: 575,
										y: 225,
									},
									{
										x: 820,
										y: 230,
									},
								],
							},
							{
								from: {
									io: 5,
									item: 0,
								},
								to: {
									io: 7,
									item: 1,
								},
								type: 'dotted',
							},
							{
								from: {
									io: 7,
									item: 0,
								},
								to: {
									io: 0,
									item: 4,
								},
								type: 'dashed',
							},
						],
					},
					{
						id: 'internal-2160332f-4a7d-4bca-b531-96b8029ee6d7',
						name: 'Yaumi Aziza',
						photo: 'https://master.simampu.system-dev.online/v1/File/inline/download?id=327c79f4-c78f-4971-9107-9d9deb3e66f5',
						position: 'Seketariat',
						coordinates: {
							x: 180,
							y: 150,
						},
					},
					{
						id: 'internal-208a04ec-daa6-4323-974b-7b83fa04f06c',
						name: 'Yandi Nugraha',
						photo: 'https://master.simampu.system-dev.online/v1/File/inline/download?id=b5478ecd-8dfe-4b8f-8af5-3326740de37d',
						position: 'Kepala Bagian Logistik',
						coordinates: {
							x: 700,
							y: 300,
						},
					},
					{
						id: 'internal-42c3430d-7b94-4bc7-9e27-daa49b21a3c0',
						name: 'Angun',
						photo: 'https://master.simampu.system-dev.online/v1/File/inline/download?id=2c8be452-d427-4644-9ad0-c7820947c8a2',
						position: 'admin ',
						coordinates: {
							x: 460,
							y: 300,
						},
					},
					{
						id: 'internal-25c25abd-9d05-4fc5-99e3-95f99173e850',
						name: 'Mawar Aulia',
						photo: 'https://master.simampu.system-dev.online/v1/File/inline/download?id=fd364d34-fc38-4c93-87b4-eb535325dd07',
						position: 'admin Kab/kot',
						coordinates: {
							x: 870,
							y: 20,
						},
					},
				],
				list2: [
					{
						id: 'internal-a7395579-dafa-44eb-9c9d-d4b1a559b984',
						name: 'Wadda Karmila',
						photo: 'https://master.simampu.system-dev.online/v1/File/inline/download?id=21105dba-639a-4105-8a8f-f78746b96057',
						position: 'Deputi Bidang Logistik dan Peralatan',
						additionalInfo: {
							oldPosition: 'Deputi Bidang Logistik dan Peralatan',
						},
						coordinates: {
							x: -140,
							y: -50,
						},
						connections: [
							{
								from: {
									io: 5,
									item: 0,
								},
								to: {
									io: 7,
									item: 3,
								},
								type: 'solid',
								points: [
									{
										x: 15,
										y: 230,
									},
								],
							},
							{
								from: {
									io: 5,
									item: 0,
								},
								to: {
									io: 0,
									item: 1,
								},
								type: 'solid',
								points: [
									{
										x: 15,
										y: 230,
									},
								],
							},
							{
								from: {
									io: 7,
									item: 0,
								},
								to: {
									io: 0,
									item: 2,
								},
								type: 'solid',
							},
						],
					},
					{
						id: 'internal-2160332f-4a7d-4bca-b531-96b8029ee6d7',
						name: 'Yaumi Aziza',
						photo: 'https://master.simampu.system-dev.online/v1/File/inline/download?id=327c79f4-c78f-4971-9107-9d9deb3e66f5',
						position: 'Seketariat',
						additionalInfo: {
							oldPosition: 'Seketariat',
						},
						coordinates: {
							x: 70,
							y: 190,
						},
					},
					{
						id: 'internal-42c3430d-7b94-4bc7-9e27-daa49b21a3c0',
						name: 'Angun',
						photo: 'https://master.simampu.system-dev.online/v1/File/inline/download?id=2c8be452-d427-4644-9ad0-c7820947c8a2',
						position: 'admin ',
						additionalInfo: {
							oldPosition: 'admin ',
						},
						coordinates: {
							x: 310,
							y: -40,
						},
					},
					{
						id: 'internal-25c25abd-9d05-4fc5-99e3-95f99173e850',
						name: 'Mawar Aulia',
						photo: 'https://master.simampu.system-dev.online/v1/File/inline/download?id=fd364d34-fc38-4c93-87b4-eb535325dd07',
						position: 'admin Kab/kot',
						additionalInfo: {
							oldPosition: 'admin Kab/kot',
						},
						coordinates: {
							x: -280,
							y: 200,
						},
					},
				],
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
			async onClickButtonTwo() {
				if (this.$refs['example-org-chart-2']) {
					const base64: string | null =
						await this.$refs['example-org-chart-2'].doExport()

					console.log(base64)
				}
			},
		},
		template:
			'<div style="height: 100vh; width: 100%; display: block; justify-content: center; align-items: center;"><Button color="accent" @click="onClickButton">Export See Console for result</Button><OrganizationTree ref="example-org-chart" v-bind="{...args, list: list1}" /><Button color="accent" @click="onClickButtonTwo">Export See Console for result</Button><OrganizationTree ref="example-org-chart-2" v-bind="{...args, list: list2}" /></div>',
	}),
}
