<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">新密码</text>
			<input class="input" type="password" v-model="formData.password" placeholder="请输入6-32位新密码" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">确认密码</text>
			<input class="input" type="password" v-model="formData.rePassword" placeholder="请确认密码" placeholder-class="placeholder" />
		</view>
		<button class="add-btn" @click="confirm" :loading="loading" :disabled="loading">提交</button>
		<view class="pass" @click="navTo('/pages/set/landPassMobile')">忘记原密码？</view>
	</view>
</template>

<script>
	import phoneModel from '../../api/phone.js'
	const formFields = {
		password: '', // 新密码
		rePassword: '', // 原密码
	}
	import {
		mapGetters,
		mapActions,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				formData: JSON.parse(JSON.stringify(formFields)),
				rules: {
					password: {
						required: true
					},
					rePassword: {
						required: true
					}
				},
				messages: {
					password: {
						required: '请输入新密码！'
					},
					rePassword: {
						required: '请确认新密码！'
					}
				},
				loading: false
			}
		},
		computed: {
			...mapGetters(['token'])
		},
		methods: {
			navTo(url){
				uni.navigateTo({  
					url
				})
			},
			confirm() {
				const {
					formData: {
						password,
						rePassword
					},
					rules,
					messages
				} = this
				const sendData = {
					password,
					rePassword
				}
				if (password !== rePassword) return this.$api.msg('两次密码输入不一致！')
				phoneModel.initValidate(rules, messages)
				if (!phoneModel.WxValidate.checkForm(sendData)) return
				this.loading = true
				phoneModel.changePassword({
					token: this.token,
					newPass: sendData.password
				}).then(() => {
					this.loading = false
					this.$api.msg('登陆密码修改成功！', 1500, true, 'success')
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 1500)
				}).catch(() => {
					this.loading = false
				})
			}
		}
	}
</script>


<style lang="scss">
	page {
		background: $page-color-base;
		padding-top: 16upx;
	}

	.row {
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 30upx;
		height: 110upx;
		background: #fff;

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

	.default-row {
		margin-top: 16upx;

		.tit {
			flex: 1;
		}

		switch {
			transform: translateX(16upx) scale(.9);
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
	.pass {
		float: right;
		font-size: 24upx;
		color: royalblue;
		margin-right: 30upx;
	}
</style>

