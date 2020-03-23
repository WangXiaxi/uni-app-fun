<template>
	<view class="content">
		<view class="big-title">最近通话</view>
		<view class="list">
			<view class="item">
				<view class="info">
					<view class="name">王小星</view>
					<view class="mobile">
						<view class="tell">15058559592</view>
						<view class="date">2019-03-04 呼出</view>
						<image class="trans" src="../../static/arrow-phone.png"></image>
					</view>
				</view>
			</view>
			<view class="item">
				<view class="info">
					<view class="name">王小星</view>
					<view class="mobile">
						<view class="tell">15058559592</view>
						<view class="date">2019-03-04 呼出</view>
						<image class="trans" src="../../static/arrow-phone.png"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import empty from '@/components/empty'
	// import phoneModel from '../../../api/phone/index.js'
	export default {
		components: {
			empty
		},
		props: {},
		data() {
			return {
				list: []
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding-top: 84rpx;
	}

	.big-title {
		font-size: 48rpx;
		line-height: 48rpx;
		color: #111111;
		padding-left: 31rpx;
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
