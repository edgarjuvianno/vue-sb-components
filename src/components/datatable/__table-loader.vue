<template>
	<tbody v-bind="{ ...$attrs }">
		<tr
			v-for="row in [...Array(rowCount).keys()]"
			v-bind:key="`row-${row}`"
		>
			<td colspan="100%">
				<div>&nbsp;</div>
			</td>
		</tr>
	</tbody>
</template>

<script lang="ts">
	import { defineComponent } from 'vue'

	export default defineComponent({
		props: {
			rowCount: {
				default: 10,
				type: Number,
			},
		},
		name: 'sb-table-loader',
	})
</script>

<style lang="scss">
	@import '../../assets/scss/components/__table-loader.scss';
</style>
