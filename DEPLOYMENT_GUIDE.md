# 🚀 Free Deployment Guide for NexusCare

## 📋 Deployment Overview

Your NexusCare app has 3 parts:
1. **Frontend** (React) → Deploy to Vercel/Netlify
2. **Backend** (Flask) → Deploy to Render/Railway
3. **Database** (MySQL) → Use free cloud database

---

## ✨ RECOMMENDED: Best Free Deployment Strategy

### Option 1: Complete Free Deployment (RECOMMENDED)

**Frontend:** Vercel (Free)
**Backend:** Render (Free)
**Database:** Railway MySQL (Free) or PlanetScale (Free)

**Total Cost:** $0/month
**Setup Time:** 30 minutes

---

## 🎯 STEP-BY-STEP DEPLOYMENT

---

## Part 1: Deploy Frontend to Vercel (10 minutes)

### Step 1: Prepare Frontend for Deployment

Create a new file `frontend/.env.production`:

```env
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

Update `frontend/src/services/api.js`:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

### Step 2: Deploy to Vercel

**Method A: Using Vercel Website (Easiest)**

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "New Project"
4. Import your repository: `ziaur390/NexusCare`
5. Configure:
   - **Framework Preset:** Create React App
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
6. Add Environment Variable:
   - Name: `REACT_APP_API_URL`
   - Value: (leave blank for now, update after backend deployment)
7. Click "Deploy"

**Method B: Using Vercel CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to frontend
cd frontend

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: nexuscare-frontend
# - Directory: ./
# - Build command: npm run build
# - Output directory: build
```

**Your frontend will be live at:** `https://nexuscare-frontend.vercel.app`

---

## Part 2: Deploy Database (5 minutes)

### Option A: Railway MySQL (RECOMMENDED)

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Provision MySQL"
4. Click on MySQL service
5. Go to "Connect" tab
6. Copy connection details:
   - Host
   - Port
   - Username
   - Password
   - Database name

### Option B: PlanetScale (Alternative)

1. Go to https://planetscale.com
2. Sign up (free tier)
3. Create new database: `nexuscare_db`
4. Get connection string

### Step 3: Import Database Schema

**For Railway:**

```bash
# Connect to Railway MySQL
mysql -h <railway-host> -P <port> -u <username> -p

# Enter password when prompted
# Then paste your schema.sql content
```

**Or use Railway's web interface:**
1. Go to Railway dashboard
2. Click on MySQL service
3. Click "Query" tab
4. Paste your `backend/database/schema.sql` content
5. Execute

---

## Part 3: Deploy Backend to Render (15 minutes)

### Step 1: Prepare Backend for Deployment

Create `backend/render.yaml`:

```yaml
services:
  - type: web
    name: nexuscare-backend
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: gunicorn app:app
    envVars:
      - key: PYTHON_VERSION
        value: 3.11.0
      - key: SECRET_KEY
        generateValue: true
      - key: DB_HOST
        sync: false
      - key: DB_USER
        sync: false
      - key: DB_PASSWORD
        sync: false
      - key: DB_NAME
        sync: false
```

Update `backend/requirements.txt`:

```txt
Flask==3.0.0
Flask-CORS==4.0.0
mysql-connector-python==8.2.0
python-dotenv==1.0.0
Werkzeug==3.0.1
gunicorn==21.2.0
```

Update `backend/app.py` CORS configuration:

```python
# Update CORS to allow your Vercel frontend
CORS(app, supports_credentials=True, origins=[
    'http://localhost:3000',
    'https://nexuscare-frontend.vercel.app',  # Add your Vercel URL
    'https://*.vercel.app'  # Allow all Vercel preview deployments
])
```

### Step 2: Deploy to Render

1. Go to https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository: `ziaur390/NexusCare`
5. Configure:
   - **Name:** nexuscare-backend
   - **Root Directory:** `backend`
   - **Environment:** Python 3
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn app:app`
6. Add Environment Variables:
   - `SECRET_KEY`: (generate random string)
   - `DB_HOST`: (from Railway)
   - `DB_USER`: (from Railway)
   - `DB_PASSWORD`: (from Railway)
   - `DB_NAME`: (from Railway)
7. Click "Create Web Service"

**Your backend will be live at:** `https://nexuscare-backend.onrender.com`

### Step 3: Update Frontend Environment Variable

1. Go back to Vercel dashboard
2. Go to your project settings
3. Update `REACT_APP_API_URL` to: `https://nexuscare-backend.onrender.com/api`
4. Redeploy frontend

---

## 🎉 Your App is Now Live!

**Frontend:** https://nexuscare-frontend.vercel.app
**Backend:** https://nexuscare-backend.onrender.com
**Database:** Hosted on Railway

---

## 🧪 Testing Deployment

1. Visit your Vercel URL
2. Try to login with: admin / admin123
3. Create a complaint
4. Check admin panel

If everything works, you're done! 🎉

---

## 🔧 Alternative: Deploy Everything to Railway

### All-in-One Railway Deployment

1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will detect both frontend and backend
5. Add MySQL service
6. Configure environment variables
7. Deploy!

**Pros:** Everything in one place
**Cons:** Limited free tier

---

## 📱 Alternative: Deploy Frontend to GitHub Pages

### GitHub Pages Deployment

**Note:** GitHub Pages only supports static sites, so you can only deploy the frontend.

1. Install gh-pages:
```bash
cd frontend
npm install --save-dev gh-pages
```

2. Update `frontend/package.json`:
```json
{
  "homepage": "https://ziaur390.github.io/NexusCare",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

3. Deploy:
```bash
npm run deploy
```

**Your frontend will be at:** https://ziaur390.github.io/NexusCare

---

## 🆓 Free Tier Limits

### Vercel (Frontend)
- ✅ Unlimited deployments
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ 100GB bandwidth/month

### Render (Backend)
- ✅ 750 hours/month (enough for 1 app)
- ⚠️ Sleeps after 15 min inactivity
- ✅ Automatic HTTPS
- ⚠️ First request after sleep takes ~30 seconds

### Railway (Database)
- ✅ $5 free credit/month
- ✅ Enough for small database
- ✅ Automatic backups

---

## 🚨 Important: Update CORS and Environment Variables

### Backend CORS Update

In `backend/app.py`, update CORS:

```python
CORS(app, supports_credentials=True, origins=[
    'http://localhost:3000',
    'https://nexuscare-frontend.vercel.app',
    'https://*.vercel.app'
])
```

### Frontend API URL Update

In `frontend/src/services/api.js`:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

---

## 📝 Deployment Checklist

### Before Deployment
- [ ] Update CORS in backend
- [ ] Add gunicorn to requirements.txt
- [ ] Create production environment variables
- [ ] Test locally one more time

### During Deployment
- [ ] Deploy database first
- [ ] Import schema to database
- [ ] Deploy backend with database credentials
- [ ] Test backend API endpoints
- [ ] Deploy frontend with backend URL
- [ ] Test complete application

### After Deployment
- [ ] Test login functionality
- [ ] Test CRUD operations
- [ ] Test admin panel
- [ ] Check browser console for errors
- [ ] Test on mobile device

---

## 🔍 Troubleshooting

### Frontend can't connect to backend

**Check:**
1. CORS is configured correctly in backend
2. API URL is correct in frontend .env
3. Backend is running (not sleeping)

**Fix:**
```javascript
// In frontend/src/services/api.js
console.log('API URL:', API_BASE_URL); // Check what URL is being used
```

### Backend shows "Cannot connect to database"

**Check:**
1. Database is running
2. Environment variables are set correctly
3. Database credentials are correct

**Fix:**
- Verify environment variables in Render dashboard
- Test database connection separately

### Render backend sleeps after 15 minutes

**Solutions:**
1. Upgrade to paid plan ($7/month)
2. Use a service like UptimeRobot to ping your backend every 5 minutes (keeps it awake)
3. Accept the 30-second delay on first request

---

## 💰 Cost Comparison

| Service | Free Tier | Paid Tier |
|---------|-----------|-----------|
| Vercel | ✅ Free forever | $20/month |
| Render | ✅ 750 hours/month | $7/month |
| Railway | ✅ $5 credit/month | $5/month usage-based |
| PlanetScale | ✅ 5GB storage | $29/month |
| Netlify | ✅ 100GB bandwidth | $19/month |

**Recommended for students:** Use all free tiers = $0/month!

---

## 🎯 Quick Deploy Commands

### Deploy Frontend to Vercel
```bash
cd frontend
npm install -g vercel
vercel --prod
```

### Deploy Backend to Render
```bash
# Just push to GitHub, Render auto-deploys
git add .
git commit -m "Prepare for deployment"
git push
```

---

## 📚 Additional Resources

**Vercel Docs:** https://vercel.com/docs
**Render Docs:** https://render.com/docs
**Railway Docs:** https://docs.railway.app

---

## ✅ Success Indicators

Your deployment is successful when:
- ✅ Frontend loads without errors
- ✅ Can login with demo credentials
- ✅ Can create complaints
- ✅ Can view admin panel
- ✅ All API calls work
- ✅ No CORS errors in console

---

## 🎉 After Deployment

### Share Your Live App!

**Add to your resume:**
```
NexusCare - Smart Community Services Platform
Live Demo: https://nexuscare-frontend.vercel.app
GitHub: https://github.com/ziaur390/NexusCare
```

**Add to your project report:**
```
Live Deployment: https://nexuscare-frontend.vercel.app
Backend API: https://nexuscare-backend.onrender.com
```

**Add to your presentation:**
```
🌐 Live Demo Available!
Visit: nexuscare-frontend.vercel.app
```

---

## 🏆 Bonus Points

Deploying your project shows:
- ✅ Production-ready code
- ✅ DevOps knowledge
- ✅ Cloud deployment skills
- ✅ Professional portfolio piece
- ✅ Extra credit potential!

---

**Last Updated:** December 9, 2024
**Status:** Ready to Deploy! 🚀

**Good luck with deployment! You're almost there! 💪**
