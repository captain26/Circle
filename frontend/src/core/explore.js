import React, { useEffect, useState } from "react"
import { API } from "../backend.js";

import { Card } from "./Card.js";

const Explore = () => {

  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  const [current, setCurrent] = useState("");

  const [ticker, setTickers] = useState([]);
  const [company, setCompany] = useState("");

  const token = JSON.parse(sessionStorage.getItem('user')).token;

  const getUsers = () => {
    fetch(`${API}/api/userprofiles/`,
    {
      method:"GET",
      headers: {
        Accept : "application/json",
        "Content-Type": "application/json",
         Authorization: `Token ${token}`
      },
    }).then((data)=> {return data.json()}
    ).then((list) =>{
      setUsers(list);
    }).catch(() => setUsers([]))
  }

  const getData = () => {
    fetch(`${API}/api/tickers/`
    ,{method: "GET"})
    .then(function(response){
      return response.json();
    })
      .then(function(json) {
      setTickers(json);  
    }).catch(() => setTickers([]));
  }

  
  const getCurrentUsers = () => {
    fetch(`${API}/api/auth/user`,
    {
      method:"GET",
      headers: {
        "Accept" : "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      },
    }).then((data)=> {return data.json()}
    ).then((user) =>{
      setCurrent(user.username);
      
    })
  }
  useEffect(() => {
    getUsers();
    getCurrentUsers();
    getData();
  },[]);

  return (
    <div className="content text-center">
    <center style={{position:"absolute", zIndex:"2", width:"50%", marginLeft:"5%", marginTop:"20px"}}>
    <Card class="card w-50 p-2" borderRadius="30px" >
    <input autoComplete={"off"} onChange={(event) => {
      setName(event.target.value);
      setCompany(event.target.value);
    }} className= "search" placeholder="Search" style={{border: "none", outline:"0"}} type="text" id="search1"></input>
    {users.filter((val) =>{
      if(name === ""){
        return name;
      }else if(val.name.toLowerCase().includes(name.toLowerCase())){
        return val;
      }
    }).slice(0, 5).map((val,key) => {
       return <div>
         <ul className="list-group">
           <a
           href={current == val.user.username ? "/profile" : ( "/profile/" + encodeURIComponent(val.user.username) )}  
           type="button"
           className="list-group-item-action">
             {val.name}
           </a>
         </ul>
       </div>
    })
    }
    {company != "" ? <hr></hr> : <div></div>}
    {ticker.filter((val) =>{
      if(company === ""){
        return company;
      }else if(val.ticker_id.toLowerCase().includes(company.toLowerCase())){
        return val;
      }
    }).slice(0, 5).map((val,key) => {
       return <div>
         <ul className="list-group">
           <a
           href={"/company_page/" + encodeURIComponent(val.ticker_id)}
           type="button"
           className="list-group-item-action">
             {val.ticker_id}
           </a>
         </ul>
       </div>
    })
    }
    </Card>
    </center>
   </div>
  );
}

export default Explore;