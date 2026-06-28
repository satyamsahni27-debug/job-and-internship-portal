const Job = require('../models/Job');

// @desc    Post a new job
// @route   POST /api/v1/job/post
const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, position, companyId } = req.body;

        if (!title || !description || !salary || !location || !jobType || !position || !companyId) {
            return res.status(400).json({ success: false, message: "सभी ज़रूरी फ़ील्ड भरना अनिवार्य है" });
        }

        // मॉक मोड सक्सेस रिस्पॉन्स
        return res.status(201).json({
            success: true,
            message: "नई नौकरी (Job) सफलतापूर्वक पोस्ट कर दी गई है! (Mock Active)",
            job: {
                id: "mock_job_id_999",
                title,
                description,
                salary,
                location,
                jobType,
                position,
                company: companyId
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all jobs
// @route   GET /api/v1/job/get
const getAllJobs = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            jobs: [
                { id: "j1", title: "MERN Stack Developer", salary: 600000, location: "Noida" },
                { id: "j2", title: "Frontend Engineer (React)", salary: 500000, location: "Gorakhpur" }
            ]
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { postJob, getAllJobs };