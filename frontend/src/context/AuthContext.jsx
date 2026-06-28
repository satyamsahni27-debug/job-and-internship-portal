import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // 👤 यूज़र के लिए sessionStorage ताकि दोनों टैब अलग-अलग और प्राइवेट रहें
    const [user, setUser] = useState(() => {
        const savedUser = sessionStorage.getItem('jobPortalUser');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // 💼 नौकरियों की स्टेट को localStorage से जोड़ दिया ताकि दोनों टैब में सिंक रहे
    const [allJobs, setAllJobs] = useState(() => {
        const savedJobs = localStorage.getItem('jobPortalAllJobs');
        return savedJobs ? JSON.parse(savedJobs) : [
            {
                id: "dummy-job-react-111",
                title: "React Developer",
                salary: "8 LPA",
                location: "Noida",
                jobType: "Full-Time",
                experience: "1",
                position: "2",
                requirements: "React, JavaScript",
                description: "Looking for a passionate Frontend Developer."
            },
            {
                id: "dummy-job-node-222",
                title: "Node.js Backend Engineer",
                salary: "12 LPA",
                location: "Bangalore",
                jobType: "Remote",
                experience: "3",
                position: "1",
                requirements: "Node.js, Express, MongoDB",
                description: "Build robust APIs and microservices."
            }
        ];
    });

    // 🌟 एप्लिकेशन्स की स्टेट (इसमें डमी आईडी को एकदम यूनिक कर दिया है भाई ताकि ऑटो-अप्लाई न हो)
    const [applications, setApplications] = useState(() => {
        const savedApps = localStorage.getItem('jobPortalApplications');
        return savedApps ? JSON.parse(savedApps) : [
            {
                id: "app-dummy-unique-999",
                jobId: "dummy-job-react-111", 
                jobTitle: "React Developer",
                studentName: "Satyam Sahani",
                studentEmail: "satyam@example.com",
                status: "Pending"
            }
        ];
    });

    // यूज़र डेटा सिंक इफ़ेक्ट
    useEffect(() => {
        if (user) {
            sessionStorage.setItem('jobPortalUser', JSON.stringify(user));
        } else {
            sessionStorage.removeItem('jobPortalUser');
        }
    }, [user]);

    // नौकरियों को localStorage में सिंक रखने का इफ़ेक्ट
    useEffect(() => {
        localStorage.setItem('jobPortalAllJobs', JSON.stringify(allJobs));
    }, [allJobs]);

    // एप्लिकेशन्स को localStorage में सिंक रखने का इफ़ेक्ट
    useEffect(() => {
        localStorage.setItem('jobPortalApplications', JSON.stringify(applications));
    }, [applications]);

    return (
        <AuthContext.Provider value={{ user, setUser, allJobs, setAllJobs, applications, setApplications }}>
            {children}
        </AuthContext.Provider>
    );
};