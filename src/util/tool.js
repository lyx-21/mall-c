function moveTo(start, end) {
  let dis = 0;
  let speed = 5;
  if (end < 0) {
    speed *= -1;
  }
  const t = setInterval(() => {
    dis += speed;
    this.$refs.oneTab.scrollLeft = start + dis;
    if (Math.abs(dis) > Math.abs(end)) {
      this.$refs.oneTab.scrollLeft = start + end;
      clearInterval(t);
    }
  }, 2);
}

export default { moveTo };
