import type { Meta, StoryObj } from '@storybook/vue3'
import type { Channel } from '@storybook/channels'
import { UPDATE_STORY_ARGS } from '@storybook/core-events'

import Wysiwyg from '@/components/form-wysiwyg-quilljs/form-wysiwyg-quilljs.vue'

const meta = {
	title: 'Forms/Wysiswyg Quilljs',
	component: Wysiwyg,
	tags: ['autodocs'],
	argTypes: {
		'onUpdate:modelValue': {
			action: 'change',
			control: false,
			description: 'This event fired when input value changed',
			table: {
				category: 'events',
				type: {
					summary: '(value: any) => void',
				},
			},
			type: 'function',
		},
		errorMessage: {
			control: 'text',
			description: 'Input error message',
		},
		isError: {
			control: 'boolean',
			description: 'Is Input validation error',
		},
		label: {
			control: 'text',
			description: 'Input label',
		},
		modelValue: {
			control: 'text',
			description: 'Input value',
		},
		onChange: {
			action: 'change',
			control: false,
			description: 'This event fired when input value changed',
			table: {
				category: 'events',
				type: {
					summary: '(value: WysiwygOutputData) => void',
				},
			},
			type: 'function',
		},
		onInput: {
			action: 'change',
			control: false,
			description: 'This event fired when input value changed',
			table: {
				category: 'events',
				type: {
					summary: '(value: WysiwygOutputData) => void',
				},
			},
			type: 'function',
		},
		readOnly: {
			control: 'boolean',
			description: 'Is Input read-only',
		},
		required: {
			control: 'boolean',
			description: 'Is Input required',
		},
		tabindex: {
			control: 'number',
			description: 'Input tab-index',
		},
		tools: {
			control: 'object',
			description: 'Editor.js tools',
		},
		value: {
			control: 'text',
			description: 'Input value',
		},
	},
	args: {
		label: 'Some Text Input',
		modelValue:
			'<h2>Minas Tirith</h2><p><br></p><p>Pippin looked out from the shelter of Gandalf"s cloak. He wondered if he was awake or still sleeping, still in the swift-moving dream in which he had been wrapped so long since the great ride began. The dark world was rushing by and the wind sang loudly in his ears. He could see nothing but the wheeling stars, and away to his right vast shadows against the sky where the mountains of the South marched past. Sleepily he tried to reckon the times and stages of their journey, but his memory was drowsy and uncertain.</p><p><br></p><p>There had been the first ride at terrible speed without a halt, and then in the dawn he had seen a pale gleam of gold, and they had come to the silent town and the great empty house on the hill. And hardly had they reached its shelter when the winged shadow had passed over once again, and men wilted with fear. But Gandalf had spoken soft words to him, and he had slept in a corner, tired but uneasy, dimly aware of comings and goings and of men talking and Gandalf giving orders. And then again riding, riding in the night. This was the second, no, the third night since he had looked in the Stone. And with that hideous memory he woke fully, and shivered, and the noise of the wind became filled with menacing voices.</p><p><br></p><p>A light kindled in the sky, a blaze of yellow fire behind dark barriers Pippin cowered back, afraid for a moment, wondering into what dreadful country Gandalf was bearing him. He rubbed his eyes, and then he saw that it was the moon rising above the eastern shadows, now almost at the full. So the night was not yet old and for hours the dark journey would go on. He stirred and spoke.</p><p><br></p><p>"Where are we, Gandalf?" he asked.</p><p><br></p><p>"In the realm of Gondor," the wizard answered. "The land of Anórien is still passing by."</p><p><br></p><p>There was a silence again for a while. Then, "What is that?" cried Pippin suddenly, clutching at Gandalf"s cloak. "Look! Fire, red fire! Are there dragons in this land? Look, there is another!"</p><p><br></p><p>For answer Gandalf cried aloud to his horse. "On, Shadowfax! We must hasten. Time is short. See! The beacons of Gondor are alight, calling for aid. War is kindled. See, there is the fire on Amon Dîn, and flame on Eilenach; and there they go speeding west: Nardol, Erelas, Min-Rimmon, Calenhad, and the Halifirien on the borders of Rohan."</p><p><br></p><p>But Shadowfax paused in his stride, slowing to a walk, and then he lifted up his head and neighed. And out of the darkness the answering neigh of other horses came; and presently the thudding of hoofs was heard, and three riders swept up and passed like flying ghosts in the moon and vanished into the West. Then Shadowfax gathered himself together and sprang away, and the night flowed over him like a roaring wind.</p><p><br></p><p>Pippin became drowsy again and paid little attention to Gandalf telling him of the customs of Gondor, and how the Lord of the City had beacons built on the tops of outlying hills along both borders of the great range, and maintained posts at these points where fresh horses were always in readiness to bear his errand-riders to Rohan in the North, or to Belfalas in the South. "It is long since the beacons of the North were lit," he said; "and in the ancient days of Gondor they were not needed, for they had the Seven Stones." Pippin stirred uneasily.</p><p><br></p><p>"Sleep again, and do not be afraid!" said Gandalf. "For you are not going like Frodo to Mordor, but to Minas Tirith, and there you will be as safe as you can be anywhere in these days. If Gondor falls, or the Ring is taken, then the Shire will be no refuge."</p><p><br></p><p>"You do not comfort me," said Pippin, but nonetheless sleep crept over him. The last thing that he remembered before he fell into deep dream was a glimpse of high white peaks, glimmering like floating isles above the clouds as they caught the light of the westering moon. He wondered where Frodo was, and if he was already in Mordor, or if he was dead; and he did not know that Frodo from far away looked on that same moon as it set beyond Gondor ere the coming of the day.</p>',
		tools: {
			list: {
				ordered: true,
				unordered: true,
			},
			paragraph: {
				align: true,
				background: true,
				blockquote: true,
				code: true,
				color: true,
				header: [1, 2, 3, 4, 5, 6],
				indent: true,
				style: ['bold', 'italic', 'strike', 'underline'],
				subscript: false,
				superscript: false,
			},
		},
	},
	decorators: [
		(story, ctx) => {
			delete (ctx.args as any).onChange
			delete (ctx.args as any).onInput
			delete (ctx.args as any)['onUpdate:modelValue']
			;(ctx.args as any).onInput = (value: any) => {
				// eslint-disable-next-line no-underscore-dangle
				const channel = (window as any)
					.__STORYBOOK_ADDONS_CHANNEL__ as Channel

				channel.emit(UPDATE_STORY_ARGS, {
					storyId: ctx.id,
					updatedArgs: { modelValue: value },
				})
			}

			return story()
		},
	],
	parameters: {
		docs: {
			controls: {
				exclude: [
					'blur',
					'change',
					'focus',
					'input',
					'keydown',
					'update:modelValue',
				],
				sort: 'requiredFirst',
			},
		},
	},
	render: (args) => ({
		components: { Wysiwyg },
		setup() {
			return { args }
		},
		template: '<Wysiwyg v-bind="args" />',
	}),
} satisfies Meta<typeof Wysiwyg>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {},
}

export const ReadOnly: Story = {
	args: {
		readOnly: true,
	},
}

export const Error: Story = {
	args: {
		errorMessage: 'Some Error Message',
		isError: true,
	},
}
