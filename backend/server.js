const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Environment variables लोड करें
dotenv.config();

// डेटाबेस से कनेक्ट करें
connectDB();

const app = express();

// Middlewares
const corsOptions = {
    origin: 'http://localhost:5173', // आपके फ्रंटएंड का यूआरएल
    credentials: true,                // कुकीज़ और क्रेडेंशियल्स अलाउ करने के लिए
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// बेसिक रूट (चेक करने के लिए)
app.get('/', (req, res) => {
  res.send('🚀 Job Portal API is running successfully!');
});
// एपीआई रूट्स जोड़ें
app.use('/api/v1/user', require('./routes/authRoutes'));
app.use('/api/v1/company', require('./routes/companyRoutes'));
app.use('/api/v1/job', require('./routes/jobRoutes'));
app.use('/api/v1/application', require('./routes/applicationRoutes'));
// सर्वर पोर्ट
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`⚡ Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});