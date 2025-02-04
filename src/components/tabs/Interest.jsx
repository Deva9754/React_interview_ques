import React from 'react';

const Interest = ({ data, setData }) => {
  // Destructure interest from data, with a fallback to an empty array
  const { interest = [] } = data; // Make sure it's always an array

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    if (checked) {
      // Add the interest to the array if it's checked
      setData((prevData) => ({
        ...prevData,
        interest: [...prevData.interest, name], // Ensure interest is treated as an array
      }));
    } else {
      // Remove the interest if it's unchecked
      setData((prevData) => ({
        ...prevData,
        interest: prevData.interest.filter((item) => item !== name), // Ensure interest is treated as an array
      }));
    }
  };

  return (
    <div>
      <h3>Interest Component</h3>
      <div>
        <label>
          <input
            type="checkbox"
            name="coding"
            checked={interest.includes("coding")}
            onChange={handleCheckboxChange}
          />
          Coding
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="music"
            checked={interest.includes("music")}
            onChange={handleCheckboxChange}
          />
          Music
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="javascript"
            checked={interest.includes("javascript")}
            onChange={handleCheckboxChange}
          />
          JavaScript
        </label>
      </div>
    </div>
  );
};

export default Interest;
