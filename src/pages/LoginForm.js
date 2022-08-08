import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

import loginImg from "../assets/imgs/login.svg";
import UserContext from "../store/UserContext";
import useInput from "../hooks/useInput";
import { validEmail } from "../utils/Validation";
import useHttp from "../hooks/useHttp";

const cookies = new Cookies();

const LoginForm = () => {
  const ctx = useContext(UserContext);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput((value) => validEmail(value));

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useInput((value) => value);

  const { sendRequest: loginRequest } = useHttp();

  const [isValid, setIsValid] = useState(false);

  const formIsValid = emailIsValid && passwordIsValid;

  const loginFormHandler = async (e) => {
    e.preventDefault();

    if (formIsValid) {
      const response = await loginRequest({
        url: "/api/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: {
          email: emailValue,
          password: passwordValue,
        },
      });
      if (response) setIsValid(true);

      ctx.setUserData(response);
      cookies.set("token", response.token, { path: "/" });

      passwordReset();
      emailReset();
    }
  };

  return (
    <form onSubmit={loginFormHandler}>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src={loginImg} alt="" className="absolute" />
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <h1 className="lg:text-5xl font-bold">Login</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  id="email"
                  type="text"
                  placeholder="email"
                  className={`input input-bordered ${
                    emailHasError ? "notValid" : null
                  }`}
                  onChange={emailChangeHandler}
                  onBlur={emailBlurHandler}
                  value={emailValue}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  id="password"
                  type="text"
                  placeholder="password"
                  className={`input input-bordered ${
                    passwordHasError ? "notValid" : null
                  }`}
                  onChange={passwordChangeHandler}
                  onBlur={passwordBlurHandler}
                  value={passwordValue}
                />
                <label className="label">
                  <a
                    href="src/pages/LoginForm#"
                    className="label-text-alt link link-hover"
                  >
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button
                  disabled={!formIsValid}
                  type="submit"
                  className="btn btn-primary"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isValid ? <Navigate to="/dashboard" /> : null}
    </form>
  );
};

export default LoginForm;
