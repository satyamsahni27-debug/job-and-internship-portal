import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../shared/Navbar';

const Signup = () => {
    const [input, setInput] = useState({ name: "", email: "", role: "student" });
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (!input.name || !input.email) {
            alert("कृपया नाम और ईमेल दोनों भरें भाई!");
            return;
        }

        const existingUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        const userExists = existingUsers.some(u => u.email === input.email);
        
        if (userExists) {
            alert("यह ईमेल पहले से रजिस्टर्ड है भाई! सीधे लॉगिन करें।");
            navigate('/login');
            return;
        }

        // 🌟 ओरिजिनल प्रोफाइल स्ट्रक्चर (बायो, स्किल्स, और रिज्यूम के डिफॉल्ट्स के साथ)
        const newUser = {
            id: `user-${Date.now()}`,
            name: input.name,
            email: input.email,
            role: input.role,
            profile: {
                bio: "",
                skills: [],
                resume: null, // यहाँ पीडीएफ रिज्यूम स्टोर होगा भाई
                resumeOriginalName: ""
            }
        };

        existingUsers.push(newUser);
        localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

        alert("अकाउंट सफलतापूर्वक बन गया है भाई! अब लॉगिन करें।");
        navigate('/login');
    };

    return (
        <div>
            <Navbar />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 64px)', backgroundColor: '#f9fafb', fontFamily: 'sans-serif' }}>
                <form onSubmit={submitHandler} style={{ width: '100%', maxWidth: '400px', backgroundColor: '#ffffff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                    <h2 style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '20px', color: '#111827', textAlign: 'center' }}>
                        Sign <span style={{ color: '#6A38C2' }}>Up</span>
                    </h2>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500, fontSize: '14px' }}>Full Name</label>
                        <input type="text" name="name" value={input.name} onChange={changeEventHandler} placeholder="Enter your name" style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', outline: 'none' }} />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500, fontSize: '14px' }}>Email Address</label>
                        <input type="email" name="email" value={input.email} onChange={changeEventHandler} placeholder="example@gmail.com" style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', outline: 'none' }} />
                    </div>

                    <div style={{ marginBottom: '20px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '14px' }}>
                            <input type="radio" name="role" value="student" checked={input.role === 'student'} onChange={changeEventHandler} /> Student
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '14px' }}>
                            <input type="radio" name="role" value="recruiter" checked={input.role === 'recruiter'} onChange={changeEventHandler} /> Recruiter
                        </label>
                    </div>

                    <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#6A38C2', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', marginBottom: '15px' }}>
                        Register Now 🚀
                    </button>

                    <p style={{ fontSize: '14px', color: '#4B5563', textAlign: 'center', margin: 0 }}>
                        Already have an account? <span onClick={() => navigate('/login')} style={{ color: '#F83002', cursor: 'pointer', fontWeight: 600 }}>Login</span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;