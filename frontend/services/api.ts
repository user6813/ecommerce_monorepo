import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: number;
  stock: number;
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  categoryId?: number;
  stock?: number;
}

export interface CreateCategoryDto {
  name: string;
  description: string;
  image: string;
}

export interface UpdateCategoryDto {
  name?: string;
  description?: string;
  image?: string;
}

// Product API calls
export const productApi = {
  getAll: (categoryId?: number) => 
    api.get<Product[]>(`/products${categoryId ? `?categoryId=${categoryId}` : ''}`),
  
  getById: (id: number) => 
    api.get<Product>(`/products/${id}`),
  
  create: (data: CreateProductDto) => 
    api.post<Product>('/products', data),
  
  update: (id: number, data: UpdateProductDto) => 
    api.put<Product>(`/products/${id}`, data),
  
  delete: (id: number) => 
    api.delete(`/products/${id}`),
};

// Category API calls
export const categoryApi = {
  getAll: () => 
    api.get<Category[]>('/categories'),
  
  getById: (id: number) => 
    api.get<Category>(`/categories/${id}`),
  
  create: (data: CreateCategoryDto) => 
    api.post<Category>('/categories', data),
  
  update: (id: number, data: UpdateCategoryDto) => 
    api.put<Category>(`/categories/${id}`, data),
  
  delete: (id: number) => 
    api.delete(`/categories/${id}`),
};

export default api; 