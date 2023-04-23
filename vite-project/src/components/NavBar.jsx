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
              <Link to="/auth/signin">Sign In</Link>
            </li>
            <li>
              <Link to="/auth/signup">Sign Up</Link>
            </li>
          </div>
          <li>
            <Link to="/asdasd">404 NOT FOUND</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
