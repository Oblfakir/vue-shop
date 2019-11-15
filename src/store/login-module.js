import { login } from '@/requests';

export default {
	state: {
		isAuthenticated: false,
		loginInProgress: false
	},
	mutations: {
		setLoginProgress(state, status) {
			state.loginInProgress = status;
		},
		setAuthenticatedStatus(state, status) {
			state.isAuthenticated = status;
		}
	},
	actions: {
		authenticate({ commit }, userData) {
			commit('setLoginProgress', true);

			login(userData)
				.then(success => commit('setAuthenticatedStatus', success))
				.catch(() => commit('setLoginProgress', false));
		}
	}
};
