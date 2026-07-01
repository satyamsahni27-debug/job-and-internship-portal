import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../shared/Navbar';
import { AuthContext } from '../../../context/AuthContext';

const PostJob = () => {
    const { allJobs, setAllJobs } = useContext(AuthContext);
    const navigate = useNavigate();

    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "", // स्किल्स
        salary: "",
        location: "",
        jobType: "Full-Time",
        experience: "",  // अनुभव
        position: ""     // कुल पद
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();

        // शुद्ध नंबर स्ट्रिंग यूनिक आईडी भाई
        // 🌟 सेशन स्टोरेज से लॉगिन किए हुए रिक्रूटर का डेटा निकाला
        const currentUser = JSON.parse(sessionStorage.getItem('jobPortalUser'));

        const newJob = {
            ...input,
            id: Date.now().toString(),
            createdById: currentUser?.id // 🎯 यह लाइन जॉब के साथ रिक्रूटर की ID को हमेशा के लिए बांध देगी भाई!
        };

        const updatedJobs = [newJob, ...allJobs];

        setAllJobs(updatedJobs);
        localStorage.setItem('jobPortalAllJobs', JSON.stringify(updatedJobs));

        alert("🎉The new listing has been successfully posted!");
        navigate("/admin/jobs");
    };

    return (
        <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
            <Navbar />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '30px 20px' }}>
                <form onSubmit={submitHandler} style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', width: '100%', maxWidth: '650px' }}>
                    <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#6A38C2', marginBottom: '20px', textAlign: 'center' }}>Post A New Job / Internship</h2>

                    {/* रो 1: टाइटल और लोकेशन */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500, fontSize: '14px' }}>Job Title / Role</label>
                            <input type="text" name="title" value={input.title} onChange={changeEventHandler} required style={{ width: '92%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px' }} placeholder="e.g. Web Development Intern" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500, fontSize: '14px' }}>Location</label>
                            <input type="text" name="location" value={input.location} onChange={changeEventHandler} required style={{ width: '92%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px' }} placeholder="e.g. Noida / Remote" />
                        </div>
                    </div>

                    {/* रो 2: सैलरी और जॉब टाइप */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500, fontSize: '14px' }}>Salary / Stipend</label>
                            <input type="text" name="salary" value={input.salary} onChange={changeEventHandler} required style={{ width: '92%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px' }} placeholder="e.g. 20k/Month or 4 LPA" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500, fontSize: '14px' }}>Job Type</label>
                            <select name="jobType" value={input.jobType} onChange={changeEventHandler} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px', backgroundColor: '#fff' }}>
                                <option value="Full-Time">Full-Time</option>
                                <option value="Part-Time">Part-Time</option>
                                <option value="Remote">Remote</option>
                                <option value="Internship">Internship 🎓</option>
                            </select>
                        </div>
                    </div>

                    {/* 🌟 रो 3 (NEW): आवश्यक अनुभव और कुल रिक्तियां (Openings) */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500, fontSize: '14px' }}>Experience Required</label>
                            <input type="text" name="experience" value={input.experience} onChange={changeEventHandler} required style={{ width: '92%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px' }} placeholder="e.g. Freshers / 1-2 Years" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500, fontSize: '14px' }}>No. of Openings</label>
                            <input type="number" name="position" value={input.position} onChange={changeEventHandler} required style={{ width: '92%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px' }} placeholder="e.g. 3" min="1" />
                        </div>
                    </div>

                    {/* 🌟 फ़ील्ड 4 (NEW): की-स्किल्स / रिक्वायरमेंट्स */}
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500, fontSize: '14px' }}>Required Skills / Requirements</label>
                        <input type="text" name="requirements" value={input.requirements} onChange={changeEventHandler} required style={{ width: '96%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px' }} placeholder="e.g. React, JavaScript, Node.js (comma separated)" />
                    </div>

                    {/* रो 5: डिस्क्रिप्शन */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500, fontSize: '14px' }}>Description</label>
                        <textarea name="description" value={input.description} onChange={changeEventHandler} required style={{ width: '96%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px', height: '60px', resize: 'none' }} placeholder="Describe the responsibilities or internship duration..." />
                    </div>

                    <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#6A38C2', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' }}>
                        Post Listing Now 🚀
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostJob;