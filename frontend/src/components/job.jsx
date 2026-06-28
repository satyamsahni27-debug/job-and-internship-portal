import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // 🌟 होम पेज से डेटा रिसीव करने के लिए
import Navbar from './shared/Navbar';
import { AuthContext } from '../context/AuthContext';

const Jobs = () => {
    const { allJobs, setAllJobs, applications, setApplications, user } = useContext(AuthContext);
    const location = useLocation(); // 🌟 राउटर लोकेशन स्टेट

    // 🌟 होम पेज से आ रहे कीवर्ड या फ़िल्टर टाइप को पहले चेक करो भाई
    const initialSearch = location.state?.searchKeyword || '';
    const initialType = location.state?.filterType || '';

    // 🌟 स्टेट्स (अगर होम पेज से इंटर्नशिप पर क्लिक हुआ है, तो डिफ़ॉल्ट रूप से वही सेट होगा)
    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedType, setSelectedType] = useState(initialType); 
    const [selectedSalary, setSelectedSalary] = useState(''); 

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // लोकल स्टोरेज से फ्रेश डेटा उठाना
    const currentJobsList = JSON.parse(localStorage.getItem('jobPortalAllJobs')) || allJobs;
    const liveApplicationsList = JSON.parse(localStorage.getItem('jobPortalApplications')) || applications;

    // फ़िल्टर साफ़ करने का फ़ंक्शन
    const resetFiltersHandler = () => {
        setSearchQuery('');
        setSelectedLocation('');
        setSelectedType('');
        setSelectedSalary('');
    };

    // एडवांस्ड फ़िल्टर लॉजिक
    const filteredJobs = currentJobsList.filter(job => {
        const matchesSearch = searchQuery 
            ? (job.title.toLowerCase().includes(searchQuery.toLowerCase()) || job.description.toLowerCase().includes(searchQuery.toLowerCase()))
            : true;
        const matchesLocation = selectedLocation ? job.location.toLowerCase().includes(selectedLocation.toLowerCase()) : true;
        
        // 🌟 मुख्य लॉजिक: अगर 'Internship' सिलेक्ट है तो सिर्फ इंटर्नशिप ही मैच होगी ভাই!
        const matchesType = selectedType ? job.jobType === selectedType : true;
        
        let matchesSalary = true;
        if (selectedSalary === '0-3') matchesSalary = parseInt(job.salary) <= 3;
        else if (selectedSalary === '3-6') matchesSalary = parseInt(job.salary) > 3 && parseInt(job.salary) <= 6;
        else if (selectedSalary === '6+') matchesSalary = parseInt(job.salary) > 6;

        return matchesSearch && matchesLocation && matchesType && matchesSalary;
    });

    const applyJobHandler = (job) => {
        const currentUser = user || JSON.parse(sessionStorage.getItem('jobPortalUser'));
        if (!currentUser) { alert("Please log in first."); return; }
        
        const alreadyApplied = liveApplicationsList.some(app => app.jobId === job.id && app.studentEmail === currentUser.email);
        if (alreadyApplied) { alert("You have already applied"); return; }

        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.pdf,.png,.jpg,.jpeg';

        fileInput.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onloadend = () => {
                const newApplication = {
                    id: `app-${Date.now()}`,
                    jobId: job.id,
                    jobTitle: job.title,
                    studentName: currentUser.name || "Student",
                    studentEmail: currentUser.email,
                    resumeName: file.name,
                    resumeUrl: reader.result,
                    status: "Pending"
                };
                
                const updatedApps = [newApplication, ...liveApplicationsList];
                setApplications(updatedApps);
                localStorage.setItem('jobPortalApplications', JSON.stringify(updatedApps));
                alert("It has been applied successfully, 🎉");
            };
            reader.readAsDataURL(file);
        };
        fileInput.click();
    };

    const currentUser = user || JSON.parse(sessionStorage.getItem('jobPortalUser'));

    return (
        <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
            <Navbar />
            <div style={{ maxWidth: '1200px', margin: '20px auto', padding: '0 20px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '20px' }}>
                
                {/* फ़िल्टर साइडबार */}
                <div style={{ width: isMobile ? 'auto' : '280px', backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', height: 'fit-content' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0 }}>Filter Listings</h3>
                        <button onClick={resetFiltersHandler} style={{ border: 'none', backgroundColor: 'transparent', color: '#EF4444', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Clear All</button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        
                        <div>
                            <label style={{ fontSize: '13px', color: '#4B5563', display: 'block', marginBottom: '4px', fontWeight: 500 }}>Search Keyword</label>
                            <input type="text" placeholder="e.g. React, Developer" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: '92%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px' }} />
                        </div>

                        <div>
                            <label style={{ fontSize: '13px', color: '#4B5563', display: 'block', marginBottom: '4px', fontWeight: 500 }}>Location</label>
                            <input type="text" placeholder="e.g. Noida / Remote" value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} style={{ width: '92%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px' }} />
                        </div>

                        <div>
                            <label style={{ fontSize: '13px', color: '#4B5563', display: 'block', marginBottom: '4px', fontWeight: 500 }}>Listing Type</label>
                            {/* 🌟 ड्रॉपडाउन वैल्यू सीधे होम पेज के स्टेट से कनेक्टेड है भाई */}
                            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', backgroundColor: '#fff', fontSize: '13px' }}>
                                <option value="">All Types</option>
                                <option value="Full-Time">Full-Time</option>
                                <option value="Part-Time">Part-Time</option>
                                <option value="Remote">Remote</option>
                                <option value="Internship">Internship 🎓</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ fontSize: '13px', color: '#4B5563', display: 'block', marginBottom: '4px', fontWeight: 500 }}>Salary Range</label>
                            <select value={selectedSalary} onChange={(e) => setSelectedSalary(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', backgroundColor: '#fff', fontSize: '13px' }}>
                                <option value="">All Salaries</option>
                                <option value="0-3">0-3 LPA</option>
                                <option value="3-6">3-6 LPA</option>
                                <option value="6+">6+ LPA</option>
                            </select>
                        </div>

                    </div>
                </div>

                {/* जॉब्स लिस्टिंग एरिया */}
                <div style={{ flex: 1 }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', color: '#111827' }}>
                        Available Positions ({filteredJobs.length})
                    </h2>
                    
                    {filteredJobs.length === 0 ? (
                        <div style={{ backgroundColor: '#ffffff', padding: '40px 20px', borderRadius: '10px', border: '1px solid #e5e7eb', textAlign: 'center', marginTop: '10px' }}>
                            <span style={{ fontSize: '40px', display: 'block', marginBottom: '10px' }}>🎓</span>
                            <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#374151', margin: '0 0 5px 0' }}>Couldn't find any posts in this category, bro!</h3>
                            <p style={{ color: '#6B7280', fontSize: '13px', margin: '0 0 15px 0' }}>The recruiter hasn't posted any live internships here yet.।</p>
                            <button onClick={resetFiltersHandler} style={{ padding: '8px 16px', backgroundColor: '#6A38C2', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>
                                View All Positions
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                            {filteredJobs.map((job, index) => {
                                const isApplied = liveApplicationsList.some(app => app.jobId === job.id && app.studentEmail === currentUser?.email);
                                return (
                                    <div key={job.id || index} style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 2px 4px rgba(0,0,0,0.01)' }}>
                                        <div>
                                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 5px 0', color: '#111827' }}>{job.title}</h3>
                                            <p style={{ fontSize: '13px', color: '#4B5563', margin: '0 0 15px 0', lineHeight: 1.4 }}>{job.description}</p>
                                            
                                            <div style={{ display: 'flex', gap: '6px', marginBottom: '15px', flexWrap: 'wrap' }}>
                                                <span style={{ fontSize: '11px', backgroundColor: '#F3F4F6', padding: '3px 6px', borderRadius: '4px', fontWeight: 600, color: '#374151' }}>📍 {job.location}</span>
                                                <span style={{ fontSize: '11px', backgroundColor: '#EFF6FF', color: '#1D4ED8', padding: '3px 6px', borderRadius: '4px', fontWeight: 600 }}>💰 {job.salary}</span>
                                                <span style={{ fontSize: '11px', backgroundColor: job.jobType === 'Internship' ? '#E0F2FE' : '#F3E8FF', color: job.jobType === 'Internship' ? '#0369A1' : '#6B21A8', padding: '3px 6px', borderRadius: '4px', fontWeight: 600 }}>✨ {job.jobType}</span>
                                            </div>
                                        </div>
                                        <button onClick={() => applyJobHandler(job)} disabled={isApplied} style={{ width: '100%', padding: '10px', backgroundColor: isApplied ? '#10B981' : '#6A38C2', color: 'white', border: 'none', borderRadius: '6px', cursor: isApplied ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '14px' }}>
                                            {isApplied ? "✓ Applied" : "Upload Resume & Apply"}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Jobs;