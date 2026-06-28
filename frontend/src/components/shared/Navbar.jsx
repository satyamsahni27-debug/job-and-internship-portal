import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    // स्क्रीन साइज ट्रैक करने के लिए स्टेट भाई
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const currentUser = user || JSON.parse(sessionStorage.getItem('jobPortalUser'));

    const logoutHandler = () => {
        sessionStorage.removeItem('jobPortalUser');
        setUser(null);
        alert("Successfully logged out");
        navigate('/login');
    };

    return (
        <div style={{
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            position: 'relative',
            zIndex: 9999
        }}>
            {/* 🌟 मुख्य कंटेनर जो मोबाइल और डेस्कटॉप दोनों पर एक परफेक्ट रो (Row) बनाएगा */}
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: isMobile ? '10px 15px' : '15px 20px',
                display: 'flex',
                flexDirection: 'row', // हमेशा एक सीधी लाइन में रहेगा भाई
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'nowrap' // किसी भी चीज को नीचे टूटने नहीं देगा
            }}>
                
                {/* 🎯 लेफ्ट साइड: लोगो */}
                <div>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <h1 style={{
                            fontSize: isMobile ? '20px' : '24px',
                            fontWeight: 'bold',
                            margin: 0,
                            color: '#111827',
                            whiteSpace: 'nowrap'
                        }}>
                            Job<span style={{ color: '#6A38C2' }}>Portal</span>
                        </h1>
                    </Link>
                </div>

                {/* 🎯 राइट साइड: मेनू लिंक्स + प्रोफाइल बटन */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: isMobile ? '10px' : '24px',
                    flexWrap: 'nowrap'
                }}>
                    {/* लिंक्स: अगर रिक्रूटर है तो अलग लिंक्स, स्टूडेंट है तो अलग लिंक्स */}
                    {currentUser && currentUser.role?.toLowerCase() === 'recruiter' ? (
                        <>
                            <Link to="/" style={{ color: '#374151', textDecoration: 'none', fontWeight: 600, fontSize: isMobile ? '13px' : '15px' }}>Home</Link>
                            <Link to="/admin/companies" style={{ color: '#374151', textDecoration: 'none', fontWeight: 600, fontSize: isMobile ? '13px' : '15px' }}>Companies</Link>
                            <Link to="/admin/jobs" style={{ color: '#374151', textDecoration: 'none', fontWeight: 600, fontSize: isMobile ? '13px' : '15px' }}>Post Jobs</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/" style={{ color: '#374151', textDecoration: 'none', fontWeight: 600, fontSize: isMobile ? '13px' : '15px' }}>Home</Link>
                            <Link to="/jobs" style={{ color: '#374151', textDecoration: 'none', fontWeight: 600, fontSize: isMobile ? '13px' : '15px' }}>Jobs</Link>
                            <Link to="/browse" style={{ color: '#374151', textDecoration: 'none', fontWeight: 600, fontSize: isMobile ? '13px' : '15px' }}>Browse</Link>
                        </>
                    )}

                    {/* यूज़र प्रोफाइल ड्रॉपडाउन बटन */}
                    {currentUser ? (
                        <div style={{ position: 'relative' }}>
                            <button 
                                onClick={() => setShowDropdown(!showDropdown)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    padding: isMobile ? '4px 8px' : '6px 12px',
                                    border: '1px solid #6A38C2',
                                    backgroundColor: '#ffffff',
                                    borderRadius: '20px',
                                    cursor: 'pointer',
                                    fontSize: isMobile ? '12px' : '14px',
                                    fontWeight: 500
                                }}
                            >
                                👤 {currentUser.name?.split(' ')[0]} <span style={{ fontSize: '10px' }}>▼</span>
                            </button>

                            {/* ड्रॉपडाउन मेनू डिब्बा */}
                            {showDropdown && (
                                <div style={{
                                    position: 'absolute',
                                    right: 0,
                                    top: '110%',
                                    backgroundColor: '#ffffff',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    borderRadius: '8px',
                                    padding: '10px',
                                    minWidth: '150px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '8px',
                                    border: '1px solid #e5e7eb'
                                }}>
                                    <div style={{ padding: '2px 8px', fontSize: '12px', color: '#6B7280', borderBottom: '1px solid #f3f4f6', pb: '5px' }}>
                                        Role: {currentUser.role}
                                    </div>
                                    <span onClick={() => { navigate('/account-settings'); setShowDropdown(false); }} style={{ cursor: 'pointer', fontSize: '13px', padding: '4px 8px', color: '#374151', fontWeight: 500 }}>⚙️ Settings</span>
                                    <span onClick={logoutHandler} style={{ cursor: 'pointer', fontSize: '13px', padding: '4px 8px', color: '#EF4444', fontWeight: 'bold' }}>🚪 Logout</span>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button onClick={() => navigate('/login')} style={{ padding: '6px 12px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontWeight: 600, fontSize: isMobile ? '13px' : '14px' }}>Login</button>
                            <button onClick={() => navigate('/signup')} style={{ padding: '6px 12px', border: 'none', backgroundColor: '#6A38C2', color: 'white', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: isMobile ? '13px' : '14px' }}>Signup</button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Navbar;