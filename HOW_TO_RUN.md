# 🚀 HOW TO RUN NEXUSCARE - SIMPLE GUIDE

## ⚡ SUPER QUICK START (For when I'm not here!)

### 📋 Before You Start - One Time Setup

#### 1️⃣ Setup Database (ONLY ONCE)
```bash
# Open MySQL Command Line or MySQL Workbench
# Login with your MySQL password
# Then run this command:

mysql -u root -p
# Enter your MySQL password when prompted

# Then paste this:
source C:/Users/ziaur/Downloads/NexusCare/backend/database/schema.sql;

# You should see "Database created" messages
# Type: exit
```

#### 2️⃣ Setup Backend (ONLY ONCE)
```bash
# Open Command Prompt or PowerShell
cd C:/Users/ziaur/Downloads/NexusCare/backend

# Create virtual environment
python -m venv venv

# Activate it
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
copy .env.example .env

# IMPORTANT: Edit .env file and add your MySQL password
# Open .env in notepad and change this line:
# DB_PASSWORD=your_mysql_password_here
notepad .env
```

#### 3️⃣ Setup Frontend (ONLY ONCE)
```bash
# Open a NEW Command Prompt
cd C:/Users/ziaur/Downloads/NexusCare/frontend

# Install dependencies (this takes 2-3 minutes)
npm install
```

---

## 🎯 EVERY TIME YOU WANT TO RUN THE PROJECT

### Method 1: EASIEST - Use the Start Script

1. **Double-click** `start.bat` file in the NexusCare folder
2. Two windows will open automatically
3. Wait 10 seconds
4. Browser will open at http://localhost:3000
5. **Done!** ✅

### Method 2: Manual Start (If start.bat doesn't work)

#### Step 1: Start Backend
```bash
# Open Command Prompt #1
cd C:/Users/ziaur/Downloads/NexusCare/backend
venv\Scripts\activate
python app.py

# You should see:
# * Running on http://127.0.0.1:5000
# Keep this window OPEN!
```

#### Step 2: Start Frontend
```bash
# Open Command Prompt #2 (NEW WINDOW)
cd C:/Users/ziaur/Downloads/NexusCare/frontend
npm start

# Browser will open automatically
# If not, go to: http://localhost:3000
```

---

## 🔑 LOGIN CREDENTIALS

**Admin Account:**
- Username: `admin`
- Password: `admin123`

**Resident Account:**
- Username: `resident1`
- Password: `admin123`

---

## ✅ HOW TO KNOW IT'S WORKING

### Backend is Running ✅
You should see in Command Prompt:
```
 * Running on http://127.0.0.1:5000
 * Running on http://0.0.0.0:5000
```

### Frontend is Running ✅
You should see in Command Prompt:
```
Compiled successfully!
webpack compiled with 0 warnings

You can now view nexuscare-frontend in the browser.
  Local:            http://localhost:3000
```

### Browser Opens ✅
- You see the NexusCare login page
- It looks modern and colorful
- You can type in the username/password fields

---

## 🛑 HOW TO STOP THE PROJECT

1. **Close the browser**
2. **In Backend Command Prompt:** Press `Ctrl + C`
3. **In Frontend Command Prompt:** Press `Ctrl + C`
4. **Close both Command Prompt windows**

---

## ❌ TROUBLESHOOTING

### Problem: "python is not recognized"
**Solution:** Install Python from https://www.python.org/downloads/
- ✅ Check "Add Python to PATH" during installation

### Problem: "npm is not recognized"
**Solution:** Install Node.js from https://nodejs.org/
- Download the LTS version
- Restart computer after installation

### Problem: "Cannot connect to database"
**Solution:**
1. Make sure MySQL is running (check Services)
2. Check your password in `backend/.env` file
3. Make sure you ran the schema.sql file

### Problem: "Port 5000 already in use"
**Solution:**
```bash
# Find what's using port 5000
netstat -ano | findstr :5000

# Kill that process (replace XXXX with the PID number)
taskkill /PID XXXX /F
```

### Problem: "Port 3000 already in use"
**Solution:**
- When asked, type `Y` to use a different port (3001)

### Problem: Backend starts but shows errors
**Solution:**
1. Make sure virtual environment is activated (you see `(venv)` in prompt)
2. Reinstall dependencies: `pip install -r requirements.txt`
3. Check .env file has correct MySQL password

### Problem: Frontend shows blank page
**Solution:**
1. Check browser console (F12) for errors
2. Make sure backend is running on port 5000
3. Clear browser cache (Ctrl + Shift + Delete)

---

## 📱 TESTING THE APPLICATION

### Test 1: Login
1. Go to http://localhost:3000
2. Enter username: `admin`
3. Enter password: `admin123`
4. Click "Login"
5. ✅ You should see the Dashboard

### Test 2: Create Complaint
1. Click "Complaints" in navbar
2. Click "+ New Complaint"
3. Fill in the form
4. Click "Create Complaint"
5. ✅ You should see it in the list

### Test 3: Admin Panel
1. Login as admin
2. Click "Admin Panel" in navbar
3. ✅ You should see statistics and user list

---

## 📸 WHAT YOU SHOULD SEE

### Login Page:
- Modern design with gradient background
- NexusCare logo (🏘️)
- Username and password fields
- "Login" button
- Link to register

### Dashboard:
- Welcome message with your username
- Feature cards (Complaint Management, etc.)
- Statistics cards at bottom
- Navbar at top

### Complaints Page:
- Table with complaints
- Filter buttons (All, Open, In Progress, Resolved)
- "+ New Complaint" button
- Edit and Delete buttons

---

## 🎯 QUICK REFERENCE

| What | Command | Where |
|------|---------|-------|
| Start Backend | `python app.py` | backend folder (with venv activated) |
| Start Frontend | `npm start` | frontend folder |
| Stop Server | `Ctrl + C` | In the command prompt |
| Login | http://localhost:3000 | Browser |
| Admin User | admin / admin123 | Login page |

---

## 📞 EMERGENCY CHECKLIST

If nothing works, follow these steps:

1. ✅ Is MySQL running? (Check Services)
2. ✅ Did you run schema.sql? (Check database exists)
3. ✅ Is .env file configured? (Check password)
4. ✅ Are dependencies installed? (backend and frontend)
5. ✅ Are both servers running? (backend and frontend)
6. ✅ Is browser pointing to http://localhost:3000?

---

## 💡 TIPS FOR PRESENTATION DAY

1. **Test everything the night before**
2. **Start servers 5 minutes before presentation**
3. **Have backup screenshots ready**
4. **Know the demo accounts by heart**
5. **Practice the demo flow**
6. **Stay calm - you've got this!**

---

## 🎬 DEMO FLOW (5 minutes)

1. **Show Login** (30 sec)
   - Login as resident1
   
2. **Show Dashboard** (30 sec)
   - Point out features
   
3. **Create Complaint** (1 min)
   - Click "Complaints"
   - Click "+ New Complaint"
   - Fill form and submit
   
4. **Manage Complaints** (1 min)
   - Show filtering
   - Edit a complaint
   
5. **Admin Features** (1.5 min)
   - Logout
   - Login as admin
   - Show admin panel
   - Show statistics
   - Update complaint status
   
6. **Security Demo** (30 sec)
   - Try accessing admin as resident
   - Show unauthorized page

---

## ✅ FINAL CHECKLIST BEFORE DEMO

- [ ] MySQL is running
- [ ] Backend server started (port 5000)
- [ ] Frontend server started (port 3000)
- [ ] Browser open at http://localhost:3000
- [ ] Can login as admin
- [ ] Can login as resident
- [ ] Can create complaint
- [ ] Can view admin panel
- [ ] Backup screenshots ready

---

## 🆘 IF SOMETHING BREAKS DURING DEMO

**Plan A:** Use the running application

**Plan B:** Show backup screenshots

**Plan C:** Explain what should happen and show code

**Stay Calm:** Explain the issue professionally

---

## 📝 REMEMBER

- **Backend MUST run first** (port 5000)
- **Then start Frontend** (port 3000)
- **Keep both windows open** while using the app
- **Don't close the command prompts** until you're done

---

## 🎉 YOU'RE READY!

This project is **production-ready** and **fully functional**.

**Everything works perfectly** - just follow the steps above!

**Good luck! 🚀**

---

**Last Updated:** December 9, 2024
**Status:** ✅ Ready to Run
