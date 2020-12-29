import React, {useEffect, useState} from "react"
import Base from "./Base.js"
// import "../styles.css"; 
import { Card } from "./Card.js";
import { FeedContent } from "./FeedContent.js";
import {Comments} from "./getcomment";
import { createpost } from "./helper/createpost";


export default function Home() {
  const [feeds, setData] = useState([]);

  const [content, setContent] = useState("");
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(false);


  const onSubmit = (content) => {
    // event.preventDefault();
    createpost(content)
      .then((data) => {
        if (error) {
        } else {
          setContent("");
          setReload(!reload);
        }
        return 0;
      })
      .catch(console.log("Error"));
  };

  const handleChange = (event) => {
    setError("");
    setContent(event.target.value);
  };
  

  const getData=()=>{
    fetch('http://127.0.0.1:8000/busybeaver/api/feed/'
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
     <Card class="card w-50 p-2 my-2" borderRadius="30px">
     <input placeholder="Search" style={{border: "none", outline:"0"}} type="text" id="search"></input>
     </Card>  
    
     <div class="card w-75 mb-5 my-5" style={{borderRadius:"15px"}}>
            <div className="row py-4" style={{paddingRight:"10px", paddingLeft:"10px"}}>
              <div className="col-lg-3">
                <img className="rounded-circle" style={{width: "50%"}} src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="profile"/>
              </div>
              <div className="col-lg-9" style={{textAlign:"left"}}>
                <textarea placeholder="Feeling Bullish or Bearish"  onChange={handleChange}   value={content}></textarea>
                <div style={{height:"50px"}}>
                <button type="button" class="btn"  onClick={() => { onSubmit(content); }} style={{backgroundColor:"#4d52b5", color:"white", borderRadius:"25px", padding:"10px 30px", fontWeight:"bold", letterSpacing:"1.5px", position:"absolute", right:"20px"}}>Post</button>
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
     
     </center>
    
     </Base>
    </div>
  );
}