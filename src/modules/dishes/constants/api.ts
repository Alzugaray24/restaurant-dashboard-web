// API base URL from environment variable with fallback
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://zero7-api-rest.onrender.com/api";
export const DISH_ENDPOINT = `${API_BASE_URL}/dish`;
