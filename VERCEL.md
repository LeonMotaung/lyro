# Deploying Lyro to Vercel

This guide explains how to deploy your Lyro React app to Vercel.

## Table of Contents
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Deployment Steps](#deployment-steps)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

---

## Quick Start

### Prerequisites
- GitHub repository with your code
- Vercel account (free tier works)
- Code pushed to `main` branch

### One-Click Deploy

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository: `LeonMotaung/lyro`
4. Vercel will auto-detect the configuration from `vercel.json`
5. Click "Deploy"

---

## Configuration

### vercel.json

The `vercel.json` file in your repository root tells Vercel how to build your app:

```json
{
  "buildCommand": "cd vite && npm install && npm run build",
  "outputDirectory": "vite/dist",
  "installCommand": "npm install && cd vite && npm install && cd ..",
  "framework": null,
  "devCommand": "npm start"
}
```

**What each setting does:**

| Setting | Value | Purpose |
|---------|-------|---------|
| `buildCommand` | `cd vite && npm install && npm run build` | Builds the frontend in the vite folder |
| `outputDirectory` | `vite/dist` | Where the built files are located |
| `installCommand` | `npm install && cd vite && npm install && cd ..` | Installs dependencies in both root and vite |
| `framework` | `null` | Tells Vercel not to auto-detect framework |
| `devCommand` | `npm start` | Command for local development |

---

## Deployment Steps

### Method 1: Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard

2. **Click "Add New"** → **"Project"**

3. **Import Git Repository**:
   - Select GitHub
   - Find `LeonMotaung/lyro`
   - Click "Import"

4. **Configure Project** (should auto-fill from vercel.json):
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave as root)
   - **Build Command**: `cd vite && npm install && npm run build`
   - **Output Directory**: `vite/dist`
   - **Install Command**: `npm install && cd vite && npm install && cd ..`

5. **Add Environment Variables** (optional):
   - Click "Environment Variables"
   - Add: `NODE_ENV` = `production`
   - Add: `VITE_API_URL` = `your-backend-url` (if needed)

6. **Click "Deploy"**

7. **Wait for Deployment** (~2-3 minutes)

8. **Get Your URL**: `https://lyro-<random>.vercel.app`

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

---

## Important Notes

### ⚠️ Backend Considerations

**Vercel is primarily for frontend hosting.** Your Express backend in `/backend` won't run on Vercel's free tier.

**Options:**

1. **Frontend Only on Vercel** (Recommended):
   - Deploy frontend to Vercel
   - Deploy backend to Render (as configured)
   - Update `VITE_API_URL` to point to Render backend

2. **Serverless Functions** (Advanced):
   - Convert backend routes to Vercel serverless functions
   - Requires restructuring backend code

3. **Full Stack on Render** (Simplest):
   - Deploy everything to Render (as already configured)
   - Skip Vercel

### Recommended Setup

**For your app, I recommend:**

- **Frontend**: Vercel (fast, free, CDN)
- **Backend**: Render (supports Node.js servers)

**Configuration:**

1. Deploy backend to Render: `https://lyro-r75b.onrender.com`
2. Deploy frontend to Vercel
3. Set `VITE_API_URL` in Vercel to your Render backend URL

---

## Environment Variables

### Required Variables

Add these in Vercel Dashboard → Project Settings → Environment Variables:

| Variable | Value | Purpose |
|----------|-------|---------|
| `NODE_ENV` | `production` | Sets production mode |
| `VITE_API_URL` | `https://lyro-r75b.onrender.com` | Backend API URL (if using Render) |

### How to Add

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Environment Variables"
3. Add each variable
4. Select environments: Production, Preview, Development
5. Click "Save"
6. Redeploy for changes to take effect

---

## Project Structure

```
lyro-react/
├── vite/                  # Frontend (deployed to Vercel)
│   ├── src/
│   ├── public/
│   ├── dist/             # Built output (auto-generated)
│   └── package.json
├── backend/              # Backend (deploy to Render separately)
│   └── server.js
├── vercel.json           # Vercel configuration
├── render.yaml           # Render configuration
└── package.json
```

---

## Deployment Workflow

### Automatic Deployments

Vercel automatically deploys when you push to GitHub:

- **Push to `main`** → Production deployment
- **Push to other branches** → Preview deployment
- **Pull requests** → Preview deployment

### Manual Deployments

1. Go to Vercel Dashboard
2. Select your project
3. Click "Deployments"
4. Click "Redeploy" on any deployment

---

## Troubleshooting

### Issue: "No Output Directory"

**Error**: `Error: No Output Directory named "public" found`

**Solution**: 
- Verify `vercel.json` has `"outputDirectory": "vite/dist"`
- Ensure build command creates `vite/dist` folder
- Check build logs for errors

### Issue: Build Fails

**Common causes:**

1. **Missing dependencies**:
   ```bash
   # Solution: Check installCommand in vercel.json
   "installCommand": "npm install && cd vite && npm install && cd .."
   ```

2. **TypeScript errors**:
   - Check build logs
   - Fix errors in source code
   - Push changes to GitHub

3. **Environment variables missing**:
   - Add required variables in Vercel dashboard
   - Redeploy

### Issue: API Calls Fail

**Symptoms**: Frontend loads but API requests fail

**Solutions**:

1. **Update API URL**:
   - Add `VITE_API_URL` environment variable
   - Point to your Render backend

2. **Update frontend code**:
   ```typescript
   const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
   
   fetch(`${API_URL}/api/data`)
   ```

3. **Enable CORS** in backend:
   ```javascript
   // backend/server.js
   app.use(cors({
     origin: ['https://lyro-<your-vercel>.vercel.app']
   }));
   ```

### Issue: Blank Page

**Causes**:
- Build output in wrong directory
- Routing issues
- Missing environment variables

**Solutions**:
1. Check `outputDirectory` in `vercel.json`
2. Verify `vite/dist/index.html` exists after build
3. Check browser console for errors
4. Review Vercel deployment logs

---

## Custom Domain

### Add Custom Domain

1. Go to Project Settings → Domains
2. Click "Add"
3. Enter your domain name
4. Follow DNS configuration instructions
5. Wait for SSL certificate (automatic)

### DNS Configuration

**For root domain** (example.com):
```
Type: A
Name: @
Value: 76.76.21.21
```

**For subdomain** (www.example.com):
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## Performance Optimization

### 1. Enable Edge Caching

Vercel automatically caches static assets at the edge.

### 2. Optimize Build

In `vite/vite.config.ts`:

```typescript
export default defineConfig({
  build: {
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});
```

### 3. Image Optimization

Use Vercel's Image Optimization:

```typescript
import Image from 'next/image'; // If using Next.js

// Or optimize images before upload
```

---

## Monitoring

### View Deployments

1. Go to Vercel Dashboard
2. Select your project
3. Click "Deployments"
4. View logs, preview, and analytics

### Analytics

Vercel provides:
- Page views
- Top pages
- Visitor locations
- Performance metrics

Enable in: Project Settings → Analytics

---

## Cost

### Free Tier Includes

- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Preview deployments
- ✅ Custom domains

### Paid Plans

- **Pro**: $20/month - More bandwidth, team features
- **Enterprise**: Custom pricing

---

## Comparison: Vercel vs Render

| Feature | Vercel | Render |
|---------|--------|--------|
| **Best For** | Frontend/Static | Full-stack/Backend |
| **Free Tier** | 100 GB bandwidth | 750 hours/month |
| **Build Time** | ~1-2 min | ~2-3 min |
| **Auto Deploy** | ✅ Yes | ✅ Yes |
| **Custom Domain** | ✅ Free | ✅ Free |
| **Backend Support** | Serverless only | ✅ Full Node.js |
| **Database** | External only | ✅ PostgreSQL included |

### Recommended Setup

**Option 1: Split Deployment** (Recommended)
- Frontend → Vercel (fast, global CDN)
- Backend → Render (full Node.js support)

**Option 2: All-in-One**
- Everything → Render (simpler, one platform)

---

## Quick Reference

### Deploy Commands

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs <deployment-url>

# List deployments
vercel ls
```

### Important URLs

- **Dashboard**: https://vercel.com/dashboard
- **Documentation**: https://vercel.com/docs
- **Status**: https://vercel-status.com

---

## Next Steps

1. ✅ `vercel.json` is created
2. ⚠️ Push to GitHub
3. ⚠️ Import project in Vercel
4. ⚠️ Configure environment variables
5. ⚠️ Deploy
6. ⚠️ Test your app
7. ⚠️ (Optional) Add custom domain

---

**Last Updated**: December 4, 2025
**Status**: Ready for Vercel Deployment
