<template>
	<div class="todo-container">
		<div class="todo-wrap">
			<TodoHeader/>
			<TodoList/>
			<todo-footer/>
		</div>
	</div>
</template>

<script>
	import TodoHeader from './components/TodoHeader.vue';
	import TodoList from './components/TodoList.vue';
	import TodoFooter from './components/TodoFooter.vue';

	export default{
		mounted(){
			// 发送命令给action：异步获取保存的todos数据并显示
			this.$store.dispatch('reqTodos')
		},
		components: {
			TodoHeader,
			TodoList,
			TodoFooter
		}
	}
</script>

<style>
	.todo-container {
		width: 600px;
		margin: 0 auto;
	}
	.todo-container .todo-wrap {
		padding: 10px;
		border: 1px solid #ddd;
		border-radius: 5px;
	}
</style>