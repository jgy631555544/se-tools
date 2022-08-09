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

export function set(key, value, options) {
  options = options || {};
  if (typeof options.expires === "number") {
    const days = options.expires;
    const time = (options.expires = new Date());
    time.setMilliseconds(time.getMilliseconds() + days * 864e5);
  }

  return (document.cookie = [
    key,
    "=",
    value,
    options.expires ? `; expires=${options.expires.toUTCString()}` : "",
    "; path=",
    options.path ? options.path : "/",
    options.domain ? `; domain=${options.domain}` : "",
    options.secure ? "; secure" : "",
  ].join(""));
}

export function remove(key) {
  document.cookie = `${encodeURIComponent(
    key,
  )}=; expires=Thu, 01 Jan 1971 00:00:00 GMT;path=/`;
}

export default {
  get,
  set,
  remove,
};
