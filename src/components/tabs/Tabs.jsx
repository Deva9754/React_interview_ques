import React, { useState } from 'react';
import Profile from './Profile';
import Interest from './Interest';
import Settings from './Settings';

const TabsForm = () => {
  const [data, setData] = useState({
    name: "Devashish",
    age: "23",
    email: "deva@gmail.com",
    interest: ["coding", "music", "javascript"], // Ensure interest is always an array
    theme: "dark",
  });

  const [activeTab, setActivetab] = useState(0);
  
  const tabs = [
    {
      name: "Profile",
      component: Profile,
    },
    {
      name: "Interests",
      component: Interest,
    },
    {
      name: "Settings",
      component: Settings,
    },
  ];

  const ActiveTabComponent = tabs[activeTab].component;

  // Handle Next and Previous buttons
  const handleNext = () => {
    if (activeTab < tabs.length - 1) {
      setActivetab(activeTab + 1);
    }
  };

  const handlePrevious = () => {
    if (activeTab > 0) {
      setActivetab(activeTab - 1);
    }
  };

  // Handle Submit on last tab (Settings)
  const handleSubmit = () => {
    console.log("Form data:", data);
  };

  return (
    <div>
      <div className="m-2 p-2 border border-black flex cursor-pointer">
        {tabs.map((t, index) => (
          <div 
            key={index} 
            className="p-2 border border-black-900" 
            onClick={() => setActivetab(index)}
          >
            {t.name}
          </div>
        ))}
      </div>

      <div className="m-2 flex justify-center border border-black h-[200px]">
        <ActiveTabComponent data={data} setData={setData} />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4">
        <button 
          onClick={handlePrevious} 
          disabled={activeTab === 0} 
          className="p-2 border border-black rounded-lg"
        >
          Previous
        </button>

        {activeTab === tabs.length - 1 ? (
          <button 
            onClick={handleSubmit} 
            className="p-2 border border-black rounded-lg bg-blue-500 text-white"
          >
            Submit
          </button>
        ) : (
          <button 
            onClick={handleNext} 
            disabled={activeTab === tabs.length - 1} 
            className="p-2 border border-black rounded-lg"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default TabsForm;
