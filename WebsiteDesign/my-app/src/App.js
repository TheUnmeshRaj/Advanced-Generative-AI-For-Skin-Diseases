import React from 'react';
import robotImage from './components/cute-ai-robot-chatbot-waving-isolated-transparent-background_879541-322.png';
import './components/BackgroundStyle.css';
import TextBox from './components/ChatSpace';
import HeaderFunc from './components/HeadingFile';
import TextBoxFunc from './components/ResultBox';

const App = () => {
  return (
    <div className="background-style">
      <HeaderFunc title="Skin Disease Chat Bot" />
      <div className="textBox-align">
        <TextBox />
      </div>
      <div className="robot-container">
        <img src={robotImage} alt="Cute AI Robot" className="robot-image" />
      </div>
      <TextBoxFunc res="" />
    </div>
  );
};

export default App;
