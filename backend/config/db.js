const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log("⏳ Connecting to local database, please wait...");
        
        // सीधे आपकी .env फ़ाइल वाले लोकल मोंगोडीबी लिंक से कनेक्ट करेगा
        const conn = await mongoose.connect(process.env.MONGO_URI);
        
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`🔴 Error: ${error.message}`);
        process.exit(1); // एरर आने पर प्रोसेस को बंद करेगा
    }
};

module.exports = connectDB;