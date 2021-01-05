export const signup = user => {

    return fetch(`http://127.0.0.1:8000/busybeaver/api/auth/register`, {
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
    return fetch(`http://127.0.0.1:8000/busybeaver/api/auth/login`, {
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
      localStorage.setItem("user", JSON.stringify(data));
      next();
    }
  };

  export const signout = next => {
    return fetch(`http://127.0.0.1:8000/busybeaver/api/auth/logout`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${isAuthenticated().token}`
      },
    })
      .then(response => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("user");
          next();
        }      
        return response.json();
      })
      .catch(err => console.log(err));
  };

  export const isAuthenticated = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("user")) {
      return JSON.parse(localStorage.getItem("user"));
    } else {
      return false;
    }
  };