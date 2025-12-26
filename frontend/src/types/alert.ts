export type AlertLevel = 'low' | 'medium' | 'high';

export interface Alert {
  id: number;
  type: string;
  level: AlertLevel;
  camera_id?: number;
  camera_name?: string;
  created_at?: string;
}




