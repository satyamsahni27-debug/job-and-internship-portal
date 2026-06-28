const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'कृपया अपना नाम दर्ज करें'],
    },
    email: {
      type: String,
      required: [true, 'कृपया अपनी ईमेल दर्ज करें'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'कृपया एक पासवर्ड दर्ज करें'],
      minlength: [6, 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए'],
    },
    role: {
      type: String,
      enum: ['seeker', 'recruiter'], // seeker = जॉब ढूंढने वाला, recruiter = जॉब देने वाला
      default: 'seeker',
    },
    profile: {
      bio: { type: String, default: '' },
      skills: [{ type: String }], // Array of skills e.g. ["React", "Node"]
      resume: { type: String, default: '' }, // रिज्यूमे फाइल का URL या नाम
      resumeOriginalName: { type: String, default: '' },
      company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }, // अगर recruiter है तो
      profilePhoto: { type: String, default: '' },
    },
  },
  { timestamps: true } // इससे 'createdAt' और 'updatedAt' अपने आप बन जाएगा
);

module.exports = mongoose.model('User', userSchema);