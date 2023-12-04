import type { Meta, StoryObj } from '@storybook/vue3'

import Switch from '@/components/switch/switch.vue'

const meta = {
	title: 'Components/Switch',
	component: Switch,
	tags: ['autodocs'],
	argTypes: {
		active: {
			control: 'boolean',
			description: 'Toggle Switch',
		},
		activeColor: {
			control: 'object',
			description: 'Switch active state color (color in hex)',
		},
		label: {
			control: 'object',
			description: 'Switch label for active & not active',
		},
		noElevation: {
			control: 'boolean',
			description: 'Toggle Switch elevation',
		},
		onChange: {
			action: 'click',
			control: false,
			description: 'Fired when Switch on change',
			table: {
				category: 'events',
				type: {
					summary: '(isActive: boolean) => void',
				},
			},
			type: 'function',
		},
	},
	args: {
		active: false,
		label: {
			active: 'Active',
			notActive: 'Inactive',
		},
	},
	parameters: {
		docs: {
			controls: {
				exclude: ['change'],
			},
		},
	},
	render: (args) => ({
		components: { Switch },
		setup() {
			return { args }
		},
		template:
			'<div style="height: 5rem; display: flex; justify-content: center; align-items: center;"><Switch v-bind="args" /></div>',
	}),
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {},
}

export const CustomColor: Story = {
	args: {
		activeColor: {
			background: '#C2D9FF',
			toggle: '#190482',
		},
	},
}
