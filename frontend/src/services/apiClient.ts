const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export async function apiClient(path: string, init: RequestInit = {}) {
  const url = `${API_BASE}${path}`;
  const response = await fetch(url, init);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json();
}

export { API_BASE };




