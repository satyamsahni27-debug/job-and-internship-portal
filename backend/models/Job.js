const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'जॉब का टाइटल ज़रूरी है'],
    },
    description: {
      type: String,
      required: [true, 'जॉब का डिस्क्रिप्शन ज़रूरी है'],
    },
    requirements: [{ type: String }], // ज़रूरी स्किल्स
    salary: {
      type: Number,
      required: [true, 'सैलरी दर्ज करना ज़रूरी है'],
    },
    location: {
      type: String,
      required: [true, 'जॉब की लोकेशन ज़रूरी है'],
    },
    jobType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Remote', 'Internship'],
      required: true,
    },
    position: {
      type: Number,
      required: true, // कितनी वैकेंसी खाली हैं
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company', // Company मॉडल से लिंक
      required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // किस HR/Recruiter ने पोस्ट किया
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);