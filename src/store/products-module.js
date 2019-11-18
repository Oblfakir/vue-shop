import { getProducts } from '@/requests';

export default {
	state: {
		isProductsLoading: false,
		products: []
	},
	mutations: {
		setProducts(state, products) {
			state.products = products;
		},
		setLoadingState(state, status) {
			state.isProductsLoading = status;
		},
		// filterProducts(state, filter) {
		// 	state.products = state.products;
		// }
	},
	actions: {
		loadProducts({ commit }) {
			commit('setLoadingState', false);

			getProducts().then(products => {
				if (products) {
					commit('setProducts', products);
				}

				commit('setLoadingState', true);
			});
		}
	},
	modules: {}
};
