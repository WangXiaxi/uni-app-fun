<template>
	<view class="content">
		<view class="list-cell m-t" hover-class="cell-hover" :hover-stay-time="50">
			<view class="cell-tit">
				<image class="face" :src="userInfo.pic ? userInfo.pic : '/static/gywm2.png'"></image>
			</view>
			<text class="cell-tip">头像</text>
			<!-- <text class="cell-more yticon icon-you"></text> -->
		</view>
		<view class="list-cell b-b m-t">
			<view class="cell-tit">* 姓名</view>
			<view class="input">
				<input v-model="username" placeholder="输入真实姓名可以提升用户接通率" placeholder-class="placeholder" />
			</view>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b">
			<view class="cell-tit">* 手机号</view>
			<text class="cell-tip">{{ userInfo.mobile }}</text>
		</view>
		<view class="list-cell b-b">
			<view class="cell-tit">性别</view>
			<view class="input">
				<picker @change="genderChange" :value="gender" :range="genderOptions">
					<view class="placeholder" v-if="!gender && gender !== 0">请选择您的性别</view>
					<view class="uni-input" v-else>{{genderOptions[gender]}}</view>
				</picker>
			</view>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b">
			<view class="cell-tit">邮箱</view>
			<view class="input">
				<input v-model="email" placeholder="请填写您的邮箱" placeholder-class="placeholder" />
			</view>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b">
			<view class="cell-tit">生日</view>
			<view class="input">
				<picker mode="date" @change="birthdayChange" :value="birthday">
					<view class="placeholder" v-if="!birthday">请选择您的生日</view>
					<view class="uni-input" v-else>{{birthday}}</view>
				</picker>
			</view>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell">
			<text class="cell-tit">检查更新</text>
			<text class="cell-tip">当前版本 {{version}}</text>
			<!-- <text class="cell-more yticon icon-you"></text> -->
		</view>
		<view class="list-cell log-out-btn" @click="toLogout">
			<text class="cell-tit">退出登录</text>
		</view>
	</view>
</template>

<script>
	import {
		versionAnd,
		versionIos
	} from '@/common/config/index.js'
	import {
		mapGetters,
		mapActions,
		mapMutations
	} from 'vuex'
	import phoneModel from '../../api/phone.js'
	export default {
		data() {
			return {
				version: '',
				username: '',
				gender: null,
				birthday: '',
				email: '',
				genderOptions: ['男', '女', '神秘']
			}
		},
		onLoad() {
			this.createdInfo()
			uni.getSystemInfo({ // 获取信息
				success: (res) => {
					if (res.platform == 'android') {
						this.version = versionAnd
					}
					if (res.platform == 'ios') {
						console.log(versionIos)
						this.version = versionIos
					}
				}
			})
		},
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.comfirm()
			}
		},
		computed: {
			...mapGetters(['userInfo', 'token'])
		},
		methods: {
			...mapMutations(['logout', 'getBalance']),
			// 提交操作
			comfirm() {
				const {
					username,
					gender,
					birthday,
					email
				} = this
				const {
					id
				} = this.userInfo.users
				uni.showLoading({
					title: '请求中...',
					mask: true
				})
				phoneModel.updateCallUser({
					token: this.token,
					userid: id,
					birthday,
					gender,
					username,
					email
				}).then(res => {
					uni.hideLoading()
					this.$api.msg('修改信息成功！')
					this.getBalance()
				})
			},
			birthdayChange(e) {
				this.birthday = e.target.value
			},
			genderChange(e) {
				this.gender = e.target.value
			},
			createdInfo() {
				const {
					username,
					gender,
					birthday,
					email
				} = this.userInfo
				console.log(this.userInfo)
				Object.assign(this, {
					username: username ? username : '',
					gender,
					birthday,
					email: email ? email : ''
				})
			},
			//退出登录
			toLogout() {
				uni.showModal({
					content: '确定要退出登录么',
					success: (e) => {
						if (e.confirm) {
							this.logout();
							setTimeout(() => {
								uni.redirectTo({
									url: '/pages/public/login'
								})
							}, 200)
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	input {
		text-align: right;
		font-size: $font-base + 2upx;
	}

	.placeholder {
		font-size: $font-base + 2upx;
		color: #909399;
	}

	.uni-input {
		font-size: $font-base + 2upx;
	}

	.face {
		display: block;
		width: 102upx;
		height: 102upx;
		border-radius: 50%;
	}

	page {
		background: $page-color-base;
	}

	.list-cell {
		display: flex;
		align-items: center;
		padding: 20upx $page-row-spacing;
		line-height: 60upx;
		position: relative;
		background: #fff;
		justify-content: center;

		&.log-out-btn {
			margin-top: 40upx;

			.cell-tit {
				color: $uni-color-primary;
				text-align: center;
				margin-right: 0;
			}
		}

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30upx;
		}

		&.m-t {
			margin-top: 16upx;
		}

		.cell-more {
			font-size: $font-lg;
			color: $font-color-light;
			margin-left: 10upx;
		}

		.cell-tit {
			flex: 1;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			margin-right: 10upx;
		}

		.cell-tip {
			font-size: $font-base;
			color: $font-color-light;
		}
	}
</style>
