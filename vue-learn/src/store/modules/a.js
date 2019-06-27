const state = {
    money: 1
}

const mutations = {
    add(state){
        state.money++
    },
    reduce(state){
        state.money--
    }
}

const actions = {
    add: ({commit}) => {
        commit('add')
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