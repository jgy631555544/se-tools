/**

 * @author GuanYu Jin
 * @date 2022/1/4 15:20
 * @description

 */

export function get(key) {
  const cookies = document.cookie ? document.cookie.split("; ") : [];
  for (let i = 0; i < cookies.length; i++) {
    const parts = cookies[i].split("=");
    const name = parts.shift();
    const cookie = parts.join("=");
    if (key === name) {
      return cookie;
    }
  }
  return "";
}

export default {
  get,
};
