/*入口JS：创建Vue实例*/
import Vue from 'vue'
import App from './App.vue'

new Vue({
	el: '#app',
	components: {
		App
	},
	template: '<App/>'
})