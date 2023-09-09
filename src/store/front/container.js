import { reqFrontGetcontainerList, reqFrontSetRead, reqFrontAllSetRead } from '@/api'



const state = {
    front_container_list: [], // 容器列表
}

const mutations = {
    // 获取容器列表
    FRONTGETcontainerLIST(state, result) {
        state.front_container_list = result.data
    },
}

const actions = {
    // 获取容器列表
    async frontGetcontainerList({ commit }, user = {}) {
        let result = await reqFrontGetcontainerList(user)
        result = result.data
        // console.log(result)
        if (result.status === 0) {
            commit('FRONTGETcontainerLIST', result)
            return result.msg || 'ok'
        } else {
            return Promise.reject(new Error(result.msg || 'fail'))
        }
    },
    // 设置容器状态为已读
    async frontSetRead({ commit }, info = {}) {//eslint-disable-line no-unused-vars
        let result = await reqFrontSetRead(info)
        result = result.data
        // console.log(result)
        if (result.status === 0) {
            return result.msg || 'ok'
        } else {
            return Promise.reject(new Error(result.msg || 'fail'))
        }
    },
    // 设置该用户的所有容器为已读
    async frontAllSetRead({ commit }, user = {}) {//eslint-disable-line no-unused-vars
        let result = await reqFrontAllSetRead(user)
        result = result.data
        // console.log(result)
        if (result.status === 0) {
            return result.msg || 'ok'
        } else {
            return Promise.reject(new Error(result.msg || 'fail'))
        }
    },
}

const getters = {
    front_container_list(state) {
        return state.front_container_list || []
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}