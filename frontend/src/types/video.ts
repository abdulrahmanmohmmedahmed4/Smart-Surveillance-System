export interface VideoStream {
  id: string;
  cameraId: number;
  url: string;
  isPrimary?: boolean;
}

export interface VideoLayout {
  id: string;
  name: string;
  grid: '2x2' | '3x3' | '1+3' | 'custom';
}




