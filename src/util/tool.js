/* eslint-disable no-param-reassign */
function moveTo(start, end, DOM, prop) {
  let dis = 0;
  let speed = 5;
  if (end < 0) {
    speed *= -1;
  }
  const t = setInterval(() => {
    dis += speed;
    DOM[prop] = start + dis;
    if (Math.abs(dis) > Math.abs(end)) {
      DOM[prop] = start + end;
      clearInterval(t);
    }
  }, 2);
}

export default { moveTo };
