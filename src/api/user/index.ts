import { http } from '@/utils/http'

// 用户修改个人信息
export const changeInfo = function (params: any) {
  return http.httpRequestPost('/user/updateUser', params)
}

// 获取收藏的番剧列表
export const getUserFavor = function (userId: string) {
  return http.httpRequestGet(`/favorites/favortiesPaging/?userId=${userId}`, {})
}

export const uploadCover = (params: any) => {
  return http.httpRequestPost(`/hdfs/cover`, { params })

  // return request({
  //   url: '/hdfs/cover',
  //   method: 'post',
  //   data: params,
  //   headers: {
  //     'Content-Type': 'multipart/form-data',
  //   },
  // })
}
