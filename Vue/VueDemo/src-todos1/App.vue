<template>
	<div class="todo-container">
		<div class="todo-wrap">
			<TodoHeader :addTodo="addTodo"/>
			<TodoList :todos="todos" :deleteTodo="deleteTodo"/>
			<todo-footer :todos="todos" :deleteCompletedTodos="deleteCompletedTodos" :selectAllTodos="selectAllTodos"/>
		</div>
	</div>
</template>

<script>
	import TodoHeader from './components/TodoHeader.vue';
	import TodoList from './components/TodoList.vue';
	import TodoFooter from './components/TodoFooter.vue';

	export default{
		data(){
			return{
				// todos:[
				// 	{title: '吃饭', complete: false},
				// 	{title: '睡觉', complete: true},
				// 	{title: 'coding', complete: false}
				// ]

				// 从localStorage读取todos
				todos: JSON.parse(window.localStorage.getItem('todos_key') || '[]')
			}
		},
		methods:{
			addTodo(todo){
				this.todos.unshift(todo);
			},
			deleteTodo(index){
				this.todos.splice(index, 1);
			},
			// 删除所有选中的todo
			deleteCompletedTodos(){
				this.todos = this.todos.filter(todo => !todo.complete)
			},
			// 全选/全不选
			selectAllTodos(isCheck){
				this.todos.forEach(todo => todo.complete = isCheck);
			}
		},
		watch: { // 监视
			todos: {
				deep: true, // 深度监视
				handler: function(value){
					// 将todos最新的值的json数据，保存到localStorage
					window.localStorage.setItem('todos_key', JSON.stringify(value));
				}
			}
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