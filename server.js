const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const taskRoutes = require('./routes/taskRoutes');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());                                
app.use('/api/tasks', taskRoutes);
const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
};

startServer();