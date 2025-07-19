// frontend/src/services/api.js

import axios from "@/axiosConfig";

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// ✅ Attach token automatically to requests if available
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Export functions using `api` so token gets attached automatically
export const fetchProducts = () => api.get('/products');

export const fetchCategoryProducts = (slug) => api.get(`/products/category/${slug}`);

export const login = (email, password) => api.post('/auth/login', { email, password });

export const createOrder = (orderData) => api.post('/orders', orderData); // ✅ uses interceptor

export default api;
