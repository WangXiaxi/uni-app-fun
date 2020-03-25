<template>
	<view class="content">
		<view class="title">手机快捷绑定</view>
		<view class="mobile-input input">
			<input maxlength="11" type="number" v-model.trim="formData.mobile" class="uni-input" name="mobile" placeholder="请输入手机号"
			 placeholder-class="placeholder" />
			<view v-if="show" class="send-code" :class="{ grey: sendLoading }" @click="sendMobile">获取验证码</view>
			<view v-else class="send-code grey">重新获取（{{ count }}s）</view>
		</view>
		<view class="code-input input">
			<input maxlength="6" type="number" v-model.trim="formData.code" class="uni-input" name="code" placeholder="请输入验证码" placeholder-class="placeholder" />
		</view>
		<button class="phone_btn" @click="submit">
			<view>绑定</view>
		</button>
	</view>
</template>

<script>
	import validate from '@/utils/validate.js'
	import {
		register,
		sendMsg
	} from '@/api/phone.js'

	const fields = {
		mobile: '',
		code: ''
	}
	export default {
		components: {
		},
		data() {
			return {
				sendLoading: false,
				show: true,
				timer: null,
				count: 0,
				formData: JSON.parse(JSON.stringify(fields)),
				rules: {
					mobile: {
						required: true,
						tel: true
					},
					field: {
						required: true
					},
					code: {
						required: true,
						minlength: 6,
						maxlength: 6
					}
				},
				messages: {
					field: {
						required: '请先获取短信验证码！'
					},
					mobile: {
						required: '请输入手机号！'
					},
					code: {
						required: '请输入6位短信验证码！',
						minlength: '请输入6位短信验证码！',
						maxlength: '请输入6位短信验证码！'
					}
				}
			}
		},
		methods: {
			submit() { // 提交操作
				const {
					rules,
					messages,
					formData: {
						mobile,
						code
					}
				} = this
				const validates = new validate(rules, messages)
				const valid = validates.checkForm({
					mobile,
					code
				})
				if (!valid) return
				const sendData = {
					phone: mobile
				}
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				bind(sendData).then(async res => {
					
				}).catch(e => {
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
				const validates = new validate({
					mobile: rules.mobile
				}, messages)
				const valid = validates.checkForm({
					mobile
				})
				if (!valid) return
				this.sendLoading = true
				sendMsg({ type: 0, phone: mobile }).then(res => {
					uni.setStorageSync('field', res.data)
					uni.showToast({
						title: '短信发送成功！',
						duration: 1500,
						icon: 'none'
					})
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
	.content {
		background: #FFFFFF;

		.title {
			font-size: 48rpx;
			line-height: 67rpx;
			color: #333333;
			margin: 62rpx 32rpx 50rpx;
		}

		.input {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 686rpx;
			position: relative;
			height: 104rpx;
			border-bottom: 1rpx solid #EEEEEE;
			margin: 0 auto;

			.uni-input {
				flex: 1;
			}

			.send-code {
				font-size: 28rpx;
				color: #333333;

				&.grey {
					color: #999999;
				}
			}
		}

		.phone_btn {
			background: #1AAD19;
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 60rpx 32rpx 0;
			font-size: 36rpx;
			height: 90rpx;
			border-radius: 6rpx;
			color: #FFFFFF;
		}
	}
</style>
