<template>
	<div>
		<header class="jumbotron">
			<div class="container">
				<div class="row">
  					<div class="col-md-12">
  						<h1>请发表对Vue的评论</h1>
  					</div>
  				</div>
			</div>
		</header>

		<div class="container">
			<div class="row">
				<Add/>
				<List :comments="comments"/>
			</div>
		</div>
	</div>
</template>

<script>
	import Add from './components/Add.vue'
	import List from './components/List.vue'

	export default{
		data(){
			return{
				comments: [
					{
						name: 'Bob',
						content: 'Vue还不错~'
					},
					{
						name: 'Kate',
						content: 'Vue So Easy!'
					},
					{
						name: 'Ann',
						content: 'Vue有点难……'
					}
				]
			}
		},
		components: {
			Add,
			List
		}
	}
</script>

<style>
	
</style>