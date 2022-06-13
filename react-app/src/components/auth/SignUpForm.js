import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { login, signUp } from "../../store/session";
import "./SignUpForm.css";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(fullName, username, email, password));
      if (data) {
        setErrors(data);
      }
    } else {
      setErrors(['Passwords do not match'])
    }
  };

  const loginDemo = async (e) => {
    e.preventDefault();
    const email = "demo@aa.io";
    const password = "password";
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateFullName = (e) => {
    setFullName(e.target.value);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="signupformdiv">
      <form onSubmit={onSignUp}>
        <h1 className="signUpTitle">Sign Up</h1>

        {errors && (<div className="signUp-login-errors">
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>)}
        <div className="signup-grid">
        <label>Full Name*</label>
          <input
            type="text"
            name="full_name"
            onChange={updateFullName}
            value={fullName}
          ></input>
          <label>Username*</label>
          <input
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
          ></input>
          {/* </div>
        <div> */}
          <label>Email*</label>
          <input
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
          ></input>
          {/* </div>
        <div> */}
          <label>Password*</label>
          <input
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
          ></input>
          {/* </div>
        <div> */}
          <label>Repeat Password*</label>
          <input
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <div className="signUpBtns">
          <button class='login-signup-btns' type="submit">Sign Up</button>
          <button class='demoBtn' onClick={loginDemo}>Login as Demo User</button>
        </div>
        <div className="bottomDivLogSign">
          <Link className="alreadyBecome" to="/login">
            Already a Waist Deep Member?
          </Link>
          <div>*Required</div>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
