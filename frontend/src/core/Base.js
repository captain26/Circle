import React from "react"
import "../styles.css"
import { Link, withRouter } from "react-router-dom";



const Base = ({
    title = "My Title",
    description = "My desription",
    className = "",
    children
}) =>{
    return (
        <div>
       <div className="row" style={{backgroundColor:"#e1e1e1"}}>
  <div className="col-lg-2" >
        <div className="left-panel">
          <ul className="nav nav-pills flex-column mt-50">
            <li className="nav-item manage-list">
              <Link className="link" to="/">Home</Link>
            </li>
            <li className="nav-item manage-list">
              <Link  className="link" to="/explore" >Explore</Link>
            </li>
            <li className="nav-item manage-list">
              <Link  className="link" to="/search">Search</Link>
            </li>
            <li className="nav-item manage-list " >
              <Link  className="link" to="/notification"> Notification</Link>
            </li>
            <li className="nav-item manage-list">
              <Link  className="link" to="/notes" >Notes</Link>
            </li>
            <li className="nav-item manage-list">
              <Link  className="link" to="/profile" >Profile</Link>
            </li>
          </ul>
        </div>
  </div>
  <div className="col-lg-8" >
  <div className="text-center">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
        <div className={className}>{children}</div>
      </div>
  </div>
  <div className="col-lg-2">
    <div className="left-panel">
      
    </div>
  </div>
  </div>

        </div>
        
    );
}
export default withRouter(Base);