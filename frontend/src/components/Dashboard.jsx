import React from 'react';

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 my-12 font-sans">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">
        Job Market <span className="text-purple-700">Insights & Dashboard</span>
      </h2>
      <p className="text-gray-500 mb-8 text-sm">Real-time data and analytics to boost your career readiness.</p>

      {/* मुख्य डैशबोर्ड ग्रिड */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* 1. Live Job Market Dashboard */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2 flex justify-between items-center">
            📊 Live Job Market 
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium animate-pulse">Live</span>
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-purple-50 p-3 rounded-xl">
              <span className="text-xs text-purple-600 block">Total Jobs</span>
              <span className="text-xl font-bold text-purple-900">12,540</span>
            </div>
            <div className="bg-blue-50 p-3 rounded-xl">
              <span className="text-xs text-blue-600 block">Companies</span>
              <span className="text-xl font-bold text-blue-900">1,250</span>
            </div>
            <div className="bg-green-50 p-3 rounded-xl">
              <span className="text-xs text-green-600 block">Remote Jobs</span>
              <span className="text-xl font-bold text-green-900">3,450</span>
            </div>
            <div className="bg-orange-50 p-3 rounded-xl">
              <span className="text-xs text-orange-600 block">Internships</span>
              <span className="text-xl font-bold text-orange-900">850</span>
            </div>
          </div>
        </div>

        {/* 2. Trending Skills & 13. Tech Demand Dashboard */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">🔥 Trending Skills & Demand</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-gray-700">React.js <span className="text-green-600 font-bold ml-1">▲ +12%</span></span>
                <span className="text-gray-600">95%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full"><div className="bg-purple-600 h-2 rounded-full" style={{width: '95%'}}></div></div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-gray-700">Python <span className="text-green-600 font-bold ml-1">▲ +18%</span></span>
                <span className="text-gray-600">98%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full"><div className="bg-blue-600 h-2 rounded-full" style={{width: '98%'}}></div></div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-gray-700">Node.js</span>
                <span className="text-gray-600">90%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full"><div className="bg-green-600 h-2 rounded-full" style={{width: '90%'}}></div></div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-gray-700">AI / Cyber Security</span>
                <span className="text-gray-600">99%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full"><div className="bg-red-500 h-2 rounded-full" style={{width: '99%'}}></div></div>
            </div>
          </div>
        </div>

        {/* 3. Salary Dashboard */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">💰 Salary Benchmark (LPA)</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-2.5 bg-gray-50 rounded-xl">
              <span className="text-sm font-medium text-gray-700">Frontend Developer</span>
              <span className="text-sm font-bold text-purple-700">₹7.2 LPA</span>
            </div>
            <div className="flex justify-between items-center p-2.5 bg-gray-50 rounded-xl">
              <span className="text-sm font-medium text-gray-700">Backend Developer</span>
              <span className="text-sm font-bold text-purple-700">₹8.4 LPA</span>
            </div>
            <div className="flex justify-between items-center p-2.5 bg-gray-50 rounded-xl">
              <span className="text-sm font-medium text-gray-700">AI Engineer</span>
              <span className="text-sm font-bold text-green-600">₹15.8 LPA</span>
            </div>
          </div>
        </div>

        {/* 4. Global Hiring & 14. Remote Type Dashboard */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">🌍 Global Hiring & Work Type</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-xs border-b pb-1.5 text-gray-600">
              <span>🇮🇳 India: 12,500 Jobs</span>
              <span className="font-semibold text-gray-800">Onsite: 7,000</span>
            </div>
            <div className="flex justify-between text-xs border-b pb-1.5 text-gray-600">
              <span>🇺🇸 USA: 18,000 Jobs</span>
              <span className="font-semibold text-gray-800">Remote: 1,200</span>
            </div>
            <div className="flex justify-between text-xs border-b pb-1.5 text-gray-600">
              <span>🇨🇦 Canada: 6,000 Jobs</span>
              <span className="font-semibold text-gray-800">Hybrid: 3,500</span>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>🇩🇪 Germany: 4,800 Jobs</span>
              <span className="font-semibold text-gray-400">Total Markets</span>
            </div>
          </div>
        </div>

        {/* 6. Career Readiness Dashboard */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">🎯 Career Readiness</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between"><span>Resume Score</span><span className="font-bold text-green-600">90%</span></div>
            <div className="flex justify-between"><span>Skills Verified</span><span className="font-bold text-blue-600">82%</span></div>
            <div className="flex justify-between"><span>Projects Built</span><span className="font-bold text-purple-600">70%</span></div>
            <div className="flex justify-between border-b pb-2"><span>Interview Practice</span><span className="font-bold text-orange-500">65%</span></div>
            <div className="flex justify-between pt-1 text-sm font-bold text-purple-800">
              <span>Overall Score</span>
              <span>77%</span>
            </div>
          </div>
        </div>

        {/* 8. Career News Dashboard */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">📢 Career News & Updates</h3>
          <ul className="space-y-2.5 text-xs text-gray-700">
            <li className="flex items-center gap-2"><span className="text-purple-600 font-bold">●</span> Latest Hiring News: Off-campus updates</li>
            <li className="flex items-center gap-2"><span className="text-blue-600 font-bold">●</span> Tech News: GenAI trends in software roles</li>
            <li className="flex items-center gap-2"><span className="text-green-600 font-bold">●</span> Internship Updates: Stipend scales rising</li>
          </ul>
        </div>

        {/* 9. Top Companies Dashboard */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">🏢 Top Premium Companies</h3>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
              <span className="font-bold block text-gray-800">Google</span>
              <span className="text-purple-600 font-medium">35 Jobs</span>
            </div>
            <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
              <span className="font-bold block text-gray-800">Microsoft</span>
              <span className="text-purple-600 font-medium">28 Jobs</span>
            </div>
            <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
              <span className="font-bold block text-gray-800">Amazon</span>
              <span className="text-purple-600 font-medium">42 Jobs</span>
            </div>
          </div>
        </div>

        {/* 10. Learning Dashboard */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-3 border-b pb-2">📖 Today's Learning Tracker</h3>
          <div className="text-xs text-gray-700 space-y-1.5">
            <div><span className="text-gray-400">Topic:</span> <span className="font-semibold text-purple-700">React Hooks</span></div>
            <div><span className="text-gray-400">Time:</span> <span className="font-medium">45 Minutes</span></div>
            <div className="pt-2">
              <div className="flex justify-between text-[10px] font-bold text-gray-500 mb-1"><span>Progress</span><span>40%</span></div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full"><div className="bg-purple-600 h-1.5 rounded-full" style={{width: '40%'}}></div></div>
            </div>
          </div>
        </div>

        {/* 12. Upcoming Hiring Drives */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">📅 Upcoming Mega Hiring</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center bg-red-50/60 p-1.5 rounded-lg">
              <span className="text-gray-700 font-medium">Amazon Drive</span>
              <span className="bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded text-[10px]">5 July</span>
            </div>
            <div className="flex justify-between items-center bg-blue-50/60 p-1.5 rounded-lg">
              <span className="text-gray-700 font-medium">Google Internship</span>
              <span className="bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded text-[10px]">12 July</span>
            </div>
            <div className="flex justify-between items-center bg-orange-50/60 p-1.5 rounded-lg">
              <span className="text-gray-700 font-medium">TCS National Hiring</span>
              <span className="bg-orange-100 text-orange-700 font-bold px-2 py-0.5 rounded text-[10px]">18 July</span>
            </div>
          </div>
        </div>

        {/* 15. Community Dashboard */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 lg:col-span-3">
          <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">👥 Community Network Stats</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <span className="text-2xl font-black text-purple-700 block">52,000+</span>
              <span className="text-xs text-gray-500 uppercase tracking-wider">Active Users</span>
            </div>
            <div>
              <span className="text-2xl font-black text-blue-600 block">12,000+</span>
              <span className="text-xs text-gray-500 uppercase tracking-wider">Shared Projects</span>
            </div>
            <div>
              <span className="text-2xl font-black text-green-600 block">340+</span>
              <span className="text-xs text-gray-500 uppercase tracking-wider">Expert Mentors</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;