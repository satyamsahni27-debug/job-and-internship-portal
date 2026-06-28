const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
  try {
   const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !password || !phoneNumber || !role) {
    return res.status(400).json({ success: false, message: "सभी फ़ील्ड भरना ज़रूरी है" });
}

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return res.status(201).json({
      success: true,
      message: `बधाई हो ${fullname}, आपका अकाउंट सफलतापूर्वक रजिस्टर हो गया! (Mock Active)`,
      user: { fullname, email, role }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/v1/user/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "ईमेल और पासवर्ड डालना ज़रूरी है" });
    }

    
        const token = jwt.sign({ id: "mock_user_id" }, process.env.JWT_SECRET || 'fallback_secret', {
            expiresIn: '1d'
        });

        return res.status(200).json({
            success: true,
            message: "लॉगिन सफलतापूर्वक हो गया!",
            token,
            user: {
                fullname: "Satyam Sahani",
                email: email,
                role: "student" 
            }
        });
        // ------------------------------------------------------------------------

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { registerUser, loginUser };