import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
      <div className="navbar">

        <NavLink to="/plantpage">
            My Plants
        </NavLink>
  
        <NavLink to="/profile" >
          Profile
        </NavLink>
      
      </div>
    );
  };
  
  export default NavBar;