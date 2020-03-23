<template>
	<view class="content">
		<view class="top">
			<image class="header" src="../../../static/icon/gywm.png"></image>
			<view class="name">{{params.name}}</view>
		</view>
		<view class="list">
			<view class="item" v-for="(item, index) in params.children" :key="index" @click="dial(item)">
				<view class="text">{{item}}</view>
				<image src="../../../static/icon/bohao.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		computed: {
			...mapGetters(['params']),
		},
		methods: {
			dial(item) { // 拨号操作
				uni.navigateTo({
					url: `/pages/phoneView/ring/ring?name=${this.params.name}&phone=${item}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.top {
		background: #f7f7f7;
		text-align: center;
		padding: 50rpx 0;
		color: #999999;
		font-size: 36rpx;
		.header {
			width: 100rpx;
			height: 100rpx;
			margin-bottom: 30rpx;
		}
	}
	.list {
		padding: 0 24rpx;
		.item {
			display: flex;
			padding: 24rpx 0;
			font-size: 32rpx;
			border-bottom: 1px solid #f0f0f0;
			.text {
				line-height: 50rpx;
				flex: 1;
			}
			image {
				width: 50rpx;
				height: 50rpx;
			}
		}
	}
</style>
