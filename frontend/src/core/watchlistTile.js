import React , {useState,useEffect} from "react"
import { getPrices } from "../user/helper/profie";

export default function WatchlistTile(prop) {


    const token = JSON.parse(sessionStorage.getItem('user')).token;
    var [price , setPrice] = useState();


    const Prices = () =>{
     
        getPrices(token,[prop.ticker_id])
        .then((data) => {
          setPrice(data[prop.ticker_id]);
        })
      }

    useEffect(() => {
        Prices();
    })

      return <div className="row" style={{margin:"0px"}}>
            <div className="col-sm-6">
              <a href={"/company_page/" + prop.ticker_id}><p style={{color:"black"}}>{prop.ticker_id}</p></a>
            </div>
            <div className="col-sm-6">
              <p style={{color:"black", marginBottom:"0px"}}>&#8377; {price}</p>
            </div>
          </div>
}