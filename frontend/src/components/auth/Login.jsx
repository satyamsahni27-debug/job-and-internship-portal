import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../shared/Navbar';

const Login = () => {
    const [email, setEmail] = useState("");
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        if (!email) {
            alert("कृपया अपनी ईमेल आईडी डालें भाई!");
            return;
        }

        // लोकल स्टोरेज से रजिस्टर्ड यूज़र्स निकालना
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        
        // ईमेल मैच करना
        const foundUser = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (foundUser) {
            // अगर यूज़र मिल गया, तो उसे लॉगिन स्टेट और लोकल स्टोरेज में सेट करो
            setUser(foundUser);
            localStorage.setItem('jobPortalUser', JSON.stringify(foundUser));
            alert(`Welcome back, ${foundUser.name}! 👋`);
            navigate('/');
        } else {
            alert("यह ईमेल रजिस्टर्ड नहीं है भाई! कृपया पहले सही नाम से साइनअप करें।");
        }
    };

    return (
        <div>
            <Navbar />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 64px)', backgroundColor: '#f9fafb', fontFamily: 'sans-serif' }}>
                <form onSubmit={submitHandler} style={{ width: '100%', maxWidth: '400px', backgroundColor: '#ffffff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                    <h2 style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '20px', color: '#111827', textAlign: 'center' }}>
                        Log <span style={{ color: '#6A38C2' }}>In</span>
                    </h2>

                    <div style={{ marginBottom: '25px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '14px' }}>Registered Email Address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@gmail.com" style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '6px', outline: 'none' }} />
                    </div>

                    <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#6A38C2', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', marginBottom: '15px' }}>
                        Direct Login 🔓
                    </button>

                    <p style={{ fontSize: '14px', color: '#4B5563', textAlign: 'center', margin: 0 }}>
                        Don't have an account? <span onClick={() => navigate('/signup')} style={{ color: '#F83002', cursor: 'pointer', fontWeight: 600 }}>Signup</span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;