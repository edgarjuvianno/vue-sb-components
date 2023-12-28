import type { Meta, StoryObj } from '@storybook/vue3'
import type { Channel } from '@storybook/channels'
import { UPDATE_STORY_ARGS } from '@storybook/core-events'

import Menu from '@/components/menu/menu.vue'
import MenuItem from '@/components/menu-item/menu-item.vue'

const meta = {
	title: 'Components/Menu',
	component: Menu,
	tags: ['autodocs'],
	argTypes: {
		color: {
			control: 'select',
			description: 'Button color',
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
		disabled: {
			control: 'boolean',
			description: 'Is Button disabled',
		},
		label: {
			control: 'text',
			description: 'Menu button label',
		},
		noElevation: {
			control: 'boolean',
			description: 'Button has elevation or not (default: true)',
		},
		open: {
			control: 'boolean',
			description: 'Set Menu is open or not',
		},
		size: {
			control: 'select',
			description: 'Button sizes',
			options: ['base', 'large', 'small'],
		},
		tooltip: {
			control: 'text',
			description: 'Button tooltip',
		},
		variant: {
			control: 'select',
			description: 'Button variants',
			options: ['contained', 'outlined', 'text'],
		},
	},
	args: {
		label: 'Menu Prop',
		open: true,
	},
	parameters: {
		docs: {
			controls: {
				sort: 'requiredFirst',
			},
		},
		slots: {
			'slot-label': {
				description:
					'Menu button label slot component will render this over label prop',
			},
			default: {
				description: 'Menu item slot',
			},
		},
	},
	render: (args, { id }) => ({
		components: { Menu, MenuItem },
		setup() {
			const onClickItem: any = () => {
				// eslint-disable-next-line no-underscore-dangle
				const channel = (window as any)
					.__STORYBOOK_ADDONS_CHANNEL__ as Channel

				channel.emit(UPDATE_STORY_ARGS, {
					storyId: id,
					updatedArgs: { open: false },
				})
			}

			return { args, onClickItem }
		},
		template: `
			<div style="height: 20rem; display: flex; justify-content: center; padding-top: 2rem;">
				<Menu v-bind="args">
					<template v-slot:slot-label>Menu Slot</template>
					<MenuItem @click="onClickItem">Menu 1</MenuItem>
					<MenuItem @click="onClickItem">Menu 2</MenuItem>
					<MenuItem @click="onClickItem">Menu 3</MenuItem>
					<MenuItem @click="onClickItem">Menu 4</MenuItem>
				</Menu>
			</div>
		`,
	}),
} satisfies Meta<typeof Menu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {},
}
