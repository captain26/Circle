import React, {useEffect, useState} from "react"
import { API } from "../backend.js";
import Base from "./Base.js"
// import "../styles.css"; 
import { Card } from "./Card.js";
import { FeedContent } from "./FeedContent.js";
import {Comments} from "./getcomment";
import { createpost } from "./helper/createpost";
import Watchlist from "./watchlist";

export default function Home() {
  const [feeds, setData] = useState([]);

  const [title, setTitle] = useState({
    tit: "",
    cont: ""
  });
  
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(false);



  const {tit,cont} = title;

  const onSubmit = event => {
    // event.preventDefault();
    createpost(tit,cont)
      .then((data) => {
        if (error) {
        } else {
          setTitle("");
          window.location.reload();
          setReload(!reload);
        }
        return 0;
      })
      .catch(console.log("Error"));
  };

  const handleChange = name => event => {
    setError("");
    setTitle({...title, [name] : event.target.value});
    console.log(event.target.value);
  };
  

  const getData=()=>{
    fetch(`${API}/api/feed/`
    ,{method:"GET"})
    .then(function(response){
      return response.json();
    })
      .then(function(json) {
      setData(json);  
    });
    }

    useEffect(() => {
      getData();
    }, [reload]);
    
  return (
    <div>
     <Base>
     <center>
  <div class="row">
    <div class="col-lg-9">


    <div class="card w-75 mb-5 my-4" style={{borderRadius:"15px"}}>
            <div className="row py-4" style={{paddingRight:"10px", paddingLeft:"10px"}}>
              <div className="col-lg-3">
                <img className="rounded-circle" style={{width: "50%"}} src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="profile"/>
              </div>
              <div className="col-lg-9" style={{textAlign:"left"}}>
                <input type="text" placeholder="Title" onChange={handleChange("tit")} style={{border: "none", outline:"0",width:"auto"}}/>
                <textarea placeholder="Feeling Bullish or Bearish"  onChange={handleChange("cont")}></textarea>
                <div style={{height:"50px"}}>
                <button type="button" class="btn"  onClick={onSubmit} style={{backgroundColor:"#4d52b5", color:"white", borderRadius:"25px", padding:"10px 30px", fontWeight:"bold", letterSpacing:"1.5px", position:"absolute", right:"20px"}}>Post</button>
                </div>
              </div>
            </div>
       </div>
     <h3 className="text-left w-75" style={{fontWeight:"bold", marginBottom:"20px"}}>Your Feed</h3>
    <div>
    {feeds.map((feed,index) => {
      var title = feed.title;
      title = title.replace(/\s+/g, '-');
     
       return (
        <Card key={index} class="card w-75 mb-5">
       <FeedContent
       avatarImage="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
       cardTitle={feed.title}
       cardDescription={feed.key_insight_1}
       cardText= {feed.content} 
         
       />
       <hr width="90%" size="1" textAlign="center" style={{margin:"auto",marginBottom:"20px"}}/>
        <Comments title={title}/>
        </Card>
     
       );
     })}
    </div>
  </div>
  <Watchlist/>
  </div>

     </center>
    
     </Base>
    </div>
  );
}