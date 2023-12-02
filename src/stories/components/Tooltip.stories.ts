import type { Meta, StoryObj } from '@storybook/vue3'

import Tooltip from '@/components/tooltip/tooltip.vue'

const meta = {
	title: 'Components/Tooltip',
	component: Tooltip,
	tags: ['autodocs'],
	argTypes: {
		hidden: {
			control: 'boolean',
			description: 'Whether hide tooltip or not',
		},
		label: {
			control: 'text',
			description: 'Tooltip Text',
		},
	},
	args: {
		label: 'This is Tooltip',
	},
	render: (args) => ({
		components: { Tooltip },
		setup() {
			return { args }
		},
		template:
			'<div style="height: 5rem; display: flex; justify-content: center; align-items: center;"><Tooltip v-bind="args"><p>This Text has Tooltip</p></Tooltip></div>',
	}),
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {},
}
