# Deployment Checklist

## ✅ Code Updates Complete

### Frontend Updates
- ✅ Created `.env.local` - for local development
- ✅ Created `.env.production` - for Vercel production deployment
- ✅ Updated `Auth.js` - Uses `REACT_APP_BACKEND_URL` environment variable
- ✅ Updated `Signup.js` - Uses `REACT_APP_BACKEND_URL` environment variable
- ✅ Updated `Login.js` - Uses environment variables for backend and dashboard URLs

### Dashboard Updates
- ✅ Created `.env.local` - for local development
- ✅ Created `.env.production` - for Vercel production deployment
- ✅ Updated `Holdings.js` - Uses `REACT_APP_BACKEND_URL` environment variable
- ✅ Updated `BuyActionWindow.js` - Uses `REACT_APP_BACKEND_URL` environment variable
- ✅ Updated `Dashboard.js` - Uses `REACT_APP_LANDING_URL` environment variable
- ✅ Created `src/config/apiConfig.js` - Centralized API configuration

### Backend Status
- ✅ Backend already deployed: https://zerodha-clone-yakc.onrender.com
- ✅ CORS enabled (ready for cross-origin requests)

---

## 📋 Vercel Deployment Steps (Ready to Execute)

### Frontend Deployment
1. [ ] Go to https://vercel.com/dashboard
2. [ ] Click "Add New..." → "Project"
3. [ ] Import your GitHub repository
4. [ ] Select `frontend` folder as root
5. [ ] Set Environment Variables:
   - `REACT_APP_BACKEND_URL=https://zerodha-clone-yakc.onrender.com`
   - `REACT_APP_DASHBOARD_URL=https://your-dashboard-url.vercel.app` (update later)
6. [ ] Click Deploy
7. [ ] Save your frontend URL: `https://_____.vercel.app`

### Dashboard Deployment
1. [ ] Create new Vercel project
2. [ ] Select `dashboard/dashboard` folder as root
3. [ ] Set Environment Variables:
   - `REACT_APP_BACKEND_URL=https://zerodha-clone-yakc.onrender.com`
   - `REACT_APP_LANDING_URL=https://your-frontend-url.vercel.app` (use from above)
4. [ ] Click Deploy
5. [ ] Save your dashboard URL: `https://_____.vercel.app`

### Final Frontend Update
1. [ ] Go back to Frontend Vercel project settings
2. [ ] Update Environment Variable:
   - `REACT_APP_DASHBOARD_URL=https://your-dashboard-url.vercel.app` (use dashboard URL from above)
3. [ ] Redeploy frontend

---

## 🧪 Testing After Deployment

1. [ ] Visit your frontend Vercel URL
2. [ ] Test Signup functionality
3. [ ] Test Login functionality
4. [ ] Verify token is received from backend
5. [ ] Check if redirected to dashboard correctly
6. [ ] On dashboard, verify Holdings data loads
7. [ ] Test BuyActionWindow (place an order)
8. [ ] Check browser console for any errors
9. [ ] Verify network requests show correct backend URL

---

## 🔗 Quick Links

- **Frontend Code:** `frontend/`
- **Dashboard Code:** `dashboard/dashboard/`
- **Backend:** https://zerodha-clone-yakc.onrender.com
- **Deployment Guide:** `VERCEL_DEPLOYMENT_GUIDE.md`
- **CORS Info:** `BACKEND_CORS_INFO.md`

---

## Environment Variables Summary

### What's Configured ✅

**Frontend (.env.production)**
```
REACT_APP_BACKEND_URL=https://zerodha-clone-yakc.onrender.com
REACT_APP_DASHBOARD_URL=https://your-dashboard-vercel-url.vercel.app
REACT_APP_LANDING_URL=https://your-frontend-vercel-url.vercel.app
```

**Dashboard (.env.production)**
```
REACT_APP_BACKEND_URL=https://zerodha-clone-yakc.onrender.com
REACT_APP_LANDING_URL=https://your-frontend-vercel-url.vercel.app
```

---

## Common Issues & Solutions

### Issue: API calls to localhost
**Solution:** Environment variable not set or wrong. Check Vercel project settings.

### Issue: CORS error
**Solution:** Your backend CORS is already open, should work. Check console for exact error.

### Issue: Can't login
**Solution:** 
1. Check if backend is running at https://zerodha-clone-yakc.onrender.com
2. Verify environment variables in Vercel match actual URLs
3. Check MongoDB connection on backend

### Issue: Dashboard doesn't load after login
**Solution:** 
- Verify token is being stored correctly
- Check `REACT_APP_DASHBOARD_URL` is set correctly
- Ensure dashboard has correct `REACT_APP_LANDING_URL` set

---

## Success Indicators ✨

When everything is working:
- Frontend loads at your Vercel URL
- Can signup/login successfully
- Redirected to dashboard after login
- Dashboard displays Holdings data from backend
- Can place orders (BuyActionWindow works)
- No CORS or 404 errors in console
