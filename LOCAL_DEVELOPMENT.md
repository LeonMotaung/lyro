# Running Lyro React Locally

## 📋 Prerequisites

1. **Node.js** v18 or higher installed
2. **MongoDB** connection (MongoDB Atlas or local MongoDB)
3. **Git** (to clone/pull updates)

---

## 🚀 Quick Start

### 1. **Install Dependencies**

First time setup or after pulling new code:

```bash
# Install root dependencies
npm install

# Install vite (frontend) dependencies
cd vite
npm install
cd ..
```

Or use the convenience script:
```bash
npm run install:all
```

---

### 2. **Configure Environment Variables**

Create a `.env` file in the **root directory** (if it doesn't exist):

```env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lyromaths?retryWrites=true&w=majority

# Server Port
PORT=3000

# Node Environment (IMPORTANT for local development)
NODE_ENV=development
```

**Important Notes:**
- Replace `username`, `password`, and `cluster` with your actual MongoDB credentials
- Get your MongoDB URI from [MongoDB Atlas](https://cloud.mongodb.com)
- Make sure `NODE_ENV=development` is set for local development

---

### 3. **Run the Application**

#### **Option A: Development Mode (Recommended for local)**

```bash
# Windows PowerShell
$env:NODE_ENV="development"; npm start

# Windows CMD
set NODE_ENV=development && npm start

# Mac/Linux
NODE_ENV=development npm start
```

This will start:
- ✅ **Backend** on `http://localhost:3000`
- ✅ **Frontend** (Vite dev server) on `http://localhost:5173`

#### **Option B: Using the dev script (Frontend only)**

```bash
npm run dev
```

This only starts the Vite dev server. You'll need to run the backend separately:

```bash
# In another terminal
npm run backend
```

---

## 🌐 Access the Application

Once running, open your browser:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Health Check**: http://localhost:3000/healthz

### Available Routes:
- `/` - Home page
- `/learn` - Learning dashboard
- `/paper1` - Paper 1 questions
- `/paper2` - Paper 2 questions
- `/admin` - Admin dashboard (upload questions)
- `/login` - Login page
- `/signup` - Signup page

---

## 🛠️ Development Workflow

### **Making Changes:**

1. **Frontend changes** (React components in `vite/src/`):
   - Changes auto-reload with Hot Module Replacement (HMR)
   - No need to restart the server

2. **Backend changes** (`backend/server.js`):
   - Stop the server (Ctrl+C)
   - Restart with `NODE_ENV=development npm start`

### **Common Commands:**

```bash
# Install all dependencies
npm run install:all

# Start development servers
NODE_ENV=development npm start

# Start frontend only
npm run dev

# Start backend only
npm run backend

# Build frontend for production
npm run build
```

---

## 🐛 Troubleshooting

### **Issue: "Cannot find package 'dotenv'"**
**Solution**: Run `npm install` in the root directory

### **Issue: "Cannot connect to MongoDB"**
**Solution**: 
1. Check your `MONGODB_URI` in `.env`
2. Verify MongoDB Atlas allows connections from your IP
3. Test the connection string in MongoDB Compass

### **Issue: "Port 3000 already in use"**
**Solution**: 
1. Kill the process using port 3000:
   ```bash
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   
   # Mac/Linux
   lsof -ti:3000 | xargs kill -9
   ```
2. Or change the port in `.env`: `PORT=3001`

### **Issue: "Cannot GET /admin" or routes not working**
**Solution**: Make sure you're accessing the **frontend** at `http://localhost:5173`, not the backend at `http://localhost:3000`

### **Issue: Frontend shows "Error connecting to server"**
**Solution**: 
1. Make sure the backend is running on port 3000
2. Check the browser console for CORS errors
3. Verify the backend is accessible at `http://localhost:3000/healthz`

---

## 📁 Project Structure

```
lyro-react/
├── vite/                  # Frontend (React + TypeScript)
│   ├── src/              # React components
│   │   ├── AdminDashboard.tsx
│   │   ├── Paper1.tsx
│   │   ├── Paper2.tsx
│   │   └── ...
│   └── package.json      # Frontend dependencies
├── backend/              # Backend (Express.js)
│   └── server.js         # API server
├── App.js                # Main entry point (starts both servers)
├── package.json          # Root dependencies
└── .env                  # Environment variables (not in git)
```

---

## 🔄 Switching Between Local and Production

### **Local Development:**
```bash
NODE_ENV=development npm start
```
- Runs both backend and frontend
- Frontend on port 5173 with HMR
- Backend on port 3000

### **Production Build (Testing):**
```bash
npm run build
npm start
```
- Builds frontend to `vite/dist`
- Only runs backend (serves built frontend)
- Everything on port 3000

---

## 💡 Tips

1. **Use the development mode** for local work - it's faster and has hot reload
2. **Keep MongoDB Atlas IP whitelist updated** - Add `0.0.0.0/0` for development
3. **Check the terminal logs** - They show which ports are being used
4. **Use browser DevTools** - Check Network tab for API call issues
5. **Test the health check** - Visit `/healthz` to verify backend is running

---

## 🎯 Next Steps

1. Start the app: `NODE_ENV=development npm start`
2. Open browser: `http://localhost:5173`
3. Go to Admin: `http://localhost:5173/admin`
4. Upload a question
5. View it on Paper 1 or Paper 2

---

**Need help?** Check the logs in your terminal for error messages!
