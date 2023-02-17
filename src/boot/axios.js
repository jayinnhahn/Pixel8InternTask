import { boot } from "quasar/wrappers";
import { LocalStorage } from "quasar";
import axios from "axios";

let axiosConfig = {
  baseURL: "http://localhost/pixel8/qa/ojt-training-repo/php/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${LocalStorage.getItem("Bearer") || ""}`,
  },
  xsrfCookieName: "access_token",
  data: {},
};

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // console.log(error.Error);
    // const { status } = error.response;
    return Promise.reject(error);
  }
);

let ChainCallback = (promises, callback) => {
  promises
    .then((response) => {
      typeof callback.success === "function" && callback.success(response);
    })
    .catch((response) => {
      if (response !== 200) {
        alert(response);
      }
      typeof callback.catch === "function" && callback.catch(response);
    });
};

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create(axiosConfig);

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

const httpGet = (resource, callback, payload = {}) => {
  let newConfig = Object.assign({}, axiosConfig);
  newConfig.params = payload;
  // ALWAYS REBIND AUTHORIZATION HEADER TO REQUEST!
  newConfig.headers.Authorization = `Bearer ${
    LocalStorage.getItem("Bearer") || ""
  }`;
  ChainCallback(axios.get(resource, newConfig), callback);
};

const httpPost = (resource, payload, callback) => {
  // ALWAYS REBIND AUTHORIZATION HEADER TO REQUEST!
  axiosConfig.headers.Authorization = `Bearer ${
    LocalStorage.getItem("Bearer") || ""
  }`;
  ChainCallback(axios.post(resource, payload, axiosConfig), callback);
};

const httpPut = (resource, payload, callback) => {
  // ALWAYS REBIND AUTHORIZATION HEADER TO REQUEST!
  axiosConfig.headers.Authorization = `Bearer ${
    LocalStorage.getItem("Bearer") || ""
  }`;
  ChainCallback(axios.put(resource, payload, axiosConfig), callback);
};

const httpDel = (resource, payload, callback) => {
  let newConfig = Object.assign({}, axiosConfig);
  newConfig.data = payload;
  // ALWAYS REBIND AUTHORIZATION HEADER TO REQUEST!
  newConfig.headers.Authorization = `Bearer ${
    LocalStorage.getItem("Bearer") || ""
  }`;
  ChainCallback(axios.delete(resource, newConfig), callback);
};

const httpFileUpload = (resource, payload, callback) => {
  /** action =  Store Action what will be invoked */
  /** payload = The file you want to upload */
  /** callback = what happen next */
  let fileConfig = {
    withCredentials: true,
    baseURL: axiosConfig.baseURL,
    xsrfCookieName: "access_token",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${LocalStorage.getItem("Bearer") || ""}`,
    },
  };

  ChainCallback(axios.post(resource, payload, fileConfig), callback);
};

const httpFileDownload = (resource, payload, callback) => {
  let fileConfig = {
    withCredentials: true,
    baseURL: axiosConfig.baseURL,
    xsrfCookieName: "access_token",
    headers: {
      Authorization: `Bearer ${LocalStorage.getItem("Bearer") || ""}`,
    },
    responseType: "arraybuffer",
  };

  let newConfig = Object.assign({}, fileConfig);
  newConfig.params = payload;

  ChainCallback(axios.get(resource, newConfig), callback);
};

export {
  api,
  httpGet,
  httpPost,
  httpPut,
  httpDel,
  httpFileUpload,
  httpFileDownload,
};
