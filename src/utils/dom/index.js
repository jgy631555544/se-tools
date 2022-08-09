/**

 * @author GuanYu Jin
 * @date 2022/1/5 15:32
 * @description

 */

const getWindowWidth = () => {
  if (typeof window === "undefined") {
    return 0;
  }
  return (
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth
  );
};

const getWindowHeight = () => {
  if (typeof window === "undefined") {
    return 0;
  }
  return (
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight
  );
};

export default {
  getWindowWidth,
  getWindowHeight,
};
