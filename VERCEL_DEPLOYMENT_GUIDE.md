# Vercel Deployment Guide for Zerodha Clone

## Overview
This guide explains how to deploy the frontend and dashboard applications to Vercel with the backend API running on Render.

**Backend URL:** https://zerodha-clone-yakc.onrender.com

---

## Prerequisites
- Vercel account (sign up at https://vercel.com)
- GitHub repository with your code
- Both frontend and dashboard folders ready for deployment

---

## Deployment Steps

### Step 1: Deploy Frontend to Vercel

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Select the `frontend` folder as root

3. **Configure Environment Variables**
   - In the Vercel project settings, go to **Settings** → **Environment Variables**
   - Add the following variables:
   
   ```
   REACT_APP_BACKEND_URL=https://zerodha-clone-yakc.onrender.com
   REACT_APP_DASHBOARD_URL=https://your-dashboard-vercel-url.vercel.app
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for the deployment to complete
   - Your frontend will be live at: `https://your-frontend-vercel-url.vercel.app`

---

### Step 2: Deploy Dashboard to Vercel

1. **Create a new Vercel project for dashboard**
   - Go to https://vercel.com/dashboard
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Select the `dashboard/dashboard` folder as root

2. **Configure Environment Variables**
   - In the Vercel project settings, go to **Settings** → **Environment Variables**
   - Add the following variables:
   
   ```
   REACT_APP_BACKEND_URL=https://zerodha-clone-yakc.onrender.com
   REACT_APP_LANDING_URL=https://your-frontend-vercel-url.vercel.app
   ```

3. **Deploy**
   - Click "Deploy"
   - Wait for the deployment to complete
   - Your dashboard will be live at: `https://your-dashboard-vercel-url.vercel.app`

---

### Step 3: Update Frontend Environment Variables

Now that you have your deployed dashboard URL, update the frontend environment variables:

1. Go to your **frontend Vercel project** settings
2. Go to **Environment Variables**
3. Update `REACT_APP_DASHBOARD_URL` with your actual dashboard URL from Step 2

---

## Environment Variables Reference

### Frontend (.env.production)
```
REACT_APP_BACKEND_URL=https://zerodha-clone-yakc.onrender.com
REACT_APP_DASHBOARD_URL=https://dashboard-vercel-url.vercel.app
REACT_APP_LANDING_URL=https://frontend-vercel-url.vercel.app
```

### Dashboard (.env.production)
```
REACT_APP_BACKEND_URL=https://zerodha-clone-yakc.onrender.com
REACT_APP_LANDING_URL=https://frontend-vercel-url.vercel.app
```

---

## Local Development

For local development, use the .env.local files:

### Frontend (.env.local)
```
REACT_APP_BACKEND_URL=http://localhost:3002
REACT_APP_DASHBOARD_URL=http://localhost:3000
REACT_APP_LANDING_URL=http://localhost:3004
```

### Dashboard (.env.local)
```
REACT_APP_BACKEND_URL=http://localhost:3002
REACT_APP_LANDING_URL=http://localhost:3004
```

Run:
```bash
npm start  # This will use .env.local for local development
```

---

## Deployment Checklist

- [ ] Backend deployed on Render (https://zerodha-clone-yakc.onrender.com)
- [ ] Frontend pushed to GitHub
- [ ] Dashboard pushed to GitHub
- [ ] Frontend deployed to Vercel with correct environment variables
- [ ] Dashboard deployed to Vercel with correct environment variables
- [ ] Frontend environment variables updated with Dashboard URL
- [ ] Test login/signup flow on deployed frontend
- [ ] Verify API calls are using the deployed backend URL
- [ ] Test all dashboard features with deployed backend

---

## Troubleshooting

### CORS Errors
- Ensure your backend has CORS enabled for your Vercel domain
- In your backend's `index.js`, update CORS settings if needed:
  ```javascript
  app.use(cors({
    origin: [
      'https://your-frontend-vercel-url.vercel.app',
      'https://your-dashboard-vercel-url.vercel.app',
      'http://localhost:3004',
      'http://localhost:3000'
    ]
  }));
  ```

### Environment Variables Not Loading
- Ensure you've set the environment variables in Vercel project settings
- Re-deploy after adding/updating environment variables
- Check that variable names exactly match what's in your code

### API Calls Failing
- Check the browser console for actual URL being called
- Verify the backend URL is correct and the backend is running
- Use browser DevTools → Network tab to see the actual requests

---

## Next Steps

1. Update your GitHub repositories with the new environment configuration
2. Deploy both applications to Vercel
3. Test the complete flow from login to dashboard
4. Monitor the applications for any issues

For more Vercel help: https://vercel.com/docs
