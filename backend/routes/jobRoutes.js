const express = require('express');
const { postJob, getAllJobs } = require('../controllers/jobController');
const router = express.Router();

// जॉब पोस्ट करने और गेट करने के रूट्स
router.post('/post', postJob);
router.get('/get', getAllJobs);

module.exports = router;