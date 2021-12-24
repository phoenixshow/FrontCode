import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import cart from './modules/cart'
import products from './modules/products'

Vue.use(Vuex)

export default new Vuex.Store({
	actions,
	getters,
	modules: {
		cart,
		products
	}
})