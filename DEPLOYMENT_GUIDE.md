# 🚀 Deployment Guide - ROI Calculator

This guide will help you deploy your ROI Calculator application live on the internet using **Render** (backend + database) and **Vercel** (frontend).

## 📋 Prerequisites

Before you start, make sure you have:

1. ✅ A GitHub account (to push your code)
2. ✅ A Render account (sign up at https://render.com - free)
3. ✅ A Vercel account (sign up at https://vercel.com - free)
4. ✅ Git installed on your computer

---

## 🎯 Deployment Overview

We'll deploy in this order:
1. **Push code to GitHub** (version control)
2. **Deploy Backend + Database on Render** (API + MySQL)
3. **Deploy Frontend on Vercel** (React app)
4. **Connect Frontend to Backend** (configure API URL)

---

## 📦 Step 1: Push Code to GitHub

### 1.1 Initialize Git Repository

Open your terminal in the project root directory:

```bash
cd c:\Users\sdotv\roi-calculator
git init
```

### 1.2 Create .gitignore file

Make sure you have a `.gitignore` file to exclude sensitive files:

```bash
# Check if .gitignore exists
type .gitignore
```

If it doesn't exist or needs updating, it should contain:

```
# Dependencies
node_modules/
frontend/node_modules/
backend/node_modules/

# Environment variables
.env
backend/.env
frontend/.env.local

# Build files
frontend/build/
backend/reports/*.pdf

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Logs
*.log
npm-debug.log*
```

### 1.3 Commit and Push to GitHub

```bash
# Add all files
git add .

# Commit
git commit -m "Initial commit - ROI Calculator ready for deployment"

# Create a new repository on GitHub (go to github.com and create new repo)
# Then connect and push:
git remote add origin https://github.com/YOUR_USERNAME/roi-calculator.git
git branch -M main
git push -u origin main
```

---

## 🗄️ Step 2: Deploy Backend + Database on Render

### 2.1 Create Render Account

1. Go to https://render.com
2. Sign up with GitHub (recommended)
3. Authorize Render to access your repositories

### 2.2 Create MySQL Database

1. Click **"New +"** → **"PostgreSQL"** → Wait! We need MySQL
2. Actually, Render doesn't offer free MySQL. Let's use **Railway** or **PlanetScale** instead

#### Option A: Use Railway for MySQL (Recommended)

1. Go to https://railway.app
2. Sign up with GitHub
3. Click **"New Project"** → **"Provision MySQL"**
4. Once created, click on the MySQL service
5. Go to **"Variables"** tab and note down:
   - `MYSQLHOST`
   - `MYSQLPORT`
   - `MYSQLUSER`
   - `MYSQLPASSWORD`
   - `MYSQLDATABASE`

#### Option B: Use PlanetScale (MySQL-compatible)

1. Go to https://planetscale.com
2. Sign up and create a new database
3. Name it `roi-calculator`
4. Get connection details from the dashboard

### 2.3 Deploy Backend on Render

1. Go to Render Dashboard
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:

   **Settings:**
   - **Name:** `roi-calculator-api`
   - **Region:** Choose closest to you
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Plan:** Free

5. **Add Environment Variables:**

   Click **"Advanced"** → **"Add Environment Variable"**

   Add these variables (use values from Railway/PlanetScale):

   ```
   NODE_ENV=production
   PORT=10000
   DB_HOST=<your-database-host>
   DB_PORT=3306
   DB_USER=<your-database-user>
   DB_PASSWORD=<your-database-password>
   DB_NAME=roi_calculator
   FRONTEND_URL=https://your-app.vercel.app
   ```

6. Click **"Create Web Service"**

7. Wait for deployment (5-10 minutes)

8. Once deployed, you'll get a URL like: `https://roi-calculator-api.onrender.com`

9. **Test the API:**
   - Open: `https://roi-calculator-api.onrender.com/health`
   - You should see: `{"status":"OK","timestamp":"..."}`

---

## 🎨 Step 3: Deploy Frontend on Vercel

### 3.1 Update Frontend Environment Variables

Before deploying, update the production API URL:

Edit `frontend/.env.production`:

```env
REACT_APP_API_URL=https://roi-calculator-api.onrender.com
```

Replace with your actual Render backend URL.

### 3.2 Commit the Changes

```bash
git add frontend/.env.production
git commit -m "Update production API URL"
git push
```

### 3.3 Deploy to Vercel

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click **"Add New..."** → **"Project"**
4. Import your `roi-calculator` repository
5. Configure the project:

   **Settings:**
   - **Framework Preset:** Create React App
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
   - **Install Command:** `npm install`

6. **Add Environment Variables:**

   Click **"Environment Variables"** and add:

   ```
   REACT_APP_API_URL=https://roi-calculator-api.onrender.com
   ```

7. Click **"Deploy"**

8. Wait for deployment (3-5 minutes)

9. Once deployed, you'll get a URL like: `https://roi-calculator-xyz.vercel.app`

---

## 🔗 Step 4: Connect Frontend to Backend

### 4.1 Update Backend CORS

Go back to Render and update the backend environment variable:

1. Open your backend service on Render
2. Go to **"Environment"** tab
3. Add/Update:
   ```
   FRONTEND_URL=https://roi-calculator-xyz.vercel.app
   ```
4. Click **"Save Changes"**
5. The service will automatically redeploy

### 4.2 Test the Connection

1. Open your Vercel URL: `https://roi-calculator-xyz.vercel.app`
2. Try calculating ROI
3. Try saving a scenario
4. Check if everything works!

---

## ✅ Step 5: Verify Deployment

### Test Checklist:

- [ ] Frontend loads without errors
- [ ] Can calculate ROI
- [ ] Can save scenarios
- [ ] Can load saved scenarios
- [ ] Can delete scenarios
- [ ] Can generate PDF reports
- [ ] Database persists data

### Check Browser Console:

1. Open Developer Tools (F12)
2. Go to Console tab
3. Look for any errors
4. Check Network tab for API calls

---

## 🎯 Your Live URLs

After successful deployment, you'll have:

- **Frontend:** `https://roi-calculator-xyz.vercel.app`
- **Backend API:** `https://roi-calculator-api.onrender.com`
- **Database:** Hosted on Railway/PlanetScale

---

## 🔧 Troubleshooting

### Frontend shows "Network Error"

**Problem:** Frontend can't connect to backend

**Solutions:**
1. Check if backend is running: Visit `https://your-backend.onrender.com/health`
2. Verify `REACT_APP_API_URL` in Vercel environment variables
3. Check browser console for CORS errors
4. Ensure `FRONTEND_URL` is set correctly in Render

### Backend shows "Database Connection Error"

**Problem:** Backend can't connect to database

**Solutions:**
1. Verify database credentials in Render environment variables
2. Check if database service is running on Railway/PlanetScale
3. Ensure database allows connections from Render's IP
4. Check database logs for connection attempts

### "Free instance will spin down with inactivity"

**Problem:** Render free tier sleeps after 15 minutes of inactivity

**Solutions:**
1. First request after sleep takes 30-60 seconds (this is normal)
2. Use a service like UptimeRobot to ping your API every 14 minutes
3. Upgrade to paid plan for always-on service

### PDF Generation Fails

**Problem:** Reports don't generate in production

**Solutions:**
1. Check if `reports` directory exists in backend
2. Verify write permissions on Render
3. Check backend logs for errors
4. Ensure pdfkit dependencies are installed

---

## 🚀 Continuous Deployment

Both Vercel and Render support automatic deployments:

### Auto-Deploy on Git Push:

1. Make changes to your code locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your changes"
   git push
   ```
3. Vercel and Render will automatically detect changes and redeploy!

---

## 💰 Cost Breakdown

### Free Tier Limits:

**Vercel (Frontend):**
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Custom domain support

**Render (Backend):**
- ✅ 750 hours/month (enough for 1 service)
- ✅ Automatic HTTPS
- ⚠️ Sleeps after 15 min inactivity
- ⚠️ 512MB RAM

**Railway (Database):**
- ✅ $5 free credit/month
- ✅ ~500 hours of MySQL
- ✅ 1GB storage

**Total Cost:** $0/month (within free tiers)

---

## 🎨 Custom Domain (Optional)

### Add Custom Domain to Vercel:

1. Buy a domain (e.g., from Namecheap, GoDaddy)
2. Go to Vercel project settings
3. Click **"Domains"**
4. Add your domain
5. Update DNS records as instructed
6. Wait for DNS propagation (up to 48 hours)

### Add Custom Domain to Render:

1. Go to Render service settings
2. Click **"Custom Domain"**
3. Add your API subdomain (e.g., `api.yourdomain.com`)
4. Update DNS records
5. Update `REACT_APP_API_URL` in Vercel

---

## 📊 Monitoring & Logs

### View Backend Logs:

1. Go to Render dashboard
2. Click on your service
3. Go to **"Logs"** tab
4. See real-time logs

### View Frontend Logs:

1. Go to Vercel dashboard
2. Click on your project
3. Go to **"Deployments"**
4. Click on a deployment → **"View Function Logs"**

### Database Monitoring:

1. Go to Railway/PlanetScale dashboard
2. View connection stats
3. Monitor query performance
4. Check storage usage

---

## 🔐 Security Best Practices

### Environment Variables:

- ✅ Never commit `.env` files to Git
- ✅ Use different credentials for production
- ✅ Rotate database passwords regularly
- ✅ Use strong passwords (20+ characters)

### CORS Configuration:

- ✅ Set specific `FRONTEND_URL` (not `*`)
- ✅ Only allow your Vercel domain
- ✅ Enable credentials only if needed

### Database Security:

- ✅ Use SSL connections
- ✅ Limit database user permissions
- ✅ Enable firewall rules
- ✅ Regular backups

---

## 📈 Performance Optimization

### Frontend:

1. **Enable Caching:**
   - Vercel automatically caches static assets
   - Use React.memo for expensive components

2. **Optimize Images:**
   - Compress images before uploading
   - Use WebP format

3. **Code Splitting:**
   - Already handled by Create React App

### Backend:

1. **Database Connection Pooling:**
   - Already configured in `database.js`
   - Max 10 connections

2. **Add Caching:**
   - Consider Redis for frequently accessed data
   - Cache scenario lists

3. **Optimize Queries:**
   - Add indexes to frequently queried columns
   - Use prepared statements (already done)

---

## 🎉 Next Steps

After successful deployment:

1. ✅ Share your live URL with users
2. ✅ Set up monitoring (UptimeRobot, Sentry)
3. ✅ Configure custom domain
4. ✅ Add Google Analytics
5. ✅ Set up automated backups
6. ✅ Create user documentation
7. ✅ Plan feature updates

---

## 📞 Support Resources

### Vercel:
- Docs: https://vercel.com/docs
- Community: https://github.com/vercel/vercel/discussions

### Render:
- Docs: https://render.com/docs
- Support: https://render.com/support

### Railway:
- Docs: https://docs.railway.app
- Discord: https://discord.gg/railway

---

## 🎊 Congratulations!

Your ROI Calculator is now live and accessible worldwide! 🌍

**Your Live App:** `https://roi-calculator-xyz.vercel.app`

Share it with your team and start calculating ROI! 🚀

---

**Need Help?** Check the troubleshooting section or review the logs on Render/Vercel.