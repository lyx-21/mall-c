<template>
  <div class="card-wrapper">
      <div class="card-image">
          <img :src="images[0]" alt="">
      </div>
      <div class="card-content">
          <div class="title overflow-hidden">{{ title }}</div>
          <div class="desc overflow-hidden">{{ desc }}</div>
          <div class="tags overflow-hidden">
              <div v-for="i in tags" :key="i">{{ i }}</div>
          </div>
          <div class="price">￥{{ price }}</div>
          <div class="counter"></div>
      </div>
  </div>
</template>

<script>
export default {
  props: ['images', 'title', 'desc', 'tags', 'price', 'id'],

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
    }
}
.overflow-hidden { // 超出部分打点隐藏
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>>
