<template>
  <div class="side-bar-warpper" ref="side">
      <div
      v-for="(item, i) in sideList"
      :key="item"
      :class="{active: index === i}"
      @touchend="scrollTo(i, $event)"
      @touchstart="move = false"
      @touchmove="move = true"
      >{{ i == 0 ? '全部' : item }}</div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import tool from '../util/tool';

export default {
  data() {
    return {
      index: 0,
      move: false,
    };
  },
  computed: {
    ...mapState({
      sideList: (start) => start.sideList,
    }),
  },
  methods: {
    ...mapActions(['getGoodsList']),
    ...mapMutations(['resetGoodsList']),
    scrollTo(i, e) {
      if (this.move) {
        return;
      }
      this.index = i;
      // 获取移动距离
      const { side } = this.$refs;
      const sTop = e.target.getBoundingClientRect().top;
      const sHeight = e.target.offsetHeight;
      const pTop = side.getBoundingClientRect().top;
      const pHeight = side.offsetHeight;
      tool.moveTo(side.scrollTop, sTop + sHeight - pTop - pHeight, side, 'scrollTop');
      // 获取商品列表 列表页
      this.resetGoodsList();
      this.getGoodsList({ type: this.sideList[i], page: 1, sortType: 'all' });
    },
  },
  // mounted() { // 刚进入页面时 获取一下goodsList 不能在这里获取 容易出现 重复请求数据 在父组件中 watch监听 showContent 在获取数据
  //   this.resetGoodsList();
  //   this.getGoodsList({ type: this.sideList[0], page: 1, sortType: 'all' });
  // },
};
</script>

<style lang="less" scoped>
.side-bar-warpper {
    position: fixed;
    left: 0;
    top: 135px;
    bottom: 50px;
    width: 79px;
    overflow: auto;
    background: #f8f8f8;
    div {
        width: 79px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        position: relative;
    }
    .active {
        font-weight: bold;
        color: #ff1a90;
        &::before {
        content: "";
        position: absolute;
        width: 6px;
        height: 18px;
        background-color: #ff1a90;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
    }
    }
&::-webkit-scrollbar {
    width: 0;
    background: none;
}
}
</style>
