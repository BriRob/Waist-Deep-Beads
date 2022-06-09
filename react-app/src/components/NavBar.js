import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session?.user);

  let navbar;
  if (sessionUser) {
    navbar = (
      <div>
        <LogoutButton />
      </div>
    );
  } else {
    navbar = (
      <div>
        <NavLink to="/login" exact={true} activeClassName="active">
          Login
        </NavLink>

        <NavLink to="/sign-up" exact={true} activeClassName="active">
          Sign Up
        </NavLink>
      </div>
    );
  }

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/waistbeads/new" exact={true} activeClassName="active">
            New Post
          </NavLink>
        </li>
        {navbar}
        {/* <li>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li> */}
      </ul>
    </nav>
  );
};

export default NavBar;
