import React, { useState } from 'react';
import {
    
    FaBars,
    FaUserAlt,
    FaMapMarkerAlt,
    FaExchangeAlt,
    FaUserCircle

}from "react-icons/fa";
import { NavLink } from 'react-router-dom';
const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        
        {
            path:"/MyProfile",
            name:"My Profile",
            icon:<FaUserAlt/>
        },
        {
            path:"/MyAddress",
            name:"My Address",
            icon:<FaMapMarkerAlt/>
        },
        {
            path:"/Exchanges",
            name:"Exchanges",
            icon:<FaExchangeAlt/>
        },
        
    ]
    return (
        <div className="container">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeClassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
    );
};


export default Sidebar;

