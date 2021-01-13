import React, { Fragment } from "react"
import "../styles.css"
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "./helper/auth";


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
  <div class="content row" style={{padding:"0px"}}>
      <div className="text-center col-lg-9" style={{padding:"0px"}}>
            <div className={className} style={{padding:"0px"}}>{children}</div>
      </div>

      <div className="right-panel col-lg-3">
      <center>
        <h3 style={{color:"white", marginTop:"20px", fontWeight:"bold", marginBottom:"20px"}}>Watchlist</h3>
        <hr style={{borderColor:"white", marginBottom:"30px"}}></hr>
        <div className="row">
          <div className="col-sm-6">
          <h5 style={{color:"white"}}>Tata Motors</h5>
          </div>
          <div className="col-sm-6">
          <p style={{color:"white", marginBottom:"0px"}}>&#8377; 175.95</p>
          <p style={{color:"#44E439", marginTop:"0px"}}>6.75 (3.99%)</p>
          </div>
        </div>

        <div className="row" style={{marginBottom:"10px"}}>
          <div className="col-sm-6">
          <h5 style={{color:"white"}}>PNB</h5>
          </div>
          <div className="col-sm-6">
          <p style={{color:"white", marginBottom:"0px"}}>&#8377; 31.45</p>
          <p style={{color:"#FF4500", marginTop:"0px", fontWeight:"bold"}}>-0.35 (1.10%)</p>
          </div>
        </div>
        <div className="row" style={{marginBottom:"10px"}}>
          <div className="col-sm-6">
          <h5 style={{color:"white"}}>Vedanta</h5>
          </div>
          <div className="col-sm-6">
          <p style={{color:"white", marginBottom:"0px"}}>&#8377; 162.85</p>
          <p style={{color:"#44E439", marginTop:"0px", }}>12.40 (8.24%)</p>
          </div>
        </div>
        <div className="row" style={{marginBottom:"10px"}}>
          <div className="col-sm-6">
          <h5 style={{color:"white"}}>Yes Bank</h5>
          </div>
          <div className="col-sm-6">
          <p style={{color:"white", marginBottom:"0px"}}>&#8377; 17.55</p>
          <p style={{color:"#FF4500", marginTop:"0px", fontWeight:"bold"}}>-0.05 (0.28%)</p>
          </div>
        </div>
        <div className="row" style={{marginBottom:"10px"}}>
          <div className="col-sm-6">
          <h5 style={{color:"white"}}>Vodafone Idea</h5>
          </div>
          <div className="col-sm-6">
          <p style={{color:"white", marginBottom:"0px"}}>&#8377; 10.10</p>
          <p style={{color:"#FF4500", marginTop:"0px", fontWeight:"bold"}}>-0.45 (4.27%)</p>
          </div>
        </div>
        </center>
      </div>
  </div>
</div>
    );
}
export default withRouter(Base);