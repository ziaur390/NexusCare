# 🎯 STEP-BY-STEP SETUP GUIDE FOR NEXUSCARE
## Follow these steps EXACTLY - Takes 10 minutes total!

---

## ✅ WHAT'S ALREADY DONE FOR YOU

- ✅ Python 3.13.1 is installed
- ✅ Node.js 22.13.1 is installed
- ✅ Virtual environment created (backend/venv)
- ✅ .env file created (backend/.env)

---

## 📝 STEP 1: SETUP MYSQL DATABASE (5 minutes)

### Option A: If you have MySQL installed

1. **Open MySQL Workbench** or **MySQL Command Line Client**

2. **Login with your MySQL root password**

3. **Run the schema file:**
   - In MySQL Workbench: File → Open SQL Script → Select `backend/database/schema.sql` → Execute (⚡ icon)
   - In Command Line: 
     ```sql
     source C:/Users/ziaur/Downloads/NexusCare/backend/database/schema.sql
     ```

4. **Verify database created:**
   ```sql
   SHOW DATABASES;
   USE nexuscare_db;
   SHOW TABLES;
   ```
   You should see: users, complaints, audit_logs

5. **Update backend/.env file:**
   - Open `backend/.env` in Notepad
   - Change this line: `DB_PASSWORD=` to `DB_PASSWORD=your_mysql_password`
   - Save and close

### Option B: If you DON'T have MySQL installed

**Download and Install MySQL:**
1. Go to: https://dev.mysql.com/downloads/installer/
2. Download "MySQL Installer for Windows"
3. Run installer
4. Choose "Developer Default"
5. Set root password (remember this!)
6. Complete installation
7. Then follow Option A above

---

## 📝 STEP 2: INSTALL BACKEND DEPENDENCIES (2 minutes)

1. **Open Command Prompt or PowerShell**

2. **Navigate to backend folder:**
   ```bash
   cd C:\Users\ziaur\Downloads\NexusCare\backend
   ```

3. **Activate virtual environment:**
   ```bash
   venv\Scripts\activate
   ```
   You should see `(venv)` at the start of your prompt

4. **Install Python packages:**
   ```bash
   pip install -r requirements.txt
   ```
   This will install: Flask, Flask-CORS, mysql-connector-python, etc.

5. **Verify installation:**
   ```bash
   pip list
   ```
   You should see Flask, mysql-connector-python, etc.

---

## 📝 STEP 3: INSTALL FRONTEND DEPENDENCIES (3 minutes)

1. **Open a NEW Command Prompt** (keep the backend one open)

2. **Navigate to frontend folder:**
   ```bash
   cd C:\Users\ziaur\Downloads\NexusCare\frontend
   ```

3. **Install Node packages:**
   ```bash
   npm install
   ```
   This takes 2-3 minutes. You'll see a progress bar.

4. **Wait for completion:**
   You should see: "added XXX packages" at the end

---

## 🚀 STEP 4: RUN THE APPLICATION

### Terminal 1: Start Backend

```bash
cd C:\Users\ziaur\Downloads\NexusCare\backend
venv\Scripts\activate
python app.py
```

**You should see:**
```
 * Serving Flask app 'app'
 * Debug mode: on
WARNING: This is a development server.
 * Running on http://127.0.0.1:5000
 * Running on http://0.0.0.0:5000
```

✅ **Backend is running!** Keep this window OPEN!

### Terminal 2: Start Frontend

```bash
cd C:\Users\ziaur\Downloads\NexusCare\frontend
npm start
```

**You should see:**
```
Compiled successfully!

You can now view nexuscare-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

✅ **Frontend is running!** Browser will open automatically!

---

## 🎉 STEP 5: TEST THE APPLICATION

1. **Browser should open at:** http://localhost:3000

2. **You should see:** NexusCare login page with modern design

3. **Login with:**
   - Username: `admin`
   - Password: `admin123`

4. **You should see:** Dashboard with welcome message

5. **Test features:**
   - Click "Complaints" → Create a new complaint
   - Click "Admin Panel" → See statistics
   - Logout and login as different user

---

## ✅ SUCCESS CHECKLIST

- [ ] MySQL database created (nexuscare_db)
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] Backend server running (port 5000)
- [ ] Frontend server running (port 3000)
- [ ] Can access http://localhost:3000
- [ ] Can login as admin
- [ ] Can create complaint
- [ ] Can view admin panel

---

## 🔧 TROUBLESHOOTING

### Problem: "Cannot connect to database"

**Check:**
1. Is MySQL running? (Check Windows Services)
2. Is password correct in `backend/.env`?
3. Did you run the schema.sql file?

**Fix:**
```bash
# Open MySQL and verify
mysql -u root -p
SHOW DATABASES;
# You should see nexuscare_db
```

### Problem: "Module not found" in Python

**Fix:**
```bash
cd backend
venv\Scripts\activate
pip install -r requirements.txt
```

### Problem: "npm install" fails

**Fix:**
```bash
cd frontend
npm cache clean --force
npm install
```

### Problem: Port 5000 already in use

**Fix:**
```bash
netstat -ano | findstr :5000
# Find the PID (last column)
taskkill /PID XXXX /F
# Replace XXXX with the actual PID
```

### Problem: Port 3000 already in use

**Answer:** Type `Y` when asked to use a different port

---

## 📱 QUICK REFERENCE COMMANDS

### Every time you want to run the project:

**Terminal 1 (Backend):**
```bash
cd C:\Users\ziaur\Downloads\NexusCare\backend
venv\Scripts\activate
python app.py
```

**Terminal 2 (Frontend):**
```bash
cd C:\Users\ziaur\Downloads\NexusCare\frontend
npm start
```

### To stop the servers:
- Press `Ctrl + C` in each terminal
- Close the terminals

---

## 🎬 FOR YOUR PRESENTATION

### Before Presentation (30 min before):
1. Start both servers
2. Test login
3. Test creating a complaint
4. Test admin panel
5. Have backup screenshots ready

### Demo Flow (5 minutes):
1. Show login (admin/admin123)
2. Show dashboard
3. Create a complaint
4. Show admin panel
5. Show statistics

### Demo Accounts:
- **Admin:** admin / admin123
- **Resident:** resident1 / admin123

---

## 💾 BACKUP PLAN

If live demo fails:
1. Use screenshots (take them now!)
2. Show the code
3. Explain what should happen
4. Stay calm and professional

---

## 📸 TAKE SCREENSHOTS NOW

Take screenshots of:
1. Login page
2. Dashboard
3. Complaints page
4. Create complaint modal
5. Admin panel
6. Statistics

Save them in a folder for backup!

---

## ✨ YOU'RE READY!

Once you complete these steps:
- ✅ Your project is fully functional
- ✅ You can demo it anytime
- ✅ You can submit with confidence
- ✅ You're ready for presentation

---

## 🆘 NEED HELP?

1. Check `HOW_TO_RUN.md` for quick reference
2. Check `SETUP_GUIDE.md` for detailed troubleshooting
3. Check `README.md` for complete documentation
4. Check error logs in `backend/nexuscare.log`

---

## 🎯 NEXT STEPS

1. ✅ Complete this setup (10 minutes)
2. ✅ Test all features (10 minutes)
3. ✅ Take screenshots (5 minutes)
4. ✅ Practice demo (15 minutes)
5. ✅ Complete project report (use template)
6. ✅ Prepare presentation slides
7. ✅ Review submission checklist

---

**Last Updated:** December 9, 2024
**Your Deadline:** Today!
**Status:** Ready to Setup! 🚀

**Good luck! You've got this! 💪**
