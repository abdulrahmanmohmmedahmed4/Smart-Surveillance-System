export type CameraStatus = 'online' | 'offline' | 'alert';

export interface Camera {
  id: number;
  name: string;
  rtsp_url?: string;
  location?: string;
  status?: CameraStatus;
  last_heartbeat_at?: string;
}




