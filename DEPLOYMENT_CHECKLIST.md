# ✅ Deployment Checklist

Use this checklist to ensure smooth deployment of your ROI Calculator.

## 📋 Pre-Deployment Checklist

### Code Preparation
- [ ] All features tested locally
- [ ] Backend runs without errors (`node backend/server.js`)
- [ ] Frontend runs without errors (`npm start` in frontend folder)
- [ ] Database connection works
- [ ] All scenarios can be saved/loaded/deleted
- [ ] PDF generation works

### Git & GitHub
- [ ] Git initialized (`git init`)
- [ ] `.gitignore` file created and configured
- [ ] `.env` files are NOT committed (check .gitignore)
- [ ] All changes committed
- [ ] Repository created on GitHub
- [ ] Code pushed to GitHub (`git push`)

### Environment Configuration
- [ ] `frontend/.env.production` created
- [ ] `frontend/.env.development` created
- [ ] `backend/.env.example` created
- [ ] Environment variables documented

---

## 🗄️ Database Deployment (Railway)

- [ ] Railway account created
- [ ] MySQL database provisioned
- [ ] Database credentials saved:
  - [ ] MYSQLHOST
  - [ ] MYSQLPORT
  - [ ] MYSQLUSER
  - [ ] MYSQLPASSWORD
  - [ ] MYSQLDATABASE
- [ ] Database is accessible (test connection)

---

## 🔧 Backend Deployment (Render)

- [ ] Render account created
- [ ] GitHub repository connected
- [ ] Web service created with settings:
  - [ ] Name: `roi-calculator-api`
  - [ ] Root Directory: `backend`
  - [ ] Build Command: `npm install`
  - [ ] Start Command: `node server.js`
  - [ ] Environment: Node
  - [ ] Plan: Free

- [ ] Environment variables added:
  - [ ] `NODE_ENV=production`
  - [ ] `PORT=10000`
  - [ ] `DB_HOST=<railway-host>`
  - [ ] `DB_PORT=3306`
  - [ ] `DB_USER=<railway-user>`
  - [ ] `DB_PASSWORD=<railway-password>`
  - [ ] `DB_NAME=roi_calculator`
  - [ ] `FRONTEND_URL=<vercel-url>` (add after frontend deployment)

- [ ] Service deployed successfully
- [ ] Backend URL noted: `https://______.onrender.com`
- [ ] Health check works: `/health` endpoint returns OK

---

## 🎨 Frontend Deployment (Vercel)

- [ ] Vercel account created
- [ ] GitHub repository connected
- [ ] Project configured with settings:
  - [ ] Framework: Create React App
  - [ ] Root Directory: `frontend`
  - [ ] Build Command: `npm run build`
  - [ ] Output Directory: `build`

- [ ] Environment variable added:
  - [ ] `REACT_APP_API_URL=<render-backend-url>`

- [ ] Project deployed successfully
- [ ] Frontend URL noted: `https://______.vercel.app`
- [ ] App loads without errors

---

## 🔗 Integration & Testing

- [ ] Backend CORS updated with frontend URL
- [ ] Frontend can connect to backend
- [ ] Test all features:
  - [ ] Calculate ROI
  - [ ] Save scenario
  - [ ] Load scenario
  - [ ] Delete scenario
  - [ ] Generate PDF report
  - [ ] View saved scenarios list

- [ ] Check browser console for errors
- [ ] Check network tab for API calls
- [ ] Test on different browsers:
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge

- [ ] Test on mobile devices:
  - [ ] Mobile Chrome
  - [ ] Mobile Safari

---

## 📊 Post-Deployment

- [ ] Database has scenarios table
- [ ] Can save data to database
- [ ] Data persists after page refresh
- [ ] PDF reports generate correctly
- [ ] All calculations are accurate

---

## 🔐 Security Check

- [ ] `.env` files not in Git repository
- [ ] Database credentials secure
- [ ] CORS configured (not using `*`)
- [ ] HTTPS enabled (automatic on Vercel/Render)
- [ ] No sensitive data in frontend code

---

## 📈 Monitoring Setup (Optional)

- [ ] UptimeRobot configured (keep backend awake)
- [ ] Error tracking setup (Sentry)
- [ ] Analytics added (Google Analytics)
- [ ] Performance monitoring enabled

---

## 📝 Documentation

- [ ] README.md updated with live URLs
- [ ] DEPLOYMENT_GUIDE.md reviewed
- [ ] API documentation complete
- [ ] User guide created

---

## 🎉 Launch

- [ ] All tests passing
- [ ] No console errors
- [ ] Performance acceptable
- [ ] Mobile responsive
- [ ] Ready to share!

---

## 📞 Important URLs

Fill in after deployment:

**Frontend (Vercel):**
```
https://________________________________.vercel.app
```

**Backend (Render):**
```
https://________________________________.onrender.com
```

**Database (Railway):**
```
Host: ________________________________
Port: 3306
Database: roi_calculator
```

**GitHub Repository:**
```
https://github.com/____________/roi-calculator
```

---

## 🚨 Troubleshooting Quick Links

If something goes wrong:

1. **Backend Logs:** Render Dashboard → Your Service → Logs
2. **Frontend Logs:** Vercel Dashboard → Your Project → Deployments → Logs
3. **Database Logs:** Railway Dashboard → MySQL Service → Logs
4. **Browser Console:** F12 → Console tab
5. **Network Errors:** F12 → Network tab

---

## 🔄 Redeployment Process

When you make changes:

```bash
# 1. Make your changes locally
# 2. Test locally
# 3. Commit changes
git add .
git commit -m "Description of changes"

# 4. Push to GitHub
git push

# 5. Automatic deployment happens!
# - Vercel redeploys frontend automatically
# - Render redeploys backend automatically
```

---

## ✅ Deployment Complete!

Once all items are checked, your ROI Calculator is live! 🎊

**Share your app:**
- Send the Vercel URL to users
- Add to your portfolio
- Share on social media
- Get feedback and iterate!

---

**Last Updated:** [Add date after deployment]
**Deployed By:** [Your name]
**Version:** 1.0.0