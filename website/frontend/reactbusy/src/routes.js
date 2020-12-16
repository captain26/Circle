import React from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";




const Routes = () => {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/home" exact component={Home} />
        </Switch>
      </BrowserRouter>
    );
  };
  
  export default Routes;
  