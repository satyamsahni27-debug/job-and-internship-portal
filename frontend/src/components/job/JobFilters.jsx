import React from 'react';

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Data Science", "Fullstack Developer"]
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42k-1Lakh", "1Lakh to 5Lakh"]
  },
];

const FilterCard = () => {
  return (
    <div className="w-full bg-white p-5 rounded-md shadow-md border border-gray-100">
      <h1 className="font-bold text-lg text-gray-800 border-b pb-2">Filter Jobs</h1>
      <div className="mt-3 space-y-4">
        {filterData.map((data, index) => (
          <div key={index}>
            <h2 className="font-semibold text-md text-gray-700 mb-2">{data.filterType}</h2>
            <div className="space-y-2">
              {data.array.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id={item} 
                    name={data.filterType} 
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                  />
                  <label htmlFor={item} className="text-sm text-gray-600 cursor-pointer">{item}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterCard;