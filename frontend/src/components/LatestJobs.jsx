import React, { useContext } from 'react';
import JobCard from './job/JobCard'; // पाथ चेक कर लेना भाई, बिल्कुल सही है
import { AuthContext } from '../context/AuthContext'; // कॉन्टेक्स्ट इम्पोर्ट किया

const LatestJobs = () => {
  // 🌟 कॉन्टेक्स्ट से सभी रिक्रूटर्स की जॉब्स एक साथ उठाईं
  const { allJobs } = useContext(AuthContext); 
  
  // लोकल स्टोरेज से बैकअप अगर कॉन्टेक्स्ट खाली हो
  const displayJobs = allJobs?.length > 0 
    ? allJobs 
    : (JSON.parse(localStorage.getItem('jobPortalAllJobs')) || []);

  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      <h1 className="text-4xl font-bold text-gray-800">
        Latest & Top <span className="text-purple-700">Job Openings</span>
      </h1>

      {/* 💼 जॉब कार्ड्स का ग्रिड लेआउट */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
        {displayJobs.length === 0 ? (
          <p className="text-gray-500 font-medium">There are no jobs available right now!</p>
        ) : (
          // 🎯 नकली randomJobs हटाकर असली नौकरियों को मैप किया और पूरा 'job' ऑब्जेक्ट भेजा
          displayJobs.slice(0, 6).map((job) => (
            <JobCard key={job.id || job._id} job={job} />
          ))
        )}
      </div>
    </div>
  );
};

export default LatestJobs;