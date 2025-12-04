import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Starting Lyro React App (Backend + Frontend)...');

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
console.log('Starting Vite...');
const frontend = spawn('npm', ['run', 'dev'], {
    stdio: 'inherit',
    shell: true,
    cwd: __dirname
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
