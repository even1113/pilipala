<template>
  <div class="play-page">
    <CommonHeader></CommonHeader>
    <div class="play-center">
      <!-- 视频 -->
      <div class="video-box">
        <video controls>
          <source :src="vedio" type="video/mp4" />
        </video>
      </div>

      <!-- 详情 -->
      <div class="anime-detail">
        <div class="detail">
          <div class="detail-left">
            <img :src="(newCurrentEpisode as any)?.cover" alt="" />
          </div>
          <div class="detail-right">
            <div class="title">
              <p>{{ (newCurrentEpisode as any)?.animeName }}</p>
              <el-row class="mb-4">
                <el-button type="primary" plain @click="favorite(animeId)">收藏</el-button>
              </el-row>
            </div>
            <div class="types">
              <template v-for="item in AnimeTypes" :key="item">
                <p>{{ item }}</p>
              </template>
              <p>已完结 总集数：{{ (newCurrentEpisode as any)?.totalEpisodes }}</p>
            </div>
            <p class="describes">简介：{{ (newCurrentEpisode as any)?.describes }}</p>
            <div class="score">
              <p>{{ (newCurrentEpisode as any)?.grade }} 分</p>
              <div class="demo-rate-block">
                <el-rate v-model="value1" />
              </div>
            </div>
          </div>
        </div>

        <!-- 集数 -->
        <div class="anthology">
          <span>正片（{{ nowEpisode }}/{{ episode.length }}）</span>
          <div class="anthology-box">
            <template v-for="item in episode.length" :key="item.id">
              <button @click="btnClick(item)">{{ item }}</button>
            </template>
          </div>
        </div>
      </div>
    </div>
    <CommonFooter></CommonFooter>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CommonHeader from '@/components/Header/CommonHeader.vue'
import CommonFooter from '@/components/Footer/CommonFooter.vue'
import { useRoute } from 'vue-router'
import { useAnimeStore } from '@/stores/anime'
import { storeToRefs } from 'pinia'
import { getFavorAnime } from '@/api/anime'

const route = useRoute()
const AnimeStore = useAnimeStore()
const value1 = ref(1)

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const animeId: string = route.query.id
AnimeStore.getDetailEpisode(animeId)

// 获取当前番剧的详情信息
AnimeStore.getCurrentEpisode(animeId)
AnimeStore.getAnimeTypes(animeId)
const { episode, currentEpisode, AnimeTypes } = storeToRefs(AnimeStore)

// 播放地址
let nowEpisode = ref(1)
let vedio = ref((episode.value[0] as any)?.broadcastAddress)
const btnClick = (id: number) => {
  nowEpisode.value = id
  vedio.value = (episode.value[nowEpisode.value - 1] as any)?.broadcastAddress
  console.log('nowEpisode.value:', nowEpisode.value)
  console.log('vedio:', vedio.value)
}

// 当前番剧
const newCurrentEpisode = currentEpisode.value[0]

// 收藏当前番剧
async function favorite(animeId: string) {
  console.log(animeId)
  const userId = localStorage.getItem('userId')
  if (!userId) {
    ElMessage.error('请先登录！')
    return
  }

  const result: any = await getFavorAnime(userId, animeId)
  console.log(result)
  if (result.code === 200) {
    ElMessage({
      message: '添加收藏成功！',
      type: 'success',
      duration: 1000
    })
  } else if (result.code === 500) {
    ElMessage.error('该番剧已收藏')
  }
}
</script>

<style lang="scss" scoped>
.play-page {
  .play-center {
    .video-box {
      width: 1100px;
      height: 600px;
      margin: 0px auto;
      padding-top: 70px;
      margin-bottom: 30px;
      video {
        width: 1100px;
        height: 600px;
      }
    }
    .anime-detail {
      display: flex;
      margin-bottom: 20px;

      .detail {
        display: flex;
        width: 700px;
        height: 300px;
        margin-left: 210px;
        img {
          margin-left: 30px;
          height: 300px;
          border-radius: 15px;
        }
        .detail-left {
          width: 280px;
          height: 300px;
        }
        .detail-right {
          width: 400px;
          height: 300px;
          p {
            margin-bottom: 15px;
          }
          .title {
            font-size: 30px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .types {
            display: flex;
            justify-content: flex-start;
            font-size: 18px;
            color: #9f9e9e;
            & > p {
              margin-right: 8px;
            }
          }
          .describes {
            font-size: 18px;
            height: 140px;
            width: 400px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 6; /*3表示只显示3行*/
            /* autoprefixer: off */
            -webkit-box-orient: vertical;
          }
          .score {
            font-size: 25px;
            font-weight: bold;
            color: rgb(255, 160, 88);
            display: flex;
            justify-content: space-between;
          }
        }
      }
      .anthology {
        width: 360px;
        height: 300px;
        margin-left: 40px;
        background-color: #f1f2f3;
        border-radius: 10px;
        .anthology-box {
          margin: 20px 20px;

          button {
            width: 50px;
            height: 50px;
            margin: 10px 15px;
            background-color: white;
            border: 2px solid rgb(56, 56, 218);
            border-radius: 10px;
            cursor: pointer;
          }

          button:hover {
            background-color: rgb(56, 56, 218); /* Green */
            color: white;
          }
        }

        span {
          line-height: 3;
          margin-top: 10px;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
