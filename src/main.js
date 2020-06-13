import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import MiniResetCss from 'minireset.css';

import main from './components/main';
import vsmp from './components/vsmp';
import process from './components/process';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(MiniResetCss);

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
			name: 'app',
		},
		{
			path: '/process/',
			components: { default: process },
			name: 'process',
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
