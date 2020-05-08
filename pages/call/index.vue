<template>
	<view class="content-three">
		<!-- 有值展示 -->
		<view class="action-part" v-if="number.length > 0">
			<view class="num">{{number}}</view>
			<scroll-view scroll-with-animation scroll-y class="item-list">
				<view class="item" v-for="(item, index) in list" :key="index" @click="dialPhone(item)">
					<view>{{item.phone}}</view>
					<view>{{item.name}}</view>
				</view>
			</scroll-view>
		</view>
		<!-- 无值背景图 -->
		<view class="bg" v-else>
			<image src="../../static/bg-call.jpg"></image>
		</view>
		<view class="key-main">
			<view @touchend="addClass('')" @touchstart="addClass(item)" :class="{active: isAddClass === item}" class="key-item" v-for="(item, index) in numberList" :key="index" @click="addNum(item)">
				<view class="">{{item}}</view>
				<view class="eng">{{engList[index]}}</view>
			</view>
			<view class="key-item"></view>
			<view @touchend="addClass('')" @touchstart="addClass('0')" :class="{active: isAddClass === '0'}" class="key-item" @click="addNum(0)">
				<view class="">0</view>
				<view class="eng">+</view>
			</view>
			<view @touchend="addClass('')" @touchstart="addClass('dele')" :class="{active: isAddClass === 'dele'}" class="key-item" @click="dele()" @longtap="dele('all')">
				<image class="img" src="../../static/dele.png"></image>
			</view>
		</view>
		<view class="btn-call" @click="dial"><image src="../../static/call.png"></image></view>
	</view>
</template>

<script>
	import { mapGetters, mapActions, mapMutations } from 'vuex'
	import { parseTime, debounce } from '@/utils/index.js'
	export default {
		data() {
			return {
				number: '',
				numberList: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				engList: ['ABC', 'DEF', 'GHI','JKL','MNO','PQR','STU','VWXYZ'],
				list: [],
				isAddClass: '',
				searchs: null
			}
		},
		computed: {
			...mapGetters(['contacts', 'hasLogin', 'isRecharge']),
		},
		onLoad() {
			this.initContacts()
			this.searchs = debounce(this.search)
		},
		methods: {
			...mapActions(['initContacts', 'locationContactsAdd']),
			addClass(e) {
				this.isAddClass = e
			},
			dialPhone(item) { // 拨号操作
				if(!this.hasLogin) {
					uni.navigateTo({
						url: '/pages/public/login'
					})
					return
				}
				if (item.phone.length < 5) {
					return this.$api.msg('输入号码不正确！')
				}
				if (this.isRecharge) {
					uni.navigateTo({
						url: `/pages/contacts-ring/index?name=${item.name}&phone=${item.phone}`
					})
				} else {
					uni.makePhoneCall({
						phoneNumber: item.phone, // 仅为示例
						success: () => {
							this.locationContactsAdd({ answer: item.phone, answer_name: item.name, time: parseTime() })
						}
					})
				}
				
			},
			dial() { // 拨号操作
				if(!this.hasLogin) {
					uni.navigateTo({
						url: '/pages/public/login'
					})
					return
				}
				if (this.number.length < 5) {
					return this.$api.msg('输入号码不正确！')
				}
				if (this.list[0] && this.list[0].phone === this.number) {
					const {
						name,
						phone
					} = this.list[0]
					if (this.isRecharge) {
						uni.navigateTo({
							url: `/pages/contacts-ring/index?name=${name}&phone=${phone}`
						})
					} else {
						uni.makePhoneCall({
							phoneNumber: phone, // 仅为示例
							success: () => {
								this.locationContactsAdd({ answer: phone, answer_name: name, time: parseTime() })
							}
						})
					}
				} else {
					if (this.isRecharge) {
						uni.navigateTo({
							url: `/pages/contacts-ring/index?name=${this.number}&phone=${this.number}`
						})
					} else {
						uni.makePhoneCall({
							phoneNumber: this.number, // 仅为示例
							success: () => {
								this.locationContactsAdd({ answer: this.number, answer_name: this.number, time: parseTime() })
							}
						})
					}
				}
			},
			search() { // 搜索操作
				const number = this.number
				const list = []
				this.contacts.forEach(c => {
					c.contacts.forEach(j => {
						j.children.forEach(k => {
							if (k.indexOf(number) > -1) {
								list.push({
									name: j.name,
									phone: k
								})
							}
						})

					})
				})
				this.list = list
			},

			addNum(val) {
				this.number = `${this.number}${val}`
				this.searchs()
			},
			dele(type = null) {
				if (type === 'all') {
					this.number = ''
					return
				}
				if (this.number.length > 1) {
					this.number = this.number.slice(0, this.number.length - 1)
					this.search()
				} else {
					this.number = ''
				}
			}
		}
	}
</script>

<style lang="scss">
	page,
	.content-three {
		height: 100%;
	}
	
	.bg {
		width: 750rpx;
		height: 472rpx;
		image {
			width: 750rpx;
			height: 472rpx;
			display: block;
		}
	}
	
	.item-list {
		padding: 0 24rpx;
		height: calc(100vh - 950rpx);

		.item {
			border-bottom: 1px solid #f0f0f0;
			color: #aaa;
			font-size: 28rpx;
			line-height: 50rpx;
		}
	}

	.num {
		background: #f7f7f7;
		height: 202rpx;
		text-align: center;
		padding-top: 40rpx;
		line-height: 162rpx;
		font-size: 60rpx;
		&.no {
			color: #aaa;
		}
	}

	.key-main {
		position: fixed;
		padding: 30rpx 75rpx;
		height: 750rpx;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
		background: #FFFFFF;
		box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.05);
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;

		.key-item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 56rpx;
			width: 200rpx;
			height: 130rpx;
			float: left;
			.eng {
				font-size: 24rpx;
				color: #CCCCCC;
			}
			&.active {
				background: #f2f3f4;
				border-radius: 5rpx;
			}

			.img {
				width: 57rpx;
				height: 41rpx;
			}
		}
	}
	.btn-call {
		position: fixed;
		left: 50%;
		bottom: 50rpx;
		margin-left: -60rpx;
		z-index: 10;
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		background: #083999;
		display: flex;
		justify-content: center;
		align-items: center;
		image {
			width: 57rpx;
			height: 57rpx;
		}
	}
</style>
