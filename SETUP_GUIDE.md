# NexusCare - Setup and Installation Guide

## Quick Start Guide

### Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js 16+ installed (`node --version`)
- ✅ Python 3.8+ installed (`python --version`)
- ✅ MySQL 8.0+ installed and running
- ✅ Git installed

### Step-by-Step Installation

## 1. Database Setup

### Option A: Using MySQL Command Line

```bash
# Login to MySQL
mysql -u root -p

# Run the schema
source C:/Users/ziaur/Downloads/NexusCare/backend/database/schema.sql

# Verify
USE nexuscare_db;
SHOW TABLES;
SELECT * FROM users;
```

### Option B: Using MySQL Workbench

1. Open MySQL Workbench
2. Connect to your local MySQL server
3. File → Open SQL Script
4. Select `backend/database/schema.sql`
5. Execute the script (⚡ icon)
6. Refresh schemas to see `nexuscare_db`

## 2. Backend Setup

```bash
# Navigate to backend directory
cd C:/Users/ziaur/Downloads/NexusCare/backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file from example
copy .env.example .env

# Edit .env file with your MySQL credentials
# Use notepad or any text editor
notepad .env
```

### Configure .env file:

```env
SECRET_KEY=nexuscare-secret-key-2024
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=nexuscare_db
```

## 3. Frontend Setup

```bash
# Open a NEW terminal/command prompt
cd C:/Users/ziaur/Downloads/NexusCare/frontend

# Install dependencies
npm install
```

## 4. Running the Application

### Terminal 1 - Backend

```bash
cd C:/Users/ziaur/Downloads/NexusCare/backend
venv\Scripts\activate
python app.py
```

You should see:
```
 * Running on http://127.0.0.1:5000
 * Running on http://0.0.0.0:5000
```

### Terminal 2 - Frontend

```bash
cd C:/Users/ziaur/Downloads/NexusCare/frontend
npm start
```

Browser will automatically open at `http://localhost:3000`

## 5. First Login

Use these demo credentials:

**Admin Account:**
- Username: `admin`
- Password: `admin123`

**Resident Account:**
- Username: `resident1`
- Password: `admin123`

## Troubleshooting

### Issue: "Module not found" error in Python

**Solution:**
```bash
# Make sure virtual environment is activated
venv\Scripts\activate

# Reinstall dependencies
pip install -r requirements.txt
```

### Issue: "Cannot connect to MySQL"

**Solution:**
1. Verify MySQL is running (check Services on Windows)
2. Check your `.env` file has correct credentials
3. Test MySQL connection:
```bash
mysql -u root -p
```

### Issue: "Port 5000 already in use"

**Solution:**
```bash
# Find and kill the process using port 5000
netstat -ano | findstr :5000
taskkill /PID <process_id> /F
```

### Issue: "Port 3000 already in use"

**Solution:**
```bash
# The terminal will ask if you want to use another port
# Type 'Y' to use port 3001 instead
```

### Issue: CORS errors in browser console

**Solution:**
1. Ensure backend is running on port 5000
2. Check `frontend/src/services/api.js` has correct backend URL
3. Clear browser cache and cookies

### Issue: "npm install" fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rmdir /s node_modules
del package-lock.json

# Reinstall
npm install
```

## Testing the Application

### 1. Test User Registration

1. Go to `http://localhost:3000/register`
2. Fill in the form with test data
3. Click "Register"
4. You should be redirected to login page

### 2. Test Login

1. Use admin credentials
2. You should see the dashboard

### 3. Test Complaint Creation

1. Navigate to "Complaints" from navbar
2. Click "+ New Complaint"
3. Fill in the form
4. Submit
5. Complaint should appear in the table

### 4. Test Admin Panel

1. Login as admin
2. Click "Admin Panel" in navbar
3. You should see user statistics and user list

## Production Deployment Checklist

Before deploying to production:

- [ ] Change all default passwords
- [ ] Update `SECRET_KEY` in `.env`
- [ ] Set `debug=False` in Flask app
- [ ] Configure production database
- [ ] Set up HTTPS/SSL
- [ ] Configure proper CORS origins
- [ ] Set up backup strategy
- [ ] Configure logging properly
- [ ] Run security audit
- [ ] Test all features thoroughly

## Development Tips

### Hot Reload

Both frontend and backend support hot reload:
- **Frontend**: Automatically reloads on file changes
- **Backend**: Restart required (or use `flask run --reload`)

### Debugging

**Backend:**
```python
# Add print statements or use Flask debugger
print(f"Debug: {variable}")
```

**Frontend:**
```javascript
// Use console.log
console.log('Debug:', variable);
```

### Database Changes

After modifying schema:
```bash
# Backup existing data first!
mysqldump -u root -p nexuscare_db > backup.sql

# Drop and recreate database
mysql -u root -p < backend/database/schema.sql
```

## Next Steps

1. ✅ Complete installation
2. ✅ Test all features
3. ✅ Customize for your needs
4. ✅ Prepare presentation
5. ✅ Write project report
6. ✅ Create demo video

## Support

If you encounter issues:
1. Check this troubleshooting guide
2. Review error logs in `backend/nexuscare.log`
3. Check browser console for frontend errors
4. Verify all services are running

---

**Good luck with your project! 🚀**
