<template>
	<div class="card-wrapper" v-bind="{ ...$attrs }">
		<div :class="{ error: isError }" class="card">
			<div class="header" v-if="$slots.header">
				<slot name="header" />
			</div>
			<div class="body">
				<slot />
			</div>
			<div class="footer" v-if="$slots.footer">
				<slot name="footer" />
			</div>
		</div>
		<div class="error-wrapper" v-if="isError && errorMessage">
			<span v-html="handleErrorMessage()"></span>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue'

	export default defineComponent({
		props: {
			errorMessage: {
				required: false,
				type: [String, Function],
			},
			isError: {
				required: false,
				type: Boolean,
			},
		},
		name: 'sb-card',
		methods: {
			handleErrorMessage() {
				if (this.errorMessage) {
					if (typeof this.errorMessage === 'string') {
						return this.errorMessage
					}

					return this.errorMessage()
				}

				return ''
			},
		},
	})
</script>

<style lang="scss" scoped>
	@import '../../assets/scss/components/_card.scss';
</style>
