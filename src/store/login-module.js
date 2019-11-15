import { login, getUserData } from '@/requests';

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
						getUserData(userData.login).then((user) => {
							commit('setUser', user);
							commit('setAuthenticatedStatus', success);
						})
					} else {
						commit('setLoginError', true);
					}
				})
				.catch(() => {})
				.finally(() => commit('setLoginProgress', false));
		}
	}
};
