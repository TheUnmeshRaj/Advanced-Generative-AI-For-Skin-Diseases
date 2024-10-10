import React from 'react'
import './HeadingStyle.css';
type HeaderProps={
    title:string ; 
}
const HeaderFunc : React.FC<HeaderProps> = ({title})=>{
    return (
        <header className = "heading-align">
            {title}
        </header>
    );
};
export default HeaderFunc ; 