import { apiClient } from './apiClient';

type Credentials = { username: string; password: string };

export async function login(credentials: Credentials) {
  return apiClient('/auth/token/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
}




