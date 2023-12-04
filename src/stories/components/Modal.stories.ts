import type { Meta, StoryObj } from '@storybook/vue3'
import type { Channel } from '@storybook/channels'
import { UPDATE_STORY_ARGS } from '@storybook/core-events'

import Modal from '@/components/modal/modal.vue'
import Button from '@/components/button/button.vue'

const meta = {
	title: 'Components/Modal',
	component: Modal,
	tags: ['autodocs'],
	argTypes: {
		container: {
			control: 'select',
			description: 'Set modal size',
			options: ['x-large', 'large', 'medium', 'small', 'fit-content'],
		},
		id: {
			control: 'text',
			description: 'Set Modal id',
		},
		onClose: {
			action: 'click',
			control: false,
			description: 'Fired when Modal will close',
			table: {
				category: 'events',
				type: {
					summary: '() => void',
				},
			},
			type: 'function',
		},
		show: {
			control: 'boolean',
			description: 'Set Modal visible or not',
		},
		showX: {
			control: 'boolean',
			description: 'Set Modal button close visible or not',
		},
	},
	args: {
		container: 'medium',
		show: false,
		showX: true,
	},
	decorators: [
		(story, ctx) => {
			delete (ctx.args as any).close
			;(ctx.args as any).onClose = () => {
				// eslint-disable-next-line no-underscore-dangle
				const channel = (window as any)
					.__STORYBOOK_ADDONS_CHANNEL__ as Channel

				channel.emit(UPDATE_STORY_ARGS, {
					storyId: ctx.id,
					updatedArgs: { show: false },
				})
			}

			return story()
		},
	],
	parameters: {
		docs: {
			controls: {
				exclude: ['close'],
			},
		},
		slots: {
			default: {
				description: 'Modal Default Slot',
				template: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
			},
		},
	},
	render: (args, { id, parameters }) => ({
		components: { Modal, Button },
		setup() {
			const onClickButton: any = () => {
				// eslint-disable-next-line no-underscore-dangle
				const channel = (window as any)
					.__STORYBOOK_ADDONS_CHANNEL__ as Channel

				channel.emit(UPDATE_STORY_ARGS, {
					storyId: id,
					updatedArgs: { show: true },
				})
			}

			const slot: any = parameters.slots.default.template

			return { args, onClickButton, slot }
		},
		template:
			'<div style="height: 5rem; display: flex; justify-content: center; align-items: center;"><Modal v-bind="args">{{ slot }}</Modal><Button color="accent" @click="onClickButton">Show Modal</Button></div>',
	}),
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		show: false,
	},
}
