<template>
	<view class="content">
		<view class="big-title">通讯录</view>
		<view class="input-search">
			<image class="ic" src="../../static/ipone_search.png"></image>
			<view class="search" @click="onSearchInput()">搜索</view>
		</view>
		<view class="mobile-list" v-if="contactsCopy.length !== 0">
			<scroll-view class="contact-scroll" scroll-y :scroll-into-view="scrollViewId">
				<view class="box" v-for="(item,key) in contacts" :key="key">
					<view class="divider" :id="`id${item.letter === '#' ? 'xxx' : item.letter}`"> <text class="divider-text">{{item.letter}}</text>
					</view>
					<view class="item" hover-class="hover" :hover-start-time="20" v-for="(contact,index) in item.contacts" :key="index"
					 @click='onSelectClick(contact)'>
						<image class="portrait" src="../../static/gywm.png"></image>
						<view class="name">{{contact.name}}</view>
					</view>
				</view>
			</scroll-view>
			<!-- 右侧滚动 -->
			<view class="indexBar-bg">
				<view class="indexBar" catchtouchmove>
					<view class="indexBar-box" @touchstart="tStart" @touchend="tEnd" @touchmove="tMove">
						<view class="indexBar-item" v-for="(item, index) in contacts" :key="index" :id="item.letter" @touchstart="getCur"
						 @click="clickT" @touchend="setCur">
							{{item.letter}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<empty :relative="true" v-if="contactsCopy.length === 0" text="暂无相关内容"></empty>
		<view v-show="!hidden" class="indexToast">{{letter}}</view>
	</view>
</template>

<script>
	import pinyin from './components/pinyin/pinyin3.js'
	import empty from '@/components/empty'
	import {
		mapGetters,
		mapActions,
		mapMutations
	} from 'vuex'
	const platform = uni.getSystemInfoSync().platform
	export default {
		components: {
			empty
		},
		data() {
			return {
				scrollViewId: 'we',
				search: '',
				hidden: true,
				boxTop: 0,
				barHeight: 0,
				letter: '',
				isSearch: false,
				contactItems: [],
				contactsCopy: []
			}
		},
		computed: {
			...mapGetters(['contacts', 'hasLogin']),
		},
		onLoad() {
			this.initContacts()
			const res = uni.getSystemInfoSync();
			this.barHeight = res.windowHeight / 27;
			setTimeout(() => {
				this.actTop()
			}, 500);
		},
		methods: {
			...mapMutations(['setParams']),
			...mapActions(['initContacts']),
			actTop() {
				var that = this
				const query = uni.createSelectorQuery().in(this);
				query.select('.indexBar-box').boundingClientRect(function(e) {
					if (e != null) {
						that.boxTop = e.top
					}
				}).exec()
			},
			navTo(url) {
				uni.navigateTo({
					url
				})
			},
			/*
			 * 滑动的侧边选择器
			 */
			clickT() {
				this.scrollViewId = 'id' + (this.letter === '#' ? 'xxx' : this.letter)
			},
			getCur(e) {
				this.hidden = false
			},
			setCur(e) {
				this.hidden = true;
				this.letter = e.target.id
			},
			tStart() {
				this.hidden = false
			},
			tEnd() {
				this.hidden = true
			},
			tMove(e) {
				let y = e.touches[0].clientY
				let offsettop = this.boxTop
				//判断选择区域,只有在选择区才会生效
				if (y > offsettop) {
					var num = Math.floor((y - offsettop) / this.barHeight);
					if (num < this.contactsCopy.length) {
						this.letter = this.contactsCopy[num].letter
						this.scrollViewId = 'id' + (this.letter === '#' ? 'xxx' : this.letter)
					}
				}
			},

			onSelectClick: function(contact) {
				if (this.isRecharge && !this.hasLogin) {
					uni.navigateTo({
						url: '/pages/public/login'
					})
					return
				}
				this.setParams(contact)
				this.navTo('/pages/contacts-detail/index')
			},
			onSearchInput: function(value) {
				if (this.isRecharge && !this.hasLogin) {
					uni.navigateTo({
						url: '/pages/public/login'
					})
					return
				}
				this.setParams(this.contactsCopy)
				this.navTo('/pages/index-search/index')
			}
		},
		watch: {
			search(v) {
				this.onSearchInput(v)
			},
			contacts: {
				handler: function(v) {
					this.contactsCopy = JSON.parse(JSON.stringify(v))
					this.contactItems = JSON.parse(JSON.stringify(v))
				},
				immediate: true
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
	}

	.input-search {
		background: #FFFFFF;
		padding: 30rpx 24rpx 40rpx;
		position: relative;

		.bg {
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			z-index: 2;
		}

		.search {
			color: #666666;
			margin: 0;
			height: 68rpx;
			background: #E6E6E6;
			border-radius: 40rpx;
			padding: 0 62rpx;
			font-size: 32rpx;
			line-height: 68rpx;
		}

		.ic {
			position: absolute;
			width: 30rpx;
			height: 36rpx;
			z-index: 1;
			left: 48rpx;
			top: 46rpx;
		}
	}


	.indexBar-bg {
		height: 100vh;
		width: 60px;
		position: fixed;
		right: 0;
		top: 0;
		z-index: 1000;
	}

	.indexBar {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(0, -50%);
		display: flex;
		align-items: center;
		z-index: 1003;
	}

	.indexBar .indexBar-box {
		width: 60rpx;
		height: auto;
		background: #fff;
		display: flex;
		flex-direction: column;
		box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.1);
		border-radius: 10rpx;
		z-index: 1004;
	}

	.indexBar-item {
		flex: 1;
		width: 60rpx;
		height: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		color: #083999;
		z-index: 1005;
	}

	.indexToast {
		position: fixed;
		top: 0;
		right: 80rpx;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		width: 100rpx;
		height: 100rpx;
		margin: auto auto;
		border-radius: 10rpx;
		color: #fff;
		line-height: 100rpx;
		text-align: center;
		font-size: 48rpx;
	}

	.contact-scroll {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		width: 100vw;
		height: calc(100vh - 290rpx);
	}

	.box {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
	}

	.divider {
		width: 100%;
		background-color: #f7f7f7;
		padding: 5rpx 0;
		color: #000;
	}

	.divider-text {
		margin-left: 20rpx;
	}

	.item {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		border-bottom: 1px solid #f0f0f0;
	}

	.portrait {
		width: 100rpx;
		height: 100rpx;
		padding: 15rpx;
		margin-right: 10rpx;
	}

	.name {
		font-size: 35rpx;
	}

	.hover {
		background-color: #e7e7e7;
	}
</style>
