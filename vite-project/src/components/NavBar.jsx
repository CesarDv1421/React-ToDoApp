import React from "react";
import { Link } from "react-router-dom";
import logoCode from '/Logo code.png'
import { BiHomeAlt2, BiLogIn, BiLogOut } from "react-icons/bi";
import { BsDatabaseAdd } from  "react-icons/bs";

function NavBar() {
  return (
    <>
      <nav>
        <ul className="navContainer">
          <li>
            <Link to="/">
              <img className="logoCode" src={logoCode} alt="" />
            </Link>
          </li>
          <div>
            <li>
              <Link to="/home"><BiHomeAlt2/></Link>
            </li>
            <li>
              <Link to="/auth/signin" onClick={()=> localStorage.removeItem('token')}><BiLogIn/></Link>
            </li>
            <li>
              <Link to="/auth/signup" onClick={()=> localStorage.removeItem('token')}><BsDatabaseAdd/></Link>
            </li>
          </div>
          <li>
            <Link to="/auth/signin" onClick={()=> localStorage.removeItem('token')}><BiLogOut/></Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
