import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import { LoginParams, ShareParams, VoteParams } from '../../types';

class ApiService {
  BASE_URL = process.env.REACT_APP_BACKEND_URL;

  TIMEOUT = 20000;

  INSTANCE: AxiosInstance = axios.create({
    baseURL: this.BASE_URL,
    timeout: this.TIMEOUT,
  });

  TOKEN = '';

  constructor() {
    if (!this.INSTANCE) {
      this.INSTANCE = axios.create({
        baseURL: this.BASE_URL,
        timeout: this.TIMEOUT,
      });
    }
  }

  addAuthorizationHeader = (token: string) => {
    this.INSTANCE.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  };

  removeAuthorizationHeader = () => {
    this.INSTANCE.interceptors.request.use((config) => {
      config.headers.Authorization = null;
      return config;
    });
  };

  login = async (params: LoginParams) => {
    const response = await this.INSTANCE.post('login', params);
    const { token } = response.data;
    Cookies.set('token', token);
    this.addAuthorizationHeader(token);
    return token;
  };

  getUser = async () => {
    const response = await this.INSTANCE.get('get_user');
    return response.data;
  };

  getVideos = async () => {
    const response = await this.INSTANCE.get('videos');
    return response.data;
  };

  shareVideo = async (params: ShareParams) => {
    const response = await this.INSTANCE.post('videos', params);
    return response.data;
  };
}

const API = new ApiService();

export default API;
