<template>
  <div class="shopping-wrapper">
    <div class="top-nav">
      <van-nav-bar title="购物车" right-text="删除" @click-right="del" />
    </div>
    <div class="card-list" v-if="this.list.length !== 0">
      <van-checkbox-group v-model="result" ref="checkboxGroup">
        <div class="card-box" v-for="item in list" :key="item.id">
          <van-checkbox class="check" :name="item.id"></van-checkbox>
          <goods-card
          v-bind="item"
          :num="counterMap[item.id]"
          ></goods-card>
        </div>
      </van-checkbox-group>
    </div>
    <div class="card-none" v-else>
      <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/shopping_bg.jpg" alt="">
    </div>
    <van-submit-bar :price="allMoney" :button-text="`去结算(${totalNum})`" @submit="onSubmit">
      <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { Toast, Dialog } from 'vant';
import goodsCard from '../components/GoodsCard.vue';

export default {
  data() {
    return {
      result: [],
      list: [],
      checked: false,
    };
  },
  computed: {
    ...mapState({
      counterMap: (state) => state.counterMap,
    }),
    totalNum() { // 获取产品数量
      const resArr = this.list.filter((item) => this.result.includes(item.id)); // 获取勾入购物车的产品
      // 将产品数量相加
      const res = resArr.reduce((prev, next) => prev + (this.counterMap[next.id] || 0), 0);
      return res;
    },
    allMoney() {
      const resArr = this.list.filter((item) => this.result.includes(item.id));
      return resArr.reduce((prev, next) => {
        const num = this.counterMap[next.id] || 0; // 先获取每个商品的数量
        return Math.round(num * next.price * 100) + prev; // 商品数量 乘以 价格 在乘以 100
      }, 0);
    },
  },
  components: {
    goodsCard,
  },
  watch: {
    result() {
      if (this.list.length === this.result.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
  },
  methods: {
    ...mapMutations(['storageChange']),
    async getAllDate() { // 获取本地存储中 购物车中的数据
      const result = Object.keys(this.counterMap); // 获取counterMap数组中 所有的键key
      const res = await this.$api.getGoodsByIds(result.join()); // 通过键 请求数据
      this.list = res.list;
    },
    checkAll() { // 全选
      if (this.checked) {
        this.$refs.checkboxGroup.toggleAll(true);
      } else {
        this.$refs.checkboxGroup.toggleAll(false);
      }
    },
    async del() {
      if (this.result.length === 0) {
        Toast('你没有选中商品');
      }
      try {
        await Dialog.confirm({ message: '你是否删除已选中商品' });
        this.result.forEach((id) => {
          this.storageChange({ id, value: -Infinity });
          this.list = this.list.filter((item) => !this.result.includes(item.id));
        });
      } catch (error) {
        console.log(error);
        Toast('用户点击了取消');
      }
    },
    onSubmit() {},
  },
  created() {
    this.getAllDate();
  },
};
</script>

<style lang="less" scoped>
.shopping-wrapper {
  background: #eee;
  height: 100vh;
  .top-nav {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10;
  }
  .card-list {
    position: absolute;
    top: 46px;
    width: 100%;
    background: #fff;
    padding: 10px 10px 100px 10px;
    box-sizing: border-box;
    z-index: 0;
    .card-box {
      display: flex;
      justify-content: center;
    }
    .check {
        margin-right: 10px;
        flex-shrink: 0;
      }
  }
  .van-submit-bar {
    bottom: 50px;
  }
}
</style>
