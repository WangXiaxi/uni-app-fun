<template>
	<view class="content">
		<view class="big-title">最近通话</view>
		<empty v-if="list.length === 0" text="暂无通话记录"></empty>
		<view class="list" v-else>
			<view @click="dial(item.answer)" class="item" :class="{ act: item.status === '未接通' }" v-for="(item, index) in list" :key="index">
				<view class="info">
					<view class="name">{{item.answer_name}}</view>
					<view class="mobile">
						<view class="tell">{{item.answer}}</view>
						<view class="date">{{item.time}} 呼出</view>
						<image class="trans" src="../../static/arrow-phone.png"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import { mapGetters, mapActions, mapMutations } from 'vuex'
	import empty from '@/components/empty'
	import phoneModel from '../../api/phone.js'
	export default {
		components: {
			empty
		},
		data() {
			return {
				list: []
			}
		},
		onShow() {
			if(this.hasLogin && this.isRecharge) this.getLogData()
		},
		onLoad() {
			if(!this.hasLogin) {
				uni.navigateTo({
					url: '/pages/public/login'
				})
			}
			this.initContacts()
		},
		computed: {
			...mapGetters(['hasLogin', 'contacts', 'isRecharge'])
		},
		methods: {
			...mapActions(['initContacts']),
			dial(number) { // 拨号操作
				let cur = null
				this.contacts.forEach(c => {
					c.contacts.forEach(j => {
						j.children.forEach(k => {
							if (k === number) {
								cur = { name: j.name, phone: number }
							}
						})
						
					})
				})
				if (cur) {
					const { name, phone } = cur
					if (this.isRecharge) {
						uni.navigateTo({
							url: `/pages/contacts-ring/index?name=${name}&phone=${phone}`
						})
					} else {
						uni.makePhoneCall({
							phoneNumber: phone // 仅为示例
						})
					}
				} else {
					if (this.isRecharge) {
						uni.navigateTo({
							url: `/pages/contacts-ring/index?name=${number}&phone=${number}`
						})
					} else {
						uni.makePhoneCall({
							phoneNumber: number // 仅为示例
						})
					}
					uni.navigateTo({
					})
				}
			},
			getLogData() {
				const {
					mobile
				} = uni.getStorageSync('userInfo')
				phoneModel.getCallLog({ mobile }).then(res => {
					this.list = res.data.map(c => {
						c.time = c.time.slice(5, 19)
						return c
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding-top: 104rpx;
	}

	.big-title {
		font-size: 48rpx;
		line-height: 48rpx;
		color: #111111;
		padding-left: 31rpx;
		position: relative;
		z-index: 100;
	}

	.list {
		margin-top: 49rpx;
		.item {
			height: 100upx;
			margin-bottom: 52upx;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			&::after {
				transform: scaleY(0.5);
				position: absolute;
				content: '';
				height: 2rpx;
				width: 718rpx;
				left: 32rpx;
				bottom: -26rpx;
				background: #EEEEEE;
			}
			&.act {
				.info {
					.name {
						color: $base-color;
					}

					.mobile {
						color: $base-color;
					}
				}
			}

			.header {
				width: 100upx;
				height: 100upx;
			}

			.info {
				flex: 1;
				margin-left: 24upx;

				.name {
					font-size: 30upx;
					color: #000000;
					margin-bottom: 20upx;
				}

				.mobile {
					display: flex;
					align-items: center;
					color: #999999;
					font-size: 28upx;

					.date {
						color: #999999;
						margin-left: 10upx;
					}

					.trans {
						width: 18upx;
						height: 18upx;
						margin-left: 12upx;

						&.act {
							transform: rotate(180deg);
						}
					}
				}
			}
		}
	}
</style>
