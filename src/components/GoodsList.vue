<template>
  <div class="list-wrapper">
    <div class="list-header">
        <div
        :class="{active: type == 'all'}"
        @click="changeType('all')"
        >综合</div>
        <div
        :class="{active: type == 'sale'}"
        @click="changeType('sale')"
        >销量</div>
        <div
        class="price"
        :class="{'price-up': type == 'price-up', 'price-down': type == 'price-down'}"
        @click="changeType('price')"
        >价格</div>
    </div>
    <div class="list-content">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
        >
        <goods-card
        v-for="item in goodsList"
        :key="item.id"
        v-bind="item"
        :num="counterMap[item.id]"
        ></goods-card>
        <div>
        </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import goodsCard from './GoodsCard.vue';

export default {
  data() {
    return {
      type: 'all',
      isLoading: false,
      loading: false,
      finished: false,
      page: 1,
    };
  },
  computed: {
    ...mapState({
      goodsList: (state) => state.goodsList,
      counterMap: (state) => state.counterMap,
    }),
  },
  components: {
    goodsCard,
  },
  methods: {
    ...mapActions(['getGoodsList']),
    ...mapMutations(['resetGoodsList']),
    onRefresh() { // 下拉加载
      this.isLoading = true;
      this.loading = false;
      this.finished = false;
      this.page = 1;
      this.resetGoodsList();
      this.getGoodsList({ page: 1, sortType: this.type }); // 重新请求数据
      this.isLoading = false;
    },
    async onLoad() { // 向上滚动刷新
      this.page += 1;
      this.loading = true;
      const result = await this.getGoodsList({ page: this.page, sortType: this.type }); // 继续请求数据
      if (result) {
        this.loading = false;
      } else {
        this.finished = true;
      }
    },
    changeType(type) {
      if (type === 'all') {
        this.type = 'all';
      } else if (type === 'sale') {
        this.type = 'sale';
      } else if (this.type === 'price-up') {
        this.type = 'price-down';
      } else {
        this.type = 'price-up';
      }
      this.onRefresh(); // 改变类型时 刷新重新请求数据
    },
  },
};
</script>

<style lang="less" scoped>
.list-header {
    width: 296px;
    position: relative;
    top: 0;
    left: 79px;
    box-sizing: border-box;
    padding: 0 8px;
    display: flex;
    justify-content: flex-end;
    > div {
        width: 50px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        color: #cecece;
        position: relative;
    }
    .active, .price-up, .price-down {
      color: #ff1a90;
      font-weight: 600;
    }
    .price::after {
      content: '';
      border: 4px solid transparent;
      border-top-color: #aaa;
      position: absolute;
      right: 0;
      bottom: 4px;
    }
    .price::before {
      content: '';
      border: 4px solid transparent;
      border-bottom-color: #aaa;
      position: absolute;
      right: 0;
      top: 4px;
    }
    .price-up::before {
      border-bottom-color: #ff1a90;
    }
    .price-down::after {
      border-top-color: #ff1a90;
    }
}
.list-content {
  width: 296px;
  position: fixed;
  top: 170px;
  right: 0;
  bottom: 50px;
  overflow: auto;
}
.van-pull-refresh { // 改变 超出部分格式
    overflow: unset!important;
  }
</style>
