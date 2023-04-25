import React from "react";
import { Link } from "react-router-dom";
import logoCode from '/Logo code.png'

function NavBar() {
  return (
    <>
      <nav>
        <ul className="navContainer">
          <li>
            <Link to="/home">
              <img className="logoCode" src={logoCode} alt="" />
            </Link>
          </li>
          <div>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/auth/signin" onClick={()=> localStorage.removeItem('token')}>Sign In</Link>
            </li>
            <li>
              <Link to="/auth/signup" onClick={()=> localStorage.removeItem('token')}>Sign Up</Link>
            </li>
          </div>
          <li>
            <Link to="/auth/signin" onClick={()=> localStorage.removeItem('token')}>Log out</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
