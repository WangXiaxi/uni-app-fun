<template>
	<view class="container">
		<view class="swiper-wrap">
			<page-first ref="page"></page-first>
		</view>
	</view>
</template>

<script>
	import PageFirst from './components/child-pages/page-first'
	export default {
		components: {
			PageFirst
		},
		data() {
			return {}
		},
		onLoad() {
			this.$nextTick(() => {
				this.$refs.page.getLocation() // 获取经纬度
			})
		},
		//加载更多
		onReachBottom() {
			this.$refs.page.loadData() // 获取经纬度
		}
	}
</script>

<style lang="scss">
	page,
	.container {
		background: #FFFFFF;
		position: relative;
		z-index: 1;
	}
</style>
