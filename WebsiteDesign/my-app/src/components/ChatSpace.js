import React, { useState } from 'react';
import './TextBoxStyle.css';

const TextBox = ({ label, placeholder, value, onChange }) => {
  const [inputValue, setInputValue] = useState(value || '');
  const [searchHistory, setSearchHistory] = useState([]);
  let res = [];

  const handleChange = (event) => {
    setInputValue(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  const handleSearch = () => {
    if (!inputValue.trim()) {
      console.warn('Input is empty. Please enter a valid search term.');
      return;
    }
    res.push(inputValue);
    console.log('Search result saved:', inputValue, 'Current res array:', res);
    setInputValue('');
  };

  return (
    <div className="center-container">
      <div className="textbox-container">
        {label && <label className="textbox-label">{label}</label>}
        <input
          type="text"
          placeholder={placeholder || 'Enter your search query here'}
          value={inputValue}
          onChange={handleChange}
          className="textbox-input"
        />
        <button className="round-button" onClick={handleSearch}>
          <i className="fas fa-arrow-up"></i>
        </button>
      </div>
    </div>
  );
};

export default TextBox;
