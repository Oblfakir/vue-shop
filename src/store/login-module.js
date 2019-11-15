import { login } from '@/requests/login-requests';

export default {
	state: {
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
				.then(res => {
					if (res.status === 200) {
						const sessionToken = res.headers.get('session-token');

						if (sessionToken) {
							localStorage.setItem('session-token', sessionToken);
						}

						commit('setAuthenticatedStatus', true);
					} else if (res.status === 400) {
						commit('setAuthenticatedStatus', false);
					} else {
						commit('setAuthenticatedStatus', false);
					}
					
					commit('setLoginProgress', false);
				}).catch(() => {
					commit('setLoginProgress', false);
				});
		}
	}
};
