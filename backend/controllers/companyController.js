const Company = require('../models/Company');

// @desc    Register a new company
// @route   POST /api/v1/company/register
const registerCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;

        if (!name) {
            return res.status(400).json({ success: false, message: "कंपनी का नाम होना ज़रूरी है" });
        }

        // मॉक रिस्पॉन्स ताकि डेटाबेस कनेक्टिविटी के बिना काम न रुके
        return res.status(201).json({
            success: true,
            message: "कंपनी सफलतापूर्वक रजिस्टर हो गई है! (Mock Active)",
            company: {
                id: "mock_company_id_123",
                name,
                description,
                website,
                location
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all companies
// @route   GET /api/v1/company/get
const getCompanies = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            companies: [
                { id: "1", name: "Google", location: "Bangalore" },
                { id: "2", name: "Microsoft", location: "Hyderabad" }
            ]
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { registerCompany, getCompanies };