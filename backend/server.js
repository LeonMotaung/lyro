import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { MongoClient, ObjectId } from 'mongodb';

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increased limit for images

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;
let db;
let questionsCollection;

async function connectToDatabase() {
    try {
        const client = new MongoClient(MONGODB_URI);
        await client.connect();
        console.log('✅ Connected to MongoDB successfully!');

        db = client.db('lyromaths');
        questionsCollection = db.collection('questions');

        // Create indexes
        await questionsCollection.createIndex({ paper: 1, topic: 1 });
        console.log('✅ Database indexes created');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
}

// Initialize database connection
connectToDatabase();

// Health check endpoint for Render
app.get('/healthz', (req, res) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        database: db ? 'connected' : 'disconnected'
    });
});

// API Routes

// Get all questions for a specific paper
app.get('/api/questions/paper/:paperNumber', async (req, res) => {
    try {
        const paperNumber = parseInt(req.params.paperNumber);
        const topic = req.query.topic;

        const query = { paper: paperNumber };
        if (topic && topic !== 'all') {
            query.topic = topic;
        }

        const questions = await questionsCollection.find(query).toArray();
        res.json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Failed to fetch questions' });
    }
});

// Get a single question by ID
app.get('/api/questions/:id', async (req, res) => {
    try {
        const question = await questionsCollection.findOne({
            _id: new ObjectId(req.params.id)
        });

        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }

        res.json(question);
    } catch (error) {
        console.error('Error fetching question:', error);
        res.status(500).json({ error: 'Failed to fetch question' });
    }
});

// Create a new question
app.post('/api/questions', async (req, res) => {
    try {
        const { topic, paper, questionBlocks, answerBlocks } = req.body;

        // Validation
        if (!topic || !paper || !questionBlocks || !answerBlocks) {
            return res.status(400).json({
                error: 'Missing required fields: topic, paper, questionBlocks, answerBlocks'
            });
        }

        if (![1, 2].includes(paper)) {
            return res.status(400).json({ error: 'Paper must be 1 or 2' });
        }

        const question = {
            topic,
            paper,
            questionBlocks,
            answerBlocks,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await questionsCollection.insertOne(question);

        res.status(201).json({
            message: 'Question created successfully',
            questionId: result.insertedId,
            question: { ...question, _id: result.insertedId }
        });
    } catch (error) {
        console.error('Error creating question:', error);
        res.status(500).json({ error: 'Failed to create question' });
    }
});

// Update a question
app.put('/api/questions/:id', async (req, res) => {
    try {
        const { topic, paper, questionBlocks, answerBlocks } = req.body;

        const updateData = {
            topic,
            paper,
            questionBlocks,
            answerBlocks,
            updatedAt: new Date()
        };

        const result = await questionsCollection.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Question not found' });
        }

        res.json({ message: 'Question updated successfully' });
    } catch (error) {
        console.error('Error updating question:', error);
        res.status(500).json({ error: 'Failed to update question' });
    }
});

// Delete a question
app.delete('/api/questions/:id', async (req, res) => {
    try {
        const result = await questionsCollection.deleteOne({
            _id: new ObjectId(req.params.id)
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Question not found' });
        }

        res.json({ message: 'Question deleted successfully' });
    } catch (error) {
        console.error('Error deleting question:', error);
        res.status(500).json({ error: 'Failed to delete question' });
    }
});

// Get statistics
app.get('/api/stats', async (req, res) => {
    try {
        const totalQuestions = await questionsCollection.countDocuments();
        const paper1Count = await questionsCollection.countDocuments({ paper: 1 });
        const paper2Count = await questionsCollection.countDocuments({ paper: 2 });

        const topicStats = await questionsCollection.aggregate([
            { $group: { _id: '$topic', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]).toArray();

        res.json({
            total: totalQuestions,
            paper1: paper1Count,
            paper2: paper2Count,
            byTopic: topicStats
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'Failed to fetch statistics' });
    }
});

// Production: Serve static files from vite/dist (default unless NODE_ENV is 'development')
const isProduction = process.env.NODE_ENV !== 'development';

if (isProduction) {
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
    console.log(`🚀 Backend server listening at http://0.0.0.0:${port}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});
