import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import params from './modules/params'
import loginPhone from './modules/loginPhone'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		login,
		params,
		loginPhone
	}
})

export default store
