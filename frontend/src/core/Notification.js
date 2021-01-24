import React, {useEffect, useState} from "react"
import Base from "../core/Base.js"
import Watchlist from "./watchlist";
// import "../styles.css";

export default function Notification() {
  return (
    <div>
     <Base>
     <div className="content text-center">
        <h1>this is the body of the notification Page</h1>
        </div>
      <Watchlist/>
     </Base>
    </div>
  );
}