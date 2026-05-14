const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const studentRoutes = require('./routes/studentRoutes');
app.use('/api/students', studentRoutes);

// Root Route
app.get('/', (req, res) => {
    res.send('Student Management System API is running...');
});

// MongoDB Connection (Local Instance)
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/student-db')
    .then(() => {
        console.log('Connected to Local MongoDB');
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });
 