import React, { Fragment } from "react"
import "../styles.css"
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../user/helper/auth";
import Explore from "./explore";

const Base = ({
    className = "",
    children, history
}) =>{
    return (
<div style={{backgroundColor:"#e1e1e1",  paddingBottom:"20px", minHeight:"100vh"}}>
  <div className="sidebar">
      {isAuthenticated() && (
        <Fragment>
  
      <a href="/"><Link to="/"><i class="fas fa-home" style={{fontSize: "20px"}}></i>&nbsp;&nbsp;Home</Link></a>
      {/* <a href="/explore"><Link to="/explore" >User</Link></a>
      <a href="/search"><Link  to="/search">Search</Link></a>
      <a href="/notification"><Link  to="/notification">Notification</Link></a> */}
      <a href="/notes"><Link to="/notes"><i class="far fa-sticky-note" style={{fontSize: "20px"}}></i>&nbsp;&nbsp;Notes</Link></a>
      <a href="/chat"><Link to="/chat"><i class="far fa-comments" style={{fontSize: "20px"}}></i>&nbsp;&nbsp;Chat</Link></a>
      <a href="/profile"><Link to="/profile"><i class="fas fa-user" style={{fontSize: "20px"}}></i>&nbsp;&nbsp;Profile</Link></a>

        </Fragment>
      )}
      {!isAuthenticated() && (
        <Fragment>
          <a href="/signup"><Link   to="/signup"><i class="fas fa-user-plus" style={{fontSize: "20px"}}></i>&nbsp;&nbsp;Signup</Link></a>
          <a href="/signin"><Link   to="/signin"><i class="fas fa-sign-in-alt" style={{fontSize: "20px"}}></i>&nbsp;&nbsp;Signin</Link></a>
        </Fragment>
      )}
      {isAuthenticated() && (
        <a href="/signout"><Link   to="/signout" onClick={() => { signout(() => {history.push("/");}); }}><i class="fas fa-sign-out-alt"></i>&nbsp;&nbsp;Signout</Link></a>
      )}
   </div>
      <div className={className}>{children}</div>
</div>
    );
}
export default withRouter(Base);