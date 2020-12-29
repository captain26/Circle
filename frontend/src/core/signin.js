import React, { useState } from "react";
import Base from "./Base";
import { Redirect } from "react-router-dom";

import { signin, authenticate, isAuthenticated } from "./helper/auth";

const Signin = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
    didRedirect: false
  });

  const { username, password, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values});
    signin({ username, password })
      .then(data => {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true
            });
          });
          console.log("signin success")
        }
      )
  };

  const performRedirect = () => {
    if (didRedirect) {
        return <Redirect to="/dashboard" />;
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  return (
    <Base>
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
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
      {performRedirect()}
    </Base>
  );
};

export default Signin;
