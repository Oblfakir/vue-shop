import { getProducts } from '@/requests';

export default {
	state: {
		isProductsLoading: false,
		products: [],
		allProducts: [],
		availableCategories: [ 'None' ]
	},
	mutations: {
		setProducts(state, products) {
			state.allProducts = products;
		},
		setLoadingState(state, status) {
			state.isProductsLoading = status;
		},
		setCategories(state, products) {
			state.availableCategories = [ 'None', ...new Set(products.map(x => x.category)) ];
		},
		filterProducts(state, filter) {
			if (!filter) {
				state.products = state.allProducts;
			} else {
				const {
					availableOnly,
					category,
					gender,
					rating,
					priceTo,
					priceFrom
				} = filter;
				let filteredProducts = state.allProducts.filter(x => x.gender === gender)

				if (availableOnly) {
					filteredProducts = filteredProducts.filter(x => x.count > 0);
				}
				if (category !== 'None') {
					filteredProducts = filteredProducts.filter(x => x.category === category);
				}
				if (rating) {
					filteredProducts = filteredProducts.filter(x => x.rating === rating);
				}
				if (priceTo) {
					filteredProducts = filteredProducts.filter(x => x.cost <= priceTo);
				}
				if (priceFrom) {
					filteredProducts = filteredProducts.filter(x => x.cost >= priceFrom);
				}

				state.products = filteredProducts;
			}
		}
	},
	actions: {
		loadProducts({ commit }) {
			commit('setLoadingState', true);

			getProducts().then(products => {
				if (products) {
					commit('setProducts', products);
					commit('setCategories', products);
					commit('filterProducts', null);
				}

				commit('setLoadingState', false);
			});
		}
	},
	modules: {}
};
