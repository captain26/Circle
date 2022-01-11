import React, {useState,useEffect} from "react"
import { getWatchlist } from "../user/helper/profie";
import { Card } from "./Card";
import WatchlistTile from "./watchlistTile";
export default function Watchlist(props) {

  const [watchlist, setWatchlist] = useState([]);

  const token = JSON.parse(sessionStorage.getItem('user')).token;

  //GetWatchlist
  const Watchlist = () => {
    getWatchlist(token)
    .then((data)=> {
      setWatchlist(data);
    }).catch(() => setWatchlist([]))
    
  }

  

  useEffect(() => {
    Watchlist();
  },[])

  

  return (
    <div>
    
 <Card class="card right-panel">
       <center>
         <p className="pt-0 px-0 my-0" style={{fontWeight:"bold",fontSize:"15pt"}}>Watchlist</p>
         <hr style={{borderColor:"grey", marginTop:"10px"}}></hr>
         {watchlist.map((company,index) => {
              return <WatchlistTile 
              ticker_id = {company.ticker_id}
              />
         })}
         
          {/* <div className="row" style={{marginBottom:"10px", margin:"0px"}}>
            <div className="col-sm-6">
            <h5 style={{color:"black"}}>PNB</h5>
            </div>
            <div className="col-sm-6">
            <p style={{color:"black", marginBottom:"0px"}}>&#8377; 31.45</p>
            <p style={{color:"#FF4500", marginTop:"0px", fontWeight:"bold"}}>-0.35 (1.10%)</p>
            </div>
          </div>
          <div className="row" style={{marginBottom:"10px", margin:"0px"}}>
            <div className="col-sm-6">
            <h5 style={{color:"black"}}>Vedanta</h5>
            </div>
            <div className="col-sm-6">
            <p style={{color:"black", marginBottom:"0px"}}>&#8377; 162.85</p>
            <p style={{color:"#44E439", marginTop:"0px", }}>12.40 (8.24%)</p>
            </div>
          </div> */}
          {/* <div className="row" style={{marginBottom:"10px", margin:"0px"}}>
            <div className="col-sm-6">
            <h5 style={{color:"black"}}>Yes Bank</h5>
            </div>
            <div className="col-sm-6">
            <p style={{color:"black", marginBottom:"0px"}}>&#8377; 17.55</p>
            <p style={{color:"#FF4500", marginTop:"0px", fontWeight:"bold"}}>-0.05 (0.28%)</p>
            </div>
          </div>
          <div className="row" style={{marginBottom:"10px", margin:"0px"}}>
            <div className="col-sm-6">
            <h5 style={{color:"black"}}>Vodafone Idea</h5>
            </div>
            <div className="col-sm-6">
            <p style={{color:"black", marginBottom:"0px"}}>&#8377; 10.10</p>
            <p style={{color:"#FF4500", marginTop:"0px", fontWeight:"bold"}}>-0.45 (4.27%)</p>
            </div>
          </div>
          <div className="row" style={{marginBottom:"10px", margin:"0px"}}>
            <div className="col-sm-6">
            <h5 style={{color:"black"}}>PNB</h5>
            </div>
            <div className="col-sm-6">
            <p style={{color:"black", marginBottom:"0px"}}>&#8377; 31.45</p>
            <p style={{color:"#FF4500", marginTop:"0px", fontWeight:"bold"}}>-0.35 (1.10%)</p>
            </div>
          </div>
          <div className="row" style={{marginBottom:"10px", margin:"0px"}}>
            <div className="col-sm-6">
            <h5 style={{color:"black"}}>Vedanta</h5>
            </div>
            <div className="col-sm-6">
            <p style={{color:"black", marginBottom:"0px"}}>&#8377; 162.85</p>
            <p style={{color:"#44E439", marginTop:"0px", }}>12.40 (8.24%)</p>
            </div>
          </div>
          <div className="row" style={{marginBottom:"10px", margin:"0px"}}>
            <div className="col-sm-6">
            <h5 style={{color:"black"}}>Yes Bank</h5>
            </div>
            <div className="col-sm-6">
            <p style={{color:"black", marginBottom:"0px"}}>&#8377; 17.55</p>
            <p style={{color:"#FF4500", marginTop:"0px", fontWeight:"bold"}}>-0.05 (0.28%)</p>
            </div>
          </div>
          <div className="row" style={{marginBottom:"10px", margin:"0px"}}>
            <div className="col-sm-6">
            <h5 style={{color:"black"}}>Vodafone Idea</h5>
            </div>
            <div className="col-sm-6">
            <p style={{color:"black", marginBottom:"0px"}}>&#8377; 10.10</p>
            <p style={{color:"#FF4500", marginTop:"0px", fontWeight:"bold"}}>-0.45 (4.27%)</p>
            </div>
          </div> */}
         </center>
    </Card>
    </div>
   
  ); 
}
