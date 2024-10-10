import React from 'react';
import './HeadingStyle.css';

const HeaderFunc = ({ title }) => {
  return (
    <header className="heading-align">
      {title}
    </header>
  );
};

export default HeaderFunc;
