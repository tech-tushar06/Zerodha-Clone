// API Configuration
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3002';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE_URL}/login`,
  REGISTER: `${API_BASE_URL}/register`,
  
  // Holdings
  ALL_HOLDINGS: `${API_BASE_URL}/allHoldings`,
  
  // Orders
  NEW_ORDER: `${API_BASE_URL}/newOrder`,
  ALL_ORDERS: `${API_BASE_URL}/allOrders`,
  
  // Positions
  ALL_POSITIONS: `${API_BASE_URL}/allPositions`,
};

export const getAuthHeader = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export default API_BASE_URL;
