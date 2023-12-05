import type { Meta, StoryObj } from '@storybook/vue3'

import ButtonGroup from '@/components/button-group/button-group.vue'

const meta = {
	title: 'Components/Button Group',
	component: ButtonGroup,
	tags: ['autodocs'],
	argTypes: {
		color: {
			control: 'select',
			description: 'Button Group color',
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
		list: {
			control: 'object',
			description: 'Button Group list',
		},
		onClick: {
			action: 'click',
			control: false,
			description: 'Fired when Button clicked',
			table: {
				category: 'events',
				type: {
					summary: '(index: number) => void',
				},
			},
			type: 'function',
		},
		orientation: {
			control: 'select',
			description: 'Button Group orientation',
			options: ['horizontal', 'vertical'],
		},
		size: {
			control: 'select',
			description: 'Button Group sizes',
			options: ['base', 'large', 'small'],
		},
		variant: {
			control: 'select',
			description: 'Button Group variants',
			options: ['contained', 'outlined', 'text'],
		},
	},
	args: {
		color: 'accent',
		list: [
			{
				label: 'Button A',
			},
			{
				label: 'Button B',
			},
			{
				label: 'Button C',
			},
		],
	},
	decorators: [
		(story, ctx) => {
			delete (ctx.args as any).click

			return story()
		},
	],
	parameters: {
		docs: {
			controls: {
				exclude: ['click'],
				sort: 'requiredFirst',
			},
		},
	},
	render: (args) => ({
		components: { ButtonGroup },
		setup() {
			return { args }
		},
		template:
			'<div style="height: 5rem; display: flex; justify-content: center; align-items: center;"><ButtonGroup v-bind="args" /></div>',
	}),
} satisfies Meta<typeof ButtonGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Vertical: Story = {
	args: {
		orientation: 'vertical',
	},
	render: (args) => ({
		components: { ButtonGroup },
		setup() {
			return { args }
		},
		template:
			'<div style="height: 15rem; display: flex; justify-content: center; align-items: center;"><ButtonGroup v-bind="args" /></div>',
	}),
}
