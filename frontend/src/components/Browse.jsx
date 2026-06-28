import React, { useState } from 'react';
import Navbar from './shared/Navbar';

const Browse = () => {
  // एक्टिव टैब सेट करने के लिए (Default: roadmaps)
  const [activeTab, setActiveTab] = useState('roadmaps');
  
  // क्लिक होने पर कौनसा रोडमैप खोलना है उसके लिए स्टेट
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);

  // 🧭 यूज़र डिस्कवरी प्रेफरेंसेस स्टेट (इमेज image_28a8be.png के लिए)
  const [preferences, setPreferences] = useState({
    
   
  });
  
  const [showDiscoveryResults, setShowDiscoveryResults] = useState(false);

  const handleInputChange = (e) => {
    setPreferences({ ...preferences, [e.target.name]: e.target.value });
  };

  // 🗺️ रोडमैप्स का डेटा
  const roadmapsData = {
    'Frontend Developer': {
      icon: '🎨',
      desc: 'Master the art of building beautiful and interactive user interfaces.',
      steps: ['HTML5 & CSS3 (Semantic markup, Flexbox, Grid)', 'JavaScript (ES6+, DOM Manipulation, Async/Await)', 'Tailwind CSS / Bootstrap for rapid UI styling', 'React.js (Hooks, State Management, Router)', 'Git & GitHub version control', 'Build 3-5 Frontend Projects & deploy on Vercel']
    },
    'Backend Developer': {
      icon: '⚙️',
      desc: 'Learn server-side logic, databases, APIs, and system architecture.',
      steps: ['Node.js & Express.js for server creation', 'RESTful API Architecture & JSON', 'Databases (MongoDB / SQL Basics)', 'Authentication (JWT, Cookies, Sessions)', 'Postman for API testing', 'Deploy backend servers on Render or AWS']
    },
    'Full Stack Developer': {
      icon: '🚀',
      desc: 'Become a complete developer by mastering both frontend and backend systems.',
      steps: ['Complete HTML, CSS, JavaScript foundations', 'React.js for modern interactive UI', 'Node.js & Express.js for robust APIs', 'MongoDB / MERN Stack integration', 'State management (Redux Toolkit or Context API)', 'Build & deploy a complete production-ready Full Stack project']
    },
    'AI Engineer': {
      icon: '🤖',
      desc: 'Dive into machine learning, data models, and prompt engineering.',
      steps: ['Python Programming Basics (NumPy, Pandas)', 'Mathematics for ML (Linear Algebra, Calculus, Statistics)', 'Machine Learning Frameworks (Scikit-Learn)', 'Deep Learning (TensorFlow or PyTorch)', 'Working with LLM APIs (OpenAI, Gemini API integration)', 'Build and deploy smart AI web applications']
    },
    'Cyber Security Analyst': {
      icon: '🛡️',
      desc: 'Protect data networks, perform vulnerability scans, and secure codebases.',
      steps: ['Networking Fundamentals (TCP/IP, OSI Model, DNS)', 'Linux Command Line basics & Shell Scripting', 'Introduction to Cybersecurity concepts & tools', 'Vulnerability Assessments (OWASP ZAP, Nmap, Burp Suite)', 'Identity and Access Management (IAM) & Cryptography', 'Ethical Hacking basics & securing web applications']
    },
    'Data Analyst': {
      icon: '📊',
      desc: 'Analyze complex data points, extract insights, and create visual reports.',
      steps: ['Advanced Microsoft Excel (VLOOKUP, Pivot Tables)', 'SQL for complex database querying', 'Python/R for Data Cleaning & Manipulation', 'Data Visualization Tools (Power BI or Tableau)', 'Statistical Data Analysis & Reporting', 'Build a comprehensive Data Analysis Portfolio Project']
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <div className="py-8">
        {/* हेडर सेक्शन */}
        <div className="max-w-7xl mx-auto px-4 text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Explore & <span className="text-purple-700">Browse Features</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Switch between professional roadmaps and your personal career discovery tool.
          </p>

          {/* 🔘 टैब स्विचर बटन्स */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => setActiveTab('roadmaps')}
              className={`px-5 py-2 rounded-full font-medium text-sm transition-all focus:outline-none flex items-center gap-1.5 ${
                activeTab === 'roadmaps'
                  ? 'bg-purple-700 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              🗺️ Career Roadmaps
            </button>
            <button
              onClick={() => setActiveTab('discovery')}
              className={`px-5 py-2 rounded-full font-medium text-sm transition-all focus:outline-none flex items-center gap-1.5 ${
                activeTab === 'discovery'
                  ? 'bg-purple-700 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              🧭 Career Discovery Mode
            </button>
          </div>
        </div>

        {/* 🗺️ टैब 1: Career Roadmaps सेक्शन */}
        {activeTab === 'roadmaps' && (
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2 justify-center md:justify-start">
              🗺️ 3. Career Roadmaps
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.keys(roadmapsData).map((role) => (
                <div 
                  key={role} 
                  onClick={() => setSelectedRoadmap(role)}
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-300 cursor-pointer transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-3xl mb-3 block">{roadmapsData[role].icon}</span>
                    <h4 className="font-bold text-gray-800 text-lg mb-2">{role}</h4>
                    <p className="text-gray-500 text-xs leading-relaxed mb-4">{roadmapsData[role].desc}</p>
                  </div>
                  <span className="text-purple-700 font-semibold text-xs flex items-center gap-1 mt-2">
                    Click to view complete roadmap →
                  </span>
                </div>
              ))}
            </div>

            {/* रोडमैप पॉप-अप मॉडल */}
            {selectedRoadmap && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                <div className="bg-white rounded-2xl p-6 max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-xl">
                  <div className="flex justify-between items-start mb-4 border-b pb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        {roadmapsData[selectedRoadmap].icon} {selectedRoadmap} Roadmap
                      </h3>
                    </div>
                    <button onClick={() => setSelectedRoadmap(null)} className="text-gray-400 hover:text-gray-600 font-bold text-xl px-2">✕</button>
                  </div>
                  <div className="space-y-3 my-4">
                    {roadmapsData[selectedRoadmap].steps.map((step, index) => (
                      <div key={index} className="flex gap-3 items-start p-3 bg-gray-50 rounded-xl">
                        <span className="bg-purple-700 text-white font-mono text-xs w-5 h-5 flex items-center justify-center rounded-full shrink-0 mt-0.5">{index + 1}</span>
                        <p className="text-gray-700 text-xs font-medium leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setSelectedRoadmap(null)} className="w-full mt-4 bg-gray-800 text-white font-medium py-2 rounded-xl text-xs hover:bg-gray-900">Close Roadmap</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 🧭 टैब 2: Career Discovery Mode (वापस आ गया भाई पूरा फीचर!) */}
        {activeTab === 'discovery' && (
          <div className="max-w-4xl mx-auto px-4">
            
            {/* 🛠️ इमेज image_28a8be.png वाला पूरा फॉर्म इनपुट यहाँ है */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                🧭 Career Discovery Prefs
              </h3>
              <p className="text-xs text-gray-500 mb-6">Edit your details and view the best-matching roles.।</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">🎓 Education</label>
                  <input
                    type="text"
                    name="education"
                    value={preferences.education}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-600 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">💻 Skills</label>
                  <input
                    type="text"
                    name="skills"
                    value={preferences.skills}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-600 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">💰 Expected Salary</label>
                  <input
                    type="text"
                    name="salary"
                    value={preferences.salary}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-600 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">🌍 Preferred Location</label>
                  <input
                    type="text"
                    name="location"
                    value={preferences.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-600 outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">❤️ Interests / Domain</label>
                  <input
                    type="text"
                    name="interests"
                    value={preferences.interests}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-600 outline-none"
                  />
                </div>
              </div>

              {/* 🚀 इमेज image_28a8be.png का मुख्य बटन */}
              <button
                onClick={() => setShowDiscoveryResults(true)}
                className="w-full mt-6 bg-purple-700 text-white font-medium py-2.5 rounded-xl hover:bg-purple-800 transition-colors text-sm shadow-sm flex items-center justify-center gap-2"
              >
                🚀 Discover Best Matches
              </button>
            </div>

            {/* 🎯 "Discover Best Matches" के ऑटोमैटिक रिजल्ट्स */}
            {showDiscoveryResults && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <h4 className="font-bold text-gray-800 text-sm mb-3">🎯 Best Matching Careers</h4>
                  <div className="space-y-2">
                    <div className="p-2 bg-green-50 text-green-800 text-xs font-semibold rounded-lg flex justify-between">
                      <span>Frontend Web Developer</span> <span>95% Match</span>
                    </div>
                    <div className="p-2 bg-purple-50 text-purple-800 text-xs font-semibold rounded-lg flex justify-between">
                      <span>UI Engineer</span> <span>85% Match</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <h4 className="font-bold text-gray-800 text-sm mb-3">💼 Relevant Jobs</h4>
                  <div className="space-y-2 text-xs">
                    <div className="border border-gray-100 p-2 rounded-xl flex justify-between items-center">
                      <div>
                        <p className="font-bold text-gray-700">React Developer</p>
                        <p className="text-gray-400 text-[10px]">Active Openings • {preferences.location}</p>
                      </div>
                      <span className="text-purple-700 font-bold">{preferences.salary}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <h4 className="font-bold text-gray-800 text-sm mb-3">📚 Missing Skills to Upgrade</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-red-50 text-red-600 text-xs px-2.5 py-1 rounded-full font-medium">React Hooks</span>
                    <span className="bg-red-50 text-red-600 text-xs px-2.5 py-1 rounded-full font-medium">Tailwind CSS</span>
                    <span className="bg-red-50 text-red-600 text-xs px-2.5 py-1 rounded-full font-medium">Git Basics</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <h4 className="font-bold text-gray-800 text-sm mb-3">🗺️ Learning Roadmap</h4>
                  <ol className="text-xs text-gray-600 space-y-2 list-decimal list-inside">
                    <li>Master JavaScript Async/Await & Array Functions</li>
                    <li>Learn React component states & structural layouts</li>
                    <li>Build responsive UI layouts using modern styling libraries</li>
                  </ol>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <h4 className="font-bold text-gray-800 text-sm mb-3">📈 Growth Projection</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    इस डोमेन में आपकी स्किल्स के अनुसार अगले 3 सालों में <span className="text-green-600 font-bold font-mono">+24%</span> की ग्रोथ और डिमांड की उम्मीद है।
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <h4 className="font-bold text-gray-800 text-sm mb-3">💰 Average Salary Matrix</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between"><span>Entry Level:</span> <span className="font-bold">₹4.5 - 6 LPA</span></div>
                    <div className="flex justify-between text-purple-700 font-bold"><span>Your Target:</span> <span>{preferences.salary}</span></div>
                    <div className="flex justify-between"><span>Senior Level:</span> <span className="font-bold">₹15+ LPA</span></div>
                  </div>
                </div>

              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;