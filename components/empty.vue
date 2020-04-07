<template>
	<view class="empty-content" :class="{ relative: relative }" :style="styles">
		<image class="empty-content-image" :src="setSrc" mode="aspectFit"></image>
		<view class="text">{{text}}</view>
	</view>
</template>

<script>
	export default {
		props: {
			src: {
				type: String,
				default: 'empty'
			},
			text: {
				type: String,
				default: ''
			},
			styles: {
				type: Object,
				default: () => {
					return {}
				}
			},
			relative: {
				type: Boolean,
				default: false
			}
		},

		data() {
			return {
				typeSrc: {
					empty: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkI5Qzc4NEQ4Nzg3QTExRUE5Mjc1QzA4QjU5RUI0ODdCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkI5Qzc4NEQ5Nzg3QTExRUE5Mjc1QzA4QjU5RUI0ODdCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjlDNzg0RDY3ODdBMTFFQTkyNzVDMDhCNTlFQjQ4N0IiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjlDNzg0RDc3ODdBMTFFQTkyNzVDMDhCNTlFQjQ4N0IiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7l2AbvAAAIhUlEQVR42uzd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'
				},
			}
		},

		computed: {
			setSrc() {
				return this.typeSrc[this.src];
			},
		}
	}
</script>

<style lang="scss">
	.text {
		color: #999;
		font-size: 26rpx;
	}
	.empty-content {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background: #FFFFFF;
		padding-bottom: 120rpx;
		&.relative {
			position: relative;
			padding-top: 200rpx;
			background: transparent;
		}
		&-image {
			width: 200rpx;
			height: 200rpx;
		}
	}
</style>
