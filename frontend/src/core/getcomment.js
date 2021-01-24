import React ,{useState,useEffect} from "react";
import { Card } from "./Card";
import { CommentField } from "./Postcomment.js";
import {API} from "../backend";

export const Comments = (prop) => {
    const [comments, setComments] = useState([]);
    const [reload, setReload] = useState(false);

    const getComments=()=>{
        fetch(`${API}/api/comments/${prop.title}/`
        ,{method:"GET", headers: {
          "Authorization": `Token ${JSON.parse(localStorage.getItem('user')).token}`
        },})
        .then(function(response){
          // console.log(response.json());
          return response.json();
        })
        .then(function(json) {
          setComments(json); 
        });
    }

    useEffect(() => {
       getComments();
    }, [reload]);
    
    return (
       <div>
           {comments.map((comment,index) => { 
            return (
     <div key={index} className="w-50 row ml-2" style={{margin: "auto"}}>
        <div className="col-lg-2 col-md-4">
          <img className="rounded-circle" style={{width:"40px"}} src={comment.author.image} alt="profile"/>
        </div>
        <div className="col-lg-6 col-md-8">
              <Card class="bg-light text-left p-2 mb-2">
                  <p style={{fontSize:"15px",fontWeight:'bold',marginBottom:"2px"}}>{comment.author.name}</p>
                  <p style={{fontSize:"12px",marginBottom:"2px"}}>{comment.body}</p>
              </Card>
        </div>
     </div>
            );
           })}
       <CommentField title={prop.title} setReload={setReload} reload={reload}/>
       </div>
    );
}