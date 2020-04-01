/**
 * @name    login store
 * @authors wangxiaoxing (995107408@qq.com)
 * @date    2019-07-15 17:43:24
 * @version $Id$
 */
import mineModel from '../../api/mine.js'
import phoneModel from '../../api/phone.js'

const tokenStorage  = uni.getStorageSync('token')
const userInfoStorage  = uni.getStorageSync('userInfo')
const balanceInfoStorage  = uni.getStorageSync('balanceInfo')
const hasLoginStorage = !!tokenStorage

const login = {
	state: {
		hasLogin: hasLoginStorage, // 判断是否是登陆状态
		token: tokenStorage ? tokenStorage : '',
		userInfo: userInfoStorage ? userInfoStorage : {},
		balanceInfo: balanceInfoStorage ? balanceInfoStorage : {},
	},
	getters: {
		hasLogin: state => state.hasLogin,
		token: state => state.token,
		userInfo: state => state.userInfo,
		balanceInfo: state => state.balanceInfo
	},
	mutations: {
		login(state, { data, callback }) {
			phoneModel.getCallToken({ mobile: data.json.mobile }).then(result => {
				state.hasLogin = true
				state.token = result.data.data
				state.userInfo = data.json
				uni.setStorageSync('userInfo', data.json) // 缓存用户登陆状态
				uni.setStorageSync('token', result.data.data) // 缓存用户登陆状态
				callback()
			})
		},
		getBalance(state) {
			phoneModel.getCallBalance({ mobile: state.userInfo.mobile, token: state.token }).then(res => {
				state.balanceInfo = res.data.json
				uni.setStorageSync('balanceInfo', res.data.json) // 缓存用户登陆状态
			})
		},
		logout(state) {
			state.hasLogin = false
			state.token = ''
			state.userInfo = {}
			uni.removeStorageSync('userInfo')
			uni.removeStorageSync('token')
			uni.removeStorageSync('password')
		}
	},
	actions: {
		goLogin({ state }, callback = () => {}) { // 判断是否登录 也可直接
			if (!state.hasLogin) {
				uni.navigateTo({
					url: '/pages/public/login'
				})
			} else {
				callback()
			}
		}
	}
}

export default login
