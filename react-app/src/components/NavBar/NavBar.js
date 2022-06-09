import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import ProfileButton from "./ProfileButton";

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session?.user);

  let navbar;
  if (sessionUser) {
    navbar = (
      <>
      <ProfileButton user={sessionUser}/>
      {/* <span>
        {sessionUser.username}
      </span> */}
      {/* <span>
        <LogoutButton />
      </span> */}
      </>
    );
  } else {
    navbar = (
      <>
      <span>
        <NavLink to="/login" exact={true} activeClassName="active">
          Login
        </NavLink>
        </span>
        <span>
        <NavLink to="/sign-up" exact={true} activeClassName="active">
          Sign Up
        </NavLink>
        </span>
      </>
    );
  }

  return (
    <nav>
      <div>
        <span>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </span>

        <span>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </span>
        <span>
          <NavLink to="/waistbeads/new" exact={true} activeClassName="active">
            New Post
          </NavLink>
        </span>
        {navbar}
      </div>
    </nav>
  );
};

export default NavBar;
