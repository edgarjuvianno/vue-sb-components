<template>
	<template v-if="!isLoading">
		<div
			class="option"
			:class="{ focus: activeOption === idx }"
			:key="`opt-${idx}-${opt.value}`"
			v-for="(opt, idx) in list"
			@click.stop="doSelect(opt)"
		>
			<span v-html="renderOpt(opt)"></span>
		</div>
	</template>
	<div class="loading-text" v-if="isLoading">
		{{ loadingText }}
	</div>
</template>

<script lang="ts">
	import { defineComponent, PropType } from 'vue'
	import { IAutocompleteItem } from '@/interface'

	export default defineComponent({
		emits: {
			select: (_option: any) => true,
		},
		props: {
			activeOption: {
				required: true,
				type: Number,
			},
			isLoading: {
				required: false,
				type: Boolean,
			},
			list: {
				required: true,
				type: Object as PropType<IAutocompleteItem[]>,
			},
			loadingText: {
				default: 'Loading...',
				type: String,
			},
			term: {
				required: true,
				type: String,
			},
		},
		name: 'sb-form-autocomplete-option',
		methods: {
			doSelect(opt: any) {
				if (!this.isLoading) {
					this.$emit('select', opt.value)
				}
			},
			renderOpt({ label }: IAutocompleteItem) {
				const loweredLabel: string = label.toLowerCase()
				const loweredTerm: string = this.term.toLowerCase()

				const matchIndex: number = loweredLabel.indexOf(loweredTerm)
				const replacement: string = label.substring(
					matchIndex,
					matchIndex + loweredTerm.length,
				)

				return (
					label.substring(0, matchIndex) +
					`<b>${replacement}</b>` +
					label.substring(matchIndex + loweredTerm.length)
				)
			},
		},
	})
</script>
