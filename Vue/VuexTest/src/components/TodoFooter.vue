<template>
	<div class="todo-footer">
		<label>
			<input type="checkbox" v-model="isAllCheck"/>
		</label>
		<span>
			<span>已完成{{completeCount}}</span> / 全部{{totalCount}}
		</span>
		<!-- <button class="btn btn-danger" v-show="completeCount" @click="$store.dispatch('deleteCompletedTodos')">清除已完成任务</button> -->
		<button class="btn btn-danger" v-show="completeCount" @click="deleteCompletedTodos">清除已完成任务</button>
	</div>
</template>

<script>
	import {mapGetters, mapActions} from 'vuex'

	export default{
		computed: {
			...mapGetters(['totalCount', 'completeCount']),
			isAllCheck: {
				get(){
					return this.$store.getters.isAllSelect
				},
				set(value){ // value是当前checkbox最新的值
					this.$store.dispatch('selectAllTodos', value)
				}
			}
		},
		methods: {
			...mapActions(['deleteCompletedTodos'])
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