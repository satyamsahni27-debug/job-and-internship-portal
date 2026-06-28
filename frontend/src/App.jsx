import React, { useContext, useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext'; 

// मुख्य इम्पोर्ट्स (बाकी सब सुरक्षित)
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/home.jsx'; 
import Browse from './components/Browse.jsx';
import Jobs from './components/job.jsx';
import JobDetails from './components/job/JobDetails';
import PostJob from './components/auth/admin/PostJob';
import AdminJobs from './components/auth/admin/AdminJobs'; 
import MyApplications from './components/job/MyApplications';
import Profile from './components/Profile';

// =========================================================================
// 🌟 STANDALONE COMPANIES COMPONENT (यहाँ इन-लाइन डाल दिया ताकि कोई पाथ एरर न आए भाई)
// =========================================================================
const Companies = () => {
    const [companies, setCompanies] = useState(() => {
        const savedCompanies = localStorage.getItem('jobPortalCompanies');
        return savedCompanies ? JSON.parse(savedCompanies) : [
            { id: "1", name: "Google", website: "https://google.com", createdAt: "2026-06-01" },
            { id: "2", name: "Microsoft", website: "https://microsoft.com", createdAt: "2026-06-15" }
        ];
    });

    const [searchCompanyQuery, setSearchCompanyQuery] = useState('');
    const [allJobs] = useState(() => {
        const savedJobs = localStorage.getItem('jobPortalAllJobs');
        return savedJobs ? JSON.parse(savedJobs) : [];
    });

    const deleteCompanyHandler = (index) => {
        if (window.confirm("Do you really want to delete this company")) {
            const updatedCompanies = companies.filter((_, i) => i !== index);
            setCompanies(updatedCompanies);
            localStorage.setItem('jobPortalCompanies', JSON.stringify(updatedCompanies));
            alert("Company Deleted Successfully!");
        }
    };

    const filteredCompanies = companies.filter(company => 
        company.name?.toLowerCase().includes(searchCompanyQuery.toLowerCase())
    );

    return (
        <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '15px 40px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: 0, color: '#6A38C2', fontWeight: 'bold' }}>JobPortal Admin</h2>
                <a href="/" style={{ color: '#374151', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>← Back to Home</a>
            </div>

            <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
                    <div>
                        <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#111827', margin: 0 }}>Registered Companies ({companies.length})</h2>
                        <p style={{ margin: '4px 0 0 0', color: '#6B7280', fontSize: '14px' }}>From here, you can track the profiles of your registered companies and their active jobs.</p>
                    </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <input 
                        type="text" 
                        placeholder="🔍 Search company by name live..." 
                        value={searchCompanyQuery}
                        onChange={(e) => setSearchCompanyQuery(e.target.value)}
                        style={{ width: '100%', maxWidth: '380px', padding: '10px 15px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}
                    />
                </div>

                <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', overflowX: 'auto', border: '1px solid #e5e7eb' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '650px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '2px solid #E5E7EB', color: '#4B5563', fontWeight: 'bold', fontSize: '14px' }}>
                                <th style={{ padding: '15px', width: '80px' }}>Logo</th>
                                <th style={{ padding: '15px' }}>Company Name</th>
                                <th style={{ padding: '15px' }}>Website</th>
                                <th style={{ padding: '15px', textAlign: 'center' }}>Active Postings</th>
                                <th style={{ padding: '15px' }}>Registration Date</th>
                                <th style={{ padding: '15px', textAlign: 'center' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCompanies.map((company, index) => {
                                const companyJobCount = allJobs.filter(job => job.title?.toLowerCase().includes(company.name?.toLowerCase())).length;
                                return (
                                    <tr key={company.id || index} style={{ borderBottom: '1px solid #E5E7EB', fontSize: '14px' }}>
                                        <td style={{ padding: '15px' }}>
                                            <img src="https://cdn-icons-png.flaticon.com/512/4812/4812244.png" alt="logo" style={{ width: '35px', height: '35px', borderRadius: '6px', objectFit: 'cover' }} />
                                        </td>
                                        <td style={{ padding: '15px', fontWeight: 600, color: '#111827' }}>{company.name}</td>
                                        <td style={{ padding: '15px' }}><a href={company.website} target="_blank" rel="noreferrer" style={{ color: '#6A38C2', textDecoration: 'none', fontWeight: 500 }}>Visit Site 🌐</a></td>
                                        <td style={{ padding: '15px', textAlign: 'center' }}><span style={{ fontSize: '12px', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold', backgroundColor: '#D1FAE5', color: '#065F46' }}>{companyJobCount} Active Jobs</span></td>
                                        <td style={{ padding: '15px', color: '#4B5563' }}>{company.createdAt}</td>
                                        <td style={{ padding: '15px', textAlign: 'center' }}>
                                            <button onClick={() => deleteCompanyHandler(index)} style={{ padding: '6px 12px', backgroundColor: '#FEF2F2', color: '#DC2626', border: '1px solid #FCA5A5', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// 🛡️ सुरक्षा गार्ड्स
const AuthGuard = ({ children }) => {
  const { user } = useContext(AuthContext);
  const savedUser = sessionStorage.getItem('jobPortalUser');
  if (!user && !savedUser) return <Navigate to="/login" replace />;
  return children;
};

const StudentRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const currentUser = user || JSON.parse(sessionStorage.getItem('jobPortalUser'));
  if (!currentUser) return <Navigate to="/login" replace />;
  if (currentUser.role?.toLowerCase() !== 'student') return <Navigate to="/" replace />;
  return children;
};

const RecruiterRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const currentUser = user || JSON.parse(sessionStorage.getItem('jobPortalUser'));
  if (!currentUser) return <Navigate to="/login" replace />;
  if (currentUser.role?.toLowerCase() !== 'recruiter') return <Navigate to="/" replace />;
  return children;
};

const appRouter = createBrowserRouter([
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/', element: <AuthGuard><Home /></AuthGuard> },
  { path: '/jobs', element: <StudentRoute><Jobs /></StudentRoute> },
  { path: '/browse', element: <StudentRoute><Browse /></StudentRoute> },
  { path: '/job/description/:id', element: <StudentRoute><JobDetails /></StudentRoute> },
  { path: '/profile', element: <StudentRoute><Profile /></StudentRoute> },
  { path: '/my-applications', element: <StudentRoute><MyApplications /></StudentRoute> },
  
  // एडमिन रूट्स
  { path: '/admin/jobs', element: <RecruiterRoute><AdminJobs /></RecruiterRoute> },         
  { path: '/admin/jobs/create', element: <RecruiterRoute><PostJob /></RecruiterRoute> },
  { path: '/admin/companies', element: <RecruiterRoute><Companies /></RecruiterRoute> }
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;