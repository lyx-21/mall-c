import Vue from 'vue';
import com from './index.vue';

const Animate = Vue.extend(com); // 创建构造器 引入模板

export default function ({
  startX, startY, endX, endY, width, height, src,
}) {
  const app = new Animate({ // 创建实例
    el: document.createElement('div'),
    data() {
      return {
        moveX: startX,
        moveY: startY,
        sx: 1,
        sy: 1,
        opacity: 1,
        exist: true,
        width,
        height,
        src,
      };
    },
  });
  document.body.appendChild(app.$el); // 挂载
  setTimeout(() => {
    app.moveX = endX;
    app.moveY = endY;
    app.sx = 0.1;
    app.sy = 0.1;
    app.opacity = 0;
  }, 0);
  setTimeout(() => {
    app.exist = false;
  }, 1000);
}
