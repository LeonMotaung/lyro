import express from 'express';
import cors from 'cors';
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from Backend! The React App (Vite) should be running on a different port (usually 5173).');
});

app.get('/api/data', (req, res) => {
    res.json({ message: 'This is data from the backend' });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Backend server listening at http://0.0.0.0:${port}`);
});
