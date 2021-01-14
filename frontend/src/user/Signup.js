import React, { useState } from "react";
import { signup } from "./helper/auth";
import Base from "../core/Base.js";
import { Link } from "react-router-dom";

const Signup = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    error: "",
    success: false
  });

  const { username, email, password, error, success} = values;

  const handleChange = username => event => {
    setValues({ ...values,error: false, [username]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false});
    signup({ username, email, password })
      .then(res => {
        if (res[0] === 400) {
          setValues({ ...values, error: res[1], success: false });
        } else {
          setValues({
            ...values,
            username: "",
            email: "",
            password: "",
            error: "",
            success: true
          });
        }
      })
      .catch(err => {
        console.log(err);
    })
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please
            <Link to="/signin"> Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error.username ? "" : "none" }}
          >
{error.username}
          </div>
          <div
            className="alert alert-danger"
            style={{ display: error.email ? "" : "none" }}
          >
{error.email}
          </div>
          <div
            className="alert alert-danger"
            style={{ display: error.password ? "" : "none" }}
          >
{error.password}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base>
    {successMessage()}
    {errorMessage()}
    <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text">Username</label>
              <input
                className="form-control"
                onChange={handleChange("username")}
                type="text"
                value={username}
              />
            </div>
            <div className="form-group">
              <label className="text">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                value={email}
              />
            </div>

            <div className="form-group">
              <label className="text">Password</label>
              <input
                onChange={handleChange("password")}
                className="form-control"
                type="password"
                value={password}
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
      </Base>
  );
};

export default Signup;
