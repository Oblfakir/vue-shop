import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/components/Layout.vue';
import { checkAuthStatus } from '@/requests';
import store from '../store';

Vue.use(VueRouter);

const routes = [
	{
		path: '/login',
		name: 'login',
		component: () => import('../pages/LoginPage.vue'),
		beforeEnter: (to, from, next) => {
			if (store.state.login.isAuthenticated) {
				router.push('/')
			} else {
				next();
			}
		}
	},
	{
		path: '/',
		component: Layout,
		children: [
			{
				path: '/products',
				name: 'products',
				component: () => import('../pages/ProductsListPage.vue'),
				
			},
			{
				path: '/add-edit-product',
				name: 'add-edit-product',
				component: () => import('../pages/AddEditProductPage.vue')
			},
			{
				path: '/products/:id',
				name: 'product-details',
				component: () => import('../pages/ProductDetailsPage.vue')
			},
			{
				path: '/checkout',
				name: 'checkout',
				component: () => import('../pages/Checkout.vue'),
				beforeEnter: (to, from, next) => {
					if (store.state.login.isAuthenticated) {
						router.push('/')
					} else {
						next();
					}
				}
			},
			{
				path: '/500',
				name: 'error500',
				component: () => import('../pages/Error500Page.vue'),
				beforeEnter: (to, from, next) => {
					if (store.state.has500Error) {
						next();
					} else {
						router.push('/')
					}
				}
			},
			{
				path: '/',
				redirect: '/products'
			},
			{
				path: '*',
				name: 'error404',
				component: () => import('../pages/Error404Page.vue')
			},
		]
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

router.beforeEach((to, from, next) => {
	checkAuthStatus()
		.then(success => {
			store.dispatch('getUser');
			store.commit('setAuthenticatedStatus', success);
		})
		.then(() => next());
});

export default router;
