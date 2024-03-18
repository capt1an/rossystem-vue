import request from '@/utils/request'

export function getdata(data) {
  return request({
    url: '/api/ros/getdata',
    method: 'get',
    data
  })
}

export function rosDataLogin(data) {
  return request({
    url: '/api/ros/login',
    method: 'post',
    data
  })
}
