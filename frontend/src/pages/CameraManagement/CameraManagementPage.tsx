import React, { useState, useEffect } from 'react';
// أزل import CameraCard لحد ما ننشره
// import { CameraCard } from './components/CameraCard';
// استخدم div بسيط مؤقتاً
import styles from './styles.module.css';

const CameraManagementPage: React.FC = () => {
    const [cameras, setCameras] = useState([]);
    const [newCamera, setNewCamera] = useState({
        name: '',
        rtsp_url: '',  // غيّر من url لـ rtsp_url
    });
    const [showAddForm, setShowAddForm] = useState(false);

    // جلب الكاميرات
    useEffect(() => {
        fetchCameras();
    }, []);

    const fetchCameras = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/cameras/');
            const data = await response.json();
            setCameras(data);
        } catch (error) {
            console.error('خطأ:', error);
        }
    };

    const addCamera = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // احذف type - Backend ما يقبله
            const cameraData = {
                name: newCamera.name || `كاميرا ${new Date().getTime()}`,
                rtsp_url: newCamera.rtsp_url || 'test'  // افتراضي رسومي
            };

            // POST للـ Backend (Django DRF)
            const response = await fetch('http://127.0.0.1:8000/api/cameras/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // إضافة authentication لو مطلوب
                    // 'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(cameraData)
            });

            if (response.ok) {
                fetchCameras(); // تحديث القائمة
                setNewCamera({ name: '', rtsp_url: '' });
                setShowAddForm(false);
                alert('✅ تم إضافة الكاميرا بنجاح!');
            } else {
                alert('❌ خطأ في الإضافة');
            }
        } catch (error) {
            console.error('خطأ:', error);
            alert('❌ خطأ في الاتصال بالخادم');
        }
    };

    return (
        <div className={styles.page || 'page'}> {/* fallback للـ CSS */}
        <header>
        <h1>🎥 إدارة الكاميرات</h1>
        <button
        onClick={() => setShowAddForm(!showAddForm)}
        style={{
            padding: '10px 20px',
            background: '#00d4ff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
        }}
        >
        {showAddForm ? '❌ إلغاء' : '+ إضافة كاميرا'}
        </button>
        </header>

        {showAddForm && (
            <form onSubmit={addCamera} style={{ margin: '20px 0', padding: '20px', background: '#2a2a2a', borderRadius: '10px' }}>
            <div style={{ marginBottom: '15px' }}>
            <input
            placeholder="اسم الكاميرا (مثال: باب المدخل)"
            value={newCamera.name}
            onChange={(e) => setNewCamera({ ...newCamera, name: e.target.value })}
            style={{
                width: '100%', padding: '12px', fontSize: '16px',
                borderRadius: '5px', border: '1px solid #444', background: '#1a1a1a', color: 'white'
            }}
            />
            </div>
            <div style={{ marginBottom: '15px' }}>
            <input
            placeholder="رابط الكاميرا (مثال: http://192.168.1.50:8080/video)"
            value={newCamera.rtsp_url}
            onChange={(e) => setNewCamera({ ...newCamera, rtsp_url: e.target.value })}
            style={{
                width: '100%', padding: '12px', fontSize: '16px',
                borderRadius: '5px', border: '1px solid #444', background: '#1a1a1a', color: 'white'
            }}
            />
            <small style={{ color: '#00ff88' }}>
            📱 هاتف: http://IP:8080/video | 🖥️ رسومي: اتركه فارغ
            </small>
            </div>
            <button
            type="submit"
            style={{
                width: '100%', padding: '12px', fontSize: '16px',
                background: '#00d4ff', color: 'white', border: 'none',
                borderRadius: '5px', cursor: 'pointer'
            }}
            >
            💾 حفظ الكاميرا
            </button>
            </form>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px', marginTop: '30px' }}>
        {cameras.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
            <h3>لا توجد كاميرات</h3>
            <p>اضغط "إضافة كاميرا" لبدء المراقبة</p>
            </div>
        ) : (
            cameras.map((camera: any) => (
                <div key={camera.id} style={{
                    background: '#2a2a2a', padding: '20px', borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
                }}>
                <h3 style={{ margin: '0 0 15px 0', color: '#00d4ff' }}>{camera.name}</h3>
                <div style={{
                    width: '100%', height: '200px', background: '#000',
                    borderRadius: '8px', overflow: 'hidden', position: 'relative'
                }}>
                <img
                src={`http://127.0.0.1:8000/api/cameras/stream/${camera.id}/`}
                alt={camera.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                    e.currentTarget.style.display = 'none';
            (e.currentTarget.parentNode as HTMLElement).innerHTML =
            '<div style="color:#ff4444;padding:80px;text-align:center">⚠️ غير متصل</div>';
                }}
                />
                </div>
                <div style={{ marginTop: '15px' }}>
                <a href={`http://127.0.0.1:8000/api/cameras/stream/${camera.id}/`}
                target="_blank" rel="noopener noreferrer"
                style={{
                    display: 'inline-block', padding: '8px 16px',
                    background: '#00ff88', color: 'black',
                    textDecoration: 'none', borderRadius: '5px', marginRight: '10px'
                }}>
                🔴 شاهد مباشر
                </a>
                <button onClick={() => {
                    if (confirm('حذف هذه الكاميرا؟')) {
                        fetch(`http://127.0.0.1:8000/api/cameras/${camera.id}/`, {
                            method: 'DELETE'
                        }).then(fetchCameras);
                    }
                }} style={{
                    padding: '8px 16px', background: '#ff4444', color: 'white',
                    border: 'none', borderRadius: '5px', cursor: 'pointer'
                }}>
                🗑️ حذف
                </button>
                </div>
                </div>
            ))
        )}
        </div>
        </div>
    );
};

export default CameraManagementPage;
