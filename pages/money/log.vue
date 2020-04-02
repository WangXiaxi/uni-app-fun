<template>
	<view class="content">
		<empty v-if="loadingType === 'nomore' &&  Object.keys(monthList).length === 0" text="暂无相关记录"></empty>
		<view v-else>
			<view class="month-item" v-for="(item, key) in monthList" :key="key">
				<view class="month-top">
					<view class="name">{{key}}</view>
					<view class="total">收入：{{item.money | nf}}</view>
				</view>
				<view class="month-list">
					<view class="item" v-for="(items, index) in item.children" :key="index">
						<image class="ico" src="/static/xiaofei-3.png"></image>
						<view class="info-box">
							<view class="info">
								<view class="name">余额充值</view>
								<view class="bill">充值卡号：{{items.cardno}}</view>
								<view class="time">{{ items.paytime }}</view>
							</view>
							<view class="red">+{{items.money | nf}}</view>
						</view>
					</view>
				</view>
			</view>
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import empty from '@/components/empty'
	import {
		parseTime
	} from '../../utils/index.js'
	import {
		mapGetters,
		mapActions,
		mapMutations
	} from 'vuex'
	import phoneModel from '../../api/phone.js'
	export default {
		components: {
			uniLoadMore,
				empty
		},
		data() {
			return {
				monthList: {},
				page: 0,
				pages: 0, // 总页数
				loadingType: 'more' //加载更多状态
			}
		},
		computed: {
			...mapGetters(['token'])
		},
		onLoad() {
			this.loadData()
		},
		//下拉刷新
		onPullDownRefresh() {
			this.loadData('refresh');
		},
		//加载更多
		onReachBottom() {
			this.loadData();
		},
		methods: {

			handleData(list) {
				const monthList = this.monthList
				list.map(c => {
					const key = parseTime(c.paytime, '{y}年{m}月')
					c.paytime = parseTime(c.paytime, '{y}.{m}.{d} {h}:{i}')
					if (monthList[key]) {
						monthList[key].children.push(c)
						monthList[key].money = Number((monthList[key].money + c.money).toFixed(2))
					} else {
						monthList[key] = {
							children: [c],
							money: c.money
						}
					}
				})
				this.monthList = JSON.parse(JSON.stringify(monthList))
			},
			loadData(type = 'add', loading) {
				if (this.loadingType === 'loading' && type !== 'refresh') return // 有数据在加载时 不进行请求
				//没有更多直接返回
				if (type === 'add') {
					if (this.loadingType === 'nomore') {
						return;
					}
					this.page = this.page + 1;
					this.loadingType = 'loading';
				} else {
					this.loadingType = 'loading';
				}

				if (type === 'refresh') {
					this.page = 1;
					this.monthList = {};
				}
				phoneModel.getCallPayInfo({
					page: this.page,
					limit: 10,
					token: this.token
				}).then(res => {
					this.handleData(res.data.json)
					uni.stopPullDownRefresh()
					//判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了)
					this.loadingType = res.data.json.length < 10 ? 'nomore' : 'more'
				}).catch(() => {})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #FFFFFF;
	}

	.month-item {
		.month-top {
			background-color: #efefef;
			height: 76rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 32rpx;

			.name {
				font-size: 28rpx;
				color: #111111;
			}

			.total {
				font-size: 28rpx;
				color: #666666;
			}
		}
	}

	.month-list {
		padding-left: 32rpx;

		.item {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			padding: 30rpx 0 0rpx 0;

			&:last-child {
				.info-box {
					border-bottom: none;
				}
			}

			.ico {
				width: 66rpx;
				height: 66rpx;
			}

			.info-box {
				flex: 1;
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				border-bottom: 1rpx solid #EEEEEE;
				padding-top: 10rpx;
				padding-bottom: 30rpx;
			}

			.info {
				flex: 1;
				width: 0;
				margin-left: 33rpx;

				.name {
					font-size: 28rpx;
					font-weight: 500;
					color: rgba(17, 17, 17, 1);
					line-height: 36rpx;
				}

				.bill {
					margin-top: 20rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
					line-height: 24rpx;
					width: 600rpx;
				}

				.time {
					margin-top: 21rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
					line-height: 24rpx;
				}
			}

			.red {
				height: 36rpx;
				font-size: 36rpx;
				color: rgba(234, 18, 18, 1);
				line-height: 36rpx;
				margin: 0 32rpx 0 0;
			}
		}
	}
</style>
