import Vue from "vue";
import Vuex from "vuex";
import login from './login-module';
import products from './products-module';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		has500Error: true,
		userData: null
	},
	mutations: {
		setUser(state, user) {
			state.userData = user;
		} 
	},
	actions: {
	},
	modules: {
		login,
		products
	}
});
