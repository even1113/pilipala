<template>
  <div class="anime_collect">
    <div class="head_item">
      <!--标题-->
      <div class="icon">
        <el-icon size="30" color="#FCBB7A">
          <StarFilled />
        </el-icon>
      </div>
      <p>收藏</p>
      <el-button v-show="animes.length > 5" @click="toAnime(userId)">查看全部 ></el-button>
    </div>

    <!-- 收藏列表 -->
    <div class="collect_item">
      <el-empty description="暂无收藏，请登录" v-if="collectVisible" />

      <template v-else>
        <div
          class="item"
          v-for="item in animes"
          :key="(item as any).id"
          @click="intoVedio((item as any).id)"
        >
          <img :src="(item as any).cover" alt="" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getUserFavor } from '@/api/user'

const router = useRouter()

// 获取用户收藏番剧
const collectVisible = ref(true)
const animes = ref([])
const userId = localStorage.getItem('userId')
if (userId) {
  collectVisible.value = false
  getUserFavorAnimes(userId)
}

function getUserFavorAnimes(userId: string) {
  getUserFavor(userId).then((res: any) => {
    if (res.code === 200) {
      for (let i = 0; i < res.data.length; i++) {
        ;(animes as any).value[i] = res.data[i]
      }
    }
  })
}
// 点击番剧进行跳转
const intoVedio = (id: number) => {
  router.push({
    path: '/vedio',
    query: {
      id: id
    }
  })
}
// 点击查看全部跳转到展示列表
const toAnime = (userId: string) => {
  console.log(userId, typeof userId)
  router.push({
    path: '/anime',
    query: {
      userId: userId
    }
  })
}
</script>

<style lang="scss" scoped>
.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.anime_collect {
  height: 250px;
  margin-top: 70px;
  padding: 0 50px 0 50px;

  .head_item {
    width: 100%;
    height: 50px;

    .icon {
      float: left;
      margin-right: 5px;
    }

    p {
      float: left;
      font-weight: 600;
      font-size: 24px;
    }

    button {
      float: right;
    }
  }

  .collect_item {
    height: 200px;
    display: flex;
    justify-content: space-around;
    cursor: pointer;
    img {
      border-radius: 6px;
      width: 150px;
    }
  }
}
</style>
