import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './shared/Navbar';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
    const { user, allJobs, setAllJobs, setApplications, applications } = useContext(AuthContext);
    const navigate = useNavigate();

    // लोकल स्टोरेज से लाइव डेटा
    const allPortalJobs = JSON.parse(localStorage.getItem('jobPortalAllJobs')) || allJobs;
    const allPortalApps = JSON.parse(localStorage.getItem('jobPortalApplications')) || applications;

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const currentUser = user || JSON.parse(sessionStorage.getItem('jobPortalUser'));

    const clearDataHandler = () => {
        if(window.confirm("Do you really want to clear the old test data and reset the count to zero, brother")) {
            localStorage.removeItem('jobPortalApplications');
            localStorage.removeItem('jobPortalAllJobs');
            setApplications([]);
            alert("All the old data has been cleared!");
            window.location.reload();
        }
    };

    // =========================================================================
    // 🌟 डायनामिक कैटेगरी फिक्स: लाइव काउंट्स निकालना भाई (स्टूडेंट को सब दिखेगा)
    // =========================================================================
    const frontendCount = allPortalJobs.filter(j => j.title?.toLowerCase().includes('frontend') || j.title?.toLowerCase().includes('react') || j.description?.toLowerCase().includes('frontend')).length;
    const backendCount = allPortalJobs.filter(j => j.title?.toLowerCase().includes('backend') || j.title?.toLowerCase().includes('node') || j.description?.toLowerCase().includes('backend')).length;
    const fullStackCount = allPortalJobs.filter(j => j.title?.toLowerCase().includes('stack') || j.title?.toLowerCase().includes('mern')).length;
    const internshipCount = allPortalJobs.filter(j => j.jobType?.toLowerCase() === 'internship').length;

    const categories = [
        { name: "Frontend Development", icon: "💻", count: `${frontendCount} Live Jobs`, keyword: "frontend" },
        { name: "Backend Engineering", icon: "⚙️", count: `${backendCount} Live Jobs`, keyword: "backend" },
        { name: "Full-Stack Roles", icon: "🚀", count: `${fullStackCount} Live Jobs`, keyword: "stack" },
        { name: "Internship Programs", icon: "🎓", count: `${internshipCount} Openings`, keyword: "internship" }
    ];

    const categoryClickHandler = (cat) => {
        if (cat.keyword === "internship") {
            navigate('/jobs', { state: { filterType: 'Internship' } });
        } else {
            navigate('/jobs', { state: { searchKeyword: cat.keyword } });
        }
    };

    // =========================================================================
    // 💼 1. RECRUITER DASHBOARD (🎯 100% प्राइवेट फ़िल्टर लागू भाई)
    // =========================================================================
    if (currentUser && currentUser.role?.toLowerCase() === 'recruiter') {
        
        // 🌟 जादुई फ़िल्टर: सिर्फ इस पर्टिकुलर रिक्रूटर की जॉब्स और एप्लिकेशन्स निकालें
        const myJobs = allPortalJobs.filter(job => job.createdById === currentUser?.id);
        const myReceivedApplications = allPortalApps.filter(app => app.recruiterId === currentUser?.id);

        const totalApplicationsCount = myReceivedApplications.length;
        const fullTimeCount = myJobs.filter(j => j.jobType?.toLowerCase() === 'full-time').length;
        const liveInternCount = myJobs.filter(j => j.jobType?.toLowerCase() === 'internship').length;
        const selectedCount = myReceivedApplications.filter(app => app.status === 'Selected').length;
        const rejectedCount = myReceivedApplications.filter(app => app.status === 'Rejected').length;

        return (
            <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', backgroundColor: '#f0edfa' }}>
                <Navbar />
                <div style={{ maxWidth: '1200px', margin: '20px auto', padding: '0 20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: isMobile ? 'column' : 'row', gap: '10px', marginBottom: '25px' }}>
                        <div>
                            <h1 style={{ fontSize: isMobile ? '24px' : '28px', fontWeight: 'bold', color: '#111827', margin: 0 }}>Welcome Back, <span style={{ color: '#6A38C2' }}>{currentUser.name || 'Recruiter'}</span> 👔</h1>
                        </div>
                        <button onClick={clearDataHandler} style={{ padding: '8px 16px', backgroundColor: '#EF4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>🗑️ Clear Test Data</button>
                    </div>

                    {/* 📊 सिर्फ इस रिक्रूटर का लाइव काउंट */}
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
                        <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', borderLeft: '6px solid #6A38C2' }}><h3 style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase', margin: 0 }}>Total Listings</h3><p style={{ fontSize: '26px', fontWeight: 'bold', margin: '5px 0 0 0' }}>{myJobs.length}</p></div>
                        <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', borderLeft: '6px solid #F83002' }}><h3 style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase', margin: 0 }}>Total Apps</h3><p style={{ fontSize: '26px', fontWeight: 'bold', margin: '5px 0 0 0' }}>{totalApplicationsCount}</p></div>
                        <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', borderLeft: '6px solid #7C3AED' }}><h3 style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase', margin: 0 }}>💼 Full-Time</h3><p style={{ fontSize: '26px', fontWeight: 'bold', margin: '5px 0 0 0' }}>{fullTimeCount}</p></div>
                        <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', borderLeft: '6px solid #0284C7' }}><h3 style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase', margin: 0 }}>🎓 Internships</h3><p style={{ fontSize: '26px', fontWeight: 'bold', margin: '5px 0 0 0' }}>{liveInternCount}</p></div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '20px', marginBottom: '40px' }}>
                        <div style={{ flex: 2, backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', overflowX: 'auto' }}>
                            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>Recent Postings History</h2>
                            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '450px' }}>
                                <thead>
                                    <tr style={{ borderBottom: '2px solid #E5E7EB', textAlign: 'left', color: '#6B7280', fontSize: '13px' }}><th style={{ paddingBottom: '10px' }}>Role / Title</th><th style={{ paddingBottom: '10px' }}>Type</th><th style={{ paddingBottom: '10px' }}>Location</th><th style={{ paddingBottom: '10px' }}>Salary</th></tr>
                                </thead>
                                <tbody>
                                    {myJobs.length === 0 ? (
                                        <tr><td colSpan="4" style={{ padding: '20px 0', textAlign: 'center', color: '#9CA3AF' }}>You haven't posted any jobs!</td></tr>
                                    ) : (
                                        myJobs.slice(0, 5).map((job, index) => (
                                            <tr key={job.id || index} style={{ borderBottom: '1px solid #F3F4F6', fontSize: '14px' }}>
                                                <td style={{ padding: '12px 0', fontWeight: 500 }}>{job.title}</td>
                                                <td style={{ padding: '12px 0' }}><span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '12px', fontWeight: 'bold', backgroundColor: job.jobType === 'Internship' ? '#E0F2FE' : '#F3E8FF', color: job.jobType === 'Internship' ? '#0369A1' : '#6B21A8' }}>{job.jobType}</span></td>
                                                <td style={{ padding: '12px 0', color: '#4B5563' }}>{job.location}</td>
                                                <td style={{ padding: '12px 0', color: '#10B981', fontWeight: 600 }}>{job.salary}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                                <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>Quick Actions</h2>
                                <button onClick={() => navigate('/admin/jobs/create')} style={{ width: '100%', padding: '12px', backgroundColor: '#6A38C2', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', marginBottom: '10px' }}>+ Post Job / Internship</button>
                                <button onClick={() => navigate('/admin/jobs')} style={{ width: '100%', padding: '12px', backgroundColor: '#ffffff', color: '#6A38C2', border: '1px solid #6A38C2', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>📊 Manage Applicants</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // =========================================================================
    // 🎓 2. STUDENT HOME VIEW (सभी रिक्रूटर्स की जॉब्स दिखेंगी)
    // =========================================================================
    const myTotalApplicationsCount = allPortalApps.filter(app => app.studentEmail === currentUser?.email).length;

    return (
        <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', backgroundColor: '#f0edfa' }}>
            <Navbar />
            
            {/* HERO SECTION */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: isMobile ? '40px 20px' : '50px 20px' }}>
                <span style={{ backgroundColor: '#FEF2F2', color: '#F83002', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', marginBottom: '15px' }}>No. 1 Job & Internship Portal</span>
                <h1 style={{ fontSize: isMobile ? '30px' : '44px', fontWeight: 'bold', margin: '0 0 15px 0', color: '#111827', lineHeight: 1.2 }}>
                    Search & Get Your <br /><span style={{ color: '#6A38C2' }}>Dream Job & Internship</span>
                </h1>
                
                <div style={{ display: 'flex', gap: '15px', marginBottom: '25px', fontSize: '14px', fontWeight: 600, alignItems: 'center', flexDirection: isMobile ? 'column' : 'row' }}>
                    <span style={{ backgroundColor: '#E0F2FE', color: '#0369A1', padding: '6px 12px', borderRadius: '6px' }}>📝 Total Applied: {myTotalApplicationsCount}</span>
                    <span style={{ backgroundColor: '#F5F3FF', color: '#7C3AED', padding: '6px 12px', borderRadius: '6px' }}>💼 Available: {allPortalJobs.length}</span>
                    <button onClick={clearDataHandler} style={{ padding: '6px 12px', backgroundColor: '#EF4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}>🗑️ Reset Count</button>
                </div>
            </div>

            {/* BROWSE BY CATEGORY SECTION */}
            <div style={{ maxWidth: '1200px', margin: '10px auto 40px auto', padding: '0 20px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#111827', marginBottom: '20px', textAlign: isMobile ? 'center' : 'left' }}>Browse By Category</h2>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: '20px' }}>
                    {categories.map((cat, i) => (
                        <div 
                            key={i} 
                            onClick={() => categoryClickHandler(cat)} 
                            style={{ 
                                backgroundColor: '#ffffff', 
                                padding: '25px 20px', 
                                borderRadius: '12px', 
                                border: '1px solid #e5e7eb', 
                                boxShadow: '0 4px 6px rgba(0,0,0,0.02)', 
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                transform: 'scale(1)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.borderColor = '#6A38C2';
                                e.currentTarget.style.boxShadow = '0 10px 15px rgba(106, 56, 194, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.borderColor = '#e5e7eb';
                                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.02)';
                            }}
                        >
                            <span style={{ fontSize: '32px', display: 'block', marginBottom: '12px' }}>{cat.icon}</span>
                            <h4 style={{ margin: '0 0 6px 0', fontSize: '16px', fontWeight: 'bold', color: '#111827' }}>{cat.name}</h4>
                            <p style={{ margin: 0, fontSize: '13px', color: '#6A38C2', fontWeight: 'bold' }}>{cat.count}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* LATEST OPENINGS */}
            <div style={{ maxWidth: '1200px', margin: '50px auto', padding: '0 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#111827', margin: 0 }}>Latest Openings</h2>
                    <button onClick={() => navigate('/jobs')} style={{ border: 'none', backgroundColor: 'transparent', color: '#6A38C2', fontWeight: 'bold', cursor: 'pointer' }}>View All →</button>
                </div>
                
                {allPortalJobs.length === 0 ? (
                    <p style={{ color: '#6B7280', textAlign: 'center' }}>There are no active jobs or internships available.</p>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                        {allPortalJobs.slice(0, 6).map((job, index) => (
                            <div key={job.id || index} style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', border: '1px solid #e5e7eb' }}>
                                <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 5px 0' }}>{job.title}</h3>
                                <p style={{ fontSize: '13px', color: '#4B5563', margin: '0 0 15px 0', minHeight: '38px' }}>{job.description}</p>
                                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '15px' }}>
                                    <span style={{ padding: '3px 6px', backgroundColor: '#EFF6FF', color: '#1D4ED8', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>📍 {job.location}</span>
                                    <span style={{ padding: '3px 6px', backgroundColor: '#F5F3FF', color: '#7C3AED', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>💰 {job.salary}</span>
                                    <span style={{ padding: '3px 6px', backgroundColor: job.jobType === 'Internship' ? '#E0F2FE' : '#F3F4F6', color: job.jobType === 'Internship' ? '#0369A1' : '#4B5563', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>{job.jobType}</span>
                                </div>
                                <button onClick={() => navigate(`/description/${job.id || job._id}`)} style={{ width: '100%', padding: '8px', backgroundColor: '#ffffff', color: '#6A38C2', border: '1px solid #6A38C2', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Explore & Apply</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;