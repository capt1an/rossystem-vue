import request from '@/utils/request'

export function getdata(data) {
  return request({
    url: '/api/ros/getdata',
    method: 'get',
    data
  })
}