import { getProducts, getProduct } from '@/requests';

const noCategoryName = 'None';
const itemsPerPage = 5;

export default {
	state: {
		isProductsLoading: false,
		products: [],
		filteredProducts: [],
		allProducts: [],
		availableCategories: [ noCategoryName ],
		pagesNumber: 1,
		selectedPage: 1,
		lastAppliedFilter: {},
		product: null
	},
	mutations: {
		setProduct(state, product) {
			state.product = product;
		},
		setProducts(state, products) {
			state.allProducts = products;
		},
		setLoadingState(state, status) {
			state.isProductsLoading = status;
		},
		setCategories(state, products) {
			state.availableCategories = [ noCategoryName, ...new Set(products.map(x => x.category)) ];
		},
		filterProducts(state, filter) {
			if (!state.lastAppliedFilter && !filter) return;

			state.lastAppliedFilter = filter;

			let filteredProducts = state.allProducts;

			if (filter) {
				const {
					availableOnly,
					category,
					gender,
					rating,
					priceTo,
					priceFrom
				} = filter;
				filteredProducts = filteredProducts.filter(x => x.gender === gender);

				if (availableOnly) {
					filteredProducts = filteredProducts.filter(x => x.count > 0);
				}
				if (category !== noCategoryName) {
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
			}

			const pagesNumber = Math.ceil(filteredProducts.length / itemsPerPage);
			state.pagesNumber = pagesNumber === 0 ? 1 : pagesNumber;
			state.filteredProducts = filteredProducts;
			state.selectedPage = 1;
			state.products = [...state.filteredProducts.slice(0, itemsPerPage)];
		},
		setSelectedPage(state, page) {
			if (page > 0 && page <= state.pagesNumber) {
				state.selectedPage = page;

				const offset = itemsPerPage * (state.selectedPage - 1);
				state.products = [...state.filteredProducts.slice(0 + offset, itemsPerPage + offset)];
			}
		},
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
		},
		loadProduct({ commit }, id) {
			commit('setLoadingState', true);

			getProduct(id).then(product => {
				if (product) {
					commit('setProduct', product);
				}

				commit('setLoadingState', false);
			});
		}
	},
	modules: {}
};
