<template>
  <div class="classify-wrapper">
      <router-link class="search-btn" tag="div" :to="{name: 'Search'}">
        <van-icon name="search" />
        <div>苹果特价3元1斤</div>
      </router-link>
      <one-tab></one-tab>
      <template v-if="showContent">
        <side-bar></side-bar>
        <goods-list></goods-list>
      </template>
      <van-loading size="1rem" vertical v-else />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import oneTab from '../components/OneTab.vue';
import sideBar from '../components/SideBar.vue';
import goodsList from '../components/GoodsList.vue';

export default {
  computed: {
    ...mapState({
      showContent: (state) => state.showContent,
    }),
  },
  components: {
    oneTab,
    sideBar,
    goodsList,
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
