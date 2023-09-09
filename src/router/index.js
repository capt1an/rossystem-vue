import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 引入路由
import routes from './routes'
// 引入store仓库
import store from '@/store'



// 先把VueRouter原型对象的push|replace, 保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
// 重写push | replace
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}


// 创建路由实例并传递配置
const router = new VueRouter({
    base: process.env.BASE_URL,
    // 配置路由
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {//eslint-disable-line no-unused-vars
        // 返回的这个y=0, 代表滚动条在最上方
        return { y: 0 }
    },
})

// 路由守卫 全局前置守位
router.beforeEach(async (to, from, next) => {
    let user_id = store.state.login.user_id || null
    let username = store.state.login.userinfo.username || null
    let isLogin = user_id ? true : false
    let readlist = store.state.login.readlist || []//eslint-disable-line no-unused-vars
    let identity = store.state.login.identity || ''//eslint-disable-line no-unused-vars
    if (isLogin) {
        // if (1) {
            console.log("用户id：" + user_id)
            if (to.path.includes('login')) next('/')
            else next()
        // } else {
        //     // 没有用户信息
        //     console.log("try")
        //     try {
        //         // 获取用户信息页面展示
        //         console.log("准备调用 getUserInfo 方法");
        //         await store.dispatch('getUserInfo', { user_id })
        //             .then(res => {//eslint-disable-line no-unused-vars
        //                 console.log("getUserInfo 方法调用成功");
        //                 next()
        //             })
        //             .catch(async err => {//eslint-disable-line no-unused-vars
        //                 // 登录信息失效了,重新登录
        //                 console.error("获取用户信息时出现错误：", err);
        //                 await store.dispatch('userLogout')
        //                 next('/login')
        //             })
        //     } catch (e) {
        //         // 登录信息失效了,重新登录
        //         await store.dispatch('userLogout')
        //         next('/login')
        //     }
        // }
    } else {
        if (to.path === '/login') next()
        else next('/login')
    }
})


// 对外暴露
export default router