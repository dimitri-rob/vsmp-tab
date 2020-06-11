import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';

import main from './components/main';
import vsmp from './components/vsmp';

Vue.config.productionTip = false;
Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			components: { default: main },
			name: 'Main',
		},
		{
			path: '/app/',
			components: { default: vsmp },
			children: [{ path: ':id', component: vsmp }],
			name: 'app',
		},
		{
			path: '*',
			redirect: '/',
		},
	],
});
let vm = new Vue({
	router,
	render: (h) => h(App),
}).$mount('#app');

export const vueInstance = vm;
