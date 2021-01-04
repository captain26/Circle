import React from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Explore from "./user/explore";
import Home from "./core/Home";
import Signup from "./core/Signup";
import Signin from "./core/signin";
import Notes from "./user/Notes";
import Notification from "./user/Notification";
import Profile from "./user/Profile";
import Search from "./user/Search";
import CompanyPage from "./company/company_page";
import PrivateRoute from "./core/PrivateRoutes";


const Routes = () => {
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <PrivateRoute path="/explore" exact component={Explore} />
          <PrivateRoute path="/search" exact component={Search} />
          <PrivateRoute path="/notification" exact component={Notification} />
          <PrivateRoute path="/notes" exact component={Notes} />
          <PrivateRoute path="/profile" exact component={Profile} />
          <PrivateRoute path="/company_page" exact component={CompanyPage} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/signin" exact component={Signin} />
        </Switch>
      </BrowserRouter>
    );
  };
  
  export default Routes;
  