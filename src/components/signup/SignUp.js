import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const signUpHandler = async (e) => {
    e.preventDefault();
    try {
      await axios({
        method: "put",
        url: "https://todo-list-app5.herokuapp.com/signup",
        data: {
          email: email,
          password: password,
          confirmPassword: confirmPass,
        },
      });
      history.push("/login");
    } catch (err) {
      setError(true);
      if (err.response?.status === 42) {
        setErrorMessage("Please check your Email or Password");
      } else {
        setErrorMessage("Please try again");
      }
    }
  };
  const renderError = () => {
    if (error) {
      return <p className="error-message">{errorMessage}</p>;
    }
  };

  return (
    <div className="form">
      {renderError()}
      <form className="login-form">
        <h1>Sign Up</h1>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          className={error ? "input-error" : "input-login"}
          placeholder="Enter your Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>
        <label htmlFor="password">Password</label>
        <input
          title="Password must be 5 character long"
          id="password"
          type="password"
          className={error ? "input-error" : "input-login"}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
        <p className="instruction">*Password must be 5 character long</p>
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          id="confirm-password"
          type="password"
          className={error ? "input-error" : "input-login"}
          placeholder="Re-enter your password"
          onChange={(e) => setConfirmPass(e.target.value)}
          value={confirmPass}
        ></input>
        <button
          type="submit"
          className="login-btn"
          onClick={(e) => signUpHandler(e)}
        >
          Sign Up
        </button>
        Already have an account account?
        <Link className="signup-link" to="/login">
          Login
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
