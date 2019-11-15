import Vue from "vue";
import Vuex from "vuex";
import login from './login-module';
import productDetails from './product-details-module';
import productList from './product-list-module';

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
		productDetails,
		productList
	}
});
