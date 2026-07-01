import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = ({ logoutHandler }) => {
  const { user, setApplications } = useContext(AuthContext); // 🌟 कॉन्टेक्स्ट से लाइव यूज़र उठाया
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  // अगर कॉन्टेक्स्ट में यूज़र न हो, तो सेशन स्टोरेज से फ्रेश डेटा बैकअप लें
  const currentUser = user || JSON.parse(sessionStorage.getItem('jobPortalUser'));

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 🚪 डिफ़ॉल्ट लॉगआउट हैंडलर (अगर पैरेंट से न आए तो यह चलेगा)
  const handleLogout = () => {
    if (logoutHandler) {
      logoutHandler();
    } else {
      sessionStorage.removeItem('jobPortalUser');
      localStorage.removeItem('jobPortalApplications');
      localStorage.removeItem('jobPortalAllJobs');
      if (setApplications) setApplications([]);
      alert("Successfully logged out 🎉");
      window.location.reload();
    }
  };

  return (
    <div style={{ 
      backgroundColor: '#ffffff', 
      borderBottom: '1px solid #e5e7eb',
      width: '100%',
      position: 'relative',
      boxSizing: 'border-box',
      zIndex: 9999
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? '10px 15px' : '15px 20px',
        height: isMobile ? '60px' : '70px',
        boxSizing: 'border-box',
        width: '100%'
      }}>
        
        {/* 🏢 लोगो */}
        <div style={{ flexShrink: 0 }}>
          <h1 onClick={() => navigate('/')} style={{ 
            fontSize: isMobile ? '20px' : '24px', 
            fontWeight: 'bold', 
            cursor: 'pointer',
            margin: 0,
            whiteSpace: 'nowrap',
            fontFamily: 'sans-serif'
          }}>
            Job<span style={{ color: '#6A38C2' }}>Portal</span>
          </h1>
        </div>

        {/* 🔗 राइट साइड लिंक्स और बटन्स */}
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '10px' : '30px' }}>
          
          {!isMobile && (
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <Link to="/" style={{ color: '#374151', textDecoration: 'none', fontWeight: 600, fontSize: '15px' }}>Home</Link>
              {currentUser?.role?.toLowerCase() === 'recruiter' ? (
                <>
                  <Link to="/admin/companies" style={{ color: '#374151', textDecoration: 'none', fontWeight: 600, fontSize: '15px' }}>Companies</Link>
                  <Link to="/admin/jobs" style={{ color: '#374151', textDecoration: 'none', fontWeight: 600, fontSize: '15px' }}>Post Jobs</Link>
                </>
              ) : (
                <>
                  <Link to="/jobs" style={{ color: '#374151', textDecoration: 'none', fontWeight: 600, fontSize: '15px' }}>Jobs</Link>
                  <Link to="/browse" style={{ color: '#374151', textDecoration: 'none', fontWeight: 600, fontSize: '15px' }}>Browse</Link>
                </>
              )}
            </div>
          )}

          {currentUser ? (
            /* 👤 लॉग इन होने के बाद आपका पुराना असली बटन */
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <button 
                onClick={() => setShowDropdown(!showDropdown)} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px', 
                  padding: '6px 12px', 
                  border: '1px solid #000000', 
                  backgroundColor: '#ffffff', 
                  borderRadius: '20px', 
                  cursor: 'pointer',
                  fontSize: '14px',
                  whiteSpace: 'nowrap',
                  color: '#000000'
                }}
              >
                <span style={{ fontSize: '14px', marginRight: '2px' }}>👤</span>
                {currentUser?.name?.split(' ')[0]} 
                <span style={{ fontSize: '10px', marginLeft: '2px' }}>▼</span>
              </button>

              {/* 📂 पुराना नेटलिफ़ाई वाला ड्रॉपडाउन */}
              {showDropdown && (
                <div style={{
                  position: 'absolute',
                  right: '0', 
                  top: '120%',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                  padding: '15px 20px', 
                  minWidth: '220px', 
                  zIndex: 10000,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  border: '1px solid #e5e7eb',
                  textAlign: 'left'
                }}>
                  <div style={{ borderBottom: '1px solid #f3f4f6', paddingBottom: '6px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#111827' }}>
                      {currentUser?.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>
                      Role: {currentUser?.role}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <span onClick={() => { navigate('/profile'); setShowDropdown(false); }} style={{ cursor: 'pointer', fontSize: '13px', color: '#374151', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      📂 View Profile
                    </span>

                    {currentUser?.role?.toLowerCase() === 'recruiter' && (
                      <span onClick={() => { navigate('/admin/companies'); setShowDropdown(false); }} style={{ cursor: 'pointer', fontSize: '13px', color: '#374151', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        📊 Admin Dashboard
                      </span>
                    )}

                    {currentUser?.role?.toLowerCase() === 'student' && (
                      <span onClick={() => { navigate('/my-applications'); setShowDropdown(false); }} style={{ cursor: 'pointer', fontSize: '13px', color: '#374151', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        📝 My Applications
                      </span>
                    )}

                    <span onClick={() => { navigate('/account-settings'); setShowDropdown(false); }} style={{ cursor: 'pointer', fontSize: '13px', color: '#374151', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      ⚙️ Account Settings
                    </span>

                    <hr style={{ margin: '2px 0', border: 0, borderTop: '1px solid #f3f4f6' }} />

                    <span onClick={() => { handleLogout(); setShowDropdown(false); }} style={{ cursor: 'pointer', fontSize: '13px', color: '#EF4444', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      🚪 Logout
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* 🔑 जब लॉगआउट हो */
            <div style={{ display: 'flex', gap: isMobile ? '8px' : '12px', alignItems: 'center' }}>
              <button onClick={() => navigate('/login')} style={{ padding: isMobile ? '6px 10px' : '8px 16px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontWeight: 600, fontSize: isMobile ? '13px' : '14px', whiteSpace: 'nowrap', color: '#374151' }}>
                Login
              </button>
              <button onClick={() => navigate('/signup')} style={{ padding: isMobile ? '6px 10px' : '8px 16px', border: 'none', backgroundColor: '#6A38C2', color: 'white', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: isMobile ? '13px' : '14px', whiteSpace: 'nowrap' }}>
                Signup
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Navbar;