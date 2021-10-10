<template>
  <div>
    <van-tabbar route fixed>
      <van-tabbar-item icon="home-o" :to="{name: 'Home'}">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" :to="{name: 'Classify'}">分类</van-tabbar-item>
      <van-tabbar-item
       icon="cart-o"
       :to="{name: 'Shopping'}"
       :badge="badge"
       >购物车</van-tabbar-item>
      <van-tabbar-item icon="user-circle-o" :to="{name: 'User'}">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      counterMap: (state) => state.counterMap,
    }),
    badge() {
      const count = Object.values(this.counterMap).reduce((prev, next) => prev + next, 0);
      if (count > 99) {
        return '99+';
      }
      if (count === 0) {
        return null;
      }
      return count;
    },
  },
};
</script>
