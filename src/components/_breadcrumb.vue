<template>
	<div class="breadcrumb" v-bind="{ ...$attrs }">
		<template v-for="(crumb, idxCrumb) in list" v-bind:key="idxCrumb">
			<div class="crumb">
				{{ crumb }}
			</div>
			<component :is="angleRight" v-if="idxCrumb !== list.length - 1" />
		</template>
	</div>
</template>

<script lang="ts">
	import { defineComponent, PropType } from 'vue'

	// icons
	import { angleRight } from '@/assets/icons'

	export default defineComponent({
		props: {
			list: {
				required: true,
				type: Object as PropType<string[]>,
			},
		},
		name: 'sb-breadcrumb',
		computed: {
			angleRight() {
				return angleRight()
			},
		},
	})
</script>

<style lang="scss" scoped>
	@import '../assets/scss/components/_breadcrumb.scss';
</style>
