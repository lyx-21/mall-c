<template>
  <div class="search-wrapper">
    <div class="search-header">
      <van-icon name="arrow-left" class="arr-left" @click="$router.goBack()" />
      <van-search
        class="search-content"
        v-model="value"
        show-action
        :placeholder="place"
        @search="onSearch"
        @input="input"
        @focus="focus"
      >
        <template #action v-if="showlist">
          <div @touchend="onSearch(value)">搜索</div>
        </template>
        <template #action v-else>
          <van-icon
          name="cart-o"
          id="shop-car"
          class="shop-car"
          :badge="badge"
          @click="$router.push('/main/shopping')"/>
        </template>
      </van-search>
    </div>
    <div class="like-search" v-if="this.likeList.length > 0 && showlist">
      <van-list>
        <van-cell v-for="item in likeList" :key="item" @click="onSearch(item)">
          <template>
            <span class="custom-title" v-html="formatHTML(item)"></span>
          </template>
        </van-cell>
      </van-list>
    </div>
    <div class="goods-list" v-if="!showlist">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有了"
        @load="onLoad"
        :immediate-check="false">
        <goods-card
          v-for="item in goodsList"
          :key="item.id"
          v-bind="item"
          :num="counterMap[item.id]"
        ></goods-card>
      </van-list>
    </div>
    <div class="my-histroy" v-if="this.likeList.length <= 0 && showlist">
      <my-history :searchList="searchList" @search="onSearch"></my-history>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import goodsCard from '../components/GoodsCard.vue';
import myHistory from '../components/History.vue';

export default {
  data() {
    return {
      place: '酒',
      value: this.place,
      likeList: [],
      timer: null,
      loading: false,
      finished: false,
      showlist: true,
      goodsList: [],
      page: 1,
      size: 5,
      total: 0,
      searchList: [],
    };
  },
  components: {
    goodsCard,
    myHistory,
  },
  computed: {
    ...mapState({
      counterMap: (state) => state.counterMap,
    }),
    badge() {
      const count = Object.values(this.counterMap).reduce((prev, next) => prev + next, 0);
      if (count > 99) {
        return '99+';
      }
      return count;
    },
  },
  methods: {
    async onLoad() {
      const value = await this.$api.search(this.value, this.page, this.size);
      this.goodsList = [...this.goodsList, ...value.list];
      this.total = value.total;
      this.loading = false;
      if (this.goodsList.length >= this.total) {
        this.finished = true;
      } else {
        this.page += 1;
      }
    },
    async onSearch(value) {
      if (value) {
        this.value = value;
      } else {
        this.value = this.place;
      }
      const result = this.searchList.find((item) => item.value === this.value); // 看历史记录中是否有记录
      if (result) {
        result.time = new Date().getTime(); // 有记录 更新最新时间
        this.searchList.sort((a, b) => b.time - a.time); // 根据时间 倒序 以便来到最新数据
      } else {
        this.searchList.unshift({ value: this.value, time: new Date().getTime() }); // 没有 将其放入队列中
        if (this.searchList.length >= 11) {
          this.searchList.pop(); // 超过10条记录 ，删除最后一条
        }
      }
      localStorage.setItem('searchList', JSON.stringify(this.searchList)); // 存储到本地
      this.likeList = [];
      this.goodsList = [];
      this.page = 1;
      this.finished = false;
      this.onLoad();
      this.showlist = false;
    },
    // 防抖
    async input() {
      if (this.value === '') {
        this.likeList = [];
        // eslint-disable-next-line no-useless-return
        return;
      }
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      } else {
        this.timer = setTimeout(async () => {
          const value = await this.$api.likeSearch(this.value);
          this.likeList = value.result;
          clearTimeout(this.timer);
          this.timer = null;
        }, 300);
      }
    },
    focus() {
      this.showlist = true;
    },
    formatHTML(item) {
      const reg = new RegExp(this.value, 'g');
      return item.replace(reg, this.value.fontcolor('red'));
    },
  },
  created() {
    this.searchList = JSON.parse(localStorage.getItem('searchList')) || []; // created钩子函数 获取数据
  },
};
</script>

<style lang="less" scoped>
.search-wrapper {
  width: 100%;
  height: 100vh;
  z-index: 10;
  background: #fff;
  .search-header {
    width: 345px;
    margin: 0 auto;
    background: #fff;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 15px;
    z-index: 22;
    .arr-left {
      font-size: 22px;
    }
    .search-content {
      flex: 1;
    }
  }
  .like-search {
    position: relative;
    top: 50px;
    width: 100%;
    box-sizing: border-box;
    padding-left: 30px;
  }
  .goods-list {
    position: relative;
    width: 345px;
    margin: 48px auto 0;
    z-index: 10;
    background: #fff;
  }
  .my-history {
    width: 350px;
    position: absolute;
    top: 35px;
    left: 10px;
    z-index: 1;
  }
}
</style>
