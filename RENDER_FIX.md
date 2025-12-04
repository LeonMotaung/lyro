# 🚨 RENDER BUILD FIX - React 19 Dependency Issue

## Problem

The build is failing on Render with this error:
```
peer react@"^15.0.0 || ^16.0.0 || ^17.0.0 || ^18.0.0" from react-latex-next@3.0.0
```

**Cause**: `react-latex-next` doesn't support React 19 yet.

## ✅ Solution

Use the `--legacy-peer-deps` flag when installing dependencies.

### Update Your Render Build Command

**Go to Render Dashboard** → **Settings** → **Build & Deploy** → **Build Command**

**Change from:**
```bash
npm install && cd vite && npm install && cd .. && npm run build
```

**Change to:**
```bash
npm install && cd vite && npm install --legacy-peer-deps && cd .. && npm run build
```

### What This Does

The `--legacy-peer-deps` flag tells npm to ignore peer dependency conflicts and install packages anyway. This is safe because:
- ✅ `react-latex-next` works fine with React 19 (just hasn't updated peer deps yet)
- ✅ We've tested the build locally and it works
- ✅ This is a temporary fix until the package updates

## 🎯 Complete Render Configuration

Make sure ALL these settings are correct:

| Setting | Value |
|---------|-------|
| **Branch** | `main` |
| **Build Command** | `npm install && cd vite && npm install --legacy-peer-deps && cd .. && npm run build` |
| **Start Command** | `npm start` |
| **Environment Variable** | `NODE_ENV=production` |
| **Health Check Path** | `/healthz` |

## 📋 Deployment Steps

1. ✅ Code is already pushed to GitHub
2. ⚠️ **Update Build Command** in Render dashboard (add `--legacy-peer-deps`)
3. ⚠️ **Verify Start Command** is `npm start` (not `npm run`)
4. ⚠️ **Verify Branch** is `main` (not "branch")
5. ⚠️ **Add Environment Variable**: `NODE_ENV=production`
6. ✅ Click "Manual Deploy"
7. ✅ Monitor logs
8. ✅ Test at https://lyro-r75b.onrender.com

## Alternative: Use render.yaml

You can also use the `render.yaml` file in the repository which has the correct configuration:

1. In Render Dashboard, when creating/updating service
2. Select "Use render.yaml"
3. It will automatically use the correct build command

## 🧪 Test Locally

To verify this works locally:

```bash
cd vite
npm install --legacy-peer-deps
npm run build
```

Should complete successfully! ✅

---

**Status**: Ready to deploy with updated build command
**Next**: Update build command in Render and click "Manual Deploy"
