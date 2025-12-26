interface Camera {
    id: number;
    name: string;
    rtsp_url: string;
    type?: string;
}

interface CameraCardProps {
    camera: Camera;
    onDelete: () => void;
}

export const CameraCard: React.FC<CameraCardProps> = ({ camera, onDelete }) => {
    const streamUrl = `http://127.0.0.1:8000/api/cameras/stream/${camera.id}/`;

    return (
        <div className="camera-card">
        <h3>{camera.name}</h3>
        <div className="video-container">
        <img
        src={streamUrl}
        alt={camera.name}
        className="video-stream"
        />
        <span className={`status ${camera.type}`}>
        {camera.type === 'test' ? '🖥️ تجريبي' :
            camera.type === 'phone' ? '📱 هاتف' : '📹 IP'}
            </span>
            </div>
            <div className="actions">
            <a href={streamUrl} target="_blank">🔗 شاهد مباشر</a>
            <button onClick={onDelete}>حذف</button>
            </div>
            </div>
    );
};
