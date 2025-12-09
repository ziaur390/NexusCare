# NexusCare - Integrated Full Stack Digital Ecosystem for Smart Community Services

## 🏘️ Project Overview

NexusCare is a secure, scalable, and multi-module full-stack digital ecosystem designed to support essential smart community services including resident information management, complaint & issue reporting, community announcements, medical assistance requests, visitor management, appointment booking, and emergency coordination.

## 📋 Table of Contents

1. [Technology Stack](#technology-stack)
2. [Features](#features)
3. [Installation Guide](#installation-guide)
4. [Database Setup](#database-setup)
5. [Running the Application](#running-the-application)
6. [API Documentation](#api-documentation)
7. [User Roles](#user-roles)
8. [Testing](#testing)
9. [Deployment](#deployment)
10. [Project Structure](#project-structure)

## 🛠️ Technology Stack

### Frontend
- **React 18.2.0** - Modern UI framework
- **React Router 6.20.0** - Client-side routing
- **Axios 1.6.2** - HTTP client for API calls
- **CSS3** - Custom styling with modern design system

### Backend
- **Python 3.x** - Programming language
- **Flask 3.0.0** - Web framework
- **Flask-CORS 4.0.0** - Cross-Origin Resource Sharing
- **MySQL Connector** - Database driver
- **Werkzeug** - Password hashing and security

### Database
- **MySQL 8.0+** - Relational database management system

### Security
- Session-based authentication
- Password hashing with Werkzeug
- CORS protection
- Role-based access control (RBAC)
- Protected routes

## ✨ Features

### Core Features
1. **User Authentication System**
   - User registration with role selection
   - Secure login with password hashing
   - Session management
   - Logout functionality

2. **Role-Based Authorization**
   - **Admin**: Full system access
   - **Resident**: Limited access to personal data
   - **Medical Assistant**: Health-related services
   - **Security Staff**: Visitor logs & emergency alerts

3. **Complaint Management (CRUD Module)**
   - Create new complaints
   - Read/View all complaints (filtered by role)
   - Update complaint details
   - Delete complaints (soft delete)
   - Filter by status (Open, In Progress, Resolved, Closed)
   - Categorization (Maintenance, Security, Noise, Parking, etc.)
   - Priority levels (Low, Medium, High, Critical)

4. **Admin Panel**
   - User management
   - System statistics
   - Complaint overview
   - Audit logs

5. **Responsive Design**
   - Mobile-friendly interface
   - Modern glassmorphism UI
   - Smooth animations and transitions
   - Premium color palette

## 📦 Installation Guide

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+
- MySQL 8.0+
- Git

### Step 1: Clone the Repository
```bash
cd NexusCare
```

### Step 2: Backend Setup

```bash
cd backend

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
copy .env.example .env
# Edit .env with your database credentials
```

### Step 3: Frontend Setup

```bash
cd frontend

# Install dependencies
npm install
```

## 🗄️ Database Setup

### Step 1: Create Database

1. Open MySQL command line or MySQL Workbench
2. Run the schema file:

```bash
mysql -u root -p < backend/database/schema.sql
```

Or manually:

```sql
source backend/database/schema.sql;
```

### Step 2: Verify Database

```sql
USE nexuscare_db;
SHOW TABLES;
```

You should see:
- users
- complaints
- audit_logs

### Step 3: Default Users

The schema includes default users with password: `admin123`

- **Admin**: username: `admin`
- **Resident**: username: `resident1`
- **Security**: username: `security1`
- **Medical**: username: `medical1`

**Note**: For production, you must change these passwords!

## 🚀 Running the Application

### Start Backend Server

```bash
cd backend
python app.py
```

Backend will run on: `http://localhost:5000`

### Start Frontend Development Server

```bash
cd frontend
npm start
```

Frontend will run on: `http://localhost:3000`

### Access the Application

Open your browser and navigate to: `http://localhost:3000`

## 📡 API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/register
Content-Type: application/json

{
  "username": "string",
  "email": "string",
  "password": "string",
  "full_name": "string",
  "phone": "string",
  "role": "Resident|Admin|Security Staff|Medical Assistant"
}
```

#### Login
```
POST /api/login
Content-Type: application/json

{
  "username": "string",
  "password": "string"
}
```

#### Logout
```
POST /api/logout
```

#### Check Session
```
GET /api/session
```

### Complaint Endpoints

#### Get All Complaints
```
GET /api/complaints
Authorization: Session cookie required
```

#### Get Single Complaint
```
GET /api/complaints/:id
Authorization: Session cookie required
```

#### Create Complaint
```
POST /api/complaints
Content-Type: application/json
Authorization: Session cookie required

{
  "title": "string",
  "description": "string",
  "category": "Maintenance|Security|Noise|Parking|Cleanliness|Other",
  "priority": "Low|Medium|High|Critical"
}
```

#### Update Complaint
```
PUT /api/complaints/:id
Content-Type: application/json
Authorization: Session cookie required

{
  "title": "string",
  "description": "string",
  "category": "string",
  "priority": "string",
  "status": "Open|In Progress|Resolved|Closed" (Admin only)
}
```

#### Delete Complaint
```
DELETE /api/complaints/:id
Authorization: Session cookie required
```

### Admin Endpoints

#### Get All Users
```
GET /api/admin/users
Authorization: Admin role required
```

#### Get System Statistics
```
GET /api/admin/stats
Authorization: Admin role required
```

## 👥 User Roles

### Admin
- Full system access
- View all complaints
- Manage all users
- Update complaint status
- Access admin panel
- View system statistics

### Resident
- Create personal complaints
- View own complaints
- Update own complaints
- Delete own complaints

### Security Staff
- View visitor logs (future feature)
- Manage emergency alerts (future feature)
- View security-related complaints

### Medical Assistant
- Manage medical appointments (future feature)
- View health-related requests (future feature)

## 🧪 Testing

### API Testing with Postman

1. Import the Postman collection (if provided)
2. Test each endpoint:
   - Registration
   - Login
   - CRUD operations
   - Admin endpoints

### Manual Testing Checklist

- [ ] User can register
- [ ] User can login
- [ ] User can logout
- [ ] Resident can create complaint
- [ ] Resident can view own complaints
- [ ] Resident can update own complaint
- [ ] Resident can delete own complaint
- [ ] Admin can view all complaints
- [ ] Admin can update any complaint status
- [ ] Admin can access admin panel
- [ ] Unauthorized users are redirected
- [ ] Session expires after timeout
- [ ] Responsive design works on mobile

## 🌐 Deployment

### Local Deployment

Already covered in "Running the Application" section.

### Docker Deployment (Optional)

Create `Dockerfile` for backend:

```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]
```

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: nexuscare_db
    ports:
      - "3306:3306"
  
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    depends_on:
      - mysql
  
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
```

### Online Deployment Options

1. **PythonAnywhere** (Backend)
2. **Vercel/Netlify** (Frontend)
3. **Railway.app** (Full stack)
4. **Heroku** (Full stack)

## 📁 Project Structure

```
NexusCare/
├── backend/
│   ├── app.py                 # Main Flask application
│   ├── requirements.txt       # Python dependencies
│   ├── .env.example          # Environment variables template
│   ├── nexuscare.log         # Application logs
│   └── database/
│       └── schema.sql        # Database schema
│
├── frontend/
│   ├── public/
│   │   └── index.html        # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.js     # Navigation component
│   │   ├── pages/
│   │   │   ├── Login.js      # Login page
│   │   │   ├── Register.js   # Registration page
│   │   │   ├── Dashboard.js  # Dashboard page
│   │   │   ├── Complaints.js # Complaint management
│   │   │   ├── AdminPanel.js # Admin panel
│   │   │   ├── NotFound.js   # 404 page
│   │   │   └── Unauthorized.js # 401 page
│   │   ├── services/
│   │   │   └── api.js        # API service layer
│   │   ├── App.js            # Main React component
│   │   ├── index.js          # React entry point
│   │   └── index.css         # Global styles
│   └── package.json          # Node dependencies
│
└── README.md                  # This file
```

## 🔒 Security Features

1. **Password Hashing**: All passwords are hashed using Werkzeug's secure hashing
2. **Session Management**: Secure HTTP-only session cookies
3. **CORS Protection**: Configured to allow only trusted origins
4. **Role-Based Access Control**: Endpoints protected by user roles
5. **SQL Injection Prevention**: Parameterized queries
6. **XSS Protection**: Input sanitization
7. **Audit Logging**: All CRUD operations are logged

## 📝 Logging

Application logs are stored in `backend/nexuscare.log` and include:
- User login/logout events
- CRUD operations
- Error messages
- Security events

## 🐛 Troubleshooting

### Database Connection Error
- Verify MySQL is running
- Check database credentials in `.env`
- Ensure database exists

### CORS Error
- Verify backend URL in `frontend/src/services/api.js`
- Check CORS configuration in `backend/app.py`

### Session Not Persisting
- Ensure `withCredentials: true` in axios config
- Check cookie settings in browser
- Verify Flask session configuration

## 📊 Project Report Sections

Your project report should include:

1. **Introduction**: Project overview and objectives
2. **System Architecture**: Frontend-backend-database interaction
3. **Technology Justification**: Why React, Flask, MySQL?
4. **Database Design**: ERD and schema explanation
5. **Implementation Details**: Key features and code snippets
6. **Security Measures**: Authentication, authorization, etc.
7. **Testing**: Test cases and results
8. **Challenges**: Problems faced and solutions
9. **Future Enhancements**: Potential improvements
10. **Conclusion**: Project summary and learning outcomes

## 👨‍💻 Development Team

- Team Member 1: [Your Name]
- Team Member 2: [Name]
- Team Member 3: [Name]
- Team Member 4: [Name] (optional)

## 📄 License

This project is developed as part of an academic assignment.

## 🙏 Acknowledgments

- Course Instructor
- University/Institution Name
- Any references or resources used

---

**Last Updated**: December 2024
**Version**: 1.0.0
**Status**: Production Ready ✅
