import React, { useState } from 'react';

const FilterBox = () => {
  const [activeOption, setActiveOption] = useState('');

  const handleOptionClick = (optionName) => {
    setActiveOption(activeOption === optionName ? '' : optionName);
  };

  const renderSubOptions = (optionName) => {
    if (activeOption === optionName) {
      // Replace this example with your actual sub-options data
      const subOptions = [
        'Option 1',
        'Option 2',
        'Option 3'
        // Add more sub-options
      ];

      return (
        <ul className="sub-options">
          {subOptions.map((subOption, index) => (
            <li key={index}>{subOption}</li>
          ))}
        </ul>
      );
    }
    return null;
  };

  return (
    <div className="filter-box">
      <h4>Filter Options</h4>
      <ul className="main-options">
        <li className="main-option">
          <span
            className={`main-option-name ${activeOption === 'Discount Range' ? 'active' : ''}`}
            onClick={() => handleOptionClick('Discount Range')}
          >
            Discount Range
          </span>
          {renderSubOptions('Discount Range')}
        </li>
        <li className="main-option">
          <span
            className={`main-option-name ${activeOption === 'Price Range' ? 'active' : ''}`}
            onClick={() => handleOptionClick('Price Range')}
          >
            Price Range
          </span>
          {renderSubOptions('Price Range')}
        </li>
        {/* Add more main options similarly */}
      </ul>
    </div>
  );
};

export default FilterBox;
