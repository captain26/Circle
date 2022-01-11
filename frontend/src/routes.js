import React from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Explore from "./core/explore";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/signin";
import Notes from "./user/notes/App";
import Notification from "./core/Notification";
import Profile from "./user/profile/Profile";
import CompanyPage from "./core/companyPage/company_page";
import PrivateRoute from "./core/PrivateRoutes";
import FirstTimeProfile from "./core/firstTimeProfile";
import { OtherUserProfile } from "./core/otherProfile/otherUserProfile";
import Chat from "./chat/chat_main";
import FirstTimePortfolio from "./core/firstTimePortfolio";

const Routes = () => {
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <PrivateRoute path="/explore" exact component={Explore} />
          <PrivateRoute path="/notification" exact component={Notification} />
          <PrivateRoute path="/notes" exact component={Notes} />
          <PrivateRoute path="/profile" exact component={Profile} />
          <Route path="/profile/:username" component={OtherUserProfile} />
          <Route path="/company_page/:company" exact component={CompanyPage} />
          <PrivateRoute path="/profilesetup" exact component={FirstTimeProfile} />
          <PrivateRoute path="/portfoliosetup" exact component={FirstTimePortfolio} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/signin/:onSignIn?" exact component={Signin} />
          <PrivateRoute path="/chat" exact component={Chat} />
        </Switch>
      </BrowserRouter>
    );
  };
  
  export default Routes;
  