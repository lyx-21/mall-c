<template>
  <div class="classify-wrapper">
      <router-link class="search-btn" tag="div" :to="{name: 'Search'}">
        <van-icon name="search" />
        <div>苹果特价3元1斤</div>
      </router-link>
      <one-tab></one-tab>
  </div>
</template>

<script>
import oneTab from '../components/OneTab.vue';

export default {
  components: {
    oneTab,
  },
};
</script>

<style lang="less" scoped>
.classify-wrapper {
  width: 375px;
  .search-btn {
    width: 355px;
    height: 33px;
    line-height: 33px;
    text-align: center;
    background-color: #eee;
    margin: 11px auto 0;
    border-radius: 10px;
    font-size: 14px;
    color: #a1a1a1;
    >* {
      display: inline-block;
      vertical-align: middle;
    }
  }
}
</style>
