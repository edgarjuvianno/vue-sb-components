import type { Meta, StoryObj } from '@storybook/vue3'

import ProgressCircular from '@/components/progress-circular/progress-circular.vue'

const meta = {
	title: 'Components/Progress Circular',
	component: ProgressCircular,
	tags: ['autodocs'],
	argTypes: {
		color: {
			control: 'select',
			description: 'Progress Circular color',
			options: [
				'accent',
				'default',
				'primary',
				'info',
				'secondary',
				'warning',
				'success',
				'danger',
				'white',
				'black',
			],
		},
		indeterminate: {
			control: 'boolean',
			description: 'Whether Progress Circular is indeterminate or not',
		},
		percentage: {
			control: 'boolean',
			description: 'Show Progress Circular percentage',
		},
		progress: {
			control: 'number',
			description: 'Progress Circular value',
		},
		size: {
			control: 'number',
			description: 'Progress Circular size in pixels',
		},
	},
	render: (args) => ({
		components: { ProgressCircular },
		setup() {
			return { args }
		},
		template:
			'<div style="height: 5rem; display: flex; justify-content: center; align-items: center;"><ProgressCircular v-bind="args" /></div>',
	}),
} satisfies Meta<typeof ProgressCircular>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		progress: 75,
	},
}

export const Percentage: Story = {
	args: {
		percentage: true,
		progress: 75,
		size: 60,
	},
}

export const Indeterminate: Story = {
	args: {
		indeterminate: true,
	},
}
