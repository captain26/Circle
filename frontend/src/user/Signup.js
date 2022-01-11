import React, { useState } from "react";
import { signup, isAuthenticated, authenticate } from "./helper/auth";
import { postUserProfileName} from "./helper/profie";
import Base from "../core/Base.js";
import { Redirect } from "react-router-dom";
import Watchlist from "../core/watchlist";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    error: "",
    didRedirect: false
  });

  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const { name, username, email, password, error, didRedirect, confirmpassword} = values;

  const handleChange = username => event => {
    setValues({ ...values, [username]: event.target.value });
    if(username === "confirmpassword") {
      if(event.target.value !== password){
        setConfirmPasswordError("Password do not Match");
      } else {
        setConfirmPasswordError("");
      }
    }
  };

  const onSubmit = event => {
      event.preventDefault();
    setValues({ ...values, error: ""});
    if(values.name !== ""){
      signup({ username, email, password })
      .then(res => {
        if (res[0] === 400) {
          setValues({ ...values, error: res[1]});
        } else {
          authenticate(res[1], () => {
            const token = res[1].token;
            postUserProfileName(token, name)
            .then(res => {
              setValues({
                ...values,
                username: "",
                email: "",
                password: "",
                error: "",
                didRedirect: true
              });
            })
            .catch(err => {
              console.log(err);
          })
          });
        }
      })
      .catch(err => {
        console.log(err);
    })
    } else {
      setValues({ ...values, error: {name: "Please enter your name"}});
    }
  };

  const performRedirect = () => {
    if (didRedirect) {
        return <Redirect to="/profilesetup" />;
    }
    if (!didRedirect && isAuthenticated()) {
      return <Redirect to="/profilesetup" />;
    }
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
        <div
            className="alert alert-danger"
            style={{ display: error.name ? "" : "none" }}
          >
{error.name}
          </div>
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
          <div className="content text-center">

    <div style={{paddingTop:"30px"}}>
    {errorMessage()}
    <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
          <div className="form-group">
              <label className="text">Name</label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
                value={name}
              />
            </div>
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

            <div className="form-group" style={{marginBottom: "5px"}}>
              <label className="text">Confirm Password</label>
              <input
                onChange={handleChange("confirmpassword")}
                className="form-control"
                type="password"
                value={confirmpassword}
              />
            </div>
            <div className="text-danger" style={{marginTop: "0px"}}>{confirmPasswordError}</div>
            <button disabled={confirmPasswordError} onClick={onSubmit} className="btn btn-success btn-block" style={{marginTop:"30px"}}>
              Submit
            </button>
          </form>
        </div>
      </div>
      {performRedirect()}
      </div>
      </div>
    
      </Base>
  );
};

export default Signup;
