<template>
	<sb-modal
		:container="type === 'pdf' ? 'x-large' : 'large'"
		:show="show"
		@close="handleClose"
		v-bind="{ ...$attrs }"
	>
		<div class="file-preview-wrapper">
			<div class="loading" v-if="isLoading">
				<div class="skeleton" />
			</div>
			<div
				class="content"
				:style="{ display: isLoading ? 'none' : '' }"
				v-if="localSrc && localSrc !== ''"
			>
				<template v-if="type === 'audio'">
					<audio
						autoplay
						controls
						class="iframe audio"
						:src="localSrc"
						@loadeddata="handleLoadSrc"
					/>
				</template>
				<template v-if="type === 'image'">
					<img
						class="sb-w-full"
						:src="localSrc"
						@load="handleLoadSrc"
					/>
				</template>
				<template v-if="type === 'pdf'">
					<canvas class="sb-hidden" ref="pdf-canvas" />
					<div class="pdf-viewer">
						<div class="image-wrapper">
							<img
								v-for="(img, idx) in localPdf.pages"
								:key="`pdf-img-${idx}`"
								:src="img"
								:style="{
									display:
										localPdf.currentPage - 1 !== idx
											? 'none'
											: '',
								}"
							/>
						</div>
						<div class="control">
							<component
								class="icon"
								:class="{ disabled: localPdf.currentPage < 2 }"
								:is="angleLeft"
								@click="() => (localPdf.currentPage -= 1)"
							/>
							<div class="page-state">
								<span class="current">
									{{ localPdf.currentPage }}
								</span>
								<span>/</span>
								<span class="total">
									{{ localPdf.pages.length }}
								</span>
							</div>
							<component
								class="icon"
								:class="{
									disabled:
										localPdf.currentPage ===
										localPdf.pages.length,
								}"
								:is="angleRight"
								@click="() => (localPdf.currentPage += 1)"
							/>
						</div>
					</div>
				</template>
				<template v-if="type === 'video'">
					<iframe
						allowfullscreen
						allow="autoplay; fullscreen; picture-in-picture; xr-spatial-tracking; clipboard-write"
						class="iframe video"
						:src="localSrc"
						@load="handleLoadSrc"
					/>
				</template>
			</div>
		</div>
	</sb-modal>
</template>

<script lang="ts">
	import { defineComponent, PropType } from 'vue'
	import {
		getDocument,
		GlobalWorkerOptions,
		PDFDocumentProxy,
		PDFPageProxy,
		version as PDFJSVersion,
	} from 'pdfjs-dist'

	// components
	import Modal from '@/components/modal/modal.vue'

	// icons
	import { angleLeft, angleRight } from '@/assets/icons'

	export default defineComponent({
		emits: ['close'],
		props: {
			show: {
				required: true,
				type: Boolean,
			},
			src: {
				required: false,
				type: String,
			},
			type: {
				required: true,
				type: String as PropType<'image' | 'pdf' | 'video' | 'audio'>,
			},
		},
		name: 'sb-file-preview',
		components: {
			'sb-modal': Modal,
		},
		data() {
			return {
				isLoading: false,
				localPdf: {
					currentPage: 1,
					pages: [],
					scale: 1.5,
				} as any,
				localSrc: null as any,
			}
		},
		computed: {
			angleLeft() {
				return angleLeft()
			},
			angleRight() {
				return angleRight()
			},
		},
		methods: {
			handleClose() {
				this.localSrc = null
				this.$emit('close')
			},
			handleLoadSrc() {
				setTimeout(() => {
					this.isLoading = false
				}, 300)
			},
			async handlePDF() {
				const that = this

				await getDocument(this.localSrc)
					.promise.then(async (pdf: PDFDocumentProxy) => {
						const canvas: any = that.$refs['pdf-canvas']
						const numPages: number = pdf.numPages

						if (canvas) {
							const canvasContext: any = canvas.getContext('2d', {
								willReadFrequently: true,
							})

							for (let index = 0; index < numPages; index++) {
								await pdf
									.getPage(index + 1)
									.then(async (page: PDFPageProxy) => {
										const viewport: any = page.getViewport({
											scale: that.localPdf.scale,
										})

										canvas.height = viewport.height
										canvas.width = viewport.width

										await page
											.render({
												canvasContext,
												viewport,
											})
											.promise.then(() => {
												that.localPdf.pages.push(
													canvas.toDataURL(),
												)

												if (index === numPages - 1) {
													that.isLoading = false
												}
											})
									})
							}
						}
					})
					.catch((reason: any) => {
						this.isLoading = false

						console.error(reason)
					})
			},
		},
		watch: {
			show(newValue: boolean) {
				if (newValue) {
					this.isLoading = true
					this.localSrc = this.src

					if (this.type === 'pdf') {
						this.localPdf = {
							currentPage: 1,
							pages: [],
							scale: 1.5,
						}

						this.$nextTick(() => this.handlePDF())
					}
				}
			},
		},
		setup() {
			GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${PDFJSVersion}/build/pdf.worker.min.js`
		},
	})
</script>

<style lang="scss" scoped>
	@import '../../assets/scss/components/_file-preview.scss';
</style>
