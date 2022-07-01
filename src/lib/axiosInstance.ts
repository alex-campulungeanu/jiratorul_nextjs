import {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import axios from 'axios'
import { toast } from 'react-toastify'

import {config as appConfig, SERVER_API_URL} from '../config/constants'
import { TOKEN_NAME, STORAGE_USER_CONTAINER } from '../config/constants';

const customeInstance = axios.create({
  baseURL: SERVER_API_URL,
});

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  // if (appConfig.proxy) {
  //   // logger.info(appConfig.proxy)
  //   const proxyAgent = new httpsProxyAgent(appConfig.proxy)
  //   config.httpsAgent = proxyAgent,
  //   config.proxy = false
  // }
  const loggedUserJson = window.sessionStorage.getItem(STORAGE_USER_CONTAINER) || '{}'
  const user = JSON.parse(loggedUserJson)
  const token = user[TOKEN_NAME]
  if (token) {
    // TODO: fix this error
    config.headers!.Authorization = `Bearer ${token}`;
  }
  return config;
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
}

const onResponse = (response: AxiosResponse): Promise<AxiosResponse> => {
  if (response.status === 204) {
    toast.error('The server respond dramaticaly wrong !')
    return Promise.reject('The server respond dramaticaly wrong !')
  } else {
  return Promise.resolve(response);
  }
}

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  // const status = error.status || (error.response ? error.response.status : 0);
  const status = error.response ? error.response.status : 0;
  // console.log(status);
  if (status === 403 || status === 401) {
    // console.log(error.response!.data)
    // return error.response!.data
    return Promise.reject(error.response!.data)
  }
  if (status === 500 || status === 502) {
    toast.error('Something is wrong !')
    return Promise.reject('Something whent wrong !');
  } else {
    const response = error.response
    return Promise.reject(response);
  }
}

function setupAxiosInterceptors(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}

export const axiosInstance = setupAxiosInterceptors(customeInstance)