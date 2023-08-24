<template>
  <div class="anime_index">
    <div class="anime_item">
      <div class="title_item">
        <h3>番剧索引</h3>
      </div>
      <div class="index_item">
        <el-space wrap
          ><el-button
            v-for="button in anime_index_buttons"
            :key="button.text"
            link
            @click="linkToAnime(button.text)"
            >{{ button.text }}</el-button
          ></el-space
        >
      </div>
    </div>

    <div class="anime_item">
      <div class="title_item">
        <h3>风格类型</h3>
      </div>
      <div class="index_item">
        <el-space wrap
          ><el-button
            v-for="button in type_index_buttons"
            :key="button.text"
            link
            @click="linkToAnime(button.text)"
            >{{ button.text }}</el-button
          ></el-space
        >
      </div>
    </div>

    <div class="anime_item">
      <div class="title_item">
        <h3>首播时间</h3>
      </div>
      <div class="index_item">
        <el-space wrap
          ><el-button
            v-for="button in date_index_buttons"
            :key="button.text"
            link
            @click="linkToAnime(button.text)"
            >{{ button.text }}</el-button
          ></el-space
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { getTypeAnime, getGradeAnime, getBroadAnime, getAnimeByYear } from '@/api/anime'
import { useAnimeStore } from '@/stores/anime'

const router = useRouter()
const animeStore = useAnimeStore()
const anime_index_buttons = [{ text: '最高评分' }, { text: '播放数量' }] as const

const type_index_buttons = [
  { text: '热血' },
  { text: '青春' },
  { text: '搞笑' },
  { text: '奇幻' },
  { text: '悬疑' },
  { text: '治愈' }
] as const

const date_index_buttons = [
  { text: '2023' },
  { text: '2022' },
  { text: '2021' },
  { text: '2020' }
] as const
const types = {
  1: '热血',
  2: '青春',
  3: '搞笑',
  4: '奇幻',
  5: '悬疑',
  6: '治愈'
}
const years = ['2023', '2022', '2021', '2020']
// 点击
const linkToAnime = (params: string) => {
  if (params === '最高评分') {
    getGradeAnime().then((res: any) => {
      console.log('最高评分', res)
      if (res) {
        animeStore.setIndexAnimes(res.data)
      }
    })
  }

  if (params === '播放数量') {
    getBroadAnime().then((res: any) => {
      console.log('播放数量', res)
      if (res) {
        animeStore.setIndexAnimes(res.data)
      }
    })
  }

  if (Object.values(types).includes(params)) {
    let result: any = Object.entries(types).find(([, val]) => val === params)
    result = result[0]
    console.log(result[0])
    getTypeAnime(result).then((res: any) => {
      console.log('类型', result, res)
      if (res) {
        animeStore.setIndexAnimes(res.data)
      }
    })
  }

  if (years.includes(params)) {
    getAnimeByYear(params).then((res: any) => {
      console.log('年份', res)
      if (res) {
        animeStore.setIndexAnimes(res.data)
      }
    })
  }

  // 跳转
  router.push({
    path: '/index',
    query: {
      params: params
    }
  })
}
</script>

<style lang="scss" scoped>
.anime_index {
  height: 120px;
  margin-top: 60px;
  display: flex;
  justify-content: space-around;
  padding: 0 50px 0 50px;

  .anime_item {
    box-sizing: border-box;
    width: 340px;
    height: 100%;
    border-radius: 8px;
    //background-color: blue;

    .title_item {
      //background-color: red;
      padding-left: 20px;
      padding-top: 15px;
    }

    .index_item {
      //display: flex;
      box-sizing: border-box;
      width: 210px;
      margin: 20px 0 20px 20px;

      /* &:nth-child(1) {
                background-color: red;
            } */
    }

    &:nth-child(1) {
      background-color: #fff4fe;
    }

    &:nth-child(2) {
      background-color: #f2fdf7;
    }

    &:nth-child(3) {
      background-color: #f2f9ff;
    }

    &:nth-child(4) {
      background-color: #fff2f2;
    }
  }
}
</style>
