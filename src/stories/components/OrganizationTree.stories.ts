import type { Meta, StoryObj } from '@storybook/vue3'
import type { Channel } from '@storybook/channels'
import { UPDATE_STORY_ARGS } from '@storybook/core-events'
import { IOrganizationTreeItem } from '@/interface'

import OrganizationTree from '@/components/organization-tree/organization-tree.vue'

const meta = {
	title: 'Components/Organization Tree',
	component: OrganizationTree,
	tags: ['autodocs'],
	argTypes: {
		isDraggable: {
			control: 'boolean',
			description: 'Is Item draggable',
		},
		list: {
			control: 'object',
			description: 'Organization Tree items',
		},
		onChange: {
			action: 'click',
			control: false,
			description: 'Fired when tree changed by user drag',
			table: {
				category: 'events',
				type: {
					summary: '(list: IOrganizationTreeItem) => void',
				},
			},
			type: 'function',
		},
	},
	args: {
		list: {
			childs: [
				{
					childs: [
						{
							childs: [
								{
									name: 'Ellie',
									photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww',
									position: 'Jr. Software Engineer',
								},
								{
									childs: [
										{
											name: 'David',
											photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww',
											position: 'Front-End Engineer',
										},
										{
											name: 'Motoki',
											photo: 'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D',
											position: 'Back-End Engineer',
										},
									],
									name: 'Owen',
									photo: 'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D',
									position: 'Software Engineer',
								},
							],
							name: 'Ospan Ali',
							photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww',
							position: 'Head of Software Engineering',
						},
					],
					department: 'Software Engineering',
				},
			],
			name: 'Griffin Woldridge',
			photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww',
			position: 'CEO',
		},
	},
	decorators: [
		(story, ctx) => {
			delete (ctx.args as any).change
			;(ctx.args as any).onChange = (list: IOrganizationTreeItem) => {
				// eslint-disable-next-line no-underscore-dangle
				const channel = (window as any)
					.__STORYBOOK_ADDONS_CHANNEL__ as Channel

				channel.emit(UPDATE_STORY_ARGS, {
					storyId: ctx.id,
					updatedArgs: { list },
				})
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
} satisfies Meta<typeof OrganizationTree>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {},
}

export const Draggable: Story = {
	args: {
		isDraggable: true,
	},
}

export const AdditionalInfo: Story = {
	args: {
		list: {
			childs: [
				{
					childs: [
						{
							additionalInfo:
								'<p style="margin: 0;">additional info</p>',
							childs: [
								{
									additionalInfo:
										'<p style="margin: 0;">additional info</p>',
									name: 'Ellie',
									photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww',
									position: 'Jr. Software Engineer',
								},
								{
									childs: [
										{
											additionalInfo:
												'<p style="margin: 0;">additional info</p>',
											name: 'David',
											photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww',
											position: 'Front-End Engineer',
										},
										{
											name: 'Motoki',
											photo: 'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D',
											position: 'Back-End Engineer',
										},
									],
									name: 'Owen',
									photo: 'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D',
									position: 'Software Engineer',
								},
							],
							name: 'Ospan Ali',
							photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww',
							position: 'Head of Software Engineering',
						},
					],
					department: 'Software Engineering',
				},
			],
			name: 'Griffin Woldridge',
			photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww',
			position: 'CEO',
		},
	},
}
