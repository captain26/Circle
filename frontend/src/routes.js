import React from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Explore from "./user/explore";
import Home from "./core/Home";
import Signup from "./core/Signup";
import Signin from "./core/signin";
import Notes from "./user/Notes";
import Notification from "./user/Notification";
import Dashboard from "./user/dashboard";
import Profile from "./user/Profile";
import Search from "./user/Search";
import PrivateRoute from "./core/PrivateRoutes";


const Routes = () => {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/explore" exact component={Explore} />
          <Route path="/search" exact component={Search} />
          <Route path="/notification" exact component={Notification} />
          <Route path="/notes" exact component={Notes} />
          <Route path="/profile" exact component={Profile} />
          <PrivateRoute path="/dashboard" exact component={Dashboard} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/signin" exact component={Signin} />
        </Switch>
      </BrowserRouter>
    );
  };
  
  export default Routes;
  