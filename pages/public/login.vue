<template>
	<view class="content">
		<view class="bg">
			<image src="../../static/bg-mine.png"></image>
		</view>
		<view class="header">
			<view class="header-box">
				<image src="../../static/ico-header.png"></image>
			</view>
		</view>
		<view class="center">
			<view class="title">Hi~</view>
			<view class="item">
				<image class="left-ico" src="../../static/name.png"></image>
				<input type="text" v-model.trim="formData.username" class="uni-input" name="username" placeholder="请输入用户名" placeholder-class="placeholder" />
			</view>
			<view class="item">
				<image class="left-ico" src="../../static/password.png"></image>
				<input type="password" v-model.trim="formData.password" class="uni-input" name="password" placeholder="请输入密码" placeholder-class="placeholder" />
			</view>
		</view>
		<view class="bot-text">© 2020 杭州义杭网络科技有限公司</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					password: '',
					name: ''
				}
			}
		}
	}
</script>

<style lang="scss">
	page {}

	.content {
		padding-top: 148rpx;
		padding: relative;
	}

	.bg {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 0;

		image {
			display: block;
			width: 750rpx;
			height: 575rpx;
		}
	}

	.header {
		position: relative;
		z-index: 10;
		width: 160rpx;
		height: 160rpx;
		overflow: hidden;
		border: 8rpx solid rgba(255, 255, 255, 0.3);
		border-radius: 50%;
		margin: 0 auto 0;
		.header-box {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			background: #FFFFFF;
		}
		image {
			width: 75rpx;
			height: 110rpx;
		}
	}

	.center {
		position: relative;
		z-index: 1;
		width: 686rpx;
		height: 762rpx;
		background: #FFFFFF;
		margin: 76rpx auto 0;
		box-shadow: 0px 23rpx 177rpx 0px rgba(116, 116, 116, 0.3);
		border-radius: 24rpx;

		.title {
			font-size: 52rpx;
			font-weight: 500;
			color: rgba(38, 38, 38, 1);
			text-align: center;
			line-height: 52rpx;
			padding-top: 60rpx;
		}
		.item {
			margin: 0 auto;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 626rpx;
			height: 88rpx;
			border: 1rpx solid #F2F2F2;
		}
	}

	.bot-text {
		position: fixed;
		bottom: 36rpx;
		text-align: center;
		width: 100%;
		text-align: center;
		font-size: 20rpx;
		color: rgba(51, 51, 51, 1);
		line-height: 20rpx;
		opacity: 0.55;
	}
</style>
