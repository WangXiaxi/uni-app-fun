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
			<view class="title">注册</view>
			<view class="item">
				<image class="left-ico" src="../../static/name.png"></image>
				<input type="text" v-model.trim="formData.mobile" class="" name="mobile" placeholder="请输入手机号" placeholder-class="placeholder" />
			</view>
			<view class="item">
				<image class="left-ico" src="../../static/password.png"></image>
				<input type="password" v-model.trim="formData.password" class="" name="password" placeholder="请输入密码"
				 placeholder-class="placeholder" />
			</view>
			
			<view class="item">
				<image class="left-ico" src="../../static/code.png"></image>
				<input type="text" v-model.trim="formData.code" class="" name="code" placeholder="请输入验证码" placeholder-class="placeholder" />
				<view v-if="show" class="send-code" :class="{ grey: sendLoading }" @click="sendMobile">获取验证码</view>
				<view v-else class="send-code grey">重新获取（{{ count }}s）</view>
			</view>
			
			<button type="primary" class="no-border confirm-btn" @click="confirm" :loading="loading" :disabled="loading">立即注册</button>
			
			<view class="btn-text" @click="navBack">返回登录</view>
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
				sendLoading: false,
				show: true,
				timer: null,
				count: 0,
				formData: {
					password: '', // 密码
					mobile: '', // 用户名
					code: ''
				},
				rules: {
					code: {
						required: true,
						minlength: 4
					},
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
					code: {
						required: '请输入短信验证码！'
					},
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
		
		methods: {
			...mapMutations(['login', 'getBalance']),
			navBack() {
				uni.navigateBack()
			},
			sendMobile() { // 发送验证码
				if (this.sendLoading) return
				const {
					rules,
					messages,
					formData: {
						mobile
					}
				} = this
				phoneModel.initValidate({
					mobile: rules.mobile
				}, messages)
				if (!phoneModel.WxValidate.checkForm({ mobile })) return
				this.sendLoading = true
				phoneModel.getCallCode({ mobile }).then(res => {
					this.code = res.data.json
					this.$api.msg('短信发送成功！')
					this.sendLoading = false
					const TIME_COUNT = 60
					if (!this.timer) {
						this.count = TIME_COUNT
						this.show = false
						this.timer = setInterval(() => {
							if (this.count > 0 && this.count <= TIME_COUNT) {
								this.count--
							} else {
								this.show = true
								clearInterval(this.timer)
								this.timer = null
							}
						}, 1000)
					}
				}).catch(() => {
					this.sendLoading = false
				})
			},
			confirm() { // 确定操作
				const {
					formData,
					rules,
					messages,
					loading,
					code
				} = this
				phoneModel.initValidate(rules, messages)
				if (!phoneModel.WxValidate.checkForm(formData)) return
				if (code !== Number(formData.code)) {
					this.$api.msg('验证码不匹配')
					return
				}
				this.loading = true
				phoneModel.register(formData).then(async result => {
					phoneModel.loginCall(formData).then(res => {
						this.login({
							data: res.data,
							callback: () => {
								this.loading = false
								this.getBalance()
								uni.switchTab({
									url: '../mine/index'
								})
							}
						})
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
	.btn-text {
		font-size: 28rpx;
		line-height: 28rpx;
		padding: 10rpx;
		color: #083998;
		margin: 0 auto;
		padding: 20rpx;
		width: 160rpx;
		text-align: center;
		margin-top: 20rpx;
	}
	.content {
		padding-top: 148rpx;
		padding: relative;
	}
	.send-code {
		font-size: 28rpx;
		color: #083999;
		padding: 10rpx 20rpx;
		&.grey {
			color: #999999;
		}
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
			& + .item {
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
			color: #FFFFFF;
			opacity: 0.6;
		}
	}
</style>
