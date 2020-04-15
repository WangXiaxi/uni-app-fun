<template>
	<view class="content">
		<radio-group class="spec-list">
			<label class="item" :class="{act: productId === item.value}" v-for="(item, index) in priceList" :key="index" @click="applePriceChange(item)">
				{{item.text}}
			</label>
		</radio-group>
		<view class="uni-padding-wrap">
			<button class="add-btn" @click="requestPayment" :loading="loading" :disabled="loading || disabled">立即支付</button>
		</view>
	</view>
</template>

<script>
	let iapChannel = null,
		productIds = ['moneys50', 'moneys100', 'moneys200'];
	export default {
		data() {
			return {
				productId: 'money50',
				title: 'request-payment',
				loading: false,
				disabled: true,
				priceList: [{
					value: 'moneys50',
					text: '50元',
					checked: true
				}, {
					value: 'moneys100',
					text: '100元',
					checked: false
				}, {
					value: 'moneys200',
					text: '200元',
					checked: false
				}]
			}
		},
		onLoad: function() {
			plus.payment.getChannels((channels) => {
				console.log("获取到channel" + JSON.stringify(channels))
				for (var i in channels) {
					var channel = channels[i];
					if (channel.id === 'appleiap') {
						iapChannel = channel;
						this.requestOrder();
					}
				}
				if (!iapChannel) {
					this.errorMsg()
				}
			}, (error) => {
				this.errorMsg()
			});
		},
		methods: {
			requestOrder() {
				uni.showLoading({
					title: '检测支付环境...'
				})
				iapChannel.requestOrder(productIds, (orderList) => { //必须调用此方法才能进行 iap 支付
					this.disabled = false;
					console.log('requestOrder success666: ' + JSON.stringify(orderList));
					uni.hideLoading();
				}, (e) => {
					console.log('requestOrder failed: ' + JSON.stringify(e));
					uni.hideLoading();
					this.errorMsg()
				});
			},
			requestPayment(e) {
				this.loading = true;
				uni.requestPayment({
					provider: 'appleiap',
					orderInfo: {
						productid: this.productId
					},
					success: (e) => {
						uni.showModal({
							content: "充值成功！",
							showCancel: false
						})
					},
					fail: (e) => {
						uni.showModal({
							content: "支付失败,原因为: " + e.errMsg,
							showCancel: false
						})
					},
					complete: () => {
						console.log("payment结束")
						this.loading = false;
					}
				})
			},
			applePriceChange(e) {
				this.productId = e.value
			},
			errorMsg() {
				uni.showModal({
					content: "暂不支持苹果 iap 支付",
					showCancel: false
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 100rpx 32rpx;
	}

	.add-btn {
		color: #FFFFFF;
		padding: 0 38upx;
		margin: 60rpx auto 0;
		border-radius: 100px;
		height: 96rpx;
		width: 626rpx;
		font-size: 36rpx;
		background: linear-gradient(-90deg, rgba(137, 175, 249, 1), rgba(8, 57, 153, 1));
		box-shadow: 0px 16px 64px 6px rgba(2, 85, 196, 0.3);
		display: flex;
		justify-content: center;
		align-items: center;

		&[disabled] {
			background: linear-gradient(-90deg, rgba(137, 175, 249, 1), rgba(8, 57, 153, 1));
			color: #FFFFFF !important;
			opacity: 0.6;
		}
	}

	.uni-list-cell {
		display: inline-block;
		border: 1rpx solid;
	}


	.spec-list {
		overflow: hidden;
		margin-top: 20upx;

		.item {
			border-radius: 4upx;
			width: 31%;
			margin-left: 3.5%;
			margin-bottom: 20upx;
			float: left;
			height: 56upx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28upx;
			color: #083999;
			border: 1upx solid #083999;
			opacity: .6;

			&:nth-of-type(3n + 1) {
				margin-left: 0;
			}
		}

		.item.act {
			opacity: 1;
			border-color: $base-color;
			color: $base-color;
			position: relative;
			overflow: hidden;

			&:after {
				content: '';
				position: absolute;
				bottom: 0;
				right: 0;
				width: 0;
				height: 0;
				border-bottom: 16upx solid $base-color;
				border-top: 16upx solid transparent;
				border-left: 22upx solid transparent;
				border-right: 22upx solid $base-color;
			}

			&:before {
				content: ' ';
				display: block;
				position: absolute;
				z-index: 1;
				right: 10upx;
				bottom: 8upx;
				width: 20upx;
				height: 40upx;
				border-radius: 0;
				border: none;
				border-bottom: 4upx solid #fff;
				border-right: 4upx solid #fff;
				transform: scale(0.4) rotate(45deg);
				transform-origin: bottom;
			}
		}
	}
</style>
