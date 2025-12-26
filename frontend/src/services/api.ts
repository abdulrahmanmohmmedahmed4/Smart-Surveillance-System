const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

type Credentials = { username: string; password: string };

export const login = async (credentials: Credentials) => {
  // Placeholder: سيتم الإبقاء على هذا الأسلوب البسيط لحين إضافة طبقة مصادقة أكثر تقدماً
  const response = await fetch(`${API_BASE}/auth/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
};

export const getCameras = async (token: string) => {
  // Placeholder: المنطق الحالي يستدعي الباك اند مباشرة، يمكن لاحقاً إدخال طبقة caching أو WebSocket
  const response = await fetch(`${API_BASE}/cameras/`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch cameras');
  }

  return response.json();
};

// دوال Placeholder إضافية للربط المستقبلي مع الباك اند

export const getAlerts = async (token: string) => {
  console.info('[Placeholder] getAlerts: سيتم ربطها بواجهة الباك اند لاحقاً');
  return Promise.resolve([]);
};

export const getUsers = async (token: string) => {
  console.info('[Placeholder] getUsers: سيتم ربطها بواجهة الباك اند لاحقاً');
  return Promise.resolve([]);
};

