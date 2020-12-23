import React ,{useState,useEffect} from "react";
import { Card } from "./Card";


export const Comments = (prop) => {
    const [comments, setComments] = useState([]);
    

    const getComments=()=>{
        fetch(`http://127.0.0.1:8000/busybeaver/api/comments/Bull-Case-for-Reliance/`
        ,{method:"GET"})
        .then(function(response){

          return response.json();
        })
          .then(function(json) {
          console.log(json);
          setComments(json);  
        });
        }

        useEffect(() => {
            getComments();
          }, []);
    
    return (
       <div>

           {comments.map((comment,index) => {
            return (
     <div key={index} className="w-50 row ml-2" style={{margin: "auto"}}>
        <div className="col-lg-2 col-md-4">
          <img className="rounded-circle" style={{width:"40px"}} src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"/>
        </div>
        <div className="col-lg-6 col-md-8">
              <Card class="bg-light text-left p-2 mb-2">
                  <p style={{fontSize:"15px",fontWeight:'bold',marginBottom:"2px"}}>Vasu Bansal</p>
                  <p style={{fontSize:"12px",marginBottom:"2px"}}>{comment.body}</p>
              </Card>
        </div>
     
     </div>
            );
           })}
       </div>
    );
}