import { reqGetimageList, reqDelimage, reqClearTimeoutimage } from '@/api'



const state = {
    imagelist: [], // 预约信息列表
    image_count: 0, // 预约信息数量
}

const mutations = {
    // 获取预约信息列表
    GETIMAGELIST(state, result) {
        state.imagelist = result.data
        state.image_count = result.image_count
    },
}

const actions = {
    // 获取预约信息列表
    async getimageList({ commit }, image) {
        console.log(image)
        let result = await reqGetimageList(image)
        result = result.data
        // console.log(result)
        if (result.code === 0) {
            commit('GETIMAGELIST', result)
            return result.msg || 'ok'
        } else {
            return Promise.reject(new Error(result.msg || 'fail'))
        }
    },
    // 删除超时的预约信息
    async delimage({ commit }, info = {}) {//eslint-disable-line no-unused-vars
        let result = await reqDelimage(info)
        result = result.data
        // console.log(result)
        if (result.status === 0) {
            return result.msg || 'ok'
        } else {
            return Promise.reject(new Error(result.msg || 'fail'))
        }
    },
    // 清空超时的预约记录
    async clearTimeoutimage({commit},_){//eslint-disable-line no-unused-vars
        let result = await reqClearTimeoutimage()
        result = result.data
        console.log(result)
        if (result.status === 0) {
            return result.msg || 'ok'
        } else {
            return Promise.reject(new Error(result.msg || 'fail'))
        } 
    },
}

const getters = {
    imagelist(state) {
        return state.imagelist || []
    },
    image_count(state) {
        return state.image_count || 0
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}