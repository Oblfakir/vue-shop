import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isAuthenticated: false,
		has500Error: true
	},
	mutations: {},
	actions: {},
	modules: {}
});
