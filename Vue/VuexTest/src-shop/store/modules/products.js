import shop from '../../api/shop'
import {RECEIVE_PRODUCTS, ADD_TO_CART} from '../types'

const state = {
	products: []
}

const mutations = {
	[RECEIVE_PRODUCTS](state, {products}){
		state.products = products
	},
	[ADD_TO_CART](state, {id}){
		state.products.find(p => p.id===id).inventory--
	}
}

const actions = {
	getProducts({commit}){
		shop.getProducts((products => {
			commit(RECEIVE_PRODUCTS, {products})
		}))
	}
}

const getters = {
	products(state){
		return state.products
	}
}

export default{
	state,
	mutations,
	actions,
	getters
}