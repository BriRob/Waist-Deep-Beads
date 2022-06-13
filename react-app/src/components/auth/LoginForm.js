import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../store/session";
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
    <div className="loginformdiv">
      <form onSubmit={onLogin}>
        <h1 className="loginTitle">Log In</h1>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
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
        <button type="submit">Login</button>
        <button onClick={loginDemo}>Login as Demo User</button>
        <Link to="/sign-up">Become a Member</Link>
        <div>*Required</div>
      </form>
    </div>
  );
};

export default LoginForm;
