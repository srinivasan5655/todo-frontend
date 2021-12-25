import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./login.css";

const Login = (props) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("loginData"))?.googleId) {
      history.push("/todos");
    }
  });

  const apiHelper = (res) => {
    console.log(res);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("userId", res.data.userId);
    const remainingMilliseconds = 60 * 60 * 1000;
    const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
    localStorage.setItem("expiryDate", expiryDate);
    history.push("/todos");
  };

  const responseGoogle = async (response) => {
    console.log(response);
    const res = await axios({
      method: "post",
      url: "https://todo-list-app5.herokuapp.com/google-login",
      data: {
        tokenId: response.tokenObj.id_token,
      },
    });
    apiHelper(res);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios({
        method: "post",
        url: "https://todo-list-app5.herokuapp.com/login",
        data: {
          email: email,
          password: password,
        },
      });
      apiHelper(res);
    } catch (err) {
      setError(true);
      if (err.response?.status === 401) {
        console.log(err.response);
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
        <h1>Login</h1>
        <label htmlFor="email">Email</label>

        <input
          type="text"
          id="email"
          placeholder="Enter your Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className={error ? "input-error" : "input-login"}
        ></input>

        <label htmlFor="password">Password</label>

        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className={error ? "input-error" : "input-login"}
        ></input>

        <button
          type="submit"
          className="login-btn"
          onClick={(e) => {
            loginHandler(e);
          }}
        >
          login
        </button>
        <GoogleLogin
          clientId="771846533282-ea8m3ip5tk3um6bass6si6qaloj29011.apps.googleusercontent.com"
          isSignedIn={true}
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              id="loginButton"
              type="submit"
              className="google-btn"
            >
              <img
                alt="ggl-logo"
                className="google"
                src="https://img.icons8.com/office/16/000000/google-logo.png"
              />
              <span>Sign in with Google</span>
            </button>
          )}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <div>
          Don't have an account?
          <Link className="signup-link" to="/signup">
            &nbsp; Signup
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
