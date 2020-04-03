import Request from '../utils/request'
import WxValidate from '../utils/validate'
/**
 * @name    MineModel封装
 * @authors wangxiaoxing (995107408@qq.com)
 * @date    2019-07-16 15:43:24
 * @version $Id$
 */

class MineModel extends Request {
	// 删除消息
	version(params = {}) {
		return this.get('/service/getOilAppVersion', { ...params })
	}
	/**
	 * 验证表单
	 */
	initValidate(rules, messages) {
		// 创建实例对象
		this.WxValidate = new WxValidate(rules, messages)
	}
}

const mineModel = new MineModel()

export default mineModel
