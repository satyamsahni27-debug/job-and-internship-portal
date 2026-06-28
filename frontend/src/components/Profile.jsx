import React, { useContext, useState } from 'react';
import Navbar from './shared/Navbar';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
    const { user, setUser } = useContext(AuthContext);
    const currentUser = user || JSON.parse(sessionStorage.getItem('jobPortalUser'));
    
    const [openEdit, setOpenEdit] = useState(false);
    const [skillsInput, setSkillsInput] = useState(currentUser?.profile?.skills?.join(', ') || "");
    const [bioInput, setBioInput] = useState(currentUser?.profile?.bio || "");
    const [resumeFile, setResumeFile] = useState(null);

    if (!currentUser) return <div style={{ padding: '20px', textAlign: 'center' }}>कृपया पहले लॉगिन करें भाई!</div>;

    const handleUpdate = (e) => {
        e.preventDefault();
        
        const skillsArray = skillsInput.split(',').map(skill => skill.trim()).filter(skill => skill !== "");

        const updatedUser = {
            ...currentUser,
            profile: {
                ...currentUser.profile,
                bio: bioInput,
                skills: skillsArray,
                resumeOriginalName: resumeFile ? resumeFile.name : currentUser.profile?.resumeOriginalName || "resume.pdf"
            }
        };

        setUser(updatedUser);
        sessionStorage.setItem('jobPortalUser', JSON.stringify(updatedUser));

        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        const updatedList = registeredUsers.map(u => u.email === currentUser.email ? updatedUser : u);
        localStorage.setItem('registeredUsers', JSON.stringify(updatedList));

        setOpenEdit(false);
        alert("प्रोफाइल और रिज्यूमे सफलतापूर्वक अपडेट हो गया भाई! 🎉");
    };

    return (
        <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh', fontFamily: 'sans-serif' }}>
            <Navbar />
            <div style={{ maxWidth: '800px', margin: '40px auto', backgroundColor: '#ffffff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f3f4f6', paddingBottom: '20px' }}>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>{currentUser.name}</h2>
                        <p style={{ margin: '5px 0 0 0', color: '#4B5563', fontSize: '15px' }}>{currentUser.email}</p>
                        <p style={{ margin: '5px 0 0 0', display: 'inline-block', backgroundColor: '#EEF2FF', color: '#4F46E5', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', textTransform: 'capitalize' }}>{currentUser.role}</p>
                    </div>
                    <button onClick={() => setOpenEdit(true)} style={{ padding: '8px 16px', border: '1px solid #6A38C2', color: '#6A38C2', backgroundColor: 'transparent', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>
                        ✏️ Edit Profile
                    </button>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#374151', margin: '0 0 8px 0' }}>Bio</h3>
                    <p style={{ color: '#6B7280', margin: 0, fontSize: '15px', lineHeight: '1.5' }}>
                        {currentUser.profile?.bio || "कोई बायो नहीं डाला गया है भाई।"}
                    </p>
                </div>

                <div style={{ marginTop: '25px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#374151', margin: '0 0 10px 0' }}>Skills</h3>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {currentUser.profile?.skills && currentUser.profile.skills.length > 0 ? (
                            currentUser.profile.skills.map((skill, i) => (
                                <span key={i} style={{ backgroundColor: '#111827', color: '#ffffff', padding: '6px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 500 }}>
                                    {skill}
                                </span>
                            ))
                        ) : (
                            <p style={{ color: '#9CA3AF', margin: 0, fontSize: '14px' }}>कोई स्किल्स नहीं जोड़ी गई हैं।</p>
                        )}
                    </div>
                </div>

                <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #f3f4f6' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#374151', margin: '0 0 10px 0' }}>Resume</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '24px' }}>📄</span>
                        <span style={{ color: '#6A38C2', fontWeight: 600, fontSize: '15px' }}>
                            {currentUser.profile?.resumeOriginalName || "No resume uploaded yet"}
                        </span>
                    </div>
                </div>
            </div>

            {openEdit && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
                    <form onSubmit={handleUpdate} style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '10px', width: '100%', maxWidth: '500px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: 'bold' }}>Update Profile</h3>
                        
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>Bio</label>
                            <textarea value={bioInput} onChange={(e) => setBioInput(e.target.value)} placeholder="अपने बारे में कुछ लिखें..." style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', height: '80px', resize: 'none' }} />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>Skills (Comma separated)</label>
                            <input type="text" value={skillsInput} onChange={(e) => setSkillsInput(e.target.value)} placeholder="React, Node, HTML" style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                        </div>

                        <div style={{ marginBottom: '25px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>Upload Resume (PDF)</label>
                            <input type="file" accept=".pdf" onChange={(e) => setResumeFile(e.target.files[0])} style={{ width: '100%' }} />
                        </div>

                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                            <button type="button" onClick={() => setOpenEdit(false)} style={{ padding: '8px 16px', border: '1px solid #d1d5db', backgroundColor: '#ffffff', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
                            <button type="submit" style={{ padding: '8px 16px', border: 'none', backgroundColor: '#6A38C2', color: '#ffffff', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Save Changes</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Profile;