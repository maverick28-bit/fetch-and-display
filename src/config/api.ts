// API configuration constants
export const API_ENDPOINTS = {
  DUMMY_JSON_BASE: 'https://dummyjson.com',
  PRODUCTS: '/products',
} as const;

export const getProductUrl = (id: number) => 
  `${API_ENDPOINTS.DUMMY_JSON_BASE}${API_ENDPOINTS.PRODUCTS}/${id}`;