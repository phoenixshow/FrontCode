<template>
	<div>
		<ul>
			<li v-for="message in messages" :key="message.id">
				<router-link :to="`/home/message/detail/${message.id}`">{{message.title}}</router-link>
			</li>
		</ul>

		<hr>
		<router-view></router-view>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				messages: []
			}
		},
		mounted(){
			// 模拟ajax请求从后台获取数据
			setTimeout(() => {
				const messages = [
					{
						id: 1,
						title: 'message001'
					},
					{
						id: 3,
						title: 'message003'
					},
					{
						id: 5,
						title: 'message005'
					}
				]
				this.messages = messages;
			}, 1000)
		}
	}
</script>

<style>
	
</style>