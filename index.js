require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Basic middleware
app.use(express.json());

// Test routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Backend server is running!',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API endpoint working!',
    status: 'success'
  });
});

app.get('/api/db-test', (req, res) => {
  const mongoose = require('mongoose');
  res.json({
    message: 'Database connection test',
    status: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    database: mongoose.connection.name || 'not connected'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;