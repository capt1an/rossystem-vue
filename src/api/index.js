// 当前整个模块: API进行统一管理
import axios from './axios'

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// 用户登录
export const reqUserLogin = (data) => axios({ url: '/user/login', data, method: 'post' })
// 获取用户基本信息
export const reqGetUserInfo = ({ user_id }) => axios({ url: `/user/getuserinfo/${user_id}`, method: 'get' })
// 修改密码
export const reqUpdatePwd = (data) => axios({ url: '/user/updatepwd', data, method: 'post' })
// 设置邮箱
export const reqSetEmail = (data) => axios({ url: '/user/setemail', data, method: 'post' })
// 发送问题反馈
export const reqSendFeedback = (data) => axios({ url: '/user/sendfeedback', data, method: 'post' })


// 后台管理
// 添加用户
export const reqAddUser = (data) => axios({ url: '/user/add', data, method: 'post' })

// 获取用户列表
export const reqGetUserList = (data) => axios({ url: '/user/list', data, method: 'post' })

// 修改用户信息
export const reqBackUpdateUserInfo = (data) => axios({ url: '/user/edit', data, method: 'post' })

// 删除用户
export const reqDelUser = (data) => axios({ url: '/user/delete', data, method: 'post' })

// 添加座位
export const reqAddSeat = (data) => axios({ url: '/back/seat/addseat', data, method: 'post' })

// 获取座位列表
export const reqGetSeatList = (data) => axios({ url: '/back/seat/getseatlist', data, method: 'post' })

// 修改座位信息
export const reqBackUpdateSeatInfo = (data) => axios({ url: '/back/seat/updateseatinfo', data, method: 'post' })

// 移除座位
export const reqDelSeat = ({ seat_id }) => axios({ url: `/back/seat/delseat/${seat_id}`, method: 'get' })


// 添加容器
export const reqAddcontainer = (data) => axios({ url: '/container/add', data, method: 'post' })

// 启动容器
export const reqStartcontainer = (data) => axios({ url: '/container/start', data, method: 'post' })

// 获取容器列表
export const reqGetcontainerList = (data) => axios({ url: '/container/list', data, method: 'post' })

// 删除容器
export const reqDelcontainer = ( data ) => axios({ url: '/container/delete', data, method: 'post' })

// 关闭容器
export const reqStopcontainer = ( data ) => axios({ url: '/container/stop', data, method: 'post' })

// 获取镜像列表
export const reqGetimageList = (data) => axios({ url: '/image/list', data, method: 'post' })

// 添加实验
export const reqAddimage = (data) => axios({ url: '/image/add', data, method: 'post' })

// 删除镜像
export const reqDelimage = (data) => axios({ url: '/image/delete', data,  method: 'post' })

// 清空超时记录
export const reqClearTimeoutimage = () => axios({ url: '/back/image/delallimage', method: 'get' })

// 请求SSH命令
export const reqSSH = (data) => axios({ url: '/cmd/query', data, method: 'post' })





// 前台显示
// 获取容器列表
export const reqFrontGetcontainerList = ({ user_id }) => axios({ url: `/front/container/getcontainerlist/${user_id}`, method: 'get' })

// 设置阅读状态为已读
export const reqFrontSetRead = ({ user_id, container_id }) => axios({ url: `/front/container/set_read/${user_id}/${container_id}`, method: 'get' })

// 设置该用户的所有容器为已读
export const reqFrontAllSetRead = ({ user_id }) => axios({ url: `/front/container/all_set_read/${user_id}`, method: 'get' })

// 获取座位列表
export const reqFrontGetSeatList = ({ seat_floor }) => axios({ url: `/front/seat/getseatlist/${seat_floor}`, method: 'get' })

// 预约座位
export const reqFrontimageSeat = (data) => axios({ url: '/front/image/imageseat', data, method: 'post' })

// 获取预约信息
export const reqFrontGetimageInfo = ({ user_id }) => axios({ url: `/front/image/getimageinfo/${user_id}`, method: 'get' })

// 离开座位
export const reqFrontLeaveSeat = ({ user_id, seat_id }) => axios({ url: `/front/image/leaveseat/${user_id}/${seat_id}`, method: 'get' })
//添加实验
export const reqAddTest = (data) => axios({ url: '/front/test/addtest', data, method: 'post' })
// 获取实验列表
export const reqGetTestList = (data) => axios({ url: '/front/test/gettestlist', data, method: 'post' })
// 修改实验信息
export const reqUpdateTestInfo = (data) => axios({ url: '/front/test/updatetestinfo', data, method: 'post' })





