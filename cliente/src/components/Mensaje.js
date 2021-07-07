import React from 'react';


const Menesaje = ({children, bgColor = "blue", color}) => {
 
    const miEstilo = {
        "textAlign" : "center",
    }
 
 
    return (
        <div style={{...{backgroundColor: bgColor}, ...miEstilo}}>
            <h2 style={{color:color}}>{children}</h2>
        </div>
      );
}
 
export default Menesaje;