import Request from '../utils/request'
import WxValidate from '../utils/validate'
/**
 * @name    PhoneModel封装
 * @authors wangxiaoxing (995107408@qq.com)
 * @date    2019-08-30 15:43:24
 * @version $Id$
 */

class PhoneModel extends Request {
	// 更新记录
	updateCallUser(params) {
		return this.get('/service/updateCallUser', { ...params, noToken: true })
	}
	// 获取电话记录
	getCallHD(params) {
		return this.get('/service/getCallHD', { ...params, noToken: true })
	}
	// 获取记录
	getCallPayInfo(params) {
		return this.get('/service/getCallPayInfo', { ...params, noToken: true })
	}
	// 获取通话记录
	getCallLog(params) {
		return this.get('/service/getLocalCallLog', { ...params, noToken: true })
	}
	// 获取验证码接口
	getCallCode(params) {
		return this.get('/service/getCallMobileCode', { ...params, noToken: true })
	}
	// 登录
	loginCall(params) {
		return this.post('/service/loginCall', { ...params, noToken: true })
	}
	// 修改密码
	resetCallPass(params) {
		return this.post('/service/resetCallPass', { ...params, noToken: true })
	}	
	// 注册
	register(params) {
		return this.post('/service/registerByPass', { ...params, noToken: true })
	}
	// 获取token
	getCallToken(params) {
		return this.get('/service/getCallToken', { ...params, noToken: true })
	}
	// 打电话
	callUser(params) {
		return this.post('/service/callUser', { ...params, noToken: true })
	}
	// 充值
	rechangeCall(params) {
		return this.post('/service/rechangeCall', { ...params, noToken: true })
	}
	// getCallBalance
	getCallBalance(params) {
		return this.post('/service/getCallBalance', { ...params, noToken: true })
	}
	// getOilSysConf
	getOilSysConf(params = {}) {
		return this.post('/service/getOilSysConf', { ...params, noToken: true })
	}
	/**
	 * 验证表单
	 */
	initValidate(rules, messages) {
		// 创建实例对象
		this.WxValidate = new WxValidate(rules, messages)
	}
}

const phoneModel = new PhoneModel()

export default phoneModel
