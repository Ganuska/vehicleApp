/* eslint-disable */
import Axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
import { storage } from '../../common/utils/storage';
import { API_URL } from '../../common/config';
import { getToken } from '../../common/api/autorization';

export const axios = Axios.create({
  baseURL: API_URL
});

export const refreshTokenAxios = Axios.create({
  baseURL: `${API_URL}`
});

async function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = storage.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}

function authResResponseInterceptor(response: AxiosResponse) {
  return response.data ? response.data : response;
}

async function authErrResponseInterceptor(error: any) {
  const originalRequest = error.config;

  const message = error.response?.data || error.message;
  error.message = message;

  if (error.response?.status === 401) {
    try {
      const newToken = await getToken();

      originalRequest.headers.Authorization = `Bearer ${newToken}`;

      return axios(originalRequest);
    } catch (tokenError) {
      toast.error('error Fetching token');
      return Promise.reject(error);
    }
  }

  return Promise.reject(error);
}

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  authResResponseInterceptor,
  authErrResponseInterceptor
);
