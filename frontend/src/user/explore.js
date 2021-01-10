import React from "react"
import Base from "../core/Base.js"
import { Card } from "../core/Card.js";

export default function Explore() {
  return (
    <div>
     <Base>
     <center>
     <Card class="card w-50 p-2 my-4" borderRadius="30px">
     <input placeholder="Search" style={{border: "none", outline:"0"}} type="text" id="search"></input>
     </Card>
     </center>
    <h1 style={{margin:"30px auto", color:"#707070", width: "80%",textAlign:"left"}}>News</h1>
    <div class="card" style={{padding:"10px", borderRadius:"10px", width:"80%", height:"800px", margin:"30px auto", overflowY:"scroll"}}>
        <div class="card mb-3" style={{padding:"10px", borderRadius:"10px", width:"90%", margin:"30px auto"}}>
          
          <div class="row no-gutters">
            <div class="col-lg-4">
              <img src="https://cdn.pixabay.com/photo/2020/11/24/22/46/prague-5774045_960_720.jpg" class="card-img" alt="pic" height="200px"/>
            </div>  
            <div class="col-lg-8">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </div>
          </div>
        </div>

        <div class="card mb-3" style={{padding:"10px", borderRadius:"10px", width:"90%", margin:"30px auto"}}>
          <div class="row no-gutters">
            <div class="col-lg-4">
              <img src="https://cdn.pixabay.com/photo/2019/08/03/18/24/bird-4382321_960_720.jpg" class="card-img" height="200px" alt="pic"/>
            </div>  
            <div class="col-lg-8">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </div>
          </div>
        </div>

        <div class="card mb-3" style={{padding:"10px", borderRadius:"10px", width:"90%", margin:"30px auto"}}>
          <div class="row no-gutters">
            <div class="col-lg-4">
              <img src="https://cdn.pixabay.com/photo/2019/08/03/18/24/bird-4382321_960_720.jpg" class="card-img" height="200px" alt="pic"/>
            </div>  
            <div class="col-lg-8">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </div>
          </div>
        </div>

        <div class="card mb-3" style={{padding:"10px", borderRadius:"10px", width:"90%", margin:"30px auto"}}>
          <div class="row no-gutters">
            <div class="col-lg-4">
              <img src="https://cdn.pixabay.com/photo/2019/08/03/18/24/bird-4382321_960_720.jpg" class="card-img" height="200px" alt="pic"/>
            </div>  
            <div class="col-lg-8">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </div>
          </div>
        </div>
    </div>
     
    <h1 style={{margin:"50px auto", color:"#707070", width: "80%", textAlign:"left"}}>Themes</h1>
    <div class="card" style={{padding:"10px", borderRadius:"10px", width:"80%", height:"300px", margin:"30px auto"}}>
    </div>
     </Base>
    </div>
  );
}