<template>
	<view class="content">
		<view class="top">
			<image class="header" src="../../static/gywm2.png"></image>
			<view class="name">{{params.name}}</view>
		</view>
		<view class="list">
			<view class="item" v-for="(item, index) in params.children" :key="index" @click="dial(item)">
				<view class="text">{{item}}</view>
				<image src="../../static/bohao.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations,
		mapActions
	} from 'vuex'
	import { parseTime } from '@/utils/index.js'
	export default {
		data() {
			return {
				
			}
		},
		computed: {
			...mapGetters(['params', 'isRecharge']),
		},
		methods: {
			...mapActions(['locationContactsAdd']),
			dial(item) { // 拨号操作
				if (this.isRecharge) {
					uni.navigateTo({
						url: `/pages/contacts-ring/index?name=${this.params.name}&phone=${item}`
					})
				} else {
					uni.makePhoneCall({
						phoneNumber: item, // 仅为示例
						success: () => {
							this.locationContactsAdd({ answer: item, answer_name: this.params.name, time: parseTime() })
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.top {
		background: #f7f7f7;
		text-align: center;
		padding: 50upx 0;
		color: #999999;
		font-size: 36upx;
		.header {
			width: 100upx;
			height: 100upx;
			margin-bottom: 30upx;
		}
	}
	.list {
		padding: 0 24upx;
		.item {
			display: flex;
			padding: 24upx 0;
			font-size: 32upx;
			border-bottom: 1px solid #f0f0f0;
			.text {
				line-height: 50upx;
				flex: 1;
			}
			image {
				width: 50upx;
				height: 50upx;
			}
		}
	}
</style>
