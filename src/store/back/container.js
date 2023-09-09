import { reqAddcontainer, reqStartcontainer, reqGetcontainerList, reqDelcontainer } from '@/api'



const state = {
    containerlist: [], // 容器列表
    container_count: 0, // 容器数量
}

const mutations = {
    // 获取容器列表
    GETCONTAINERLIST(state, result) {
        state.containerlist = result.data
        state.container_count = result.container_count
    },
}

const actions = {
    // 发布容器
    async addcontainer({ commit }, container) {//eslint-disable-line no-unused-vars
        let result = await reqAddcontainer(container)
        result = result.data
        console.log(result)
        if (result.code === 0) {
            return result.msg || 'ok'
        } else {
            return Promise.reject(new Error(result.msg || 'fail'))
        }
    },

    // 启动容器
    async startcontainer({ commit }, container) {//eslint-disable-line no-unused-vars
        let result = await reqStartcontainer(container)
        result = result.data
        console.log(result)
        if (result.code === 0) {
            return result.msg || 'ok'
        } else {
            return Promise.reject(new Error(result.msg || 'fail'))
        }
    },
    // 获取容器列表
    async getcontainerList({ commit }, info) {
        let result = await reqGetcontainerList(info)
        result = result.data
        console.log(result)
        if (result.code === 0) {
            commit('GETCONTAINERLIST', result)
            return result.msg || 'ok'
        } else {
            return Promise.reject(new Error(result.msg || 'fail'))
        }
    },
    // 删除容器
    async delcontainer({ commit }, container_id) {//eslint-disable-line no-unused-vars
        let result = await reqDelcontainer(container_id)
        result = result.data
        console.log(result)
        if (result.code === 0) {
            return result.msg || 'ok'
        } else {
            return Promise.reject(new Error(result.msg || 'fail'))
        }
    },
}

const getters = {
    containerlist(state) {
        return state.containerlist || []
    },
    container_count(state) {
        return state.container_count || 0
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}