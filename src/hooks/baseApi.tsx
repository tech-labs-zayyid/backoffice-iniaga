import axios, { AxiosRequestConfig, Method } from "axios";
import config from "../config/config";
import { getCookie } from "cookies-next";
import { message } from "antd";
import {
  handleLoadingGlobal,
  useHandleLoadingGlobal,
} from "../../redux/general.reducer";

const instance = axios.create();
export const METHODS = {
  GET: "GET" as Method,
  POST: "POST" as Method,
  PUT: "PUT" as Method,
  PATCH: "PATCH" as Method,
  DELETE: "DELETE" as Method,
};

interface CallOptions {
  method: Method;
  subUrl?: string;
  data?: Record<string, any>;
  options?: AxiosRequestConfig;
  isToken?: boolean;
}
const responseError = (res) => {
  const err = res?.response?.data;
  if (res.response !== undefined && res?.response?.status !== 403) {
    message.error(
      `${
        err?.data?.message ||
        err?.message ||
        err?.error ||
        res?.response?.statusText ||
        res?.response?.data ||
        "Something went wrong"
      } . Status code [${err?.code || res?.response?.status || ""}]`
    );
  }
};
function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}
const handleInstance = async (request) => {
  try {
    const response = await request;
    handleLoadingGlobal(false);
    if (response.config.method !== "get") {
      message.success(response.data.message);
      console.log(response.data.message);
    }
    return response;
  } catch (err) {
    handleLoadingGlobal(false);
    responseError(err);
  }
};
export async function call({
  method,
  subUrl = "",
  data = {},
  isToken = true,
}: CallOptions) {
  message.destroy();

  handleLoadingGlobal(true);
  const payload = { ...data };
  const configAxios: AxiosRequestConfig = {
    // baseURL: config[process.env.NODE_ENV].API_URL + subUrl,
    method,
    url: config["development"].API_URL + "/" + subUrl,
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };
  if (isToken) {
    configAxios.headers["Authorization"] = `Bearer ${getCookie("token")}`;
  }

  if (method === METHODS.GET) {
    if (!isObjectEmpty(payload)) {
      Object.keys(payload).forEach((key) => {
        if (payload[key] === null || payload[key] === "") {
          delete payload[key];
        }
      });
      configAxios.params = payload;
    }
  } else if (!isObjectEmpty(payload)) {
    configAxios.data = payload;
  }
  const newInstance = handleInstance(instance.request(configAxios));
  return newInstance;
}
