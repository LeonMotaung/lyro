# Deploying to Vercel (Frontend) + Render (Backend)

This guide shows you how to deploy your Lyro React app with the frontend on Vercel and backend on Render.

---

## 🎯 Architecture Overview

```
┌─────────────────────────────────────────┐
│  Vercel (Frontend)                      │
│  https://lyro-react.vercel.app          │
│  - Serves React app (Vite build)       │
│  - Makes API calls to Render backend   │
└─────────────────┬───────────────────────┘
                  │
                  │ API Calls
                  ▼
┌─────────────────────────────────────────┐
│  Render (Backend)                       │
│  https://lyro-backend.onrender.com      │
│  - Express.js API server                │
│  - Connects to MongoDB Atlas            │
└─────────────────┬───────────────────────┘
                  │
                  │ Database
                  ▼
┌─────────────────────────────────────────┐
│  MongoDB Atlas                          │
│  - Stores questions and data            │
└─────────────────────────────────────────┘
```

---

## 📦 Part 1: Deploy Backend to Render

### **Step 1: Prepare Your Repository**

Make sure all changes are committed and pushed:

```bash
git add .
git commit -m "Configure for Vercel + Render deployment"
git push origin main
```

### **Step 2: Create Render Web Service**

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:

   | Setting | Value |
   |---------|-------|
   | **Name** | `lyro-backend` |
   | **Region** | Choose closest to your users |
   | **Branch** | `main` |
   | **Runtime** | `Node` |
   | **Build Command** | `npm install` |
   | **Start Command** | `node backend/server.js` |

### **Step 3: Add Environment Variables**

In the Render dashboard, add these environment variables:

| Key | Value | Notes |
|-----|-------|-------|
| `NODE_ENV` | `production` | Sets production mode |
| `MONGODB_URI` | `mongodb+srv://...` | Your MongoDB connection string |
| `PORT` | `10000` | Render's default port |
| `FRONTEND_URL` | `https://lyro-react.vercel.app` | Your Vercel URL (update after Vercel deployment) |
| `NODE_VERSION` | `20.11.0` | Node.js version |

### **Step 4: Deploy**

1. Click **"Create Web Service"**
2. Wait for deployment (2-5 minutes)
3. Note your backend URL: `https://lyro-backend.onrender.com`

### **Step 5: Test the Backend**

Visit these URLs to verify:
- Health check: `https://lyro-backend.onrender.com/healthz`
- API stats: `https://lyro-backend.onrender.com/api/stats`

---

## 🚀 Part 2: Deploy Frontend to Vercel

### **Step 1: Install Vercel CLI** (Optional)

```bash
npm install -g vercel
```

### **Step 2: Deploy via Vercel Dashboard** (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure the project:

   | Setting | Value |
   |---------|-------|
   | **Framework Preset** | `Vite` |
   | **Root Directory** | `./` (leave as is) |
   | **Build Command** | `cd vite && npm install && npm run build` |
   | **Output Directory** | `vite/dist` |
   | **Install Command** | `npm install` |

### **Step 3: Add Environment Variables**

In Vercel project settings → Environment Variables:

| Key | Value | Environment |
|-----|-------|-------------|
| `VITE_API_URL` | `https://lyro-backend.onrender.com` | Production |
| `VITE_API_URL` | `http://localhost:3000` | Development (optional) |

### **Step 4: Deploy**

1. Click **"Deploy"**
2. Wait for build (1-3 minutes)
3. Note your frontend URL: `https://lyro-react.vercel.app`

### **Step 5: Update Backend CORS**

Go back to Render and update the `FRONTEND_URL` environment variable with your actual Vercel URL:

```
FRONTEND_URL=https://lyro-react-<your-id>.vercel.app
```

Then redeploy the backend.

---

## ✅ Part 3: Verify Deployment

### **Test the Full Stack:**

1. **Visit your Vercel app**: `https://lyro-react.vercel.app`
2. **Go to Admin**: `https://lyro-react.vercel.app/admin`
3. **Upload a question**
4. **View it on Paper 1 or Paper 2**

### **Check API Connectivity:**

Open browser DevTools (F12) → Network tab:
- API calls should go to `https://lyro-backend.onrender.com`
- Status should be `200 OK`
- No CORS errors

---

## 🔄 Updating Your Deployment

### **Update Frontend (Vercel):**

```bash
git add .
git commit -m "Update frontend"
git push origin main
```

Vercel auto-deploys on every push to `main`.

### **Update Backend (Render):**

```bash
git add .
git commit -m "Update backend"
git push origin main
```

Render auto-deploys on every push to `main`.

---

## 🐛 Troubleshooting

### **Issue: CORS Errors**

**Symptoms**: Console shows "CORS policy" errors

**Solution**:
1. Check `FRONTEND_URL` in Render environment variables
2. Verify it matches your Vercel URL exactly
3. Redeploy backend after changing

### **Issue: API Calls Failing**

**Symptoms**: "Failed to fetch" or network errors

**Solution**:
1. Check `VITE_API_URL` in Vercel environment variables
2. Verify backend is running: visit `/healthz` endpoint
3. Check Render logs for errors

### **Issue: Build Fails on Vercel**

**Symptoms**: Build errors during deployment

**Solution**:
1. Check build command is correct
2. Verify `vite/package.json` has all dependencies
3. Check Vercel build logs for specific errors

### **Issue: Questions Not Showing**

**Symptoms**: Admin upload works but questions don't appear

**Solution**:
1. Check MongoDB connection in Render logs
2. Verify API endpoints return data: `/api/stats`
3. Check browser console for errors

---

## 💡 Tips

1. **Free Tier Limitations**:
   - Render: Apps spin down after 15 min inactivity
   - Vercel: Unlimited deployments, bandwidth limits apply

2. **Custom Domains**:
   - Vercel: Add custom domain in project settings
   - Render: Add custom domain in service settings

3. **Environment Variables**:
   - Always use `VITE_` prefix for frontend env vars
   - Backend env vars don't need prefix

4. **Monitoring**:
   - Check Render logs for backend issues
   - Check Vercel logs for build/deployment issues
   - Use browser DevTools for frontend debugging

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

---

**You're all set!** 🎉 Your app is now deployed with a modern, scalable architecture!
