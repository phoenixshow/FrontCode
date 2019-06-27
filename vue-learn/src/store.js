import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 声明数据
const state = {
    count: 1
}

// 改变数据在Mutations中做
const mutations = {
    // 增加
    increment(state){
        state.count++
    },
    // 减少
    decrement(state){
        state.count--
    }
}

// Actions通知Mutations改变数据
const actions = {
    //参数{commit}是解构赋值，commit是一个函数
    increment:({commit}) => {
        //通过commit通知Mutations，参数'increment'对应Mutations中的增加
        commit('increment')
    },
    decrement:({commit}) => {
        commit('decrement')
    }
}

// 导出模块（才能用）
export default new Vuex.Store({
    state, 
    mutations, 
    actions
})