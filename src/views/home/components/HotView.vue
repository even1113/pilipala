<template>
  <div class="hot">
    <div class="head">
      <!--标题-->
      <div class="icon">
        <el-icon size="30" color="#FCBB7A">
          <Sunny />
        </el-icon>
      </div>
      <p class="head-p">番剧热播榜</p>
      <el-button @click="router.push('/total')">查看全部 ></el-button>
    </div>
    <el-carousel indicator-position="none" :autoplay="false" :loop="false">
      <el-carousel-item>
        <div class="anime">
          <div
            class="anime-item"
            v-for="item in hotAnime"
            :key="(item as any).id"
            @click="toDetail((item as any).id)"
          >
            <img :src="(item as any).cover" alt="" />
            <p>{{ (item as any).animeName }}</p>
            <p>{{ (item as any).introduction }}</p>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAnimeStore } from '@/stores/anime'
import { storeToRefs } from 'pinia'

const router = useRouter()
const AnimeStore = useAnimeStore()

// 获取anime
AnimeStore.getHotAnime()

// 获取cover
const { hotAnime } = storeToRefs(AnimeStore)

// 跳转至详情页
const toDetail = (id: number) => {
  router.push({
    path: '/vedio',
    query: {
      id: id
    }
  })
}
</script>

<style lang="scss" scoped>
.hot {
  // background-color: azure;
  height: 350px;
  margin: 60px 0px;
  padding: 0 50px 0 50px;

  .head {
    width: 100%;
    height: 50px;

    .icon {
      float: left;
      margin-right: 5px;
    }
    button {
      float: right;
    }

    .head-p {
      float: left;
      font-weight: 600;
      font-size: 24px;
    }

    .head-button {
      float: right;
    }
  }

  .anime {
    // width: 100%;
    height: 300px;
    display: flex;
    justify-content: space-around;

    img {
      border-radius: 10px;
      width: 200px;
      cursor: pointer;
    }
    p {
      font-size: large;
      padding-top: 5px;
      &:last-child {
        font-size: 16px;
        color: rgb(126, 126, 127);
      }
    }
  }
}
</style>
