import { getProducts } from '@/requests';

export default {
	state: {
		isProductsLoading: false,
		products: [],
		allProducts: []
	},
	mutations: {
		setProducts(state, products) {
			state.allProducts = products;
		},
		setLoadingState(state, status) {
			state.isProductsLoading = status;
		},
		filterProducts(state, filter) {
			if (!filter) {
				state.products = state.allProducts;
			} else {
				// const {
				// 	availableOnly,
				// 	category,
				// 	gender,
				// 	rating,
				// 	priceTo,
				// 	priceFrom
				// } = filter;
				state.products = state.allProducts; // TODO: apply filters
			}
		}
	// 	"id": 3,
    //   "categoryId": 0,
    //   "image": "https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg?h=350&auto=compress&cs=tinysrgb",
    //   "name": "Active wear Lorem Ipsum 4",
    //   "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    //   "cost": 37.99,
    //   "rating": 0,
    //   "gender": "Woman",
    //   "count": 5,
    //   "soldCount": 0
	},
	actions: {
		loadProducts({ commit }) {
			commit('setLoadingState', false);

			getProducts().then(products => {
				if (products) {
					commit('setProducts', products);
					commit('filterProducts', null);
				}

				commit('setLoadingState', true);
			});
		}
	},
	modules: {}
};
