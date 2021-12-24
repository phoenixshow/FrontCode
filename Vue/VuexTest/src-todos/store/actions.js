/*包含多个接收组件的通知，触发mutation调用，间接更新状态的方法的对象*/
import {ADD_TODO, DELETE_TODO, SELECT_ALL_TODOS, DELETE_COMPLETED_TODOS, RECEIVE_TODOS} from './mutation-types.js'
import StorageUtil from '../util/StorageUtil.js'

export default{
	// 添加todo
	addTodo({commit}, todo){
		// 提交对mutation的请求
		commit(ADD_TODO, {todo})
	},
	// 删除todo
	deleteTodo({commit}, index){
		commit(DELETE_TODO, {index})
	},
	// 全选或全不选
	selectAllTodos({commit}, check){
		commit(SELECT_ALL_TODOS, {check})
	},
	// 删除全部选中的
	deleteCompletedTodos({commit}){
		commit(DELETE_COMPLETED_TODOS)
	},
	// 异步获取todos并更新状态
	reqTodos({commit}){
		// 模拟异步请求
		setTimeout(() => {
			// 读取数据
			const todos = StorageUtil.readTodos();
			// 提交mutation
			commit(RECEIVE_TODOS, todos);
		}, 1000)
	}
}