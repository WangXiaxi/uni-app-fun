<template>
	<view>
		<view class="top">
			<view>充值账号（默认本机）</view>
			<view class="mobile">15058559592</view>
		</view>
		<view class="form">
			<view class="form-box">
				<view class="row b-b">
					<text class="tit">卡号</text>
					<input class="input" type="text" v-model="formData.code" placeholder="请输入充值卡号" placeholder-class="placeholder" />
				</view>
				<view class="row b-b">
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
		mapActions
	} from 'vuex';
	export default {
		components: {
		},
		data() {
			return {
				btnLoading: false,
				formData: {
					code: '',
					pass: ''
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
			...mapGetters(['userInfo'])
		},
		methods: {
			confirm() {
			}
		}
	}
</script>

<style>
</style>
