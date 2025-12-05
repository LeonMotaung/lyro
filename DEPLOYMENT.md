# Lyro React - Deployment Guide

## 🚀 Quick Deploy to Render

### Prerequisites
- A [Render](https://render.com) account (free tier available)
- A MongoDB Atlas database (or any MongoDB instance)
- Your code pushed to a Git repository (GitHub, GitLab, etc.)

### Deployment Steps

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Go to Render Dashboard**:
   - Visit [https://dashboard.render.com](https://dashboard.render.com)
   - Click "New +" → "Web Service"

3. **Connect Your Repository**:
   - Select your Git provider (GitHub/GitLab)
   - Choose the `lyro-react` repository
   - Click "Connect"

4. **Configure the Service**:
   - **Name**: `lyro-react` (or your preferred name)
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free (or your preferred plan)

5. **Add Environment Variables**:
   Click "Advanced" and add these environment variables:
   
   | Key | Value | Notes |
   |-----|-------|-------|
   | `MONGODB_URI` | `mongodb+srv://username:password@cluster.mongodb.net/lyromaths` | Your MongoDB connection string |
   | `NODE_VERSION` | `20.11.0` | Ensures correct Node version |
   | `PORT` | `10000` | Render's default port (auto-set) |

   ⚠️ **Important**: Make sure your `MONGODB_URI` is correct and the database is accessible from external IPs.

6. **Deploy**:
   - Click "Create Web Service"
   - Render will automatically build and deploy your app
   - Wait for the build to complete (usually 2-5 minutes)

7. **Access Your App**:
   - Once deployed, Render will provide a URL like: `https://lyro-react.onrender.com`
   - Your app will be live! 🎉

---

## 🔧 How It Works

### Build Process
When you deploy, Render runs:
1. `npm install` - Installs root dependencies (express, cors, dotenv, mongodb, concurrently)
2. `postinstall` script runs automatically - Installs vite dependencies
3. `npm run build` - Builds the React frontend into `vite/dist`

### Production Mode
The app automatically runs in **production mode** when deployed:
- `App.js` detects it's not in development and only starts the backend
- `backend/server.js` serves the built React app from `vite/dist`
- All API routes are available at `/api/*`
- The React app handles client-side routing

### Development vs Production

**Development** (local):
```bash
npm run dev
```
- Runs both backend (port 3000) and Vite dev server (port 5173)
- Hot module replacement for instant updates
- Separate servers for API and frontend

**Production** (deployed):
```bash
npm start
```
- Only runs backend server
- Backend serves the built React app
- Single server on one port
- Optimized and minified code

---

## 🐛 Troubleshooting

### Error: "Cannot find package 'dotenv'"
**Solution**: This is now fixed! The `postinstall` script ensures all dependencies are installed.

### Error: "Cannot GET /"
**Cause**: The frontend wasn't built before deployment.
**Solution**: Make sure the build command includes `npm run build`.

### Database Connection Errors
**Check**:
1. Your `MONGODB_URI` environment variable is set correctly
2. Your MongoDB cluster allows connections from anywhere (0.0.0.0/0) or Render's IPs
3. The database name in the URI matches your database

### Build Timeout
**Cause**: Free tier has limited resources.
**Solution**: 
- Remove unnecessary dependencies
- Consider upgrading to a paid plan for faster builds

### App Crashes After Deploy
**Check the logs**:
1. Go to your Render dashboard
2. Click on your service
3. View the "Logs" tab
4. Look for error messages

---

## 📝 Environment Variables Reference

### Required
- `MONGODB_URI`: Your MongoDB connection string

### Optional
- `PORT`: Server port (Render sets this automatically)
- `NODE_ENV`: Set to `development` for dev mode (defaults to production)

---

## 🔄 Updating Your Deployment

Every time you push to your main branch, Render will automatically:
1. Pull the latest code
2. Run the build process
3. Deploy the new version

To manually redeploy:
1. Go to your Render dashboard
2. Click "Manual Deploy" → "Deploy latest commit"

---

## 💡 Tips

1. **Use the Health Check**: The app includes a `/healthz` endpoint that Render uses to verify the app is running.

2. **Monitor Logs**: Always check the logs if something goes wrong. They're your best friend for debugging.

3. **Database Indexes**: The app automatically creates MongoDB indexes on startup for better performance.

4. **Free Tier Limitations**: 
   - Apps spin down after 15 minutes of inactivity
   - First request after spin-down takes ~30 seconds
   - 750 hours/month of runtime

5. **Custom Domain**: You can add a custom domain in Render's settings (available on paid plans).

---

## 🎯 Next Steps

- Set up monitoring and alerts in Render
- Configure a custom domain
- Set up automatic backups for your MongoDB database
- Consider upgrading to a paid plan for better performance

---

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Setup](https://www.mongodb.com/cloud/atlas)
- [Vite Production Build](https://vitejs.dev/guide/build.html)

---

**Need help?** Check the logs first, then review this guide. Most issues are related to environment variables or database connectivity.
