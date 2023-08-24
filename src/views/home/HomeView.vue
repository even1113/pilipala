<template>
  <div class="home">
    <CommonHeader></CommonHeader>
    <SwiperIndexVue></SwiperIndexVue>

    <IndexView></IndexView>
    <CollectView></CollectView>
    <NewAnime></NewAnime>
    <HotView></HotView>
    <CommonFooter></CommonFooter>
  </div>
</template>

<script setup lang="ts">
import CommonFooter from '@/components/Footer/CommonFooter.vue'
import CommonHeader from '@/components/Header/CommonHeader.vue'
import SwiperIndexVue from '@/components/Swiper/SwiperIndex.vue'
import CollectView from '@/views/home/components/CollectView.vue'
import HotView from '@/views/home/components/HotView.vue'
import IndexView from '@/views/home/components/IndexView.vue'
import NewAnime from '@/views/home/components/NewAnime.vue'
</script>

<style lang="scss" scoped></style>
