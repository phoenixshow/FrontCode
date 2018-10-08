<template>
	<div class="todo-footer">
		<label>
			<input type="checkbox" v-model="isAllCheck"/>
		</label>
		<span>
			<span>已完成{{completeSize}}</span> / 全部{{todos.length}}
		</span>
		<button class="btn btn-danger" v-show="completeSize" @click="deleteCompletedTodos">清除已完成任务</button>
	</div>
</template>

<script>
	export default{
		props: {
			todos: Array,
			deleteCompletedTodos: Function,
			selectAllTodos: Function
		},
		computed: {
			completeSize(){
				return this.todos.reduce((preTotal, todo) => preTotal + (todo.complete ? 1 : 0), 0);
			},
			isAllCheck: {
				get(){
					return this.completeSize===this.todos.length && this.completeSize > 0;
				},
				set(value){ // value是当前checkbox最新的值
					this.selectAllTodos(value);
				}
			}
		}
	}
</script>

<style>
	.todo-footer {
		height: 40px;
		line-height: 40px;
		padding-left: 6px;
		margin-top: 5px;
	}

	.todo-footer label {
		display: inline-block;
		margin-right: 20px;
		cursor: pointer;
	}

	.todo-footer label input {
		position: relative;
		top: -1px;
		vertical-align: middle;
		margin-right: 5px;
	}

	.todo-footer button {
		float: right;
		margin-top: 5px;
	}
</style>