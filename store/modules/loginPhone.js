/**
 * @name    login store
 * @authors wangxiaoxing (995107408@qq.com)
 * @date    2019-07-15 17:43:24
 * @version $Id$
 */
import phoneModel from '../../api/phone.js'
import pinyin from '../../pages/news/components/pinyin/pinyin3.js'
const platform = uni.getSystemInfoSync().platform
const locationContactsStorage  = uni.getStorageSync('locationContacts') || []

const login = {
	state: {
		contacts: [],
		locationContacts: locationContactsStorage,
		isRecharge: true
	},
	getters: {
		contacts: state => state.contacts,
		locationContacts: state => state.locationContacts,
		isRecharge: state => state.isRecharge
	},
	mutations: {
		setLocationContacts(state, data) {
			state.locationContacts = data
		},
		setContacts(state, data) {
			state.contacts = data
		},
		setIsRecharge(state, data) {
			state.isRecharge = data
		}
	},
	actions: {
		// 添加本地记录
		locationContactsAdd({
			commit,
			state
		}, data) {
			const cur = JSON.parse(JSON.stringify(state.locationContacts))
			cur.push(data)
			commit('setLocationContacts', cur)
			uni.setStorageSync('locationContacts', cur) // 缓存用户登陆状态
		},
		// 获取手机通讯录并存储
		initContacts({
			commit
		}) {
			const onAddressBookSetting = () => { // 获取手机通讯录
				uni.showModal({
					title: '提示',
					content: 'APP通讯录权限没有开启，是否开启？',
					success: (res) => {
						if (res.confirm) {
							if (platform == 'ios') {
								var UIApplication = plus.ios.import("UIApplication");
								var NSURL2 = plus.ios.import("NSURL");
								var setting2 = NSURL2.URLWithString("app-settings:");
								var application2 = UIApplication.sharedApplication();
								application2.openURL(setting2);
								plus.ios.deleteObject(setting2);
								plus.ios.deleteObject(NSURL2);
								plus.ios.deleteObject(application2);
							} else {
								var main = plus.android.runtimeMainActivity();
								var bulid = plus.android.importClass("android.os.Build");
								var Intent = plus.android.importClass('android.content.Intent');
								if (bulid.VERSION.SDK_INT >= 9) {
									var intent = new Intent('android.settings.APPLICATION_DETAILS_SETTINGS');
									var Uri = plus.android.importClass('android.net.Uri');
									var uri = Uri.fromParts("package", main.getPackageName(), null);
									intent.setData(uri);
									intent.putExtra('android.content.Intent.setFlags', Intent.FLAG_ACTIVITY_NEW_TASK);
								} else if (bulid.VERSION.SDK_INT <= 8) {
									var intent = new Intent(Intent.ACTION_VIEW);
									intent.setClassName("com.android.settings", "com.android.settings.InstalledAppDetails");
									intent.putExtra("com.android.settings.ApplicationPkgName", main.getPackageName());
									intent.putExtra('android.content.Intent.setFlags', Intent.FLAG_ACTIVITY_NEW_TASK);
								}
								main.startActivity(intent);
							}
						}
					}
				})
			}
			plus.contacts.getAddressBook(plus.contacts.ADDRESSBOOK_PHONE, (addressbook) => { // 可通过addressbook进行通讯录操作
				let contacts = null
				addressbook.find(["displayName", "phoneNumbers"], (contacts) => {
					var items = [];
					for (let i = 0; i < contacts.length; i++) {
						if (contacts[i].phoneNumbers.length > 0) {
							let value = contacts[i].phoneNumbers[0].value.replace(/\s/g, '')
							let contact = {
								'name': contacts[i].displayName ? contacts[i].displayName : value,
								'phone': value,
								'children': contacts[i].phoneNumbers.map(c => c.value.replace(/\s/g, ''))
							};
							items.push(contact);
						}
					}
					contacts = pinyin.paixu(items)
					contacts.sort(function(o1, o2) {
						return o1.letter.charCodeAt(0) - o2.letter.charCodeAt(0)
					})
					commit('setContacts', contacts)
				}, (e) => {
					onAddressBookSetting()
				});
			}, (e) => {
				onAddressBookSetting()
			});
		},
		// getOilSysConf
		async getOilSysConf({
			commit
		}) { // 防止审核展示
			const res = await phoneModel.getOilSysConf()
			if (res.data.isRecharge === 'false') {
				commit('setIsRecharge', false)
			}
		},
		// 注册并登陆 phone
		async loginPhone({
			commit
		}) { // 注册并登陆手机
			const {
				mobile
			} = uni.getStorageSync('userInfo')
			await phoneModel.register({
				mobile
			})
			this.isLoginPhone = true
		}
	}
}

export default login
