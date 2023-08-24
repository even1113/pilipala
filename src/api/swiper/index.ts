import { http } from '@/utils/http'

// 获取轮播图数据
export const getSwiper = function () {
  return http.httpRequestGet('/anime/slideshow?amount=4', {})
}

// 搜索框功能
export const getSearchAnime = function (params: string) {
  return http.httpRequestGet(`/anime/selectByName?name=${params}`, {})
}
