import type { Meta, StoryObj } from '@storybook/vue3'
import type { Channel } from '@storybook/channels'
import { UPDATE_STORY_ARGS } from '@storybook/core-events'
import { h } from 'vue'

import NumberInput from '@/components/form-input-number/form-input-number.vue'

const meta = {
	title: 'Forms/Number Input',
	component: NumberInput,
	tags: ['autodocs'],
	argTypes: {
		'onUpdate:modelValue': {
			action: 'change',
			control: false,
			description: 'This event fired when input value changed',
			table: {
				category: 'events',
				type: {
					summary: '(value: number | string | null) => void',
				},
			},
			type: 'function',
		},
		autocomplete: {
			control: 'boolean',
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
			description:
				'Input Icon configurations. Placement for this input only "prepend"',
		},
		invalidNumberMessage: {
			control: 'text',
			description: 'Input number error validation message',
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
			description: 'Input max value',
		},
		maxDecimalPlaces: {
			control: 'number',
			description: 'Max number decimal places',
		},
		min: {
			control: 'number',
			description: 'Input min value',
		},
		modelValue: {
			control: 'number',
			description: 'Input value',
		},
		numberLocale: {
			control: 'select',
			description: 'Number locale only work if prop "withLocale" exist',
			options: ['en-US', 'id-ID'],
		},
		onBlur: {
			action: 'change',
			control: false,
			description: 'This event fired when on blur',
			table: {
				category: 'events',
				type: {
					summary: '(value: Event) => void',
				},
			},
			type: 'function',
		},
		onChange: {
			action: 'change',
			control: false,
			description: 'This event fired when input value changed',
			table: {
				category: 'events',
				type: {
					summary: '(value: Event) => void',
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
					summary: '(value: Event) => void',
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
					summary: '(value: Event) => void',
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
					summary: '(value: Event) => void',
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
			description: 'Input step',
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
		value: {
			control: 'number',
			description: 'Input value',
		},
		variant: {
			control: 'select',
			description: 'Input style',
			options: ['default', 'flat'],
		},
		withLocale: {
			control: 'boolean',
			description: 'Format number using locale',
		},
	},
	args: {
		label: 'Gross Tonage / Ukuran Kapal',
		required: true,
		modelValue: 1,
		maxDecimalPlaces: 10,
		withLocale: true,
		numberLocale: 'id-ID',
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
					'change',
					'focus',
					'input',
					'keydown',
					'update:modelValue',
				],
				sort: 'requiredFirst',
			},
		},
		slots: {
			'icon-slot': {
				description: 'Input icon slot',
			},
		},
	},
	render: (args) => ({
		components: { NumberInput },
		setup() {
			return { args }
		},
		template: '<NumberInput v-bind="args" />',
	}),
} satisfies Meta<typeof NumberInput>

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
	render: (args) => ({
		components: { NumberInput },
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
			<NumberInput v-bind="args">
				<template v-slot:icon-slot>
					<component :is="icon" />
				</template>
			</NumberInput>
		`,
	}),
}
