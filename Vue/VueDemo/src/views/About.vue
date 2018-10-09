<template>
	<div>
		<h2>About组件</h2>
		<p>接收外部数据：</p>
		<input type="text" v-model="msg"></div>
	</div>
</template>

<script>
	export default{
		props:{
			msg: String
		}
	}
</script>

<style>
	
</style>