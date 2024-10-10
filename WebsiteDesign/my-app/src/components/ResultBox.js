import React from 'react';
import './ResultStyle.css';

const TextBoxFunc = ({ res }) => {
  return (
    <div className="res-space">
      <p>{res || "No result available yet !! "}</p>
    </div>
  );
};

export default TextBoxFunc;
