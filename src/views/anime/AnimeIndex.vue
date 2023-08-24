<template>
  <div class="index-anime">
    <div class="anime-container">
      <h2>{{ route.query.params }}</h2>
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
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAnimeStore } from '@/stores/anime'

const route = useRoute()
const router = useRouter()
const animes = ref([])
const animeStore = useAnimeStore()
animes.value = animeStore.indexAnimes

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
.index-anime {
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
