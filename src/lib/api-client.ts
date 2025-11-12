import axios, { AxiosInstance, AxiosError } from 'axios';

// Configure your backend URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to include auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor for token refresh
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as any;
        
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            const refreshToken = localStorage.getItem('refresh_token');
            const response = await this.client.post('/auth/refresh', { refresh_token: refreshToken });
            const { access_token } = response.data;
            
            localStorage.setItem('access_token', access_token);
            originalRequest.headers.Authorization = `Bearer ${access_token}`;
            
            return this.client(originalRequest);
          } catch (refreshError) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/admin/login';
            return Promise.reject(refreshError);
          }
        }
        
        return Promise.reject(error);
      }
    );
  }

  // ============ AUTH ENDPOINTS ============
  async login(email: string, password: string) {
    const response = await this.client.post('/auth/login', { email, password });
    return response.data;
  }

  async logout() {
    const response = await this.client.post('/auth/logout');
    return response.data;
  }

  async register(data: { email: string; password: string; username: string }) {
    const response = await this.client.post('/auth/register', data);
    return response.data;
  }

  async verifyEmail(code: string) {
    const response = await this.client.post('/auth/verify-email', { code });
    return response.data;
  }

  async resendVerification(email: string) {
    const response = await this.client.post('/auth/resend-verification', { email });
    return response.data;
  }

  async requestPasswordReset(email: string) {
    const response = await this.client.post('/auth/password-reset/request', { email });
    return response.data;
  }

  async verifyPasswordReset(code: string, new_password: string) {
    const response = await this.client.post('/auth/password-reset/verify', { code, new_password });
    return response.data;
  }

  async refreshToken() {
    const response = await this.client.post('/auth/refresh');
    return response.data;
  }

  // ============ USER ENDPOINTS ============
  async getCurrentUser() {
    const response = await this.client.get('/users/me');
    return response.data;
  }

  async updateProfile(data: Partial<any>) {
    const response = await this.client.patch('/users/me', data);
    return response.data;
  }

  async updateProfileWithAvatar(formData: FormData) {
    const response = await this.client.put('/users/me', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  // ============ PRODUCT ENDPOINTS ============
  async getFeaturedProducts(page = 1, pageSize = 10) {
    const response = await this.client.get('/products/featured', {
      params: { page, page_size: pageSize },
    });
    return response.data;
  }

  async getRecommendedProducts(page = 1, pageSize = 10) {
    const response = await this.client.get('/products/recommended', {
      params: { page, page_size: pageSize },
    });
    return response.data;
  }

  async getMyListings(page = 1, pageSize = 10, status?: string, search?: string) {
    const response = await this.client.get('/products/my-listings', {
      params: { page, page_size: pageSize, status, search },
    });
    return response.data;
  }

  async getProducts(params?: {
    page?: number;
    page_size?: number;
    category?: string;
    search?: string;
    min_price?: number;
    max_price?: number;
    condition?: string;
  }) {
    const response = await this.client.get('/products/', { params });
    return response.data;
  }

  async getProduct(productId: string) {
    const response = await this.client.get(`/products/${productId}`);
    return response.data;
  }

  async createProduct(formData: FormData) {
    const response = await this.client.post('/products/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  async updateProduct(productId: string, data: Partial<any>) {
    const response = await this.client.put(`/products/${productId}`, data);
    return response.data;
  }

  async addProductImages(productId: string, formData: FormData) {
    const response = await this.client.post(`/products/${productId}/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  async sendProductVerification(productId: string) {
    const response = await this.client.post(`/products/${productId}/verification/send`);
    return response.data;
  }

  async verifyProduct(productId: string, code: string) {
    const response = await this.client.post(`/products/${productId}/verification`, { code });
    return response.data;
  }

  async deleteProduct(productId: string) {
    const response = await this.client.delete(`/products/${productId}`);
    return response.data;
  }

  // ============ ADMIN ENDPOINTS ============
  async getAdminStatsOverview() {
    const response = await this.client.get('/admin/stats/overview');
    return response.data;
  }

  async getAdminProducts(params?: {
    page?: number;
    page_size?: number;
    search?: string;
    category?: string;
    is_active?: boolean;
    is_sold?: boolean;
    is_verified?: boolean;
    is_flagged?: boolean;
  }) {
    const response = await this.client.get('/admin/products', { params });
    return response.data;
  }

  async updateAdminProduct(productId: string, data: {
    is_active?: boolean;
    is_verified?: boolean;
    is_flagged?: boolean;
    is_featured?: boolean;
  }) {
    const response = await this.client.patch(`/admin/products/${productId}`, data);
    return response.data;
  }

  async deleteAdminProduct(productId: string) {
    const response = await this.client.delete(`/admin/products/${productId}`);
    return response.data;
  }
}

export const apiClient = new ApiClient();
