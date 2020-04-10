<template>
	<view class="content">
		<view class="top-info">
			<canvas style="height: 400rpx;width: 100%" canvas-id="firstCanvas"></canvas>
			<view class="balance-title">账户总余额</view>
			<view class="balance-total">{{ balanceInfo.Money | nf }}</view>
			<view class="balance-btn" v-if="isRecharge" @click="navTo('/pages/money/invest')">立即充值</view>
		</view>
		<view class="list-title">消费记录</view>
		<empty v-if="loadingType === 'nomore' && list.length === 0" text="暂无相关记录"></empty>
		<view class="list" v-else>
			<view class="item" v-for="(item, index) in list" :key="index">
				<image class="ico" src="/static/bal-1.png"></image>
				<!-- <image class="ico" src="/static/bal-2.png"></image> -->
				<view class="info-box">
					<view class="info">
						<view class="name">消费(拨打电话)</view>
						<!-- <view class="name">消费(加油折扣)</view> -->
						<view class="bill">被呼叫人：{{ item.calle164 }}</view>
						<view class="time">{{ parseTime(item.calltime, '{y}.{m}.{d} {h}:{i}:{s}') }}</view>
					</view>
					<view class="red">-{{ item.money | nf }}</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import empty from '@/components/empty'
	import {
		mapGetters,
		mapActions,
		mapMutations
	} from 'vuex'
	import phoneModel from '../../api/phone.js'
	import { parseTime } from '@/utils/index.js'
	export default {
		components: {},
		data() {
			return {
				page: 0,
				pages: 0, // 总页数
				loadingType: 'more', //加载更多状态
				list: []
			}
		},
		computed: {
			...mapGetters(['balanceInfo', 'token', 'isRecharge'])
		},
		onLoad() {
			this.createWare()
			this.getBalance()
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
			parseTime,
			...mapMutations(['getBalance']),
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
					this.list = [];
				}
				phoneModel.getCallHD({ page: this.page, limit: 10, token: this.token }).then(res => {
					this.list.push(...res.data.json)
					uni.stopPullDownRefresh()
					//判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了)
					this.loadingType = res.data.json.length < 10 ? 'nomore' : 'more'
				}).catch(() => {
				})
			},
			navTo(url) {
				uni.navigateTo({
					url
				})
			},
			createWare() {
				let ctx = uni.createCanvasContext('firstCanvas');
				//获得画笔
				const requestAnimFrame = (function() {
					return function(callback) {
							setTimeout(callback, 1000 / 60);
						};
				})();
				// 波浪大小
				let width = uni.upx2px(750)
				let height = uni.upx2px(400)
				let boHeight = height / 4;
				let posHeight = height / 1.3;
				//初始角度为0 
				let step = 0;
				//定义三条不同波浪的颜色 
				let lines = ["rgba(0,222,255, 0.2)", "rgba(157,192,249, 0.2)", "rgba(0,168,255, 0.2)"];
				function loop() {
					//清除canvas内容
					ctx.clearRect(0, 0, width, height);
					step++;
					//画3个不同颜色的矩形 
					for (let j = lines.length - 1; j >= 0; j--) {
						ctx.fillStyle = lines[j];
						//每个矩形的角度都不同，每个之间相差45度 
						let angle = (step + j * 100) * Math.PI / 180;
						let deltaHeight = Math.sin(angle) * boHeight;
						let deltaHeightRight = Math.cos(angle) * boHeight;
						ctx.beginPath();
						ctx.moveTo(0, posHeight + deltaHeight);
						ctx.bezierCurveTo(width / 2, posHeight + deltaHeight - boHeight, width / 2, posHeight + deltaHeightRight -
							boHeight, width, posHeight + deltaHeightRight);
						ctx.lineTo(width, height);
						ctx.lineTo(0, height);
						ctx.lineTo(0, posHeight + deltaHeight);
						ctx.closePath();
						ctx.fill();
					}
					ctx.draw();
					requestAnimFrame(loop);
				}
				loop();
			}
		}
	}
</script>

<style lang="scss">
	.list-title {
		line-height: 90rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: rgba(153, 153, 153, 1);
		margin-left: 32rpx;
		border-bottom: 1rpx solid #EEEEEE;
	}

	.list {
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

	.top-info {
		height: 534rpx;
		width: 100%;
		position: relative;
		background: linear-gradient(0deg, rgba(37, 92, 198, 1) 0%, rgba(49, 119, 254, 1) 100%);

		canvas {
			position: absolute;
			bottom: 0;
			left: 0;
		}

		.balance-title {
			padding-top: 80rpx;
			text-align: center;
			height: 27rpx;
			font-size: 28rpx;
			font-weight: 400;
			color: rgba(255, 255, 255, 0.8);
			line-height: 28rpx;
			position: relative;
			z-index: 1;
		}

		.balance-total {
			margin-top: 70rpx;
			text-align: center;
			height: 80rpx;
			font-size: 88rpx;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
			line-height: 88rpx;
			position: relative;
			z-index: 1;
		}

		.balance-btn {
			margin-top: 70rpx;
			margin: 70rpx auto;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 168rpx;
			height: 56rpx;
			background: rgba(255, 255, 255, 1);
			border-radius: 28px;
			font-size: 28rpx;
			color: rgba(234, 18, 18, 1);
			line-height: 28rpx;
			position: relative;
			z-index: 1;
		}
	}

	page {
		background: #FFFFFF;
	}
</style>
