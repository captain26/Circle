import React, {useEffect, useState} from "react"
import Base from "../core/Base.js"
import { Card } from "../core/Card.js";

// import "../styles.css";

export default function Search() {

  return (
    <div>
     <Base>
     <center>
     <Card class="card w-50 p-2 my-2" borderRadius="30px">
     <input placeholder="Search" style={{border: "none", outline:"0"}} type="text" id="search"></input>
     </Card>
     <div class="wrapper">
      <div class="search-input">
        
        <a href="" target="_blank" hidden></a>
        <input type="text" placeholder="Type to search.."></input>
        <div class="autocom-box">
        </div>
      </div>
    </div>

     </center>
     </Base>
    </div>
  );
}