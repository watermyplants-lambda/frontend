import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
      <div className="navbar">

        <NavLink className="plantpage" to="/plants">
          My Plants
        </NavLink>
  
        <NavLink className="profile" to="/profile" >
          Profile
        </NavLink>
      
      </div>
    );
  };
  
  export default NavBar;