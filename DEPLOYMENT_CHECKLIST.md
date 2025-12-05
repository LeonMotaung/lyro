# Quick Deployment Checklist

## ✅ What I've Done

1. ✅ Created `vercel.json` - Vercel configuration
2. ✅ Updated `render.yaml` - Backend-only deployment
3. ✅ Created `vite/src/api.ts` - Smart API client
4. ✅ Updated CORS in `backend/server.js` - Allows Vercel
5. ✅ Updated all components to use API client
6. ✅ Created deployment guide

---

## 🚀 Deploy Now - Quick Steps

### Backend (Render):
1. Go to https://dashboard.render.com
2. New+ → Web Service → Connect your repo
3. Settings:
   - Name: `lyro-backend`
   - Build: `npm install`
   - Start: `node backend/server.js`
4. Add env vars:
   - `MONGODB_URI` = your MongoDB connection
   - `NODE_ENV` = `production`
   - `FRONTEND_URL` = (add after Vercel deployment)
5. Deploy!
6. Save your URL: `https://lyro-backend.onrender.com`

### Frontend (Vercel):
1. Go to https://vercel.com/dashboard
2. Add New → Project → Import your repo
3. Settings:
   - Framework: Vite
   - Build: `cd vite && npm install && npm run build`
   - Output: `vite/dist`
4. Add env var:
   - `VITE_API_URL` = `https://lyro-backend.onrender.com`
5. Deploy!
6. Save your URL: `https://lyro-react.vercel.app`

### Final Step:
Go back to Render → Environment → Add:
- `FRONTEND_URL` = your Vercel URL
- Redeploy backend

---

## 🎯 Test Your Deployment

1. Visit your Vercel URL
2. Go to /admin
3. Upload a question
4. Check Paper 1 or Paper 2
5. Questions should appear!

---

## 📝 Important URLs

- **Frontend**: https://lyro-react.vercel.app
- **Backend**: https://lyro-backend.onrender.com
- **Backend Health**: https://lyro-backend.onrender.com/healthz
- **API Stats**: https://lyro-backend.onrender.com/api/stats

---

**Full guide**: See `VERCEL_RENDER_DEPLOYMENT.md`
