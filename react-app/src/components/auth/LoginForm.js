import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../store/session";
import Footer from "../Footer";
import "./LoginForm.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  const loginDemo = async (e) => {
    e.preventDefault();
    const email = "demo@aa.io";
    const password = "password";
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <>
      <div className="loginformdiv">
        <form onSubmit={onLogin}>
          <h1 className="loginTitle">Log In</h1>
          {errors && (
            <div className="signUp-login-errors">
              {errors.map((error, ind) => (
                <div key={ind} id="errors">
                  {error}
                </div>
              ))}
            </div>
          )}
          <div className="login-grid">
            {/* <div> */}
            <label htmlFor="email">Email*</label>
            <input
              name="email"
              type="text"
              // placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
            {/* </div> */}
            {/* <div> */}
            <label htmlFor="password">Password*</label>
            <input
              name="password"
              type="password"
              // placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
            {/* </div> */}
          </div>
          <div className="loginBtns">
            <button className="login-signup-btns" type="submit">
              Login
            </button>
            <button className="demoBtn" onClick={loginDemo}>
              Login as Demo User
            </button>
          </div>
          <div className="bottomDivLogSign">
            <Link className="alreadyBecome" to="/sign-up">
              Become a Waist Deep Member
            </Link>
            <div className="req">*Required</div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default LoginForm;
