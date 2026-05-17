# Backend CORS Configuration for Vercel Deployment

## Current Status
Your backend (at `https://zerodha-clone-yakc.onrender.com`) currently has CORS enabled for all origins:

```javascript
app.use(cors());
```

This allows requests from any domain, which is fine for development but might want to be restricted in production.

---

## For Production (Optional but Recommended)

To restrict CORS to only your deployed frontend and dashboard, update your backend `index.js`:

```javascript
const corsOptions = {
  origin: [
    'https://your-frontend-vercel-url.vercel.app',
    'https://your-dashboard-vercel-url.vercel.app',
    'http://localhost:3004',
    'http://localhost:3000'
  ],
  credentials: true
};

app.use(cors(corsOptions));
```

Then redeploy your backend to Render.

---

## Current Setup (No Changes Needed)

Since you have open CORS (`app.use(cors())`), your Vercel deployments will work immediately without any backend changes.

The backend is ready to accept requests from:
- ✅ Frontend (Vercel)
- ✅ Dashboard (Vercel)
- ✅ Local development (localhost)

---

## Next: Configure Vercel Projects

Follow the steps in `VERCEL_DEPLOYMENT_GUIDE.md` to deploy your frontend and dashboard.
