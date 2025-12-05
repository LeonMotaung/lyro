# Lyro React

A full-stack React application with Express backend, featuring math learning tools with LaTeX support.

## Project Structure

```
lyro-react/
├── vite/                  # Frontend (React + TypeScript + Vite)
│   ├── src/              # React components and pages
│   ├── public/           # Static assets
│   └── package.json      # Frontend dependencies
├── backend/              # Backend (Express.js)
│   └── server.js         # API server
├── App.js                # Concurrent runner (starts both servers)
├── package.json          # Root dependencies
└── HOST.md               # Deployment guide
```

## Tech Stack

### Frontend (`/vite`)
- React 19
- TypeScript
- Vite
- React Router
- KaTeX (Math rendering)
- React LaTeX Next

### Backend (`/backend`)
- Express.js
- CORS enabled
- REST API

## Quick Start

### Prerequisites
- Node.js v18 or higher
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd lyro-react
   ```

2. **Install all dependencies**:
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd vite
   npm install
   cd ..
   
   # Or use the convenience script
   npm run install:all
   ```

### Running the Application

#### Development Mode
**Start both frontend and backend concurrently**:
```bash
NODE_ENV=development npm start
# or on Windows:
set NODE_ENV=development && npm start
```

This will start:
- Backend API on `http://localhost:3000`
- Frontend on `http://localhost:5173`

**Access the application**:
- Open `http://localhost:5173` in your browser

### Development Commands

```bash
# Start both servers (recommended)
npm start

# Start frontend only
npm run dev

# Start backend only
npm run backend

# Build frontend for production
npm run build

# Install all dependencies (root + vite)
npm run install:all
```

## Features

- 🧮 **Math Learning Tools** - Interactive math learning with LaTeX support
- 📝 **Formula Sheet** - Quick reference for mathematical formulas
- 👤 **User Authentication** - Login and signup pages
- 🎓 **Onboarding Flow** - Guided user onboarding
- 📱 **Responsive Design** - Works on all devices
- ⚡ **Fast Development** - Hot Module Replacement with Vite

## Deployment

### 🚀 Recommended: Vercel (Frontend) + Render (Backend)

This app is designed to deploy with:
- **Frontend (Vite)** → Vercel
- **Backend (Express)** → Render  
- **Database** → MongoDB Atlas

**Quick Start:**
1. See **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** for quick steps
2. See **[VERCEL_RENDER_DEPLOYMENT.md](./VERCEL_RENDER_DEPLOYMENT.md)** for detailed guide

**Benefits:**
- ✅ Free tier available on both platforms
- ✅ Automatic deployments on git push
- ✅ Separate scaling for frontend and backend
- ✅ Global CDN for frontend (Vercel)
- ✅ Easy environment variable management

**Alternative:** You can also deploy the full stack to Render only. See [DEPLOYMENT.md](./DEPLOYMENT.md) for instructions.

## Environment Variables

### Backend (`.env` in root)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lyromaths
PORT=3000
NODE_ENV=development
```

### Frontend (`.env` in `/vite`)
```env
VITE_API_URL=http://localhost:3000
```

**Note**: For production deployment, set these as environment variables in your hosting platform (e.g., Render).

## Project Documentation

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - 🚀 Complete deployment guide (Render)
- **[vite/README.md](./vite/README.md)** - Frontend-specific documentation

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.

---

**Built with ❤️ using React + Vite + Express**
