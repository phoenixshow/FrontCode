<template>
	<div>
		<p>ID: {{$route.params.id}}</p>
		<ul>
			<li>id: {{messageDetail.id}}</li>
			<li>title: {{messageDetail.title}}</li>
			<li>content: {{messageDetail.content}}</li>
		</ul>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				messageDetail: {}
			}
		},
		mounted(){
			setTimeout(() => {
				const allMessageDetails= [
					{
						id: 1,
						title: 'message001',
						content: 'message content00111....'
					},
					{
						id: 3,
						title: 'message003',
						content: 'message content00333....'
					},
					{
						id: 5,
						title: 'message005',
						content: 'message content00555....'
					}
				]
				this.allMessageDetails = allMessageDetails;
				const id = +this.$route.params.id
				this.messageDetail = allMessageDetails.find(detail => detail.id===id)
			}, 1000)
		},
		watch: {
			$route: function(value){ // 路由路径（params）发生了改变
				const id = +value.params.id
				this.messageDetail = this.allMessageDetails.find(detail => detail.id===id)
			}
		}
	}
</script>

<style>
	
</style>