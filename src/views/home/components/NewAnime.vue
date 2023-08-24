<template>
  <div class="new-anime">
    <div class="new-anime-head">
      <div class="icon">
        <el-icon size="30" color="blue"><AlarmClock /></el-icon>
      </div>
      <p class="head-p">新番时间表</p>
      <el-button @click="router.push('/total')">查看全部 ></el-button>
    </div>

    <!-- tab标签页 -->
    <el-tabs
      v-bind:tab-position="tabPosition"
      v-model="activeName"
      class="new-anime-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane label="周一" name="first">
        <div class="tabs-item">
          <div
            class="item"
            v-for="item in AnimeDate"
            :key="(item as any).id"
            @click="intoVedio((item as any).id)"
          >
            <img :src="(item as any).cover" alt="图片" />
            <span class="name">{{ (item as any).animeName }}</span>
            <span class="episodes">{{ (item as any).introduction }}</span>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="周二" name="second">
        <div class="tabs-item">
          <div
            class="item"
            v-for="item in AnimeDate"
            :key="(item as any).id"
            @click="intoVedio((item as any).id)"
          >
            <img :src="(item as any).cover" alt="图片" />
            <span class="name">{{ (item as any).animeName }}</span>
            <span class="episodes">{{ (item as any).introduction }}</span>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="周三" name="third">
        <div class="tabs-item">
          <div
            class="item"
            v-for="item in AnimeDate"
            :key="(item as any).id"
            @click="intoVedio((item as any).id)"
          >
            <img :src="(item as any).cover" alt="图片" />
            <span class="name">{{ (item as any).animeName }}</span>
            <span class="episodes">{{ (item as any).introduction }}</span>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="周四" name="fourth">
        <div class="tabs-item">
          <div
            class="item"
            v-for="item in AnimeDate"
            :key="(item as any).id"
            @click="intoVedio((item as any).id)"
          >
            <img :src="(item as any).cover" alt="图片" />
            <span class="name">{{ (item as any).animeName }}</span>
            <span class="episodes">{{ (item as any).introduction }}</span>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="周五" name="fifth">
        <div class="tabs-item">
          <div
            class="item"
            v-for="item in AnimeDate"
            :key="(item as any).id"
            @click="intoVedio((item as any).id)"
          >
            <img :src="(item as any).cover" alt="图片" />
            <span class="name">{{ (item as any).animeName }}</span>
            <span class="episodes">{{ (item as any).introduction }}</span>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="周六" name="sixth">
        <div class="tabs-item">
          <div
            class="item"
            v-for="item in AnimeDate"
            :key="(item as any).id"
            @click="intoVedio((item as any).id)"
          >
            <img :src="(item as any).cover" alt="图片" />
            <span class="name">{{ (item as any).animeName }}</span>
            <span class="episodes">{{ (item as any).introduction }}</span>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="周日" name="seventh">
        <div class="tabs-item">
          <div
            class="item"
            v-for="item in AnimeDate"
            :key="(item as any).id"
            @click="intoVedio((item as any).id)"
          >
            <img :src="(item as any).cover" alt="图片" />
            <span class="name">{{ (item as any).animeName }}</span>
            <span class="episodes">{{ (item as any).introduction }}</span>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { toRaw } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import { ref } from 'vue'
import { useAnimeStore } from '@/stores/anime'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const activeName = ref('first')
const tabPosition = 'left'
const animeStore = useAnimeStore()
const router = useRouter()
animeStore.getAnimeBydate('周一')

const handleClick = (tab: TabsPaneContext) => {
  const date = toRaw(tab).props.label
  animeStore.getAnimeBydate(date)
}

const { AnimeDate } = storeToRefs(animeStore)

// 点击跳转
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
.new-anime {
  padding: 0 50px 0 50px;
  margin-top: 60px;
  .new-anime-head {
    width: 100%;
    height: 50px;
    .icon {
      float: left;
      margin-right: 5px;
    }
    .head-p {
      float: left;
      font-weight: 600;
      font-size: 24px;
    }
    button {
      float: right;
    }
  }

  .tabs-item {
    display: flex;
    margin-left: 10px;
    .item {
      width: 180px;
      height: 280px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-right: 20px;
      cursor: pointer;
      img {
        width: 160px;
        margin-top: 10px;
        border-radius: 10px;
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
</style>
