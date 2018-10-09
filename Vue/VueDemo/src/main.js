import Vue from 'vue'
import App from './App.vue'
import router from './router'

new Vue({ // 配置对象的属性名都是一些确定的名称，不能随便修改
	el: '#app',
	components: {
		App
	},
	template: '<App/>',
	router: router
})