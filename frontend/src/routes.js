import React from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Explore from "./user/explore";
import Home from "./core/Home";
import Notes from "./user/Notes";
import Notification from "./user/Notification";
import Profile from "./user/Profile";
import Search from "./core/Search";




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
        </Switch>
      </BrowserRouter>
    );
  };
  
  export default Routes;
  