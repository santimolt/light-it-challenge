/**
 * Application configuration constants
 * Uses environment variables with fallback values
 */

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://63bedcf7f5cfc0949b634fc8.mockapi.io/users';

