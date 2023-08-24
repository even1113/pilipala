<template>
  <div class="anime">
    <CommonHeader></CommonHeader>

    <h2>当前用户 {{ (userStore.userInfo as any).username }} 的收藏番剧列表</h2>

    <div class="anime-container">
      <h2>全部番剧</h2>
      <div class="anime-item">
        <div
          class="anime-item-container"
          v-for="item in animes"
          :key="(item as any).id"
          @click="intoVedio((item as any).id)"
        >
          <img :src="(item as any).cover" alt="" />
          <span class="name">{{ (item as any).animeName }}</span>
          <span class="episodes">{{ (item as any).introduction }}</span>
        </div>
      </div>
    </div>
  </div>
  <CommonFooter></CommonFooter>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAllAnime } from '@/api/anime'
import CommonHeader from '@/components/Header/CommonHeader.vue'
import CommonFooter from '@/components/Footer/CommonFooter.vue'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const animes = ref([])
const userStore = useUserStore()

function getAnime() {
  getAllAnime().then((res: any) => {
    if (res.code === 200) {
      for (let i = 0; i < res.data.length; i++) {
        ;(animes as any).value[i] = res.data[i]
      }
    }
  })
}

getAnime()
console.log('anime', animes.value)

// 点击番剧进行跳转
const intoVedio = (id: number) => {
  router.push({
    path: '/vedio',
    query: {
      id: id
    }
  })
}
</script>

<style lang="scss" scoped>
.anime {
  margin-bottom: 30px;

  .anime-container {
    margin-top: 30px;
    h2 {
      margin-left: 20px;
    }
    .anime-item {
      width: 80%;
      display: flex;
      flex-wrap: wrap;
      margin: 0 auto;
      .anime-item-container {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin: 20px;
        cursor: pointer;
        img {
          border-radius: 6px;
          width: 200px;
        }
        .name {
          font-size: large;
        }
        .episodes {
          font-size: 16px;
          color: gray;
        }
      }
    }
  }
}
</style>
