import type { Meta, StoryObj } from '@storybook/vue3'
import type { Channel } from '@storybook/channels'
import { UPDATE_STORY_ARGS } from '@storybook/core-events'

import Accordion from '@/components/accordion/accordion.vue'

const meta = {
	title: 'Components/Accordion',
	component: Accordion,
	tags: ['autodocs'],
	argTypes: {
		clickOutside: {
			control: 'boolean',
			description: 'Whether Accordion will close on outside click',
		},
		color: {
			control: 'select',
			description: 'Set Accordion header color',
			options: [
				'accent',
				'default',
				'secondary',
				'primary',
				'info',
				'warning',
				'success',
				'danger',
			],
		},
		expand: {
			control: 'boolean',
			description: 'Set Accordion is expanded or not',
		},
		title: { control: 'text', description: 'Accordion header text' },
	},
	args: {},
	decorators: [
		(story, ctx) => {
			delete (ctx.args as any).change
			;(ctx.args as any).onChange = (expanded: boolean) => {
				// eslint-disable-next-line no-underscore-dangle
				const channel = (window as any)
					.__STORYBOOK_ADDONS_CHANNEL__ as Channel

				channel.emit(UPDATE_STORY_ARGS, {
					storyId: ctx.id,
					updatedArgs: { expand: expanded },
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
		slots: {
			default: {
				description: 'Accordion body slot',
				template:
					'<div>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>',
			},
		},
	},
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const ClickOutside: Story = {
	args: {
		clickOutside: true,
		expand: true,
		title: 'Example Title',
	},
}

export const NotClickOutside: Story = {
	args: {
		clickOutside: false,
		expand: true,
		title: 'Example Title',
	},
}
