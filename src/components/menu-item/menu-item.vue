<template>
	<div
		class="menu-item"
		:class="{
			clicked: isClicked,
		}"
		@click="handleClick"
	>
		<slot />
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue'

	export default defineComponent({
		emits: {
			click: (_event: MouseEvent) => true,
		},
		name: 'sb-menu-item',
		data() {
			return {
				isClicked: false as boolean,
			}
		},
		methods: {
			handleClick(event: Event) {
				const evt: MouseEvent = event as MouseEvent

				this.isClicked = true

				setTimeout(() => {
					this.isClicked = false
				}, 200)

				this.$emit('click', evt)
			},
		},
	})
</script>

<style lang="scss" scoped>
	@import '../../assets/scss/components/_menu-item.scss';
</style>
