import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const searchJobHandler = () => {
    // बिना किसी रिडक्स एरर के सीधे जॉब्स पेज पर नेविगेट करेगा
    navigate("/jobs");
  };

  return (
    <div className='text-center px-4'> {/* मोबाइल पर स्क्रीन से चिपके न इसलिए px-4 जोड़ा */}
      <div className='flex flex-col gap-5 my-10'>
        <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium text-xs'>
          No. 1 Job Hunt Website
        </span>
        
        {/* 🚀 1. रिस्पॉन्सिव हेडिंग यहाँ सेट कर दी */}
        <h1 className='text-3xl md:text-5xl font-bold leading-tight'>
          Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span>
        </h1>
        
        <p className='text-gray-400 text-xs md:text-sm max-w-xl mx-auto leading-relaxed'>
          Find jobs with your preferred companies. Just one click to invite job seekers to embark on a new career journey!
        </p>
        
        {/* 🚀 2. रिस्पॉन्सिव सर्च बॉक्स की विड्थ यहाँ सेट कर दी */}
        <div className='flex w-[90%] sm:w-[70%] md:w-[40%] border border-gray-200 shadow-lg pl-3 rounded-full items-center gap-2 mx-auto h-12 bg-white'>
          <input
            type="text"
            placeholder='Find your dream jobs...'
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            className='outline-none border-none w-full px-2 text-sm text-gray-700'
          />
          <button 
            onClick={searchJobHandler}
            className='bg-[#6A38C2] h-full px-5 rounded-r-full text-white hover:bg-[#5b2fb3] transition-colors flex items-center justify-center shrink-0'
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.604 10.604z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;