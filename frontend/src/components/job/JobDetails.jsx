import React, { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import { MapPin, Briefcase, DollarSign, Calendar, Users, Share2, Heart, ArrowLeft, Globe } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const JobDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // URL से जॉब की ID निकाली
  
  const [isSaved, setIsSaved] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // 🌟 यूज़र और जॉब का डेटा लोड करना
  useEffect(() => {
    const allJobs = JSON.parse(localStorage.getItem('jobPortalAllJobs')) || [];
    // URL की ID के हिसाब से सही जॉब ढूंढें
    const currentJob = allJobs.find(j => j.id === id || j._id === id);
    setSelectedJob(currentJob);

    // चेक करें कि क्या यूज़र पहले ही अप्लाई कर चुका है
    const currentUser = JSON.parse(sessionStorage.getItem('jobPortalUser'));
    if (currentUser && currentJob) {
      const allApplications = JSON.parse(localStorage.getItem('jobPortalApplications')) || [];
      const alreadyApplied = allApplications.some(
        app => app.jobId === (currentJob.id || currentJob._id) && app.studentId === currentUser.id
      );
      setIsApplied(alreadyApplied);
    }
  }, [id]);

  // 🎯 स्टेप 4: अप्लाई बटन का असली फंक्शन
  const applyJobHandler = () => {
    const currentUser = JSON.parse(sessionStorage.getItem('jobPortalUser'));
    
    if (!currentUser) {
      alert("कृपया अप्लाई करने के लिए पहले लॉगिन करें भाई! 🔑");
      navigate('/login');
      return;
    }

    if (!selectedJob) {
      alert("जॉब का डेटा नहीं मिला भाई!");
      return;
    }

    const allApplications = JSON.parse(localStorage.getItem('jobPortalApplications')) || [];

    // ✨ नया एप्लिकेशन ऑब्जेक्ट (रिक्रूटर मैपिंग के साथ)
    const newApplication = {
      id: Date.now().toString(),
      jobId: selectedJob.id || selectedJob._id,
      jobTitle: selectedJob.title,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentEmail: currentUser.email,
      
      // 🎯 सबसे ज़रूरी लाइन: जॉब पोस्ट करने वाले रिक्रूटर की ID यहाँ लॉक हो गई!
      recruiterId: selectedJob.createdById, 
      
      status: 'Pending'
    };

    const updatedApplications = [...allApplications, newApplication];
    localStorage.setItem('jobPortalApplications', JSON.stringify(updatedApplications));
    
    setIsApplied(true);
    alert("It was applied successfully! 🎉");
  };

  if (!selectedJob) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Navbar />
        <div className="text-center mt-20 font-medium text-gray-500">There are no jobs available!</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <Navbar />
      
      <div className="max-w-5xl mx-auto mt-5 px-4">
        {/* पीछे जाने का बटन */}
        <button onClick={() => navigate('/jobs')} className="flex items-center gap-1 text-sm text-gray-500 hover:text-purple-700 transition-all mb-5">
          <ArrowLeft size={16} /> Back to Jobs
        </button>

        {/* 🏢 मेन हेडर कार्ड */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-purple-700 text-white rounded-xl flex items-center justify-center font-bold text-2xl">
              {selectedJob?.title?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="font-bold text-2xl text-gray-900">{selectedJob?.title}</h1>
              <div className="flex items-center gap-2 mt-1">
                <p className="font-semibold text-purple-700 hover:underline cursor-pointer flex items-center gap-1">
                  {selectedJob?.companyName || "Tech Company"}
                </p>
              </div>
            </div>
          </div>

          {/* 🎯 अप्लाई और सेव बटन्स */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSaved(!isSaved)} 
              className={`p-3 rounded-xl border transition-all ${isSaved ? 'bg-red-50 border-red-200 text-red-500' : 'border-gray-200 text-gray-400 hover:border-gray-300'}`}
            >
              <Heart size={20} fill={isSaved ? "currentColor" : "none"} />
            </button>
            
            <button 
              onClick={applyJobHandler}
              disabled={isApplied}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${isApplied ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-purple-700 text-white hover:bg-purple-800'}`}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </button>
          </div>
        </div>

        {/* 📋 जॉब डिस्क्रिप्शन डिटेल्स */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-5">
          <h2 className="font-bold text-lg text-gray-900 mb-4">Job Description</h2>
          <p className="text-gray-600 leading-relaxed mb-6">{selectedJob?.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-100 pt-6">
            <div className="flex items-center gap-3 text-gray-600">
              <MapPin size={20} className="text-gray-400" />
              <span>{selectedJob?.location}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Briefcase size={20} className="text-gray-400" />
              <span>{selectedJob?.jobType}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <DollarSign size={20} className="text-gray-400" />
              <span>{selectedJob?.salary} LPA</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Calendar size={20} className="text-gray-400" />
              <span>Experience: {selectedJob?.experience} Years</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default JobDetails;