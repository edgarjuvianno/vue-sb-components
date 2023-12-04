import type { Meta, StoryObj } from '@storybook/vue3'
import type { Channel } from '@storybook/channels'
import { UPDATE_STORY_ARGS } from '@storybook/core-events'

import Alert from '@/components/alert/alert.vue'
import Button from '@/components/button/button.vue'

const meta = {
	title: 'Components/Alert',
	component: Alert,
	tags: ['autodocs'],
	argTypes: {
		cancelButton: {
			control: 'object',
			description: 'Cancel Button configurations only for variant "big"',
		},
		confirmButton: {
			control: 'object',
			description: 'Confirm Button configurations only for variant "big"',
		},
		customClass: {
			control: 'text',
			description: 'Pass your custom class',
		},
		duration: {
			control: {
				min: -1,
				type: 'range',
			},
			description:
				'Alert duration before fire event "close", pass "-1" for indifinite duration',
		},
		icon: {
			control: 'select',
			description: 'Alert Icon',
			options: [
				'success',
				'error',
				'info',
				'warning',
				'question',
				'loading',
			],
		},
		onClose: {
			action: 'click',
			control: false,
			description: 'Fired when Alert will close',
			table: {
				category: 'events',
				type: {
					summary: '(action?: "cancel" | "confirm") => void',
				},
			},
			type: 'function',
		},
		positionX: {
			control: 'select',
			description: 'Alert X Axis position only for variant "flat"',
			options: ['center', 'left', 'right'],
		},
		positionY: {
			control: 'select',
			description: 'Alert Y Axis position only for variant "flat"',
			options: ['bottom', 'center', 'top'],
		},
		show: {
			control: 'boolean',
			description: 'Set Alert visible or not',
		},
		text: {
			control: 'text',
			description: 'Alert text for both variant',
		},
		title: {
			control: 'text',
			description: 'Alert title only for variant "big"',
		},
		variant: {
			control: 'select',
			description: 'Alert variant',
			options: ['big', 'flat'],
		},
	},
	args: {
		duration: -1,
		icon: 'success',
		show: false,
		text: 'Example Alert Message',
	},
	decorators: [
		(story, ctx) => {
			delete (ctx.args as any).close
			;(ctx.args as any).onClose = () => {
				// eslint-disable-next-line no-underscore-dangle
				const channel = (window as any)
					.__STORYBOOK_ADDONS_CHANNEL__ as Channel

				channel.emit(UPDATE_STORY_ARGS, {
					storyId: ctx.id,
					updatedArgs: { show: false },
				})
			}

			return story()
		},
	],
	parameters: {
		docs: {
			controls: {
				exclude: ['close'],
			},
		},
		slots: {
			'custom-icon': {
				description: 'Pass this slot for custom icon',
				template:
					'<img src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Vue.png" style="width: 7rem;" />',
			},
			body: {
				description: 'Pass this slot for custom text',
				template:
					'<div style="color: white; background: teal;">Custom Body</div>',
			},
		},
	},
	render: (args, { id }) => ({
		components: { Alert, Button },
		setup() {
			const onClickButton: any = () => {
				// eslint-disable-next-line no-underscore-dangle
				const channel = (window as any)
					.__STORYBOOK_ADDONS_CHANNEL__ as Channel

				channel.emit(UPDATE_STORY_ARGS, {
					storyId: id,
					updatedArgs: { show: true },
				})
			}

			return { args, onClickButton }
		},
		template:
			'<div style="height: 5rem; display: flex; justify-content: center; align-items: center;"><Alert v-bind="args" /><Button color="accent" @click="onClickButton">Show Alert</Button></div>',
	}),
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const FlatAlert: Story = {
	args: {
		show: false,
		variant: 'flat',
	},
	decorators: [
		(story, ctx) => {
			delete (ctx.parameters as any).slots

			return story()
		},
	],
}

export const BigAlert: Story = {
	args: {
		show: false,
		title: 'Example Alert Title',
		variant: 'big',
	},
	decorators: [
		(story, ctx) => {
			delete (ctx.parameters as any).slots

			return story()
		},
	],
}

export const CustomIconAlert: Story = {
	args: {
		show: false,
		title: 'Example Alert Title',
		variant: 'big',
	},
}
