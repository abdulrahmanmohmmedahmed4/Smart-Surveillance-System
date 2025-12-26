# 🛡️ Smart Surveillance System

**نظام مراقبة متكامل بـ React + Django مع إدارة المستخدمين وواجهة تفاعلية حديثة.**

---

## 📋 المميزات

- ✅ نظام تسجيل دخول كامل (Login/Register/Password Reset)
- ✅ Django REST API مع JWT Authentication  
- ✅ React + Vite Frontend حديث وسريع
- ✅ SQLite Database (بدون تعقيد PostgreSQL)
- ✅ Django Admin Panel جاهز للإدارة
- ✅ Docker Support (اختياري)

---

## 🏗️ هيكل المشروع

Smart-Surveillance-System/
├── backend/ # Django Backend ✅
│ ├── auth_app/ # CustomUser + JWT
│ ├── camera_app/ # إدارة الكاميرات
│ ├── config/ # إعدادات Django
│ ├── manage.py
│ └── db.sqlite3 # قاعدة بيانات SQLite
│
├── frontend/ # React + Vite ✅
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ └── services/
│ ├── package.json
│ └── vite.config.ts
│
├── ai_processing/ # للعمل المستقبلي (AI)
├── docker-compose.yml
└── README.md

## 🚀 البدء السريع

### المتطلبات
- Python 3.11+
- Node.js 20+  
- Git

### **Backend (Terminal 1)**
cd backend
source venv/bin/activate || python -m venv venv && source venv/bin/activate
pip install Django djangorestframework djangorestframework-simplejwt pillow
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver 0.0.0.0:8000
### **Frontend (Terminal 2)**
cd frontend
npm install
echo "VITE_API_BASE_URL=http://localhost:8000/api" > .env
npm run dev
### URLs الجاهزة

| الخدمة | الرابط |
|--------|---------|
| Frontend | http://localhost:5173/ |
| Backend API | http://localhost:8000/api/ |
| Django Admin | http://localhost:8000/admin/ |

**Login:** `abdulrahman` / `[كلمة السر]`

---

## 🐳 Docker (اختياري)
docker compose up --build -d 
---

## 👤 المطور
**abdulrahmanmohmmedahmed4** - Full-stack Developer

---

## 📄 الرخصة
رخصة **MIT**.
