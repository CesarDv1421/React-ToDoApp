import React from "react";
import { Link } from "react-router-dom";
import logoCode from "/Logo code.png";

function NavBar({ children }) {
  return (
    <>
      <nav>
        <ul className="navContainer">
          <li>
            <Link to="/">
              <img className="logoCode" src={logoCode} />
            </Link>
          </li>
          {children}
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
/*<div>
            <li>
              <Link to="/notes"><BiHomeAlt2/></Link>
            </li>
            <li>
              <Link to="/auth/signin"><BiLogIn/></Link>
            </li>
            <li>
              <Link to="/auth/signup"><BsDatabaseAdd/></Link>
            </li>
          </div>
          <li>
            <Link to="/auth/signin" onClick={()=> localStorage.removeItem('token')}><BiLogOut/></Link>
          </li>*/
