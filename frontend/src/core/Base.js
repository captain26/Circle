import React from "react"
import "../styles.css"
import { Link, withRouter } from "react-router-dom";



const Base = ({
    className = "",
    children
}) =>{
    return (
<div style={{backgroundColor:"#e1e1e1"}}>
  <div className="sidebar">
      <a href="/"><Link to="/">Home</Link></a>
      <a href="/explore"><Link to="/explore" >Explore</Link></a>
      <a href="/search"><Link  to="/search">Search</Link></a>
      <a href="/notification"><Link  to="/notification">Notification</Link></a>
      <a href="/notes"><Link to="/notes">Notes</Link></a>
      <a href="/profile"><Link   to="/profile">Profile</Link></a>
  </div>
  <div class="content row">
      <div className="text-center col-lg-10">
            <div className={className}>{children}</div>
      </div>
      <div className="right-panel col-lg-2 ">
        <h4 style={{color:"white"}}>Watchlist</h4>
      </div>
  </div>
</div>
    );
}
export default withRouter(Base);