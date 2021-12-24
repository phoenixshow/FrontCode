export default {
	cartProduts (state) {
		return state.cart.items.map(({id, count}) => {
			var p = state.products.products.find(p => p.id === id)
			return {
				id,
				count,
				title: p.title,
				price: p.price
			}
		})
	}
}