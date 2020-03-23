<template>
	<view class="content-three">
		<!-- 无值背景图 -->
		<!-- 有值展示 -->
		<view class="action-part">
			<view class="num" v-if="number.length > 0">{{number}}</view>
			<view class="num no" v-else>请输入号码</view>
			<scroll-view scroll-with-animation scroll-y class="item-list">
				<view class="item" v-for="(item, index) in list" :key="index" @click="dialPhone(item)">
					<view>{{item.phone}}</view>
					<view>{{item.name}}</view>
				</view>
			</scroll-view>
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
		<view class="btn-call"><image src="../../static/call.png"></image></view>
	</view>
</template>

<script>
	export default {
		props: {
			contacts: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		data() {
			return {
				number: '',
				numberList: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				engList: ['ABC', 'DEF', 'GHI','JKL','MNO','PQR','STU','VWXYZ'],
				list: [],
				isAddClass: ''
			}
		},
		methods: {
			addClass(e) {
				this.isAddClass = e
			},
			dialPhone(item) { // 拨号操作
				if (item.phone.length < 5) {
					return this.$api.msg('输入号码不正确！')
				}
				uni.navigateTo({
					url: `/pages/phoneView/ring/ring?name=${item.name}&phone=${item.phone}`
				})
			},
			dial() { // 拨号操作
				if (this.list[0] && this.list[0].phone === this.number) {
					const {
						name,
						phone
					} = this.list[0]
					uni.navigateTo({
						url: `/pages/phoneView/ring/ring?name=${name}&phone=${phone}`
					})
				} else {
					uni.navigateTo({
						url: `/pages/phoneView/ring/ring?name=${this.number}&phone=${this.number}`
					})
				}
			},
			search() { // 搜索操作
				const number = this.number
				setTimeout(() => {
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
				}, 50)
			},

			addNum(val) {
				this.number = `${this.number}${val}`
				this.search()
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
		line-height: 202rpx;
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
		bottom: 130rpx;
		margin-left: -60rpx;
		z-index: 10;
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		background: #1860EB;
		display: flex;
		justify-content: center;
		align-items: center;
		image {
			width: 57rpx;
			height: 57rpx;
		}
	}
</style>
