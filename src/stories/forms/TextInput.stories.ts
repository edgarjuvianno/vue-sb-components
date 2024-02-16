import type { Meta, StoryObj } from '@storybook/vue3'
import type { Channel } from '@storybook/channels'
import { UPDATE_STORY_ARGS } from '@storybook/core-events'
import { h } from 'vue'

import TextInput from '@/components/form-input/form-input.vue'

const meta = {
	title: 'Forms/Text Input',
	component: TextInput,
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
		autocomplete: {
			control: 'text',
			description: 'Is Input autocomplete on/off',
		},
		disabled: {
			control: 'boolean',
			description: 'Is Input disabled',
		},
		errorMessage: {
			control: 'text',
			description: 'Input error message',
		},
		icon: {
			control: 'object',
			description: 'Input Icon configurations',
		},
		isError: {
			control: 'boolean',
			description: 'Is Input validation error',
		},
		isFocus: {
			control: 'boolean',
			description: 'Trigger input focus',
		},
		label: {
			control: 'text',
			description: 'Input label',
		},
		max: {
			control: 'number',
			description: 'Input type "number" max value',
		},
		min: {
			control: 'number',
			description: 'Input type "number" min value',
		},
		modelValue: {
			control: 'text',
			description: 'Input value',
		},
		name: {
			control: 'text',
			description: 'Input Name',
		},
		noSavePassword: {
			control: 'boolean',
			description:
				'Custom Input for type "password". Use this if you do not want browser to prompt "save password" dialog',
		},
		onBlur: {
			action: 'change',
			control: false,
			description: 'This event fired when on blur',
			table: {
				category: 'events',
				type: {
					summary: '(event: Event) => void',
				},
			},
			type: 'function',
		},
		onFocus: {
			action: 'change',
			control: false,
			description: 'This event fired when on focus',
			table: {
				category: 'events',
				type: {
					summary: '(event: Event) => void',
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
					summary: '(event: Event) => void',
				},
			},
			type: 'function',
		},
		onKeydown: {
			action: 'change',
			control: false,
			description: 'This event fired when on keydown',
			table: {
				category: 'events',
				type: {
					summary: '(event: Event) => void',
				},
			},
			type: 'function',
		},
		placeholder: {
			control: 'text',
			description: 'Input placeholder',
		},
		readOnly: {
			control: 'boolean',
			description: 'Is Input read-only',
		},
		required: {
			control: 'boolean',
			description: 'Is Input required',
		},
		step: {
			control: 'number',
			description: 'Input type "number" step',
		},
		tabindex: {
			control: 'number',
			description: 'Input tab-index',
		},
		textAlign: {
			control: 'select',
			description: 'Input text align',
			options: ['left', 'right'],
		},
		type: {
			control: 'select',
			description:
				'Input type. For type "number" please use our [Number Input](/?path=/docs/forms-number-input--docs) for better experience',
			options: ['text', 'number', 'textarea', 'password', 'email'],
		},
		value: {
			control: 'text',
			description: 'Input value',
		},
		variant: {
			control: 'select',
			description: 'Input style',
			options: ['default', 'flat'],
		},
	},
	args: {
		label: 'Some Text Input',
		modelValue: null,
		name: 'test',
	},
	decorators: [
		(story, ctx) => {
			delete (ctx.args as any).onChange
			delete (ctx.args as any).onInput
			delete (ctx.args as any)['onUpdate:modelValue']
			;(ctx.args as any).onInput = (event: any) => {
				const value: any = event.target.value
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
					'focus',
					'input',
					'keydown',
					'update:modelValue',
				],
				sort: 'requiredFirst',
			},
		},
		slots: {
			'custom-input': {
				description: 'Input custom input slot',
			},
			'icon-slot': {
				description: 'Input icon slot',
			},
		},
	},
	render: (args) => ({
		components: { TextInput },
		setup() {
			return { args }
		},
		template: '<TextInput v-bind="args" />',
	}),
} satisfies Meta<typeof TextInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {},
}

export const Disabled: Story = {
	args: {
		disabled: true,
	},
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

export const Icon: Story = {
	args: {
		icon: {
			placement: 'append',
		},
	},
	render: (args) => ({
		components: { TextInput },
		setup() {
			const icon: any = h('svg', {
				class: 'sb-icon magnifying-glass',
				innerHTML:
					'<path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>',
				viewBox: '0 0 512 512',
				xmlns: 'http://www.w3.org/2000/svg',
			})

			return { args, icon }
		},
		template: `
			<TextInput v-bind="args">
				<template v-slot:icon-slot>
					<component :is="icon" />
				</template>
			</TextInput>
		`,
	}),
}
