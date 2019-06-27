import Vue from 'vue'
import VueRouter from 'vue-router'
import pageA from './pages/A.vue'
import pageB from './pages/B.vue'

Vue.use(VueRouter)

const routes = [
    {
        // path: '/pagea',
        path: '/',
        component: pageA
    },
    {
        path: '/pageb',
        component: pageB
    }
]

const router = new VueRouter({
    routes
})

export default router