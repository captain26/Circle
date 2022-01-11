import React, { useState } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";
import Watchlist from "../core/watchlist"


import { signin, authenticate, isAuthenticated } from "./helper/auth";
import Explore from "../core/explore";

export default function Signin({match}) {
  const afterSignIn = match.params.onSignIn;
  console.log(afterSignIn);
  const [values, setValues] = useState({
    username: "",
    password: "",
    error: "",
    didRedirect: false
  });

  const { username, password, error, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false});
    signin({ username, password })
      .then(res => {
        if (res[0] === 400) {
          setValues({ ...values, error: res[1]});
        } else {
          authenticate(res[1], () => {
            setValues({
              ...values,
              error: "",
              didRedirect: true
            });
          });
        }
        }
      )
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error.non_field_errors ? "" : "none" }}
          >
{error.non_field_errors}
          </div>
        </div>
      </div>
    );
  };

  const performRedirect = () => {
    if (didRedirect) {
      return afterSignIn ? 
      <Redirect to="/company_page/RELIANCE" />
      : 
      <Redirect to="/" />
      ;
    }
    if (isAuthenticated()) {
      return afterSignIn ? 
      <Redirect to="/company_page/RELIANCE" />
      : 
      <Redirect to="/" />
      ;
    }
  };

  return (
    <Base>
    {/* <Explore/> */}
          <div className="content text-center">
    <div style={{paddingTop:"30px"}}>
    {errorMessage()}
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text">Username</label>
              <input
                onChange={handleChange("username")}
                value={username}
                className="form-control"
                type="username"
              />
            </div>
            <div className="form-group">
              <label className="text">Password</label>
              <input
                onChange={handleChange("password")}
                value={password}
                className="form-control"
                type="password"
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block"  style={{marginTop:"30px"}}>
              Submit
            </button>
          </form>
        </div>
      </div>
      {performRedirect()}
      </div>
      </div>
      {/* <Watchlist/> */}
    </Base>
  );
};