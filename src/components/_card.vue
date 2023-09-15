<template>
	<div class="card" v-bind="{ ...$attrs }">
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
</template>

<script lang="ts">
	import { defineComponent } from 'vue'

	export default defineComponent({
		name: 'sb-card',
	})
</script>

<style lang="scss" scoped>
	@import '../assets/scss/components/_card.scss';
</style>
