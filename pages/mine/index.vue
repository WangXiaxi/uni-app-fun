<template>
	<view class="content">
		<view class="bg">
			<image src="../../static/bg-mine.png"></image>
		</view>
		<view class="base-info" @click="baseClick">
			<view class="header">
				<image :src="(userInfo && userInfo.pic) || '/static/gywm2.png'"></image>
			</view>
			<view class="name" v-if="hasLogin">{{userInfo.username || userInfo.mobile}}</view>
			<view class="name" v-if="!hasLogin">游客您好，请点击登录</view>
			<view class="account">余额：￥{{ balanceInfo.Money | nf }}</view>
			<view class="time">
				<image src="../../static/date.png"></image>
				<text v-if="hasLogin">{{balanceInfo.Time | fill}} 到期</text>
				<text v-else>--</text>
			</view>
		</view>

		<view class="list">
			<view class="item border-b pb" @click="navTo('/pages/mine/info')">
				<image class="ico" src="../../static/edit.png"></image>
				<view class="name">编辑资料</view>
			</view>
			<view class="item border-b pb" @click="navTo('/pages/money/money')">
				<image class="ico" src="../../static/bag.png"></image>
				<view class="name">余额</view>
			</view>
			<view class="item border-b pb pt" @click="navTo('/pages/money/invest')">
				<image class="ico" src="../../static/pay.png"></image>
				<view class="name">充值</view>
			</view>
			<view class="item border-b pb pt">
				<image class="ico" src="../../static/help.png"></image>
				<view class="name">帮助中心</view>
			</view>
			<view class="item pt" @click="navTo('/pages/public/landPass')">
				<image class="ico" src="../../static/pass.png"></image>
				<view class="name">修改密码</view>
			</view>
			<view class="item pt" @click="goOut">
				<image class="ico" src="../../static/out.png"></image>
				<view class="name">退出</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {}
		},
		onLoad() {

		},
		computed: {
			...mapGetters(['hasLogin', 'userInfo', 'balanceInfo'])
		},
		methods: {
			...mapMutations(['logout']),
			goOut() {
				this.logout()
				uni.navigateTo({
					url: '/pages/public/login'
				})
			},
			baseClick() {
				if (!this.hasLogin) {
					uni.navigateTo({
						url: '/pages/public/login'
					})
					return
				}
				this.navTo('/pages/mine/info')
			},
			/**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			navTo(url, type = true) {
				if (!this.hasLogin && type) {
					url = '/pages/public/login'
				}
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding-top: 132rpx;
		padding: relative;
	}

	.bg {
		position: absolute;
		left: 0;
		top: 0;
		z-index: -1;

		image {
			display: block;
			width: 750rpx;
			height: 575rpx;
		}
	}

	.base-info {
		width: 458rpx;
		height: 308rpx;
		background: rgba(255, 255, 255, 0.15);
		border-radius: 24rpx;
		margin: 0 auto;
		position: relative;

		.header {
			width: 110rpx;
			height: 110rpx;
			border-radius: 50%;
			border: 4rpx solid #FFFFFF;
			margin: 0 auto;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				width: 102rpx;
				height: 102rpx;
				display: block;
			}
		}

		.name {
			font-size: 36rpx;
			line-height: 36rpx;
			margin-top: 32rpx;
			color: #FFFFFF;
			text-align: center;
		}

		.account {
			margin-top: 24rpx;
			font-size: 28rpx;
			line-height: 28rpx;
			text-align: center;
			color: #FFFFFF;
		}

		.time {
			width: 356rpx;
			height: 84rpx;
			border-radius: 42rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 30rpx;
			color: #083999;
			background: #FFFFFF;
			position: absolute;
			left: 50%;
			margin-left: -178rpx;
			bottom: -42rpx;

			image {
				display: block;
				width: 32rpx;
				height: 30rpx;
				margin-right: 19rpx;
			}
		}
	}

	.list {
		text-align: center;
		font-size: 0;
		margin-top: 174rpx;

		.item {
			width: 333rpx;
			display: flex;
			justify-content: center;
			flex-direction: column;
			display: inline-block;
			position: relative;

			&:nth-child(2n+1)::after {
				position: absolute;
				content: ' ';
				height: 100%;
				width: 4rpx;
				background-color: rgba(231, 233, 248, 1);
				top: 0;
				right: -2rpx;
			}

			&.border-b {
				border-bottom: 4rpx solid rgba(231, 233, 248, 1);
			}

			&.pt {
				padding-top: 45rpx;
			}

			&.pb {
				padding-bottom: 45rpx;
			}

			.ico {
				width: 52rpx;
				height: 52rpx;
			}

			.name {
				font-size: 28rpx;
				line-height: 28rpx;
				margin-top: 42rpx;
				color: #083999;
			}
		}
	}
</style>
