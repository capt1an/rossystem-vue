import request from '@/utils/request'

export function getAllBagName() {
  return request({
    url: '/api/ros/getAllBagName',
    method: 'get',
  })
}

export function viewAllData() {
  return request({
    url: '/api/ros/viewData',
    method: 'get',
  })
}

export function getTopicFromBag(params) {
  console.log(params)
  return request({
    url: '/api/ros/getTopicFromBag',
    method: 'get',
    params
  })
}

export function getDataFromTopic(params) {
  console.log(params)
  return request({
    url: '/api/ros/getDataFromTopic',
    method: 'get',
    params
  })
}


export function queryParamsStruct(params) {
  console.log(params)
  return request({
    url: '/api/ros/queryParamsStruct',
    method: 'get',
    params
  })
}

export function querySearchStruct(params) {
  console.log(params)
  return request({
    url: '/api/ros/querySearchStruct',
    method: 'get',
    params
  })
}
