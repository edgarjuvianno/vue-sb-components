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
		onChange: {
			action: 'click',
			control: false,
			description: 'Fired when Accordion will expand or will collapse',
			table: {
				category: 'events',
				type: {
					summary: '(expanded: boolean) => void',
				},
			},
			type: 'function',
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
			},
		},
		slots: {
			default: {
				description: 'Accordion body slot',
				template: '<div>Example Slot</div>',
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
