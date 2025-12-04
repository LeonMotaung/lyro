import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// Health check endpoint for Render
app.get('/healthz', (req, res) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// API routes
app.get('/api/data', (req, res) => {
    res.json({ message: 'This is data from the backend' });
});

// Production: Serve static files from vite/dist
if (process.env.NODE_ENV === 'production') {
    console.log('Production mode: Serving static files from vite/dist');

    // Serve static files with caching
    app.use(express.static(path.join(__dirname, '../vite/dist'), {
        maxAge: '1d',
        etag: true
    }));

    // Handle React routing - return index.html for all non-API routes
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../vite/dist/index.html'));
    });
} else {
    // Development: Just show backend is running
    app.get('/', (req, res) => {
        res.send('Backend is running! The React App (Vite) should be running on port 5173.');
    });
}

app.listen(port, '0.0.0.0', () => {
    console.log(`Backend server listening at http://0.0.0.0:${port}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
