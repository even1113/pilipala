<template>
  <div class="swiper">
    <div class="block text-center">
      <el-carousel height="500px">
        <el-carousel-item v-for="item in imgs" :key="item">
          <img :src="item" alt="轮播图" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick } from 'vue'
import { useAnimeStore } from '@/stores/anime'
import { storeToRefs } from 'pinia'

const AnimeStore = useAnimeStore()
const { animeSwiper } = storeToRefs(AnimeStore)
AnimeStore.getAnimeSwiper()
const imgs = animeSwiper.value

async function indicatorToimage() {
  var a = document.querySelectorAll('.el-carousel__button')
  for (let i in imgs) {
    let img = document.createElement('img')
    img.src = imgs[i]
    a[i].appendChild(img)
  }
}

// 不用nextTick获取不到element-plus的button
nextTick(() => {
  indicatorToimage()
})
</script>

<style lang="scss" scoped>
.swiper .el-carousel {
  width: 100%;
  img {
    width: 100%;
    height: 100%;
  }
}
:deep(.el-carousel__indicators) {
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin: 10px 0px;

  .el-carousel__button {
    width: 200px;
    height: 100px;
    border-radius: 10px;
    img {
      width: 100%;
      height: 100%;
      border: 5px solid #fff;
      border-radius: 10px;
    }
  }
}
</style>
