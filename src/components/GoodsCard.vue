<template>
  <div class="card-wrapper">
    <div class="card-image">
      <img :src="images[0]" ref="img" />
    </div>
    <div class="card-content">
      <div class="title overflow-hidden">{{ title }}</div>
      <div class="desc overflow-hidden">{{ desc }}</div>
      <div class="tags overflow-hidden">
        <div v-for="i in tags" :key="i">{{ i }}</div>
      </div>
      <div class="price">￥{{ price }}</div>
      <div class="counter">
        <div v-if="num" @touchend="counter(id, -1)">
          <img
            src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/rec.png"
          />
        </div>
        <div v-if="num" class="num">{{ num }}</div>
        <div @touchend="counter(id, 1)">
          <img
            src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/add.png"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Animate from '../tools/animate';

export default {
  props: ['images', 'title', 'desc', 'tags', 'price', 'id', 'num'],
  methods: {
    ...mapMutations(['storageChange']),
    counter(id, num) {
      this.storageChange({ id, value: num });
      if (num === -1 || num === -Infinity) {
        return;
      }
      // 获取 动画 相关距离
      // 图片
      const { left: imgLeft, top: imgTop } = this.$refs.img.getBoundingClientRect();
      const { offsetWidth: imgWidth, offsetHeight: imgHeight } = this.$refs.img;
      // 购物车car
      const car = document.getElementById('shop-car');
      const { left: carLeft, top: carTop } = car.getBoundingClientRect();
      const { offsetWidth: carWidth, offsetHeight: carHeight } = car;
      const endX = carLeft + carWidth / 2;
      const endY = carTop + carHeight / 2;
      Animate({
        startX: imgLeft,
        startY: imgTop,
        endX,
        endY,
        width: imgWidth,
        height: imgHeight,
        src: this.$refs.img.src,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.card-wrapper {
  width: 100%;
  display: flex;
  height: 100px;
  .card-image {
    width: 90px;
    margin-right: 20px;
    img {
      width: 90px;
      height: 90px;
    }
  }
  .card-content {
    flex: 1;
    position: relative;
    > div {
      width: 170px;
    }
    .title {
      margin-top: 5px;
      font-size: 13px;
      color: #1a1a1a;
    }
    .desc {
      font-size: 11px;
      color: #aaa;
      margin-top: 5px;
    }
    .tags {
      display: flex;
      margin-top: 4px;
      > div {
        font-size: 10px;
        color: #aaa;
        padding: 2px;
        border: 1px solid #aaa;
        border-radius: 5px;
        margin-right: 5px;
      }
    }
    .price {
      color: #ff1a90;
      font-size: 14px;
      margin-top: 4px;
      font-weight: 600;
    }
    .counter {
      display: flex;
      position: absolute;
      bottom: 12px;
      right: 15px;
      justify-content: flex-end;
      align-items: center;
      > div:not(.num) {
        width: 16px;
        height: 16px;
        img {
          width: 100%;
        }
      }
      .num {
        padding: 0 5px;
        height: 22px;
        line-height: 22px;
      }
    }
  }
}
.overflow-hidden {
  // 超出部分打点隐藏
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>>
