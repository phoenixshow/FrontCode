import {ADD_TO_CART} from './types'

export default {
	addToCart ({commit}, p) {
		if(p.inventory) {
			commit(ADD_TO_CART, {id: p.id})
		}
	}
}