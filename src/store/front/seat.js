import { reqFrontGetSeatList, reqFrontimageSeat, reqFrontLeaveSeat } from '@/api'



const state = {
    front_seat_list: [], // 座位列表
}

const mutations = {
    // 获取座位列表
    FRONTGETIMAGELIST(state, front_seat_list) {
        state.front_seat_list = front_seat_list
    },
    // 获取预约信息
    FRONTGETimageINFO(state, front_image_info) {
        state.front_image_info = front_image_info
    },
}

const actions = {
    // 获取座位列表
    async frontGetImageList({ commit }) {
        let result = await reqGetimageList()
        result = result.data
        // console.log(result)
        if (result.status === 0) {
            commit('FRONTGETIMAGELIST', result.data)
            return result.msg || 'ok'
        } else {
            return Promise.reject(new Error(result.msg || 'fail'))
        }
    },
    // 预约座位
    async frontimageSeat({ commit }, info) {//eslint-disable-line no-unused-vars
        let result = await reqFrontimageSeat(info)
        result = result.data
        // console.log(result)
        if (result.status === 0) {
            return result.msg || 'ok'
        } else {
            return Promise.reject(new Error(result.msg || 'fail'))
        }
    },
    // 离开座位
    async frontLeaveSeat({ commit }, info) {//eslint-disable-line no-unused-vars
        let result = await reqFrontLeaveSeat(info)
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
    front_seat_list(state) {
        return state.front_seat_list || []
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}