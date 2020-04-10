<script>
	import mineModel from './api/mine.js'
	import {
		url_base_image,
		versionIos,
		versionAnd,
	} from './common/config/index.js'
	import {
		mapGetters,
		mapActions,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {}
		},

		methods: {
			...mapMutations(['login', 'getBalance']),
			...mapActions(['getOilSysConf']),
			AndroidCheckUpdate() { // 安卓跟新
				var _this = this;
				mineModel.version({ type: 1 }).then(res => {
					if (res.data !== versionAnd && Number(res.data.replace(/\./g, '')) > Number(versionAnd.replace(/\./g, ''))) {
						uni.showModal({
							title: '提示',
							content: '检测到有新版本，是否更新？',
							showCancel: false,
							success: (e) => {
								if (e.confirm) {
									uni.showLoading({
										mask: true,
										title: '正在下载更新，请勿退出！'
									})
									var dtask = plus.downloader.createDownload(url_base_image + '/public/app/oil_app_' + res.data + '.apk', {},
										function(d, status) {
											uni.hideLoading()
											// 下载完成  
											if (status == 200) {
												plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename), {}, {}, function(error) {
													uni.showToast({
														title: '安装失败',
														mask: false,
														duration: 1500
													});
												})
											} else {
												uni.showToast({
													title: '更新失败',
													mask: false,
													duration: 1500
												});
											}
										});
									dtask.start();
								}
							}
						})

					}
				})
			},
			IosCheckUpdate() { // ios 跟新
				var _this = this;
				mineModel.version({ type: 2 }).then(res => {
					if (Number(res.data.replace(/\./g, '')) > Number(versionAnd.replace(/\./g, ''))) {
						uni.showModal({
							title: '提示',
							content: '检测到有新版本，请前往 App Store 更新',
							showCancel: false,
							success: (e) => {
								if (e.confirm) {
									var url = 'itms-apps://itunes.apple.com/cn/app/id1506190317';
									plus.runtime.openURL(url)
								}
							}
						})

					}
				})
			}
		},
		onLaunch(option) {
			const userInfoStorage  = uni.getStorageSync('userInfo')
			if (userInfoStorage) { // 每次重新进入都重新获取token及余额等
				this.login({ data: { json: userInfoStorage }, callback: () => {
					this.getBalance()
				} })
			}
			return
			uni.getSystemInfo({
				success: (res) => {
					//检测当前平台，如果是安卓则启动安卓更新  
					if (res.platform == 'android') {
						this.AndroidCheckUpdate()
					}
					if (res.platform == 'ios') {
						this.getOilSysConf()
						this.IosCheckUpdate()
					}
				}
			})
		},
		onShow: function() {},
		onHide: function() {},
	}
</script>

<style lang='scss'>
	view,
	scroll-view,
	swiper,
	swiper-item,
	cover-view,
	cover-image,
	icon,
	text,
	rich-text,
	progress,
	button,
	checkbox,
	form,
	input,
	label,
	radio,
	slider,
	switch,
	textarea,
	navigator,
	audio,
	camera,
	image,
	video {
		box-sizing: border-box;
	}
	/* button样式改写 */
	uni-button,
	button {
		font-weight: normal;
		&.no-border:before,
		&.no-border:after {
			border: 0;
		}
	}
	.back-btn {
		position: absolute;
		left: 40upx;
		z-index: 9999;
		top: 90upx;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		.text {
			font-size: 32rpx;
			line-height: 32rpx;
			color: #FFFFFF;
		}
		.ico {
			width: 36rpx;
			height: 36rpx;
			margin-right: 4rpx;
		}
	}
	/*
		全局公共样式和字体图标
	*/
	@font-face {
		font-family: yticon;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/font_1078604_w4kpxh0rafi.ttf') format('truetype');
	}
	
	.yticon {
		font-family: "yticon" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	.icon-you:before {
		content: "\e606";
	}
</style>
