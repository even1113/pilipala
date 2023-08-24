import { defineStore } from 'pinia'
import { getHot, getEpisode, getTypes, getAnimeBydate } from '@/api/anime'
import { getSwiper } from '@/api/swiper'

export const useAnimeStore = defineStore('anime', {
  state: () => ({
    hotAnime: [],
    animeSwiper: [],
    episode: [],
    currentEpisode: [],
    AnimeTypes: [],
    AnimeDate: [],
    favorAnime: [],
    indexAnimes: []
  }),
  getters: {},
  actions: {
    async getAnimeSwiper() {
      const result: any = await getSwiper()
      for (let i = 0; i < result.data.length; i++) {
        ;(this.animeSwiper[i] as any) = result.data[i].slideshow
      }
    },
    async getHotAnime() {
      const result: any = await getHot()
      this.hotAnime = result.data
    },

    // 获取当前番剧的所有集数
    async getDetailEpisode(id: string) {
      const result: any = await getEpisode(id)
      this.episode = result.data
    },

    // 获取当前播放的集数
    getCurrentEpisode(id: string) {
      this.currentEpisode = (this.hotAnime as any).filter((item: any) => {
        return item.id + '' === id
      })
    },
    // 获取番剧类型
    async getAnimeTypes(id: string) {
      const result: any = await getTypes(id)
      if (result.code === 200) {
        this.AnimeTypes = []
        for (let i = 0; i < result.data.length; i++) {
          ;(this.AnimeTypes[i] as any) = result.data[i].type
        }
      }
    },
    // 根据时间获取番剧
    async getAnimeBydate(date: string) {
      const result: any = await getAnimeBydate(date)
      if (result.code === 200) {
        this.AnimeDate = []
        for (let i = 0; i < result.data.length; i++) {
          ;(this.AnimeDate[i] as any) = result.data[i]
        }
      }
    },
    setIndexAnimes(data: any) {
      this.indexAnimes = data
    }
  },
  persist: true
})
