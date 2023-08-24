import { http } from '@/utils/http'

// 获取番剧热播榜
export const getHot = function () {
  return http.httpRequestGet('/anime/selectByGrade?amount=6', {})
}

// 获取番剧集数
export const getEpisode = function (params: string) {
  return http.httpRequestGet(`/episode/getAll?animeId=${params}`, {})
}

// 根据id 获取番剧类型
export const getTypes = function (params: string) {
  return http.httpRequestGet(`/typeAnime/getType?id=${params}`, {})
}

// 根据时间 获取番剧
export const getAnimeBydate = function (params: string) {
  return http.httpRequestGet(`/anime/selectByTurnoverTime?time=${params}`, {})
}

// 收藏番剧
export const getFavorAnime = function (userId: string, animeId: string) {
  return http.httpRequestGet(`/favorites/insertAnime?userId=${userId}&animeId=${animeId}`, {})
}

// 获取所有番剧
export const getAllAnime = function () {
  return http.httpRequestGet('/anime/selectAll', {})
}

// 根据评分获取所有番剧
export const getGradeAnime = function () {
  return http.httpRequestGet('/anime/selectByGrade?amount=100', {})
}
// 根据播放数量
export const getBroadAnime = function () {
  return http.httpRequestGet('/anime/selectByBroad?amount=100', {})
}

// 根据类型获取所有番剧
export const getTypeAnime = function (id: string) {
  return http.httpRequestGet(`/typeAnime/sameKind?id=${id}`, {})
}

// 根据年份获取番剧
export const getAnimeByYear = function (year: string) {
  return http.httpRequestGet(`/anime/selectByYear?time=${year}`, {})
}
