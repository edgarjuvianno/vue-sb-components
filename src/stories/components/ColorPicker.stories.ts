import type { Meta, StoryObj } from '@storybook/vue3'

import ColorPicker from '@/components/color-picker/color-picker.vue'

const meta = {
	title: 'Components/Color Picker',
	component: ColorPicker,
	tags: ['autodocs'],
	argTypes: {
		'update:modelValue': {
			action: 'change',
			control: false,
			description: 'Fired when picker value changed',
		},
		change: {
			action: 'change',
			control: false,
			description: 'Fired when picker value changed',
		},
		label: {
			control: 'text',
			description: 'Color Picker label',
		},
		list: {
			control: 'object',
			description: 'List of colors in hex',
		},
		modelValue: {
			control: 'text',
			description: 'Selected color in hex',
		},
		value: {
			control: 'text',
			description: 'Selected color in hex',
		},
	},
	args: {
		list: [],
	},
	render: (args) => ({
		components: { ColorPicker },
		setup() {
			return { args }
		},
		template:
			'<div style="height: 5rem; width: 100%;"><ColorPicker style="margin: 0 auto;" v-bind="args" /></div>',
	}),
} satisfies Meta<typeof ColorPicker>

export default meta
type Story = StoryObj<typeof meta>

export const List: Story = {
	args: {
		label: 'Color Picker',
		list: ['#7071E8', '#C683D7', '#ED9ED6', '#FFC7C7'],
	},
}
