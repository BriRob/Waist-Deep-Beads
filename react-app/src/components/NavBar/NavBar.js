import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// import LogoutButton from "../auth/LogoutButton";
import ProfileButton from "./ProfileButton";
import "./NavBar.css";
import NewWbModal from "../Waistbeads/NewWbModal";

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session?.user);

  let navbar;
  if (sessionUser) {
    navbar = (
      <div>
        <ProfileButton user={sessionUser} />
      </div>
    )
  } else {
    navbar = (
      <>
        <span className="navLinks">
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </span>
        <span className="navLinks">
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </span>
      </>
    );
  }

  return (
    <nav id="nav">
      <div className="allNav">
        <span className="navLinks">
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </span>

        {/* <span className="navLinks">
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </span> */}
        <span className="navLinks">
          <NewWbModal />
          {/* <NavLink to="/waistbeads/new" exact={true} activeClassName="active">
            New Post
          </NavLink> */}
        </span>
        {navbar}
      </div>
    </nav>
  );
};

export default NavBar;
