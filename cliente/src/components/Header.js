import React from 'react';
import logo from '../assets/logo.png'


const Header = ({title}) => {


    return ( 
        <header>
            <img src={logo} alt={title}></img>
            <h1>{title}</h1>
        </header>

     );
}
 
export default Header;