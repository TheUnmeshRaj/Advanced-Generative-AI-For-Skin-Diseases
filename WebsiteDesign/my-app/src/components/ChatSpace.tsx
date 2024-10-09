import React, { useState } from 'react';
import './TextBoxStyle.css';
import { db } from '../firebase/firebase'; // Adjust the path to your firebase.js file
import { collection, addDoc } from 'firebase/firestore';

interface TextBoxProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const TextBox: React.FC<TextBoxProps> = ({ label, placeholder, value, onChange }) => {
  const [inputValue, setInputValue] = useState(value || '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  const handleSearch = async () => {
    console.log("Search button clicked"); // Debugging statement

    if (!inputValue.trim()) {
      console.warn('Input is empty. Please enter a valid search term.');
      return; // Prevent saving empty strings
    }

    try {
      // Store search result in Firestore
      await addDoc(collection(db, 'searchResults'), {
        searchTerm: inputValue.trim(),  // Store the trimmed input value
        timestamp: new Date(),
      });
      console.log('Search result saved:', inputValue);

      // Clear the input after saving
      setInputValue(''); 
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className="center-container">
      <div className="textbox-container">
        {label && <label className="textbox-label">{label}</label>}
        <input 
          type="text" 
          placeholder={placeholder} 
          value={inputValue} 
          onChange={handleChange} 
          className="textbox-input"
        />
        <button className="button-align" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default TextBox;
