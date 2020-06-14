import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import MiniResetCss from 'minireset.css';

import home from './components/home';
import watch from './components/watch';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(MiniResetCss);

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			components: { default: home },
			name: 'Home',
		},
		{
			path: '/watch/',
			components: { default: watch },
			name: 'Watch',
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
