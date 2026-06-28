import React from 'react';
import JobCard from './job/JobCard';

// टेस्टिंग के लिए 6 नकली आइटम्स का एरे
const randomJobs = [1, 2, 3, 4, 5, 6];

const LatestJobs = () => {
  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      <h1 className="text-4xl font-bold text-gray-800">
        Latest & Top <span className="text-purple-700">Job Openings</span>
      </h1>
      
      {/* जॉब कार्ड्स का ग्रिड लेआउट */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
        {randomJobs.map((item, index) => (
          <JobCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default LatestJobs;