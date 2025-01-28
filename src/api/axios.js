// src/api/axios.js 파일 생성
import axios from 'axios';

const baseURL = 'http://localhost:8080'; // 백엔드 서버 주소

const axiosInstance = axios.create({
  baseURL,
  timeout: 5000,
});

export default axiosInstance;