import Vue from "vue";
import Vuex from "vuex";
import login from './login-module';
import productDetails from './product-details-module';
import productList from './product-list-module';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isAuthenticated: false,
		has500Error: true
	},
	mutations: {
	},
	actions: {
	},
	modules: {
		login,
		productDetails,
		productList
	}
});
