
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Authentication API endpoints
export const authAPI = {
  login: (email: string, password: string) => api.post('/auth/login', { email, password }),
  register: (userData: any) => api.post('/auth/register', userData),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  getCurrentUser: () => api.get('/user/me'),
};

// Products API endpoints
export const productsAPI = {
  getAll: (params?: any) => api.get('/products', { params }),
  getById: (id: string) => api.get(`/products/${id}`),
  getFeatured: () => api.get('/products/featured'),
  getByCategory: (categoryId: string) => api.get(`/categories/${categoryId}/products`),
  search: (query: string) => api.get(`/products/search?q=${query}`),
};

// Categories API endpoints
export const categoriesAPI = {
  getAll: () => api.get('/categories'),
  getById: (id: string) => api.get(`/categories/${id}`),
};

// Cart API (using local storage for now)
export const cartAPI = {
  getCart: () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : { items: [], total: 0 };
  },
  addToCart: (product: any, quantity: number = 1) => {
    const cart = cartAPI.getCart();
    
    const existingItem = cart.items.find((item: any) => item.product._id === product._id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product, quantity });
    }
    
    cart.total = cart.items.reduce(
      (sum: number, item: any) => sum + item.product.price * item.quantity, 
      0
    );
    
    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
  },
  updateQuantity: (productId: string, quantity: number) => {
    const cart = cartAPI.getCart();
    
    const item = cart.items.find((item: any) => item.product._id === productId);
    if (item) {
      item.quantity = quantity;
      
      cart.total = cart.items.reduce(
        (sum: number, item: any) => sum + item.product.price * item.quantity, 
        0
      );
      
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    return cart;
  },
  removeFromCart: (productId: string) => {
    const cart = cartAPI.getCart();
    
    cart.items = cart.items.filter((item: any) => item.product._id !== productId);
    
    cart.total = cart.items.reduce(
      (sum: number, item: any) => sum + item.product.price * item.quantity, 
      0
    );
    
    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
  },
  clearCart: () => {
    localStorage.removeItem('cart');
    return { items: [], total: 0 };
  },
};

// Orders API endpoints
export const ordersAPI = {
  create: (orderData: any) => api.post('/orders', orderData),
  getAll: () => api.get('/orders'),
  getById: (id: string) => api.get(`/orders/${id}`),
  getUserOrders: () => api.get('/orders/user'),
};

// Admin API endpoints
export const adminAPI = {
  getDashboardStats: () => api.get('/admin/stats'),
  getUsers: () => api.get('/admin/users'),
  getUserById: (id: string) => api.get(`/admin/users/${id}`),
  updateUser: (id: string, userData: any) => api.put(`/admin/users/${id}`, userData),
  deleteUser: (id: string) => api.delete(`/admin/users/${id}`),
  
  // Products management
  createProduct: (productData: any) => api.post('/admin/products', productData),
  updateProduct: (id: string, productData: any) => api.put(`/admin/products/${id}`, productData),
  deleteProduct: (id: string) => api.delete(`/admin/products/${id}`),
  
  // Categories management
  createCategory: (categoryData: any) => api.post('/admin/categories', categoryData),
  updateCategory: (id: string, categoryData: any) => api.put(`/admin/categories/${id}`, categoryData),
  deleteCategory: (id: string) => api.delete(`/admin/categories/${id}`),
  
  // Orders management
  getAllOrders: () => api.get('/admin/orders'),
  updateOrderStatus: (id: string, status: string) => api.patch(`/admin/orders/${id}/status`, { status }),
};

// Payment API endpoints
export const paymentAPI = {
  createOrder: (amount: number) => api.post('/payment/create-order', { amount }),
  verifyPayment: (paymentData: any) => api.post('/payment/verify', paymentData),
};

export default api;
