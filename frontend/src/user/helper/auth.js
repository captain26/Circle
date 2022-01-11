import { API } from "../../backend";

export const signup = user => {
    return fetch(`${API}/api/auth/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .catch(err => {
        console.log(err);
    })
  };

  export const signin = user => {
    return fetch(`${API}/api/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .catch(err => console.log(err));
  };
  
  export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("user", JSON.stringify(data));
      next();
    }
  };

  export const signout = next => {
    return fetch(`${API}/api/auth/logout`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${isAuthenticated().token}`
      },
    })
      .then(response => {
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("user");
          next();
        }
        console.log('signout success');
      })
      .catch(err => console.log(err));
  };

  export const isAuthenticated = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (sessionStorage.getItem("user")) {
      return JSON.parse(sessionStorage.getItem("user"));
    } else {
      return false;
    }
  };