# NexusCare - Smart Community Services Platform

A secure, scalable full-stack web application for smart community management featuring complaint tracking, user management, and role-based access control.

## 🚀 Features

- **User Authentication & Authorization** - Secure login with role-based access control
- **Complaint Management** - Complete CRUD operations for community issues
- **Admin Dashboard** - System statistics and user management
- **Role-Based Access** - Admin, Resident, Security Staff, Medical Assistant
- **Responsive Design** - Modern UI that works on all devices
- **RESTful API** - Clean, documented backend API
- **Audit Logging** - Track all system activities

## 🛠️ Technology Stack

**Frontend:**
- React 18.2.0
- React Router 6.20.0
- Axios 1.6.2
- Modern CSS3

**Backend:**
- Python 3.8+
- Flask 3.0.0
- MySQL 8.0+
- Gunicorn (Production)

**Security:**
- Password hashing (Werkzeug)
- Session-based authentication
- CORS protection
- SQL injection prevention

## 📋 Prerequisites

- Node.js 16+ and npm
- Python 3.8+
- MySQL 8.0+
- Git

## 🔧 Installation

### 1. Clone the repository

```bash
git clone https://github.com/ziaur390/NexusCare.git
cd NexusCare
```

### 2. Database Setup

```bash
# Login to MySQL
mysql -u root -p

# Create database and import schema
source backend/database/schema.sql
```

### 3. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env and add your MySQL password
```

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install
```

## 🚀 Running the Application

### Start Backend Server

```bash
cd backend
venv\Scripts\activate  # Windows
# source venv/bin/activate  # macOS/Linux
python app.py
```

Backend will run on `http://localhost:5000`

### Start Frontend Server

```bash
cd frontend
npm start
```

Frontend will run on `http://localhost:3000`

## 🔑 Demo Accounts

| Role | Username | Password |
|------|----------|----------|
| Admin | admin | admin123 |
| Resident | resident1 | admin123 |
| Security | security1 | admin123 |
| Medical | medical1 | admin123 |

## 📁 Project Structure

```
NexusCare/
├── backend/
│   ├── app.py              # Flask application
│   ├── requirements.txt    # Python dependencies
│   ├── .env.example       # Environment variables template
│   └── database/
│       └── schema.sql     # Database schema
│
└── frontend/
    ├── public/
    │   └── index.html     # HTML template
    ├── src/
    │   ├── components/    # Reusable components
    │   ├── pages/         # Page components
    │   ├── services/      # API services
    │   ├── App.js         # Main app component
    │   ├── index.js       # Entry point
    │   └── index.css      # Global styles
    └── package.json       # Node dependencies
```

## 🌐 API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/session` - Check session status

### Complaints
- `GET /api/complaints` - Get all complaints
- `POST /api/complaints` - Create complaint
- `GET /api/complaints/:id` - Get specific complaint
- `PUT /api/complaints/:id` - Update complaint
- `DELETE /api/complaints/:id` - Delete complaint

### Admin
- `GET /api/admin/users` - Get all users
- `GET /api/admin/stats` - Get system statistics

## 🔒 Security Features

- Password hashing with Werkzeug
- Session-based authentication
- Role-based access control (RBAC)
- Protected API endpoints
- SQL injection prevention
- XSS protection
- CORS configuration
- Audit logging

## 🚀 Deployment

The application is deployment-ready with configuration files for:
- **Vercel** (Frontend)
- **Render** (Backend)
- **Railway** (Database)
- **Heroku** (Alternative)

See deployment configuration files:
- `vercel.json` - Vercel configuration
- `backend/render.yaml` - Render configuration
- `backend/Procfile` - Heroku configuration

## 📝 License

This project is developed for academic purposes.

## 👥 Contributors

- Ziaur Rahman

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ using React, Flask, and MySQL**
