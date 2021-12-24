import {ADD_TO_CART, CHECKOUT_REQ, CHECKOUT_SUCCESS, CHECKOUT_FAILURE} from '../types'
import shop from '../../api/shop'

const state = {
	items: [], // 每个元素对象：id/count
	checkoutStatus: null
}

const mutations = {
	[ADD_TO_CART](state, {id}){
		const item = state.items.find(item => item.id===id)
		if(item){
			item.count++
		}else{
			state.items.unshift({
				id,
				count: 1
			})
		}
	},

	[CHECKOUT_REQ] (state) {
		state.items = []
		state.checkoutStatus = null
	},

	[CHECKOUT_SUCCESS] (state) {
		state.checkoutStatus = '提交成功'
	},

	[CHECKOUT_FAILURE] (state, {items}) {
		state.items = items
		state.checkoutStatus = '提交失败'
	}
}

const actions = {
	checkout({commit}, cartProducts){
		var items = [...state.items] // state.items
		commit(CHECKOUT_REQ)
		shop.buyProducts(
			cartProducts,
			() => commit(CHECKOUT_SUCCESS),
			() => commit(CHECKOUT_FAILURE, {items})
		)
	}
}

const getters = {
	checkoutStatus(state){
		return state.checkoutStatus
	}
}

export default{
	state,
	mutations,
	actions,
	getters
}