import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Share2, Bookmark, MapPin } from 'lucide-react'; // अगर Lucide आइकॉन्स यूज़ हो रहे हैं

// 🚀 स्टेप 1: props के अंदर 'job' का असली डेटा रिसीव किया
const JobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/description/${job?.id || job?._id}`)} // 🚀 क्लिक करने पर सीधे जॉब डिटेल्स पेज खुलेगा असली ID के साथ
      className="p-6 rounded-xl shadow-md bg-white border border-gray-100 cursor-pointer hover:shadow-2xl transition-all duration-300 relative"
    >
      
      {/* Urgent Hiring & Featured Badges */}
      <div className="flex gap-2 mb-3">
        <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700 bg-red-100 rounded-md">
          🔥 Urgent Hiring
        </span>
        <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 rounded-md">
          ⭐ Featured
        </span>
      </div>

      {/* ऊपर का हिस्सा: तारीख और बुकमार्क */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400 flex items-center gap-1">
          <Calendar size={12} /> {job?.createdAt ? new Date(job.createdAt).toLocaleDateString() : "2 days ago"}
        </p>
        <div className="flex gap-2">
          <button className="text-gray-400 hover:text-blue-600 transition-colors" title="Share">
            <Share2 size={18} />
          </button>
          <button className="text-gray-400 hover:text-purple-600 transition-colors" title="Save Job">
            <Bookmark size={18} />
          </button>
        </div>
      </div>

      {/* कंपनी डिटेल्स */}
      <div className="flex items-center gap-3 my-3">
        {/* कंपनी का पहला अक्षर लोगो बॉक्स में दिखाने के लिए */}
        <div className="w-12 h-12 bg-purple-700 text-white rounded-lg flex items-center justify-center font-bold text-xl shadow-inner uppercase">
          {job?.company?.name ? job.company.name[0] : "T"}
        </div>
        <div>
          <div className="flex items-center gap-1">
            <h1 className="font-semibold text-md text-gray-800 capitalize">
              {job?.company?.name || "Tech Mahindra"}
            </h1>
            <span className="text-blue-500 text-xs font-bold" title="Verified Company">✓</span>
          </div>
          <p className="text-xs text-gray-500 flex items-center gap-0.5">
            <MapPin size={12} /> {job?.location || "Noida, India"}
          </p>
        </div>
      </div>

      {/* जॉब टाइटल और डिस्क्रिप्शन */}
      <div>
        <h2 className="font-bold text-gray-800 text-base mb-1 capitalize">
          {job?.title || "Job Title"}
        </h2>
        <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed mb-4">
          {job?.description || "No description provided for this job role."}
        </p>
      </div>

      {/* नीचे के टैग्स (Salary, Job Type) */}
      <div className="flex flex-wrap gap-2 items-center mt-2">
        <span className="bg-purple-50 text-purple-700 text-[10px] px-2.5 py-1 rounded-md font-bold">
          💰 {job?.salary ? `${job.salary} LPA` : "Not Specified"}
        </span>
        <span className="bg-orange-50 text-orange-700 text-[10px] px-2.5 py-1 rounded-md font-bold">
          💼 {job?.jobType || "Full Time"}
        </span>
      </div>

    </div>
  );
};

export default JobCard;