<template>
	<view class="content">
		<view class="month-item">
			<view class="month-top">
				<view class="name">2019年1月</view>
				<view class="total">+100</view>
			</view>
			<view class="month-list">
				<view class="item">
					<image class="ico" src="/static/xiaofei-3.png"></image>
					<view class="info-box">
						<view class="info">
							<view class="name">余额充值</view>
							<view class="bill">交易单号：235366568468986585</view>
							<view class="time">2019.12.12 13：16</view>
						</view>
						<view class="red">+100.00</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				monthList: [],
				page: 0,
				pages: 0, // 总页数
				loadingType: 'loading' //加载更多状态
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
			height: 76rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 32rpx;
			.name {
			}
			.total {
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
