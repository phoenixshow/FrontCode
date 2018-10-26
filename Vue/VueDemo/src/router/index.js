/*
路由器模块
*/
import Vue from 'vue'
import VueRouter from 'vue-router'

import About from '../views/About.vue'
import Home from '../views/Home.vue'
import News from '../views/News.vue'
import Message from '../views/Message.vue'
import MessageDetail from '../views/MessageDetail.vue'

Vue.use(VueRouter)

export default new VueRouter({
	linkActiveClass: 'myactive',
	// n个路由
	routes:[
		{
			path: '/about',
			component: About
		},
		{
			path: '/home',
			component: Home,
			children: [
				{
					// path: '/news', // path最左侧的/永远代表根路由，不对
					path: '/home/news',
					component: News
				},
				{
					path: 'message', // 简化写法
					component: Message,
					children: [
						{
							path: '/home/message/detail/:id',
							component: MessageDetail
						}
					]
				},
				{
					path: "",
					redirect: '/home/news'
				}
			]
		},
		{
			path: '/',
			redirect: '/about'
		}
	]
})