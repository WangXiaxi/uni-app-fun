<template>
	<view class="content">
		<view class="back-btn" @click="navBack">
			<image class="ico" src="../../static/back-white.png"></image>
			<view class="text">返回</view>
		</view>
		<view class="bg">
			<image src="../../static/bg-mine.png"></image>
		</view>
		<!-- <view class="header">
			<view class="header-box">
				<image src="../../static/ico-header.png"></image>
			</view>
		</view> -->
		<view class="center">
			<view class="title">Hi~</view>
			<view class="item">
				<image class="left-ico" src="../../static/name.png"></image>
				<input type="text" v-model.trim="formData.mobile" class="" name="mobile" placeholder="请输入手机号" placeholder-class="placeholder" />
			</view>
			<view class="item">
				<image class="left-ico" src="../../static/password.png"></image>
				<input type="password" v-model.trim="formData.password" class="" name="password" placeholder="请输入密码"
				 placeholder-class="placeholder" />
			</view>
			<view class="text-btn-box">
				<view class="text-btn blue" @click="navTo('/pages/public/register')">立即注册</view>
				<view class="text-btn" @click="navTo('/pages/public/forgetPass')">忘记密码</view>
			</view>
			<button type="primary" class="no-border confirm-btn" @click="confirm" :loading="loading" :disabled="loading">登录</button>
		</view>
		<view class="bot-text">© 2020 杭州乐庄游网络科技有限公司</view>
	</view>
</template>

<script>
	import phoneModel from '../../api/phone.js'
	import {
		mapGetters,
		mapActions,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				loading: false,
				formData: {
					password: '', // 密码
					mobile: '' // 用户名
				},
				rules: {
					mobile: {
						required: true,
						tel: true
					},
					password: {
						required: true,
						minlength: 6
					}
				},
				messages: {
					mobile: {
						required: '请输入手机号码！'
					},
					password: {
						required: '请输入密码！',
						minlength: '密码不能低于6位！'
					}
				}
			}
		},
		computed: {},
		methods: {
			...mapMutations(['login', 'getBalance']),
			navTo(url, type = true) {
				uni.navigateTo({
					url
				})
			},
			navBack() {
				if (this.$api.prePage()) {
					uni.navigateBack()
				} else {
					uni.switchTab({
						url: '/pages/mine/index'
					})
				}
			},
			confirm() { // 确定操作
				const {
					formData,
					rules,
					messages,
					loading
				} = this
				phoneModel.initValidate(rules, messages)
				if (!phoneModel.WxValidate.checkForm(formData)) return
				this.loading = true
				phoneModel.loginCall(formData).then(result => {
					this.login({
						data: result.data,
						callback: () => {
							this.loading = false
							this.getBalance()
							if (this.$api.prePage()) {
								uni.navigateBack()
							} else {
								uni.switchTab({
									url: '../mine/index'
								})
							}
						}
					})
				}).catch(() => {
					this.loading = false
				})
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
			margin-bottom: 56rpx;
		}

		.item {
			margin: 0 auto;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 626rpx;
			height: 88rpx;
			border-bottom: 1rpx solid #F2F2F2;

			&+.item {
				margin-top: 26rpx;
			}

			.left-ico {
				width: 50rpx;
				height: 50rpx;
				margin-right: 20rpx;
			}

			input {
				flex: 1;
				font-size: 28rpx;
			}
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

	.text-btn-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 626rpx;
		margin: 20rpx auto 0;

		.text-btn {
			font-size: 28rpx;
			line-height: 28rpx;
			padding: 10rpx;
			margin-left: -10rpx;
			margin-right: -10rpx;
			color: #999999;

			&.blue {
				color: #083998;
			}
		}
	}

	.confirm-btn {
		padding: 0 38upx;
		margin: 60rpx auto 0;
		border-radius: 100px;
		height: 96rpx;
		width: 626rpx;
		font-size: 36rpx;
		background: linear-gradient(-90deg, rgba(137, 175, 249, 1), rgba(8, 57, 153, 1));
		box-shadow: 0px 16px 64px 6px rgba(2, 85, 196, 0.3);
		display: flex;
		justify-content: center;
		align-items: center;

		&[disabled] {
			background: linear-gradient(-90deg, rgba(137, 175, 249, 1), rgba(8, 57, 153, 1));
			color: #FFFFFF !important;
			opacity: 0.6;
		}
	}
</style>
