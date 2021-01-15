import React, { Fragment } from "react"
import "../styles.css"
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../user/helper/auth";


const Base = ({
    className = "",
    children, history
}) =>{
    return (
<div style={{backgroundColor:"#e1e1e1"}}>
  <div className="sidebar">
      {isAuthenticated() && (
        <Fragment>
      <a href="/"><Link to="/">Home</Link></a>
      <a href="/explore"><Link to="/explore" >Explore</Link></a>
      <a href="/search"><Link  to="/search">Search</Link></a>
      <a href="/notification"><Link  to="/notification">Notification</Link></a>
      <a href="/notes"><Link to="/notes">Notes</Link></a>
      <a href="/notes"><Link to="/chat">Chat</Link></a>
      <a href="/profile"><Link   to="/profile">Profile</Link></a>
        </Fragment>
      )}
      {!isAuthenticated() && (
        <Fragment>
          <a href="/signup"><Link   to="/signup">Signup</Link></a>
          <a href="/signin"><Link   to="/signin">Signin</Link></a>
        </Fragment>
      )}
      {isAuthenticated() && (
        <a href="/signout"><Link   to="/signout" onClick={() => { signout(() => {history.push("/");}); }}>Signout</Link></a>
      )}
  </div>
  <div class="content" style={{padding:"0px"}}>
      <div className="text-center" style={{padding:"0px"}}>
            <div className={className} style={{padding:"0px"}}>{children}</div>
      </div>
  </div>
</div>
    );
}
export default withRouter(Base);