import React, { useState } from "react";
import { signup } from "./helper/auth";
import Base from "./Base.js";
import { Link } from "react-router-dom";

const Signup = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    success: false
  });

  const { username, email, password, success} = values;

  const handleChange = username => event => {
    setValues({ ...values, [username]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values});
    signup({ username, email, password })
      .then(data => {
          setValues({
            ...values,
            username: "",
            email: "",
            password: "",
            success: true
          });
        }
      )
      .catch(console.log("Error in signup"));
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

  return (
    <Base>
    {successMessage()}
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
