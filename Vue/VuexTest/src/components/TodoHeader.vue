<template>
	<div class="todo-header">
		<input type="text" placeholder="请输入你的任务名称，按回车键确认" v-model="title" @keyup.enter="addItem"/>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				title: '' // 组件内部使用的状态，不存在共享的问题，所以不需要使用vuex管理它
			}
		},
		methods: {
			addItem(){
				// 1、检查输入的合法性
				const title = this.title.trim();
				if(!title){
					alert('必须输入');
					return;
				}
				// 2、根据输入生成一个todo对象
				const todo = {
					title,
					complete: false
				}
				// 3、添加到todos
				this.$store.dispatch('addTodo', todo);
				// 4、清除输入
				this.title = '';
			}
		}
	}
</script>

<style>
	.todo-header input {
		width: 560px;
		height: 28px;
		font-size: 14px;
		border: 1px solid #ccc;
		border-radius: 4px;
		padding: 4px 7px;
	}

	.todo-header input:focus {
		outline: none;
		border-color: rgba(82, 168, 236, 0.8);
		box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
	}
</style>