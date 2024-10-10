import React from 'react' ; 
import './ResultStyle.css' ; 
type ResultProp = {
    res:string ; 
}
const TextBoxFunc: React.FC<ResultProp> = ({ res }) => {
    return (
        <div className="res-space">
            <p>{res || "No result available Yet "}</p>
        </div>
    );
};
export default TextBoxFunc ; 