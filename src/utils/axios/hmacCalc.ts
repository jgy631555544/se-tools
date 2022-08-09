import MD5 from "crypto-js/md5";
import HEX from "crypto-js/enc-hex";

/**

* @author GuanYu Jin
* @date 2022/3/22 10:51
* @description

*/

export interface md5Response {
  timestamp: number;
  hmac: string;
}

function hmacCalc(
  url: string,
  type: string,
  params?: object,
): md5Response | null {
  const timestamp = Date.now();
  let hmac = "";
  if (type === "get") {
    hmac = MD5(`${url}${timestamp}`).toString(HEX);
  } else if (type === "post") {
    if (params) {
      hmac = MD5(`${url}${JSON.stringify(params)}${timestamp}`).toString(HEX);
    } else {
      hmac = MD5(`${url}${timestamp}`).toString(HEX);
    }
  } else {
    return null;
  }
  return {
    timestamp,
    hmac,
  };
}
export default hmacCalc;
