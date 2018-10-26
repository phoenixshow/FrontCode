<template>
	<div>
		<ul>
			<li v-for="message in messages" :key="message.id">
				<router-link :to="`/home/message/detail/${message.id}`">{{message.title}}</router-link>
				<button @click="pushShow(message.id)">push查看</button>
				<button @click="replaceShow(message.id)">replace查看</button>
			</li>
		</ul>
		<button @click="$router.back()">回退</button>
		<hr>
		<router-view></router-view>
	</div>
</template>

<script>
	export default{
		data(){
			return {
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
		},
		methods: {
			pushShow(id){
				this.$router.push(`/home/message/detail/${id}`)
			},
			replaceShow(id){
				this.$router.replace(`/home/message/detail/${id}`)
			}
		}
	}
</script>

<style>
	
</style>