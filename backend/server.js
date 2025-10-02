// server.js

// Load environment variables (though mostly for port/URI safety)
require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
// The default MongoDB port is 27017, and the DB name is 'physics_lab'
const LOCAL_MONGODB_URI = 'mongodb://localhost:27017/physics_lab'; 
const PORT = process.env.PORT || 5001;

// ----------------- MIDDLEWARES -----------------

// Allow all origins for simplicity during development
app.use(cors()); 

// Parse incoming JSON data (required to read req.body)
app.use(express.json());

// ----------------- DATABASE CONNECTION -----------------

mongoose.connect(LOCAL_MONGODB_URI)
    .then(() => console.log('✅ MongoDB connected successfully to local instance'))
    .catch(err => console.error('❌ MongoDB connection error:', err.message));

// ----------------- DATABASE SCHEMA AND MODEL -----------------

const resultSchema = new mongoose.Schema({
    angle: { type: Number, required: true },
    speed: { type: Number, required: true },
    maxHeight: { type: Number, required: true },
    range: { type: Number, required: true },
    time: { type: Number, required: true },
    scored: { type: Boolean, required: true }, 
    timestamp: { type: Date, default: Date.now }
});

const Result = mongoose.model('Result', resultSchema);

// ----------------- API ROUTES -----------------

// POST Route: Save simulation results
app.post('/api/save-result', async (req, res) => {
    try {
        const { angle, speed, maxHeight, range, time, scored } = req.body;
        
        if (angle === undefined || speed === undefined || scored === undefined) {
            return res.status(400).json({ message: 'Missing required fields.' });
        }

        const newResult = new Result({
            angle,
            speed,
            maxHeight: parseFloat(maxHeight),
            range: parseFloat(range),
            time: parseFloat(time),
            scored
        });

        await newResult.save();
        
        res.status(201).json({ 
            message: 'Result saved successfully!', 
            status: scored ? 'Hit' : 'Miss',
            id: newResult._id 
        });
    } catch (error) {
        console.error('Error saving result:', error);
        res.status(500).json({ message: 'Failed to save result', error: error.message });
    }
});

// GET Route: Retrieve all simulation results
app.get('/api/history', async (req, res) => {
    try {
        const history = await Result.find().sort({ timestamp: -1 });
        res.status(200).json(history);
    } catch (error) {
        console.error('Error fetching history:', error);
        res.status(500).json({ message: 'Failed to fetch history', error: error.message });
    }
});

// NEW DELETE Route: Clear all simulation history
app.delete('/api/history', async (req, res) => {
    try {
        // Mongoose function to delete ALL documents in the collection
        const result = await Result.deleteMany({});
        
        res.status(200).json({ 
            message: 'All history cleared successfully!', 
            deletedCount: result.deletedCount 
        });
    } catch (error) {
        console.error('Error clearing history:', error);
        res.status(500).json({ message: 'Failed to clear history', error: error.message });
    }
});

// ----------------- SERVER START -----------------

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});