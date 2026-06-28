const express = require('express');
const { applyJob, getApplications } = require('../controllers/applicationController');
const router = express.Router();

// जॉब अप्लाई और गेट करने के रूट्स
router.post('/apply', applyJob);
router.get('/get', getApplications);

module.exports = router;