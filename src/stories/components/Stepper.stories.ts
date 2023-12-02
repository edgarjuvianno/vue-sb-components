import type { Meta, StoryObj } from '@storybook/vue3'
import type { Channel } from '@storybook/channels'
import { UPDATE_STORY_ARGS } from '@storybook/core-events'

import Stepper from '@/components/stepper/stepper.vue'

const meta = {
	title: 'Components/Stepper',
	component: Stepper,
	tags: ['autodocs'],
	argTypes: {
		'update:modelValue': {
			action: 'change',
			control: false,
			description: 'Stepper will throw this event to update modelValue',
		},
		alternateTitle: {
			control: 'boolean',
			description: 'Display Stepper title alternate or default',
		},
		change: {
			action: 'change',
			control: false,
			description:
				'Stepper will throw this event when Stepper current Step changed',
		},
		finish: {
			action: 'click',
			control: false,
			description: 'Stepper will throw this event when step is finished',
		},
		interceptNav: {
			description: 'Function to intercept stepper navigation',
		},
		items: {
			control: 'object',
			description: 'Stepper items',
		},
		mobile: {
			control: 'boolean',
			description:
				'If this props exist then Step label will be hidden and show Step divider for vertical orientation',
		},
		modelValue: {
			control: 'number',
			description: 'Current active Step',
		},
		nonLinear: {
			control: 'boolean',
			description:
				'If this props exist then Stepper will allows users to enter multi-step flow at any point',
		},
		type: {
			control: 'select',
			description: 'Stepper orientation',
			options: ['horizontal', 'vertical'],
		},
	},
	args: {
		items: [
			{
				title: 'Step 1',
			},
			{
				title: 'Step 2',
			},
			{
				title: 'Step 3',
			},
		],
		modelValue: 1,
	},
	decorators: [
		(story, ctx) => {
			delete (ctx.args as any).finish
			delete (ctx.args as any)['update:modelValue']
			delete (ctx.args as any)['change']
			;(ctx.args as any).onFinish = () => {
				console.log('STEPPER FINISHED')
			}
			;(ctx.args as any).onChange = (index: number) => {
				// eslint-disable-next-line no-underscore-dangle
				const channel = (window as any)
					.__STORYBOOK_ADDONS_CHANNEL__ as Channel

				channel.emit(UPDATE_STORY_ARGS, {
					storyId: ctx.id,
					updatedArgs: { modelValue: index },
				})
			}

			return story()
		},
	],
	parameters: {
		slots: {
			step: {
				description: 'Step render slot',
				template: `
					<template #step="{ index }">
						<div>
							<div class="text-lg text-gray-700 font-semibold mb-6">
								Step {{ index }}
							</div>
							<div class="text-base text-gray-700">
								Lorem Ipsum is simply dummy text of the printing and
								typesetting industry.
							</div>
						</div>
					</template>
				`,
			},
		},
	},
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {},
}

export const ButtonNavigation: Story = {
	args: {
		items: [
			{
				title: 'Step 1',
				nextColor: 'primary',
				nextText: 'Next 2',
			},
			{
				title: 'Step 2',
				nextColor: 'info',
				nextText: 'Next 3',
				prevColor: 'danger',
				prevText: 'Prev 1',
			},
			{
				title: 'Step 3',
				nextColor: 'success',
				nextText: 'Finish',
				prevColor: 'warning',
				prevText: 'Prev 2',
			},
		],
	},
}

export const StepSubtitle: Story = {
	args: {
		items: [
			{
				subtitle: 'sub Step 1',
				title: 'Step 1',
			},
			{
				subtitle: 'sub Step 2',
				title: 'Step 2',
			},
			{
				subtitle: 'sub Step 3',
				title: 'Step 3',
			},
		],
	},
}

export const StepRules: Story = {
	args: {
		items: [
			{
				title: 'Step 1',
			},
			{
				rules: [() => false],
				subtitle: 'some error',
				title: 'Step 2',
			},
			{
				title: 'Step 3',
			},
		],
	},
}

export const OptionalStep: Story = {
	args: {
		items: [
			{
				title: 'Step 1',
			},
			{
				optional: true,
				optionalText: 'lewati',
				title: 'Step 2',
			},
			{
				title: 'Step 3',
			},
		],
	},
}

export const InterceptNavigation: Story = {
	args: {
		interceptNav: (target: number) => {
			return new Promise<boolean>((resolve) => {
				if (target === 3) {
					console.log('wait 5 sec')

					setTimeout(() => {
						resolve(true)
					}, 5000)
				} else {
					resolve(true)
				}
			}).then((value: boolean) => value)
		},
	},
	parameters: {
		slots: {
			step: {
				description: 'Step render slot',
				template: `
					<template #step="{ index }">
						<div>
							<div class="text-lg text-gray-700 font-semibold mb-6">
								Step {{ index }}
							</div>
							<div class="text-base text-gray-700">
								<template v-if="index !== 2">
									Lorem Ipsum is simply dummy text of the printing and
									typesetting industry.
								</template>
								<template v-else>
									This Step will wait 5 seconds before next Step
								</template>
							</div>
						</div>
					</template>
				`,
			},
		},
	},
}

export const NonLinear: Story = {
	args: {
		nonLinear: true,
	},
}

export const Vertical: Story = {
	args: {
		type: 'vertical',
	},
}
