import Vue from 'vue'
import store from './store'
import App from './App.vue'
import {currency} from './currency'

Vue.filter('currency', currency)

new Vue({
	el: '#app',
	store,
	render: h => h(App)
})