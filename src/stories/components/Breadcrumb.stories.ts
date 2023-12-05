import type { Meta, StoryObj } from '@storybook/vue3'

import Breadcrumb from '@/components/breadcrumb/breadcrumb.vue'

const meta = {
	title: 'Components/Breadcrumb',
	component: Breadcrumb,
	tags: ['autodocs'],
	argTypes: {
		list: {
			control: 'object',
			description: 'List of crumbs in string',
		},
	},
	args: {
		list: [],
	},
	parameters: {
		docs: {
			controls: {
				sort: 'requiredFirst',
			},
		},
	},
	render: (args) => ({
		components: { Breadcrumb },
		setup() {
			return { args }
		},
		template:
			'<div style="height: 5rem; display: flex; justify-content: center; align-items: center;"><Breadcrumb v-bind="args" /></div>',
	}),
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

export const List: Story = {
	args: {
		list: ['a', 'b', 'c'],
	},
}
