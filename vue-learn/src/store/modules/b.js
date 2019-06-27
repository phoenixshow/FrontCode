const state = {
    count: 1
}

const mutations = {
    add(state, param){
        console.log(param)
        state.count += param
    },
    reduce(state){
        state.count--
    }
}

const actions = {
    add: ({commit}, param) => {
        commit('add', param)
    },
    reduce: ({commit}) => {
        commit('reduce')
    }
}

export default {
    //开启命名空间
    namespaced: true,
    state,
    mutations,
    actions
}