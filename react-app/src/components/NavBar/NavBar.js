import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// import LogoutButton from "../auth/LogoutButton";
import ProfileButton from "./ProfileButton";
import "./NavBar.css";
import NewWbModal from "../Waistbeads/NewWbModal";
import wdb_small from "../../images/wdb_small.png";

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session?.user);

  let navbar;
  if (sessionUser) {
    navbar = (
      // <div>
      <ProfileButton user={sessionUser} />
      /* </div> */
    );
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
        <div className="logoNavLink">
          <NavLink to="/" exact={true} activeClassName="active" >
            <img src={wdb_small} className="logo-btn"></img>
          </NavLink>
        </div>
        {/* <span className="navLinks">
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </span> */}
        <div className="right-nav">
          <NewWbModal />
          {/* <NavLink to="/waistbeads/new" exact={true} activeClassName="active">
            New Post
          </NavLink> */}
          {navbar}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
