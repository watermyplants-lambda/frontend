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

        <NavLink className='login' to="/login">
          Login
        </NavLink>

        <NavLink className='signup' to="/signup">
          Sign Up 
        </NavLink>
        <NavLink classname="logout" to="/logout">Log Out</NavLink>
      
      
      </div>
    );
  };
  
  export default NavBar;