import type { Meta, StoryObj } from '@storybook/vue3'

import ProgressBar from '@/components/progress-bar/progress-bar.vue'

const meta = {
	title: 'Components/Progress Bar',
	component: ProgressBar,
	tags: ['autodocs'],
	argTypes: {
		color: {
			control: 'select',
			description: 'Progress Bar color',
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
		height: {
			control: 'number',
			description: 'Progress Bar height in pixels',
		},
		indeterminate: {
			control: 'boolean',
			description: 'Whether Progress Bar is indeterminate or not',
		},
		percentage: {
			control: 'boolean',
			description: 'Show Progress Bar percentage',
		},
		progress: {
			control: 'number',
			description: 'Progress Bar value',
		},
	},
	render: (args) => ({
		components: { ProgressBar },
		setup() {
			return { args }
		},
		template:
			'<div style="height: 5rem; display: flex; justify-content: center; align-items: center;"><ProgressBar v-bind="args" /></div>',
	}),
} satisfies Meta<typeof ProgressBar>

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
	},
}

export const Indeterminate: Story = {
	args: {
		indeterminate: true,
	},
}
