import { login, logout, getUserData } from '@/requests';

export default {
	state: {
		isAuthenticated: false,
		loginInProgress: false,
		loginError: null
	},
	mutations: {
		setLoginProgress(state, status) {
			state.loginInProgress = status;
		},
		setAuthenticatedStatus(state, status) {
			state.isAuthenticated = status;
		},
		setLoginError(state, isError) {
			state.loginError = isError ? 'Invalid login or password' : null;
		}
	},
	actions: {
		authenticate({ commit }, userData) {
			commit('setLoginProgress', true);
			commit('setLoginError', false);

			login(userData)
				.then(success => {
					if (success) {
						getUserData().then((user) => {
							commit('setUser', user);
							commit('setAuthenticatedStatus', success);
						})
					} else {
						commit('setLoginError', true);
					}
				})
				.catch(() => {})
				.finally(() => commit('setLoginProgress', false));
		},
		getUser({ commit }) {
			getUserData().then((user) => commit('setUser', user));
		},
		logout({ commit }) {
			logout().then(() => {
				commit('setUser', null);
				commit('setAuthenticatedStatus', false);
			});
		}
	}
};
