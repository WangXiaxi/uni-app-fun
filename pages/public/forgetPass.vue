<template>
	<view class="content">
		<view class="form">
			<view class="form-box">
			<view class="row b-b">
				<image class="left-ico" src="../../static/name.png"></image>
				<input class="input" type="number" v-model="formData.mobile" placeholder="请输入手机号" placeholder-class="placeholder" />
			</view>
			<view class="row b-b">
				<image class="left-ico" src="../../static/code.png"></image>
				<input class="input" type="number" v-model="formData.code" placeholder="请输入短信验证码" placeholder-class="placeholder" />
				<view v-if="show" class="send-code" :class="{ grey: sendLoading }" @click="sendMobile">获取验证码</view>
				<view v-else class="send-code grey">重新获取（{{ count }}s）</view>
			</view>
			<view class="row b-b">
				<image class="left-ico" src="../../static/password.png"></image>
				<input class="input" type="password" v-model="formData.password" placeholder="请输入新密码" placeholder-class="placeholder" />
			</view>
			<view class="row">
				<image class="left-ico" src="../../static/password.png"></image>
				<input class="input" type="password" v-model="formData.rePassword" placeholder="请确认密码" placeholder-class="placeholder" />
			</view>
		</view>
		</view>
		<button class="add-btn" @click="confirm" :loading="loading" :disabled="loading">立即找回</button>
	</view>
</template>

<script>
	import phoneModel from '../../api/phone.js'
		export default {
			data() {
				return {
					formData: {
						mobile: '', // 用户名
						code: '', // 验证码
						password: '', // 新密码
						rePassword: '' // 确认密码
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
						},
						rePassword: {
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
						},
						rePassword: {
							required: '请输入密码！',
							minlength: '密码不能低于6位！'
						}
					},
					loading: false,
					sendLoading: false,
					show: true,
					timer: null,
					count: 0
				}
			},
			methods: {
				navBack() {
					uni.navigateBack()
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
					if (formData.password !== formData.rePassword) {
						this.$api.msg('两次密码不同')
						return
					}
					this.loading = true
					phoneModel.getCallToken({ mobile: formData.mobile }).then(result => {
						phoneModel.resetCallPass({
							token: result.data.data,
							newPass: formData.password
						}).then(res => {
							this.loading = false
							this.$api.msg('密码修改成功！', 1500, true, 'success')
							setTimeout(this.navBack, 1500)
						}).catch(() => {
							this.loading = false
						})
					}).catch(() => {
						this.loading = false
					})
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
				}
			}
		}
</script>

<style lang="scss">
	.send-code {
		font-size: 28rpx;
		color: #083999;
		padding: 10rpx 20rpx;
		&.grey {
			color: #999999;
		}
	}
	.form {
		margin: 30rpx 32rpx 0;
		box-shadow:0px 6rpx 16rpx 0px rgba(0, 0, 0, 0.1);
		border-radius:12rpx;
		padding: 20upx 32upx;
	}
	.left-ico {
		width: 50rpx;
		height: 50rpx;
		margin-right: 20rpx;
	}
	.form-box {
		background: #FFFFFF;
		overflow: hidden;
		.title {
			font-size: 32upx;
			line-height: 60upx;
		}
	}
	
	.row {
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 0upx;
		height: 90upx;
		background: #fff;
		&.b-b {
			border-bottom: 1rpx solid #EEEEEE;
		}
		&.spec {
			height: auto;
	
			.text-area {
				height: 110upx;
				padding: 20upx 0;
				font-size: 30upx;
			}
		}
	
		.tit {
			flex-shrink: 0;
			width: 140upx;
			font-size: 30upx;
			color: $font-color-dark;
		}
	
		.input {
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}
	
		.icon-shouhuodizhi {
			font-size: 36upx;
			color: $font-color-light;
		}
	}
	.add-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto 20upx;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
