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
}

const API = new ApiService();

export default API;
