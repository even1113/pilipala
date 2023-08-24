import { defineStore } from 'pinia'
import { getUserFavor } from '@/api/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    userState: 0,
    userId: 0,
    userInfo: {},
    // userName: '',
    favorAnimes: []
  }),
  getters: {},
  actions: {
    setUserState(state: number) {
      this.userState = state
    },
    setUserOtherInfo(userData: any) {
      console.log('userData', userData)
      this.userInfo = userData
    },
    setUserId(userId: number) {
      this.userId = userId
    },
    async getUserFavor(userId: string) {
      const res: any = await getUserFavor(userId)
      if (res.code === 200) {
        for (let i = 0; i < res.data.length; i++) {
          ;(this.favorAnimes[i] as any).value[i] = res.data[i]
        }
      }
    }
  },
  persist: true
})
