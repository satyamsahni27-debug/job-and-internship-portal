import React, { useContext } from 'react';
import Navbar from '../shared/Navbar';
import { AuthContext } from '../../context/AuthContext';

const MyApplications = () => {
    const { applications, allJobs, user } = useContext(AuthContext);
    const currentUser = user || JSON.parse(sessionStorage.getItem('jobPortalUser'));

    // 🌟 1. नौकरियों की लाइव लिस्ट उठाओ
    const activeJobs = JSON.parse(localStorage.getItem('jobPortalAllJobs')) || allJobs;
    
    // 🌟 2. जादू: एप्लिकेशन्स को सीधे localStorage से लाइव उठाओ ताकि रिक्रूटर का चेंज तुरंत दिखे!
    const liveApplications = JSON.parse(localStorage.getItem('jobPortalApplications')) || applications;

    const myFilteredApplications = liveApplications.filter(app => {
        const isJobStillExists = activeJobs.some(job => job.id === app.jobId);
        const isMyApplication = app.studentEmail === currentUser?.email;
        return isJobStillExists && isMyApplication;
    });

    return (
        <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
            <Navbar />
            <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '20px' }}>
                    My Applied Jobs ({myFilteredApplications.length})
                </h2>

                <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                    {myFilteredApplications.length === 0 ? (
                        <p style={{ color: '#6B7280', textAlign: 'center', padding: '40px 20px', margin: 0 }}>
                            You haven't applied for any active job!
                        </p>
                    ) : (
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f9fafb', borderBottom: '2px solid #e5e7eb', color: '#374151', fontWeight: 'bold' }}>
                                    <th style={{ padding: '16px' }}>Job Role</th>
                                    <th style={{ padding: '16px', textAlign: 'right' }}>Application Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myFilteredApplications.map((app) => (
                                    <tr key={app.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                        <td style={{ padding: '16px', fontWeight: 500, color: '#111827' }}>{app.jobTitle}</td>
                                        <td style={{ padding: '16px', textAlign: 'right' }}>
                                            <span style={{ 
                                                display: 'inline-flex', 
                                                alignItems: 'center', 
                                                gap: '6px', 
                                                padding: '6px 16px', 
                                                borderRadius: '20px', 
                                                fontSize: '13px', 
                                                fontWeight: 600,
                                                backgroundColor: app.status === 'Selected' ? '#D1FAE5' : app.status === 'Rejected' ? '#FEE2E2' : '#FFFBEB',
                                                color: app.status === 'Selected' ? '#065F46' : app.status === 'Rejected' ? '#991B1B' : '#B45309'
                                            }}>
                                                {app.status === 'Selected' ? '🎉 You are selected for interview' : app.status === 'Rejected' ? '❌ Not Selected' : '⏳ Pending'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyApplications;