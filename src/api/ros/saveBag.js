import request from '@/utils/request'

export function saveBag(file) {
  return request({
    url: '/api/ros/saveBagFile',
    method: 'post',
    data: file,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function saveBagData(file) {
  return request({
    url: '/api/ros/storeAllBagData',
    method: 'post',
    data: file,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    timeout: 30000 // 设置超时时间为30秒，单位是毫秒
  })
}

