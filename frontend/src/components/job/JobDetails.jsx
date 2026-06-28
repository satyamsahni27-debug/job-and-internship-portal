import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { MapPin, Briefcase, DollarSign, Calendar, Users, Share2, Heart, ArrowLeft, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JobDetails = () => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <Navbar />
      
      <div className="max-w-5xl mx-auto mt-5 px-4">
        {/* पीछे जाने का बटन */}
        <button onClick={() => navigate('/jobs')} className="flex items-center gap-1 text-sm text-gray-500 hover:text-purple-700 mb-5 transition-colors">
          <ArrowLeft size={16} /> Back to Jobs
        </button>

        {/* मेन हेडर कार्ड */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-purple-700 text-white rounded-xl flex items-center justify-center font-bold text-2xl shadow-md">
              T
            </div>
            <div>
              <h1 className="font-bold text-2xl text-gray-900">Senior Frontend Developer</h1>
              <div className="flex items-center gap-2 mt-1">
                <p className="font-semibold text-purple-700 hover:underline cursor-pointer flex items-center gap-0.5">
                  Tech Mahindra <span className="text-blue-500 text-xs">✔</span>
                </p>
                <span className="text-gray-300">|</span>
                <p className="text-sm text-gray-500 flex items-center gap-0.5"><MapPin size={14} /> Noida, India</p>
              </div>
            </div>
          </div>

          {/* शेयर, सेव और अप्लाई बटन्स */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="p-2.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors" title="Copy Link">
              <Share2 size={18} />
            </button>
            <button 
              onClick={() => setIsSaved(!isSaved)} 
              className={`p-2.5 rounded-lg border transition-colors ${isSaved ? 'bg-red-50 border-red-200 text-red-500' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
            >
              <Heart size={18} fill={isSaved ? "currentColor" : "none"} />
            </button>
            <button 
              onClick={() => setIsApplied(true)}
              className={`flex-1 md:flex-none px-6 py-2.5 font-semibold rounded-lg text-sm transition-all shadow-sm ${isApplied ? 'bg-green-600 text-white cursor-not-allowed' : 'bg-purple-700 text-white hover:bg-purple-800'}`}
              disabled={isApplied}
            >
              {isApplied ? "✓ Applied" : "Apply Now"}
            </button>
          </div>
        </div>

        {/* दो कॉलम्स लेआउट */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* लेफ्ट कॉलम: पूरी डिटेल्स */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* जॉब डिस्क्रिप्शन */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="font-bold text-lg text-gray-800 border-b pb-3 mb-4">Job Description</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
               We are looking for an experienced Senior Frontend Developer who can scale our core web application. You should have expertise in delivering excellent user experiences (UX) and writing clean, tested React code.
              </p>
            </div>

            {/* जिम्मेदारियां और आवश्यकताएं */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="font-bold text-lg text-gray-800 border-b pb-3 mb-4">Responsibilities & Requirements</h2>
              <h3 className="font-semibold text-sm text-gray-700 mb-2">मुख्य जिम्मेदारियां:</h3>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-2 mb-4">
                <li>रिस्पॉन्सिव और हाई-परफॉर्मेंस UI कंपोनेंट्स बनाना।</li>
                <li>बैकएंड REST APIs और वेबसॉकेट्स को इंटीग्रेट करना।</li>
                <li>कोड क्वालिटी, ऑप्टिमाइज़ेशन और रिव्यू को मेंटेन करना।</li>
              </ul>
              <h3 className="font-semibold text-sm text-gray-700 mb-2">ज़रूरी स्किल्स:</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {["React", "Node.js", "MongoDB", "JavaScript", "Tailwind CSS"].map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-purple-50 text-purple-700 font-medium text-xs rounded-full">{skill}</span>
                ))}
              </div>
            </div>

            {/* बेनिफिट्स (Benefits) */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="font-bold text-lg text-gray-800 border-b pb-3 mb-4">Benefits & Perks</h2>
              <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                <div>🏠 Remote Work Allowed</div>
                <div>🏥 Health Insurance</div>
                <div>📈 Performance Bonus</div>
                <div>☕ Free Snacks & Drinks</div>
              </div>
            </div>
          </div>

          {/* राइट कॉलम: क्विक ओवरव्यू और कंपनी प्रोफाइल */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <h2 className="font-bold text-lg text-gray-800 border-b pb-3">Job Overview</h2>
              <div className="space-y-3.5 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span className="text-gray-400 flex items-center gap-1"><Briefcase size={14} /> Job Type:</span>
                  <span className="font-medium text-gray-800">Full Time / Remote</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 flex items-center gap-1"><DollarSign size={14} /> Salary:</span>
                  <span className="font-medium text-gray-800">6-10 LPA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 flex items-center gap-1"><Users size={14} /> Openings:</span>
                  <span className="font-medium text-gray-800">4 Positions</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 flex items-center gap-1"><Calendar size={14} /> Posted Date:</span>
                  <span className="font-medium text-gray-800">25 June 2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 flex items-center gap-1"><Calendar size={14} /> Apply Before:</span>
                  <span className="font-medium text-red-600">25 July 2026</span>
                </div>
              </div>
            </div>

            {/* कंपनी प्रोफाइल */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
              <div className="w-14 h-14 bg-purple-700 text-white rounded-xl flex items-center justify-center font-bold text-xl mx-auto mb-3 shadow-inner">
                T
              </div>
              <h3 className="font-bold text-md text-gray-800">Tech Mahindra</h3>
              <p className="text-xs text-gray-400 mt-1">IT & Software Services</p>
              <div className="flex justify-center gap-1 text-amber-500 my-2 text-sm">⭐⭐⭐⭐★ <span className="text-gray-500 text-xs">(4.2)</span></div>
              <button className="mt-2 w-full py-2 border rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-1">
                <Globe size={12} /> Visit Website
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default JobDetails;