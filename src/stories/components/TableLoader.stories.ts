import type { Meta, StoryObj } from '@storybook/vue3'

import Datatable from '@/components/datatable/datatable.vue'
import TableLoader from '@/components/table-loader/table-loader.vue'

const meta = {
	title: 'Components/Table Loader',
	component: TableLoader,
	tags: ['autodocs'],
	argTypes: {
		rowCount: {
			control: 'number',
			description: 'Table row count',
		},
	},
	render: (args) => ({
		components: { Datatable, TableLoader },
		setup() {
			return { args }
		},
		template:
			'<Datatable><template v-slot:header><tr><th>A</th><th>B</th><th>C</th><th>D</th></tr></template><template v-slot:body><TableLoader v-bind="args" /></template></Datatable>',
	}),
} satisfies Meta<typeof TableLoader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		rowCount: 10,
	},
}
