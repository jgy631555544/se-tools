/**

 * @author GuanYu Jin
 * @date 2022/3/22 10:47
 * @description

 */

import axios from "axios";
import { message, Modal } from "antd";
import hmacCalc from "./hmacCalc";

const interceptorParams = {};

function checkUserId(url: string, userId: any): boolean {
  const API_WHITE_LIST = [
    "/common/setlanguage",
    "/AccessControl/ValidateUser",
    "/sso/acs",
    "/User/getByName",
    "/user/Login",
    "/User/loginByToken",
  ];
  if (userId) {
    return true;
  }
  for (let i = 0; i < API_WHITE_LIST.length; i++) {
    if (new RegExp(API_WHITE_LIST[i]).test(url)) {
      return true;
    }
  }
  return false;
}

function getCookie(key: string) {
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

function exit() {
  // 神策注销当前UserId
  document.cookie = "UserId=; path=/;";
  window.location.href = `/zh-cn/logout?returnURL=${encodeURIComponent(
    window.location.origin,
  )}`;
}

const axiosInstance = axios.create({
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "cache-control": "no-cache",
    cache: "no-cache",
    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
  },
  withCredentials: true,
});

// 保存Loading函数，并在请求参数中将其清除
axiosInstance.interceptors.request.use((config) => {
  const originParams = config.data || config.params;
  const params =
    typeof originParams === "object"
      ? originParams
      : JSON.parse(originParams || "{}");
  // 记录请求
  const interceptorKey = Symbol(config.url);
  interceptorParams[interceptorKey] = {};
  // @ts-ignore 挂载不属于AxiosRequestCofig的属性，忽略类型校验
  config.interceptorKey = interceptorKey;
  if (params.isCustomError) {
    interceptorParams[interceptorKey].isCustomError = params.isCustomError;
    delete params.isCustomError;
  }
  if (params.setLoading) {
    interceptorParams[interceptorKey].setLoading = params.setLoading;
    params.setLoading?.(true);
    delete params.setLoading;
  }
  const urlSplit = config.url!.split("/api/");
  const hmacUrl = urlSplit.length > 1 ? `/${urlSplit[1]}` : config.url!;
  // hmac验证
  const hmacCalcResult = hmacCalc(hmacUrl, config.method!, originParams);
  if (hmacCalcResult) {
    config.headers = {
      ...config.headers,
      timestamp: hmacCalcResult.timestamp,
      hmac: hmacCalcResult.hmac,
      ...config.requestHeaders,
    };
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (res) => {
    // @ts-ignore
    const { interceptorKey, url } = res.config;
    if (!checkUserId(url!, getCookie("UserId") || localStorage.UserId)) {
      throw new Error("用户已退出登录");
    }
    if (!navigator.onLine) {
      throw new Error("网络离线");
    }
    let isCustomError = false;
    if (interceptorKey) {
      interceptorParams[interceptorKey]?.setLoading?.(false);
      isCustomError = interceptorParams[interceptorKey].isCustomError;
      delete interceptorParams[interceptorKey];
    }
    if (res.data.Error === "0" || !res.data.Error) {
      return res.data.Result;
    }
    const resMessage =
      (typeof res.data?.Message === "object"
        ? res.data?.Message?.[0]
        : res.data?.Message) || "请求失败，请刷新页面";
    if (res.data.Error === "-1") {
      Modal.error({
        title: "操作失败",
        content: `未知错误：${resMessage}`,
        centered: true,
        okText: "确认",
      });
      return res.data;
    }
    if (res?.data?.Error === "050001200010") {
      window.location.href = `${window.location.origin}/zh-cn/mini/premission`;
    }
    if (res?.data?.Error === "050001200011") {
      Modal.error({
        className: "se-pop-poae-modal",
        title: "提示",
        content: "软件授权已过期，请先激活后使用",
      });
    }
    if (!isCustomError) {
      message.error(resMessage);
    }
    return res.data;
  },
  (error) => {
    // 删除
    const interceptorKey = error.config?.interceptorKey;
    if (interceptorKey) {
      interceptorParams[interceptorKey]?.setLoading?.(false);
      delete interceptorParams[interceptorKey];
    }
    if (error.response.status === 401) {
      // return Modal.warning({
      //   centered: true,
      //   content: "当前用户已退出，请重新登录",
      //   okText: "好的",
      //   autoFocusButton: "ok",
      //   onOk: exit,
      // });
      return null;
    }
    return message.error("请求失败，请刷新页面");
  },
);

function post(url: string, data = {},requestHeaders={}) {
  return axiosInstance({
    url,
    method: "post",
    data,
    requestHeaders
  });
}

function get(url: string, params = {},requestHeaders={}) {
  return axiosInstance({
    url,
    method: "get",
    params,
    requestHeaders
  });
}

export default { get, post };
