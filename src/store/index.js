import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 引入小仓库
import login from './login'
// 后台管理 vuex使用的注释见./back/user
import backuser from './back/user'
import backseat from './back/seat'
import backcontainer from './back/container'
import backimage from './back/image'
// 前台显示
import frontcontainer from './front/container'
import frontseat from './front/seat'
import fronttest from './front/test'
// 
export default new Vuex.Store({
    modules: {
        login,
        // 后台管理
        backuser,
        backseat,
        backcontainer,
        backimage,
        // 前台显示
        frontcontainer,
        frontseat,
        fronttest,
    }
})