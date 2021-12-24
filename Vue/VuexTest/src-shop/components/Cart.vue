<template>
	<div>
		<h2>Your Cart</h2>
		<ul>
			<li v-for="item in products">
				{{item.title}}--${{item.price}}x{{item.count}}
			</li>
		</ul>
		<p>Total: {{totalPrice}}</p>
		<p>
			<button @click="checkout(products)" :disabled="products.length===0">checkout</button>
		</p>
		<p v-show="checkoutStatus">checkout {{checkoutStatus}}</p>
	</div>
</template>

<script>
	import {mapGetters, mapActions} from 'vuex'

	export default{
		computed: {
			...mapGetters({
				products: 'cartProduts',
				checkoutStatus: 'checkoutStatus'
			}),
			totalPrice () {
				return this.products.reduce((prePrice, item) => {
					return prePrice + item.price * item.count
				}, 0)
			}
		},
		methods: mapActions(['checkout'])
	}
</script>

<style>
	
</style>