<template>
	<div>
		<h2>Home组件</h2>
		<div>
			<ul class="nav nav-tabs">
				<li class="active">
					<router-link to="/home/news">News</router-link>
				</li>
				<li>
					<router-link to="/home/message">Message</router-link>
				</li>
			</ul>

			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	export default{
		
	}
</script>

<style>
	
</style>