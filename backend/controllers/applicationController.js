const Application = require('../models/Application');

// @desc    Apply for a job
// @route   POST /api/v1/application/apply
const applyJob = async (req, res) => {
    try {
        const { jobId, applicantId } = req.body;

        if (!jobId || !applicantId) {
            return res.status(400).json({ success: false, message: "Job ID और Applicant ID होना ज़रूरी है" });
        }

        
        return res.status(201).json({
            success: true,
            message: "जॉब के लिए आपका आवेदन (Application) सफलतापूर्वक जमा हो गया है! (Mock Active)",
            application: {
                id: "mock_app_id_555",
                job: jobId,
                applicant: applicantId,
                status: "pending"
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


const getApplications = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            applications: [
                { id: "a1", jobTitle: "Node.js Developer", status: "pending" },
                { id: "a2", jobTitle: "Frontend Engineer", status: "accepted" }
            ]
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { applyJob, getApplications };