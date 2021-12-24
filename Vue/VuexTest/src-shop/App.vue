<template>
	<div>
		<h1>Shopping Cart Example</h1>
		<Products/>
		<hr>
		<Cart/>
	</div>
</template>

<script>
	import Products from './components/Products.vue'
	import Cart from './components/Cart.vue'

	export default{
		components: {
			Products,
			Cart
		}
	}
</script>

<style>
	
</style>