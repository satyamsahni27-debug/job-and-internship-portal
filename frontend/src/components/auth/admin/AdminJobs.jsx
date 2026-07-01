import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../shared/Navbar';
import { AuthContext } from '../../../context/AuthContext';

const AdminJobs = () => {
    const { allJobs, setAllJobs, applications, setApplications } = useContext(AuthContext);
    const navigate = useNavigate();

    // 🌟 स्टेट्स
    const [adminSearchQuery, setAdminSearchQuery] = useState(''); // लाइव सर्च के लिए
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const deleteJobHandler = (index) => {
        if (window.confirm("Do you really want to delete this job!")) {
            const updatedJobs = allJobs.filter((_, i) => i !== index);
            setAllJobs(updatedJobs);
            localStorage.setItem('jobPortalAllJobs', JSON.stringify(updatedJobs));
            alert("Job Deleted Successfully!");
        }
    };

    const editJobHandler = (job, index) => {
        navigate("/admin/jobs/create", { state: { job, index } });
    };

    const updateStatusHandler = (appId, newStatus) => {
        const currentAppsList = JSON.parse(localStorage.getItem('jobPortalApplications')) || applications;
        const updatedApps = currentAppsList.map(app => 
            app.id === appId ? { ...app, status: newStatus } : app
        );
        setApplications(updatedApps);
        localStorage.setItem('jobPortalApplications', JSON.stringify(updatedApps));
        alert(`Status updated to: ${newStatus === 'Selected' ? 'Selected for Interview' : 'Rejected'}`);
    };

   const allPortalJobs = JSON.parse(localStorage.getItem('jobPortalAllJobs')) || allJobs;

// 🌟 लॉगिन यूज़र (AuthContext से) का फ्रेश डेटा बैकअप के साथ
const currentUser = JSON.parse(sessionStorage.getItem('jobPortalUser'));

// 🎯 सिर्फ उसी रिक्रूटर की जॉब्स फ़िल्टर करें जो लॉगिन है
const currentJobs = allPortalJobs.filter(job => job.createdById === currentUser?.id);
    const liveAppsForModal = JSON.parse(localStorage.getItem('jobPortalApplications')) || applications;
    
    // 🌟 लाइव एडमिन सर्च फ़िल्टर
    const filteredAdminJobs = currentJobs.filter(job => 
        job.title?.toLowerCase().includes(adminSearchQuery.toLowerCase()) ||
        job.location?.toLowerCase().includes(adminSearchQuery.toLowerCase())
    );

    const currentApplicants = liveAppsForModal.filter(app => app.jobId === selectedJobId);

    const openResumeHandler = (app) => {
        if (app.resumeUrl) {
            const newWindow = window.open();
            newWindow.document.write(`<iframe src="${app.resumeUrl}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
        } else {
            alert(`यह एक डमी एप्लिकेशन है। असली फ़ाइल देखने के लिए नई फ़ाइल अपलोड करें भाई!`);
        }
    };

    return (
        <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
            <Navbar />
            <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
                
                {/* टॉप हेडर एरिया */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
                    <div>
                        <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#111827', margin: 0 }}>Posted Positions Management ({currentJobs.length})</h2>
                        <p style={{ margin: '4px 0 0 0', color: '#6B7280', fontSize: '14px' }}>From here, you can manage applicant statuses and jobs.।</p>
                    </div>
                    <button onClick={() => navigate("/admin/jobs/create")} style={{ padding: '10px 20px', backgroundColor: '#6A38C2', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                        + Post New Job
                    </button>
                </div>

                {/* 🌟 न्यू फीचर: लाइव सर्च बार */}
                <div style={{ marginBottom: '20px' }}>
                    <input 
                        type="text" 
                        placeholder="🔍 Filter jobs by title or location live..." 
                        value={adminSearchQuery}
                        onChange={(e) => setAdminSearchQuery(e.target.value)}
                        style={{ width: '100%', maxWidth: '400px', padding: '10px 15px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}
                    />
                </div>

                {/* कस्टमाइज्ड एंड अपग्रेड टेबल */}
                <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', overflowX: 'auto', border: '1px solid #e5e7eb' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '750px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '2px solid #E5E7EB', color: '#4B5563', fontWeight: 'bold', fontSize: '14px' }}>
                                <th style={{ padding: '15px' }}>Job Title</th>
                                <th style={{ padding: '15px' }}>Type</th>
                                <th style={{ padding: '15px' }}>Location</th>
                                <th style={{ padding: '15px' }}>Experience</th>
                                <th style={{ padding: '15px' }}>Openings</th>
                                <th style={{ padding: '15px' }}>Applicants</th>
                                <th style={{ padding: '15px', textAlign: 'center' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAdminJobs.length === 0 ? (
                                <tr>
                                    <td colSpan="7" style={{ padding: '30px', textAlign: 'center', color: '#9CA3AF' }}>There are no listing records.!</td>
                                </tr>
                            ) : (
                                filteredAdminJobs.map((job, index) => {
                                    const appCount = liveAppsForModal.filter(app => app.jobId === job.id).length;
                                    return (
                                        <tr key={job.id || index} style={{ borderBottom: '1px solid #E5E7EB', fontSize: '14px', transition: 'background 0.2s' }}>
                                            <td style={{ padding: '15px', fontWeight: 600, color: '#111827' }}>{job.title}</td>
                                            {/* 🌟 न्यू कॉलम: टाइप विथ कलर बैज */}
                                            <td style={{ padding: '15px' }}>
                                                <span style={{ fontSize: '11px', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold', backgroundColor: job.jobType === 'Internship' ? '#E0F2FE' : '#F3E8FF', color: job.jobType === 'Internship' ? '#0369A1' : '#6B21A8' }}>
                                                    {job.jobType || "Full-Time"}
                                                </span>
                                            </td>
                                            <td style={{ padding: '15px', color: '#4B5563' }}>{job.location}</td>
                                            {/* 🌟 न्यू कॉलम: रिक्वायर्ड अनुभव */}
                                            <td style={{ padding: '15px', color: '#4B5563' }}>{job.experience || "Freshers"}</td>
                                            {/* 🌟 न्यू कॉलम: टोटल ओपेनिंग्स */}
                                            <td style={{ padding: '15px', fontWeight: 'bold', color: '#374151', paddingLeft: '25px' }}>{job.position || "1"}</td>
                                            
                                            <td style={{ padding: '15px' }}>
                                                <button onClick={() => { setSelectedJobId(job.id); setOpenModal(true); }} style={{ backgroundColor: '#F3E8FF', color: '#6A38C2', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}>
                                                    👤 {appCount} Applicants (View)
                                                </button>
                                            </td>
                                            <td style={{ padding: '15px', display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                                <button onClick={() => editJobHandler(job, index)} style={{ padding: '5px 10px', backgroundColor: '#EFF6FF', color: '#1D4ED8', border: '1px solid #BFDBFE', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}>Edit</button>
                                                <button onClick={() => deleteJobHandler(index)} style={{ padding: '5px 10px', backgroundColor: '#FEF2F2', color: '#DC2626', border: '1px solid #FCA5A5', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}>Delete</button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* APPLICANTS DETAILS POP-UP MODAL */}
                {openModal && (
                    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                        <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '10px', width: '90%', maxWidth: '600px', maxHeight: '80vh', overflowY: 'auto' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Job Applications</h3>
                                <button onClick={() => setOpenModal(false)} style={{ border: 'none', backgroundColor: 'transparent', fontSize: '18px', cursor: 'pointer' }}>❌</button>
                            </div>
                            
                            {currentApplicants.length === 0 ? (
                                <p style={{ color: '#6B7280', textAlign: 'center' }}>No one has applied for this job yet!</p>
                            ) : (
                                currentApplicants.map((app, i) => (
                                    <div key={app.id || i} style={{ border: '1px solid #E5E7EB', padding: '15px', borderRadius: '6px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <p style={{ margin: 0, fontWeight: 'bold' }}>{app.studentName}</p>
                                            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#6B7280' }}>{app.studentEmail}</p>
                                            
                                            <p style={{ margin: '8px 0 0 0', fontSize: '13px', color: '#374151' }}>
                                                📄 Resume: 
                                                <span 
                                                    onClick={() => openResumeHandler(app)}
                                                    style={{ marginLeft: '6px', backgroundColor: '#EFF6FF', padding: '4px 8px', borderRadius: '4px', color: '#1D4ED8', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}
                                                >
                                                    {app.resumeName || "resume.pdf"} 👁️ (View)
                                                </span>
                                            </p>

                                            <span style={{ display: 'inline-block', marginTop: '10px', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', backgroundColor: app.status === 'Selected' ? '#D1FAE5' : app.status === 'Rejected' ? '#FEE2E2' : '#FEF3C7', color: app.status === 'Selected' ? '#065F46' : app.status === 'Rejected' ? '#991B1B' : '#92400E' }}>
                                                Current Status: {app.status === 'Selected' ? 'Selected' : app.status === 'Rejected' ? 'Rejected' : 'Pending'}
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '6px' }}>
                                            <button onClick={() => updateStatusHandler(app.id, 'Selected')} style={{ padding: '6px 10px', backgroundColor: '#10B981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>
                                                Select for Interview
                                            </button>
                                            <button onClick={() => updateStatusHandler(app.id, 'Rejected')} style={{ padding: '6px 10px', backgroundColor: '#EF4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default AdminJobs;