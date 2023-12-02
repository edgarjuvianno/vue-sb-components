import type { Meta, StoryObj } from '@storybook/vue3'

import Button from '@/components/button/button.vue'

const meta = {
	title: 'Components/Button',
	component: Button,
	tags: ['autodocs'],
	argTypes: {
		click: {
			action: 'click',
			control: false,
			description: 'Fired when Button clicked',
		},
		color: {
			control: 'select',
			description: 'Button color',
			options: [
				'accent',
				'default',
				'primary',
				'info',
				'secondary',
				'warning',
				'success',
				'danger',
			],
		},
		disabled: {
			control: 'boolean',
			description: 'Is Button disabled',
		},
		noElevation: {
			control: 'boolean',
			description: 'Button has elevation or not (default: true)',
		},
		size: {
			control: 'select',
			description: 'Button sizes',
			options: ['base', 'large', 'small'],
		},
		tooltip: {
			control: 'text',
			description: 'Button tooltip',
		},
		variant: {
			control: 'select',
			description: 'Button variants',
			options: ['contained', 'outlined', 'text'],
		},
	},
	args: {
		color: 'accent',
	},
	decorators: [
		(story, ctx) => {
			delete (ctx.args as any).click

			return story()
		},
	],
	parameters: {
		slots: {
			default: {
				description: 'Button default slot',
				template: 'Button',
			},
		},
	},
	render: (args, { parameters }) => ({
		components: { Button },
		setup() {
			return { args, slot: parameters.slots.default.template }
		},
		template:
			'<div style="height: 5rem; display: flex; justify-content: center; align-items: center;"><Button v-bind="args">{{ slot }}</Button></div>',
	}),
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Tooltip: Story = {
	args: {
		tooltip: 'Example Tooltip',
	},
}
