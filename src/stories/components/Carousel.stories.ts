import type { Meta, StoryObj } from '@storybook/vue3'

import Carousel from '@/components/carousel/carousel.vue'

const meta = {
	title: 'Components/Carousel',
	component: Carousel,
	tags: ['autodocs'],
	argTypes: {
		arrow: {
			control: 'boolean',
			description: 'Whether Hide/Show Carousel Arrow',
		},
		autoplay: {
			control: 'boolean',
			description: 'Carousel auto slide or net',
		},
		cardsToShow: {
			control: 'number',
			description: 'Total Cards to Show for each slide',
		},
		dots: {
			control: 'boolean',
			description: 'Whether Hide/Show Carousel Dots Navigation',
		},
		infinite: {
			control: 'boolean',
			description: 'Infnite slides',
		},
		list: {
			control: 'object',
			description: 'Cards list',
		},
		responsive: {
			control: 'object',
			description:
				'Configurations for each breakpoint. Breakpoint in pixels',
		},
		speed: {
			control: 'number',
			description: 'Autoplay speed in ms',
		},
	},
	args: {
		list: [1, 2, 3, 4],
	},
	parameters: {
		docs: {
			sort: 'requiredFirst',
		},
		slots: {
			card: {
				description: 'Card render template',
				template: `
					<template #card="{ data }">
						<div style="display: flex; align-items: center; justify-content: center;">
							<h3>{{ data }}</h3>
						</div>
					</template>
				`,
			},
		},
	},
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {},
}

export const Infinite: Story = {
	args: {
		infinite: true,
	},
}

export const AutoPlay: Story = {
	args: {
		autoplay: true,
		infinite: true,
	},
}

export const Responsive: Story = {
	args: {
		list: [1, 2, 3, 4, 5, 6],
		responsive: [
			{
				breakpoint: 450,
				settings: {
					cardsToShow: 1,
					dots: false,
					infinite: true,
				},
			},
			{
				breakpoint: 1024,
				settings: {
					cardsToShow: 2,
					dots: true,
					infinite: false,
				},
			},
			{
				breakpoint: 1400,
				settings: {
					cardsToShow: 3,
					dots: true,
					infinite: false,
				},
			},
		],
	},
}
