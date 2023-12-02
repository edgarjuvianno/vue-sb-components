import type { Meta, StoryObj } from '@storybook/vue3'
import type { Channel } from '@storybook/channels'
import { UPDATE_STORY_ARGS } from '@storybook/core-events'

import Tree from '@/components/tree/tree.vue'
import { ITreeItem } from '@/interface'

const meta = {
	title: 'Components/Tree',
	component: Tree,
	tags: ['autodocs'],
	argTypes: {
		change: {
			action: 'change',
			control: false,
			description: 'Tree will fire this event when user select items',
		},
		checkBox: {
			control: 'boolean',
			description: 'Show Check Box on each item',
		},
		expand: {
			action: 'change',
			control: false,
			description: 'Tree will fire this event when Tree items expanded',
		},
		expanded: {
			control: 'boolean',
			description: 'Expand/Collapse Tree items',
		},
		list: {
			control: 'object',
			description: 'Tree items',
		},
		multi: {
			control: 'boolean',
			description: 'Multiple select Tree item',
		},
		selected: {
			control: 'object',
			description: 'Selected Tree items',
		},
	},
	args: {
		list: [
			{
				label: 'My Tree',
				children: [
					{ label: 'hello', value: 1 },
					{ label: 'wat', value: 2 },
					{
						label: 'child folder',
						children: [
							{
								label: 'child folder',
								children: [
									{ label: 'hello', value: 3 },
									{ label: 'wat', value: 4 },
								],
							},
							{ label: 'hello', value: 5 },
							{ label: 'wat', value: 6 },
							{
								label: 'child folder',
								children: [
									{ label: 'hello', value: 7 },
									{ label: 'wat', value: 8 },
								],
							},
						],
					},
				],
			},
			{
				label: 'yolo',
				value: 9,
			},
		],
		selected: null,
	},
	decorators: [
		(story, ctx) => {
			delete (ctx.args as any).change
			;(ctx.args as any).onChange = (
				selected: ITreeItem | ITreeItem[] | null,
			) => {
				// eslint-disable-next-line no-underscore-dangle
				const channel = (window as any)
					.__STORYBOOK_ADDONS_CHANNEL__ as Channel

				channel.emit(UPDATE_STORY_ARGS, {
					storyId: ctx.id,
					updatedArgs: { selected },
				})
			}

			return story()
		},
	],
} satisfies Meta<typeof Tree>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {},
}

export const MultiSelect: Story = {
	args: {
		multi: true,
	},
}

export const CheckBox: Story = {
	args: {
		checkBox: true,
	},
}

export const MultiCheckBox: Story = {
	args: {
		checkBox: true,
		multi: true,
	},
}
