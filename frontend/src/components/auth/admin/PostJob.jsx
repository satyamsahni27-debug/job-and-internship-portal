import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../shared/Navbar';

const PostJob = () => {
    const navigate = useNavigate();
    const currentUser = JSON.parse(sessionStorage.getItem('jobPortalUser'));

    // 📝 स्टैंडर्ड फ़ील्ड्स का स्टेट
    const [input, setInput] = useState({
        title: "",
        location: "",
        salary: "",
        jobType: "Full-Time",
        experience: "",
        openings: "",
        skills: "",
        description: ""
    });

    // 🚀 🌟 कलेक्टिव कस्टम सेक्शंस का स्टेट
    const [extraFields, setExtraFields] = useState([]);

    const changeInputHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    // ➕ कस्टम सेक्शन इनपुट रो (Row) जोड़ने का फ़ंक्शन
    const addExtraFieldHandler = () => {
        setExtraFields([...extraFields, { heading: "", value: "" }]);
    };

    // ❌ कस्टम सेक्शन रो हटाने का फ़ंक्शन
    const removeExtraFieldHandler = (index) => {
        const updatedFields = extraFields.filter((_, i) => i !== index);
        setExtraFields(updatedFields);
    };

    // ✍ * ककस्टम सेक्शंस की वैल्यू चेंज हैंडलर
    const handleExtraFieldChange = (index, fieldType, val) => {
        const updatedFields = [...extraFields];
        updatedFields[index][fieldType] = val;
        setExtraFields(updatedFields);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        
        if (!currentUser) {
            alert("कृपया पहले लॉगिन करें भाई! 🔑");
            return;
        }

        const allJobs = JSON.parse(localStorage.getItem('jobPortalAllJobs')) || [];

        // ✨ नया जॉब ऑब्जेक्ट (एक्सट्रा कस्टम इंफॉर्मेशन के साथ)
        const newJob = {
            id: Date.now().toString(),
            ...input,
            createdById: currentUser.id,
            companyName: currentUser.name || "Tech Company",
            extraInformation: extraFields.filter(f => f.heading.trim() !== "" && f.value.trim() !== "") 
        };

        localStorage.setItem('jobPortalAllJobs', JSON.stringify([...allJobs, newJob]));
        alert("Job posted successfully with your custom sections! 🎉");
        navigate('/');
    };

    return (
        <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', backgroundColor: '#f0edfa', paddingBottom: '40px' }}>
            <Navbar />
            <div style={{ maxWidth: '700px', margin: '30px auto', padding: '25px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#6A38C2', textAlign: 'center', marginBottom: '25px' }}>Post A New Job / Internship</h2>
                
                <form onSubmit={submitHandler}>
                    {/* 🗂️ Grid for standard inputs */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '15px' }}>
                        <div>
                            <label style={{ fontSize: '13px', fontWeight: '600', color: '#4B5563', display: 'block', marginBottom: '5px' }}>Job Title / Role</label>
                            <input type="text" name="title" value={input.title} onChange={changeInputHandler} placeholder="e.g. Web Development Intern" required style={{ width: '92%', padding: '10px', border: '1px solid #D1D5DB', borderRadius: '6px' }} />
                        </div>
                        <div>
                            <label style={{ fontSize: '13px', fontWeight: '600', color: '#4B5563', display: 'block', marginBottom: '5px' }}>Location</label>
                            <input type="text" name="location" value={input.location} onChange={changeInputHandler} placeholder="e.g. Noida / Remote" required style={{ width: '92%', padding: '10px', border: '1px solid #D1D5DB', borderRadius: '6px' }} />
                        </div>
                        <div>
                            <label style={{ fontSize: '13px', fontWeight: '600', color: '#4B5563', display: 'block', marginBottom: '5px' }}>Salary / Stipend</label>
                            <input type="text" name="salary" value={input.salary} onChange={changeInputHandler} placeholder="e.g. 20k/Month or 4 LPA" required style={{ width: '92%', padding: '10px', border: '1px solid #D1D5DB', borderRadius: '6px' }} />
                        </div>
                        <div>
                            <label style={{ fontSize: '13px', fontWeight: '600', color: '#4B5563', display: 'block', marginBottom: '5px' }}>Job Type</label>
                            <select name="jobType" value={input.jobType} onChange={changeInputHandler} style={{ width: '98%', padding: '10px', border: '1px solid #D1D5DB', borderRadius: '6px', backgroundColor: '#fff' }}>
                                <option value="Full-Time">Full-Time</option>
                                <option value="Part-Time">Part-Time</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ fontSize: '13px', fontWeight: '600', color: '#4B5563', display: 'block', marginBottom: '5px' }}>Experience Required</label>
                            <input type="text" name="experience" value={input.experience} onChange={changeInputHandler} placeholder="e.g. Freshers / 1-2 Years" required style={{ width: '92%', padding: '10px', border: '1px solid #D1D5DB', borderRadius: '6px' }} />
                        </div>
                        <div>
                            <label style={{ fontSize: '13px', fontWeight: '600', color: '#4B5563', display: 'block', marginBottom: '5px' }}>No. of Openings</label>
                            <input type="number" name="openings" value={input.openings} onChange={changeInputHandler} placeholder="e.g. 3" required style={{ width: '92%', padding: '10px', border: '1px solid #D1D5DB', borderRadius: '6px' }} />
                        </div>
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ fontSize: '13px', fontWeight: '600', color: '#4B5563', display: 'block', marginBottom: '5px' }}>Required Skills / Requirements</label>
                        <input type="text" name="skills" value={input.skills} onChange={changeInputHandler} placeholder="e.g. React, JavaScript, Node.js (comma separated)" style={{ width: '97%', padding: '10px', border: '1px solid #D1D5DB', borderRadius: '6px' }} />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ fontSize: '13px', fontWeight: '600', color: '#4B5563', display: 'block', marginBottom: '5px' }}>Description</label>
                        <textarea name="description" value={input.description} onChange={changeInputHandler} placeholder="Describe the responsibilities or internship duration..." rows="3" required style={{ width: '97%', padding: '10px', border: '1px solid #D1D5DB', borderRadius: '6px', resize: 'vertical' }}></textarea>
                    </div>

                    {/* =============================================================
                        🔥 🌟 डाइनामिक कस्ट्रम सेक्शन ज़ोन
                       ============================================================= */}
                    <div style={{ borderTop: '1px dashed #D1D5DB', paddingTop: '15px', marginBottom: '25px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                            <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#374151', margin: 0 }}>✨ Extra Sections / Custom Information</h4>
                            <button type="button" onClick={addExtraFieldHandler} style={{ padding: '8px 14px', backgroundColor: '#10B981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}>
                                + Add Custom Field
                            </button>
                        </div>

                        {extraFields && extraFields.map((field, index) => (
                            <div key={index} style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px', width: '99%' }}>
                                <input type="text" value={field.heading} onChange={(e) => handleExtraFieldChange(index, 'heading', e.target.value)} placeholder="Title (e.g. Perks / Bond Period)" style={{ flex: 1, padding: '10px', border: '1px solid #D1D5DB', borderRadius: '6px', fontSize: '13px' }} />
                                <input type="text" value={field.value} onChange={(e) => handleExtraFieldChange(index, 'value', e.target.value)} placeholder="Details (e.g. Free Meals / 6 Months)" style={{ flex: 2, padding: '10px', border: '1px solid #D1D5DB', borderRadius: '6px', fontSize: '13px' }} />
                                <button type="button" onClick={() => removeExtraFieldHandler(index)} style={{ padding: '10px 14px', backgroundColor: '#EF4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>
                                    🗑️
                                </button>
                            </div>
                        ))}
                    </div>

                    <button type="submit" style={{ width: '100%', padding: '14px', backgroundColor: '#6A38C2', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>
                        Post Listing Now 🚀
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostJob;