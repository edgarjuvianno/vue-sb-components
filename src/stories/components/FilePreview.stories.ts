import type { Meta, StoryObj } from '@storybook/vue3'
import type { Channel } from '@storybook/channels'
import { UPDATE_STORY_ARGS } from '@storybook/core-events'

import Button from '@/components/button/button.vue'
import FilePreview from '@/components/file-preview/file-preview.vue'
import DummyPDF from '../assets/dummy.pdf'

const meta = {
	title: 'Components/File Preview',
	component: FilePreview,
	tags: ['autodocs'],
	argTypes: {
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
		pdfDisplayType: {
			control: 'select',
			description: 'PDF Preview type',
			options: ['pagination', 'scroll'],
		},
		show: {
			control: 'boolean',
			description: 'Show or Hide File Preview',
		},
		src: {
			control: 'text',
			description: 'File URI',
		},
		type: {
			control: 'select',
			description: 'File Type',
			options: ['audio', 'image', 'pdf', 'video'],
		},
	},
	args: {
		show: false,
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
	},
	render: (args, { id }) => ({
		components: { Button, FilePreview },
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

			return { args, onClickButton }
		},
		template:
			'<div style="height: 5rem; display: flex; justify-content: center; align-items: center;"><FilePreview v-bind="args" /><Button color="accent" @click="onClickButton">Show Modal</Button></div>',
	}),
} satisfies Meta<typeof FilePreview>

export default meta
type Story = StoryObj<typeof meta>

export const Audio: Story = {
	args: {
		src: 'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
		type: 'audio',
	},
}

export const Image: Story = {
	args: {
		src: 'https://images.hdqwalls.com/wallpapers/vue-js-kk.jpg',
		type: 'image',
	},
}

export const PDF: Story = {
	args: {
		src: DummyPDF,
		type: 'pdf',
	},
}

export const PDFScroll: Story = {
	args: {
		pdfDisplayType: 'scroll',
		src: DummyPDF,
		type: 'pdf',
	},
}

export const Video: Story = {
	args: {
		src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
		type: 'video',
	},
}
