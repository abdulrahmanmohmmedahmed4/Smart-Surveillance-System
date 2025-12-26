export const getCameras = async () => {
  const response = await fetch('http://127.0.0.1:8000/api/cameras/');
  return response.json();
};

export const getCameraStream = (id: number) =>
`http://127.0.0.1:8000/api/cameras/stream/${id}/`;
