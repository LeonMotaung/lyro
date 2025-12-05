import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Default to production unless explicitly set to development
const isProduction = process.env.NODE_ENV !== 'development';

console.log(`Starting Lyro React App in ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'} mode...`);
console.log(`NODE_ENV: ${process.env.NODE_ENV || 'not set (defaulting to production)'}`);

if (isProduction) {
    // Production: Only run backend (it serves the built frontend)
    console.log('Starting backend server (serves built frontend from vite/dist)...');

    const backend = spawn('node', ['backend/server.js'], {
        stdio: 'inherit',
        shell: true,
        cwd: __dirname,
        env: { ...process.env, NODE_ENV: 'production' }
    });

    backend.on('error', (err) => {
        console.error('Failed to start backend:', err);
        process.exit(1);
    });

    backend.on('exit', (code) => {
        console.log(`Backend exited with code ${code}`);
        process.exit(code);
    });

} else {
    // Development: Run both backend and frontend
    console.log('Starting both backend and frontend servers...');

    // Start Backend
    const backend = spawn('node', ['backend/server.js'], {
        stdio: 'inherit',
        shell: true,
        cwd: __dirname
    });

    backend.on('error', (err) => {
        console.error('Failed to start backend:', err);
    });

    // Start Frontend (Vite)
    console.log('Starting Vite dev server...');
    const frontend = spawn('npm', ['run', 'dev'], {
        stdio: 'inherit',
        shell: true,
        cwd: path.join(__dirname, 'vite')
    });

    frontend.on('error', (err) => {
        console.error('Failed to start frontend:', err);
    });

    // Handle exit
    process.on('SIGINT', () => {
        console.log('Stopping processes...');
        backend.kill();
        frontend.kill();
        process.exit();
    });
}
