const express = require('express');
const { registerCompany, getCompanies } = require('../controllers/companyController');
const router = express.Router();

// कंपनी रजिस्ट्रेशन और गेट करने के रूट्स
router.post('/register', registerCompany);
router.get('/get', getCompanies);

module.exports = router;