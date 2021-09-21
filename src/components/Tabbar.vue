<template>
  <div>
    <van-tabbar route fixed>
      <van-tabbar-item icon="home-o" :to="{name: 'Home'}">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" :to="{name: 'Classify'}">分类</van-tabbar-item>
      <van-tabbar-item icon="cart-o" :to="{name: 'Shopping'}">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-circle-o" :to="{name: 'User'}">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {};
</script>
