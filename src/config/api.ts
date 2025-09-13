// src/config/api.ts
const API_BASE_URL = ''; // Empty string means same origin (aspirewebsite.vercel.app)

export const API_ENDPOINTS = {
  REGISTER: '/api/auth/register',
  LOGIN: '/api/auth/login',
  REGISTER_SESSION: '/api/auth/register-session',
  HEALTH: '/api/health'
};

console.log(API_BASE_URL);

// Test function to check if API is working
export const testApiConnection = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.HEALTH);
    const data = await response.json();
    console.log('API Connection Test:', data);
    return true;
  } catch (error) {
    console.error('API Connection Failed:', error);
    return false;
  }
};