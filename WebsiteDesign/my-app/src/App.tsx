import React from 'react';
import './components/BackgroundStyle.css';
import TextBox from './components/ChatSpace';
import HeaderFunc from  './components/HeadingFile';
import TextBoxFunc from './components/ResultBox';
const App = () => {
    return (
        <div className ='background-style'>
        <HeaderFunc title =" Skin Disease Chat Bot" />
        <TextBox/>
        <TextBoxFunc res=""/>
         </div>
    );
} 
export default App ;
