/*包含多个由action触发，去直接更新状态的方法的对象*/
import {ADD_TODO, DELETE_TODO, SELECT_ALL_TODOS, DELETE_COMPLETED_TODOS, RECEIVE_TODOS} from './mutation-types.js'

export default{
	[ADD_TODO](state, {todo}){
		state.todos.unshift(todo);
	},
	[DELETE_TODO](state, {index}){
		state.todos.splice(index, 1);
	},
	[SELECT_ALL_TODOS](state, {check}){
		state.todos.forEach(todo => todo.complete=check)
	},
	[DELETE_COMPLETED_TODOS](state){
		state.todos = state.todos.filter(todo => !todo.complete)
	},
	[RECEIVE_TODOS](state, todos){
		state.todos = todos
	}
}