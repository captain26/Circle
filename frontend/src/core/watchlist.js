import React from "react"

export default function Watchlist() {
  return (
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
  ); 
}