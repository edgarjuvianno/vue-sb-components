import type { Meta, StoryObj } from '@storybook/vue3'

import Card from '@/components/card/card.vue'

const meta = {
	title: 'Components/Card',
	component: Card,
	tags: ['autodocs'],
	argTypes: {
		errorMessage: {
			control: 'text',
			description: 'Card Error Message',
		},
		isError: {
			control: 'boolean',
			description: 'Whether card is in error state',
		},
	},
	args: {},
	parameters: {
		slots: {
			default: {
				description: 'Card default slot',
				template: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
			},
			footer: {
				description: 'Card Footer',
			},
			header: {
				description: 'Card Header',
			},
		},
	},
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {},
	decorators: [
		(story, { parameters }) => {
			delete parameters.slots.footer
			delete parameters.slots.header

			return story()
		},
	],
}

export const HeaderAndFooter: Story = {
	args: {},
	parameters: {
		slots: {
			footer: {
				template: 'Example Footer',
			},
			header: {
				template: 'Example Header',
			},
		},
	},
}

export const ErrorState: Story = {
	args: {
		errorMessage: 'Example Error Message',
		isError: true,
	},
}
