import React, {useEffect, useState} from "react"
import { API } from "../backend.js";
import Base from "./Base.js"
import { Card } from "./Card.js";
import News from "./news.js";

// import "../styles.css";

export default function Search() {
  const [value, setValue] = useState("");
  const [ticker, setTickers] = useState([]);

  const getData = () => {
    fetch(`${API}/api/tickers/`
    ,{method: "GET"})
    .then(function(response){
      return response.json();
    })
      .then(function(json) {
      setTickers(json);  
    });
  }

  useEffect(() => {
    getData();
  },[]);
  

  return (
    <div>
     <Base>
     <center>
     <Card class="card w-50 p-2 my-2" borderRadius="30px">
     <input onChange={(event) => {
       setValue(event.target.value);
     }} placeholder="Search" style={{border: "none", outline:"0"}} type="text" id="search"></input>
     {ticker.filter((val) =>{
       if(value == ""){
         return value;
       }else if(val.ticker_id.toLowerCase().includes(value.toLowerCase())){
         return val;
       }
     }).map((val,key) => {
        console.log(val.ticker_id);
        return <div>
          <ul className="list-group">
            <a
            href="/company_page"
            type="button"
            className="list-group-item list-group-item-action">
              {val.ticker_id}
            </a>
          </ul>
        </div>
     })
     }
     </Card>
     </center>
     <h1 style={{margin:"30px auto", color:"#707070", width: "80%",textAlign:"left"}}>News</h1>
   <News/>
     
    <h1 style={{margin:"50px auto", color:"#707070", width: "80%", textAlign:"left"}}>Themes</h1>
    <div class="card" style={{padding:"10px", borderRadius:"10px", width:"80%", height:"300px", margin:"30px auto"}}>
    </div>
     </Base>
    </div>
  );
}