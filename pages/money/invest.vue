<template>
	<view class="content">
		<view class="top">
			<view class="tip">充值账号（默认本机）</view>
			<view class="mobile">{{ userInfo.mobile }}</view>
		</view>
		<view class="form">
			<view class="form-box">
				<view class="row b-b">
					<text class="tit">卡号</text>
					<input class="input" type="text" v-model="formData.code" placeholder="请输入充值卡号" placeholder-class="placeholder" />
				</view>
				<view class="row">
					<text class="tit">卡密</text>
					<input class="input" type="password" v-model="formData.pass" placeholder="请输入充值卡密" placeholder-class="placeholder" />
				</view>
			</view>
		</view>
		<button class="add-btn" @click="confirm" :loading="btnLoading" :disabled="btnLoading">立即充值</button>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions,
		mapMutations
	} from 'vuex';
	import phoneModel from '../../api/phone.js'
	const formData = {
		code: '',
		pass: ''
	}
	export default {
		components: {
		},
		data() {
			return {
				btnLoading: false,
				formData: JSON.parse(JSON.stringify(formData)),
				rules: {
					cardno: {
						required: true
					},
					password: {
						required: true
					}
				},
				messages: {
					cardno: {
						required: '请输入卡号！'
					},
					password: {
						required: '请输入密码！'
					}
				}
			}
		},
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				uni.navigateTo({
					url: '/pages/money/log'
				})
			}
		},
		computed: {
			...mapGetters(['token', 'userInfo'])
		},
		methods: {
			...mapMutations(['getBalance']),
			confirm() {
				const {
					formData: {
						code,
						pass
					},
					mobile,
					token,
					rules,
					messages
				} = this
				const sendData = {
					mobile: this.userInfo.mobile,
					cardno: code,
					password: pass,
					token: this.token
				}
				phoneModel.initValidate(rules, messages)
				if (!phoneModel.WxValidate.checkForm(sendData)) return
				this.btnLoading = true
				phoneModel.rechangeCall(sendData).then(res => {
					this.btnLoading = false
					this.formData = JSON.parse(JSON.stringify(formData))
					this.$api.msg('恭喜您，充值成功！')
					this.getBalance()
				}).catch(() => {
					this.btnLoading = false
				})
			},
		}
	}
</script>

<style lang="scss">
	.content {
		padding-top: 30rpx;
	}
	.top {
		margin: 0 32rpx;
		height: 162rpx;
		box-shadow:0px 6rpx 16rpx 0px rgba(0, 0, 0, 0.1);
		border-radius:12rpx;
		padding: 29rpx 30rpx;
		.tip {
			height:24rpx;
			font-size:24rpx;
			color:rgba(153,153,153,1);
			line-height:24rpx;
		}
		.mobile {
			margin-top: 36rpx;
			font-size:56rpx;
			color:rgba(234,18,18,1);
			line-height:56rpx;
		}
	}
	.form {
		margin: 30rpx 32rpx 0;
		box-shadow:0px 6rpx 16rpx 0px rgba(0, 0, 0, 0.1);
		border-radius:12rpx;
		padding: 20upx 32upx;
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
		color: #FFFFFF;
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
